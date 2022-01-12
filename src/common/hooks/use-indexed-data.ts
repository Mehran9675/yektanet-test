import { Entry, Filters, Pagination } from "@/common/types";
import { useEffect, useMemo, useState } from "react";
import BST from "services/bst";
import { useLocation, useSearchParams } from "react-router-dom";
import getTime from "../function/get-time";

const useIndexedData = (): {
  data: Pagination;
  filters: Filters;
  setFilters: (newFilter: Filters) => void;
  resetFilters: () => void;
  isLoading: boolean;
} => {
  const [filters, setFilters] = useState<Filters>({
    sortBy: undefined,
    order: undefined,
    page: 1,
    pageSize: undefined,
  });
  const [data, setData] = useState<Pagination>({
    total: 0,
    pageSize: filters.pageSize || 15,
    items: [],
    page: filters.page,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useSearchParams();
  const indexedDate = useMemo(() => new BST(), []);
  const pathname = useLocation().pathname;
  let timer: any;

  useEffect(() => {
    indexData({ ...filters, ...getQueries() });
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!query) return;
    indexedDate.getOrderedItems({ ...filters, ...getQueries() }).then((res) => {
      setData(res);
      stopLoading(false);
    });
  }, [pathname]);

  const stopLoading = (value: boolean) => {
    timer = setTimeout(() => setIsLoading(value), 500);
    // setIsLoading(false);
  };

  const index = (entry: Entry) => {
    indexedDate.insert(getTime(entry.date), entry);
  };

  const indexData = (filters: Filters) => {
    fetch("/data.json").then(async (res) => {
      const data = await res.json();
      data.forEach(index);
      indexedDate.getOrderedItems(filters).then((res) => {
        setData(res);
        stopLoading(false);
      });
    });
  };

  const getQueries = () => {
    const filters: Filters = {
      to: undefined,
      page: 1,
      pageSize: undefined,
      from: undefined,
      sortBy: undefined,
      order: undefined,
      search: undefined,
      searchBy: undefined,
    };
    for (const [key] of Object.entries(filters)) {
      if (query.has(key)) {
        // @ts-ignore
        filters[key] = query.get(key);
      }
    }
    const refined = deleteUndefined(filters);
    setFilters(refined);
    return refined;
  };
  const deleteUndefined = (obj: any) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    });
    return obj;
  };
  const commitFilters = (newFilters: Filters) => {
    if (!newFilters) return;
    setIsLoading(true);
    const allFilters = { ...filters, ...newFilters };
    setQuery(allFilters as any);
    setFilters(allFilters);
    indexedDate.getOrderedItems(allFilters).then((res) => {
      setData(res);
      stopLoading(false);
    });
  };

  const resetFilters = () => {
    setIsLoading(true);
    setQuery({ page: 1, pageSize: filters.pageSize } as any);
    setFilters({ page: 1, pageSize: filters.pageSize });
    indexedDate.reset().then((res) => {
      setData(res);
      stopLoading(false);
    });
  };

  return { data, filters, setFilters: commitFilters, resetFilters, isLoading };
};

export default useIndexedData;
