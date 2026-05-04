import { useState } from "react";

interface Param {
  keyword: string;
  status: string;
}

export function useTaskSearch() {
  const [params, setParams] = useState<Param>({
    keyword: "",
    status: "all",
  });

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

  const getQueryString = () => {
    const pairs = Object.entries(params).map(
      ([key, value]) => `${key}=${value}`,
    );
    return `?${pairs.join("&")}`;
  };

  return [params, clearParam, updateParam, getQueryString] as const;
}
