import useIndexedData from "@/common/hooks";
import { Entry } from "@/common/types";
import { useState } from "react";
import TableBody from "./components/table-body";
import TableHead from "./components/table-head";
import { TableItem } from "./types";

const Landing = () => {
  const [rows, setRows] = useState<Entry[]>([]);

  useIndexedData();

  const tableItems: TableItem[] = [
    {
      fieldKey: "",
      fieldName: "",
    },
    {
      fieldKey: "",
      fieldName: "",
    },
    {
      fieldKey: "",
      fieldName: "",
    },
    {
      fieldKey: "",
      fieldName: "",
    },
    {
      fieldKey: "",
      fieldName: "",
    },
    {
      fieldKey: "",
      fieldName: "",
    },
  ];

  return (
    <table>
      <TableHead HeadItems={tableItems} />
      <TableBody rows={rows} tableItems={tableItems} />
    </table>
  );
};

export default Landing;
