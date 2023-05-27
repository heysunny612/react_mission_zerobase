import styles from './Button.module.css';
export default function Button({ onClick, type, children }) {
  return (
    <button
      className={type ? `${styles.button} ${styles[type]}` : styles.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
