import { Entry } from "@/common/types";
import { useEffect, useState } from "react";
import BST from "services/bst";

const useIndexedData = () => {
  const [data, setData] = useState<Record<string, BST>>();
  const indexedDate = new BST();
  const indexedName = new BST();
  const indexedTitle = new BST();
  const indexedField = new BST();
  const indexedOldValue = new BST();
  const indexedNewValue = new BST();

  useEffect(() => {
    indexData();
  }, []);

  const getTime = (date: string) => {
    return new Date(date).getTime();
  };

  const indexData = () => {
    fetch("/data.json").then(async (res) => {
      const data = await res.json();
      data.forEach(index);
    });
  };

  const index = (entry: Entry) => {
    indexedDate.insert(getTime(entry.date), entry);
    indexedName.insert(entry.name, entry);
    indexedTitle.insert(entry.title, entry);
    indexedField.insert(entry.field, entry);
    indexedOldValue.insert(entry.old_value, entry);
    indexedNewValue.insert(entry.new_value, entry);
  };

  return data;
};

export default useIndexedData;
