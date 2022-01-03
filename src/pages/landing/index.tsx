import useIndexedData from "common/hooks";
import TableBody from "./components/table-body";
import TableHead from "./components/table-head";
import { TableItem } from "./types";
import styles from "./index.module.css";
import Pagination from "./components/pagination";
import Filters from "./components/filters";
import Loading from "common/componenets/loading";

const Landing = () => {
  const { data, setFilters, filters, resetFilters, loading } = useIndexedData();
  const tableItems: TableItem[] = [
    {
      fieldKey: "name",
      fieldName: "نام تغییر دهنده",
    },
    {
      fieldKey: "date",
      fieldName: "تاریخ",
    },
    {
      fieldKey: "title",
      fieldName: "نام آگهی",
    },
    {
      fieldKey: "field",
      fieldName: "فیلد",
    },
    {
      fieldKey: "old_value",
      fieldName: "مقدار قدیمی",
    },
    {
      fieldKey: "new_value",
      fieldName: "مقدار جدید",
    },
  ];
  if (loading) return <Loading />;
  return (
    <div className={styles["container"]}>
      <Filters
        reset={resetFilters}
        onChange={(filter) => setFilters({ ...filters, ...filter })}
      />
      <table>
        <thead>
          <TableHead HeadItems={tableItems} />
        </thead>
        <tbody>
          <TableBody rows={data.items || []} tableItems={tableItems} />
        </tbody>
      </table>
      <Pagination
        current={data.page}
        total={data.total}
        onChange={(page: any) => setFilters({ ...filters, ...page })}
        pageSize={data.pageSize}
      />
    </div>
  );
};

export default Landing;
