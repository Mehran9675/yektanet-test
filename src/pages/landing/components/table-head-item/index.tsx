interface Proptypes {
  headItemName: string;
}

const TableHeadItem = (props: Proptypes) => {
  return <th>{props.headItemName || ""}</th>;
};

export default TableHeadItem;
