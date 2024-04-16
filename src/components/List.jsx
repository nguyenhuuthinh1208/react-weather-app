import styles from "./List.module.css";

function List({ children, title, className = "list-selectable" }) {
  return (
    <>
      {title && <h4 className={styles.title}>{title}</h4>}
      <ul className={styles[className]}>{children}</ul>
    </>
  );
}

export default List;
