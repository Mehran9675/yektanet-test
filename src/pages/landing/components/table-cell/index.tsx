interface PropTypes {
  data: string | number;
}

const TableCell = (props: PropTypes) => {
  return <td>{props.data || ""}</td>;
};

export default TableCell;
