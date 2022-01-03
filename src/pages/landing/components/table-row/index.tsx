import { Entry } from "@/common/types";
import { TableItem } from "pages/landing/types";
import TableCell from "../table-cell";

interface PropTypes {
  row: Entry;
  fieldKeys: TableItem[];
}

const TableRow = (props: PropTypes) => {
  const renderTableData = (key: TableItem) => {
    return (
      <TableCell
        key={key.fieldKey}
        data={(props.row as Record<string, any>)[key.fieldKey]}
      />
    );
  };

  return <tr>{props.fieldKeys.map(renderTableData)}</tr>;
};
export default TableRow;
