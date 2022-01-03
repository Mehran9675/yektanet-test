import styles from "./index.module.css";
import { Filters as FilterType } from "@/common/types";
import { ChangeEvent, useEffect, useState } from "react";
import { debounce } from "common/function/debounce";

interface PropTypes {
  onChange: (filter: Partial<FilterType>) => void;
  reset: () => void;
}

const Filters = (props: PropTypes) => {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  useEffect(() => {
    if (to && from) {
      props.onChange({
        to,
        from,
      });
    }
  }, [to, from]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        return props.onChange({ searchBy: "NAME", search: e.target.value });
      case "title":
        return props.onChange({ searchBy: "TITLE", search: e.target.value });
      case "field":
        return props.onChange({ searchBy: "FIELD", search: e.target.value });
    }
  };

  return (
    <div className={styles["container"]}>
      <div>
        <label htmlFor="name">نام تغییر دهنده</label>
        <input onChange={debounce(handleChange, 500)} name="name" />
      </div>
      <div>
        <label htmlFor="date">تاریخ</label>
        <div>
          از:
          <input
            onChange={(e) => setFrom(e.target.value)}
            name="date"
            type="date"
          />
          تا:
          <input
            onChange={(e) => setTo(e.target.value)}
            name="date"
            type="date"
          />
        </div>
      </div>
      <div>
        <label htmlFor="title">نام آگهی</label>
        <input onChange={debounce(handleChange, 500)} name="title" />
      </div>
      <div>
        <label htmlFor="field">فیلد</label>
        <input onChange={debounce(handleChange, 500)} name="field" />
      </div>
      <button onClick={props.reset}>بازنشانی</button>
    </div>
  );
};
export default Filters;
