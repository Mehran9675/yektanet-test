import { TableItem } from "pages/landing/types";
import TableHeadItem from "../table-head-item";

interface PropTypes {
  HeadItems: TableItem[];
}

const TableHead = (props: PropTypes) => {
  return (
    <tr>
      {props.HeadItems.map((item) => (
        <TableHeadItem key={item.fieldKey} headItemName={item.fieldName} />
      ))}
    </tr>
  );
};

export default TableHead;
