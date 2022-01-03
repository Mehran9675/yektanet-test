import { CSSProperties } from "react";
import styles from "./index.module.css";
const Loading = (props: { styles?: CSSProperties }) => {
  return (
    <div style={props.styles} className={styles["container"]}>
      <span></span>
      <p></p>
    </div>
  );
};
export default Loading;
