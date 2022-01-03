import { Entry } from "@/common/types";
import { TableItem } from "pages/landing/types";
import TableRow from "../table-row";

interface PropTypes {
  rows: Entry[];
  tableItems: TableItem[];
}

const TableBody = (props: PropTypes) => {
  return (
    <>
      {props.rows.map((row) => (
        <TableRow key={row.id} row={row} fieldKeys={props.tableItems} />
      ))}
    </>
  );
};
export default TableBody;
