import { useEffect, useState } from "react";

interface Param {
  keyword: string;
  status: string;
}

export function useTaskSearch(debounceTime: number = 500) {
  const [params, setParams] = useState<Param>({ keyword: "", status: "all" });
  const [debounceQuery, setDebounceQuery] = useState("");

  // When param hasn't been changed for a while, set debounce to trigger the search
  useEffect(() => {
    const id = setTimeout(() => {
      const pairs = Object.entries(params).map(
        ([key, value]) => `${key}=${value}`
      );
      setDebounceQuery(`?${pairs.join("&")}`);
    }, debounceTime);
    return () => clearTimeout(id);
  }, [debounceTime, params]);

  const clearParam = () => {
    setParams({
      keyword: "",
      status: "all",
    });
  };

  const updateParam = (param: keyof Param, value: string) => {
    setParams((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  return [params, debounceQuery, clearParam, updateParam] as const;
}
