import styles from "./index.module.css";
import { ChangeEvent, useState } from "react";

interface PropTypes {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: any) => void;
}

const Pagination = (props: PropTypes) => {
  const [pageInput, setPageInput] = useState("");

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    return props.onChange({ pageSize: parseInt(event.target.value), page: 1 });
  };

  const handlePageChange = (page: number) => {
    return props.onChange({ page: page });
  };

  const handlePageInput = () => {
    if (!pageInput) return;
    if (Number(pageInput) > 1 && Number(pageInput) > props.total - 1) return;
    return props.onChange({ page: pageInput });
  };

  return (
    <div className={styles["container"]}>
      <select onChange={handlePageSizeChange} value={props.pageSize}>
        <option>15</option>
        <option>30</option>
        <option>50</option>
        <option>100</option>
      </select>
      {Number(props.current) - 1 !== 0 ? (
        <button onClick={() => handlePageChange(Number(props.current) - 1)}>
          {Number(props.current) - 1}
        </button>
      ) : null}
      <button disabled>{props.current}</button>
      {Number(props.current) !== Number(props.total) - 1 ? (
        <>
          <button onClick={() => handlePageChange(Number(props.current) + 1)}>
            {Number(props.current) + 1}
          </button>
          <span>...</span>
          <button onClick={() => handlePageChange(Number(props.total) - 1)}>
            {Number(props.total) - 1}
          </button>
        </>
      ) : null}
      <input
        onKeyPress={(e) => (e.key === "Enter" ? handlePageInput() : null)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPageInput(e.target.value)
        }
        value={pageInput}
        type="number"
      />
    </div>
  );
};
export default Pagination;
