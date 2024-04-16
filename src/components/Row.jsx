import { ACTIONS } from "./Sidebar";
import styles from "./List.module.css";

function Row({
  result,
  dispatch,
  setSearch,
  setSelected,
  selected_id,
  children,
}) {
  return (
    <li
      className={result && selected_id === result.id ? styles.selected : ""}
      onClick={() => {
        if (dispatch) {
          dispatch({ type: ACTIONS.ADD, payload: result });
        }

        if (setSearch) {
          setSearch("");
        }

        if (setSelected) {
          setSelected(result);
        }
      }}
    >
      {children}
    </li>
  );
}

export default Row;
