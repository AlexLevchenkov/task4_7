import styles from "./Button.module.scss";
import '/src/index.css';

export interface IComponentProps {
  type?: "primary" | "secondary";
  srcValue?: string;
  disabled?: boolean;
  label?: string;
  full?: boolean;
  onClick: () => void;
}

const Button = ({
  type = "primary",
  srcValue,
  disabled = false,
  label,
  full,
  onClick
}: IComponentProps) => {

  return (
    <>
      <button
        className={`${styles.button} ${styles[type]} ${full ? styles.full : ""}`}
        disabled={disabled}
        onClick={onClick}
        data-testid="Button"
      >
        {srcValue && (
          <img className={styles.icon} src={srcValue} alt="play icon" />
        )}
        {label}
      </button>
    </>
  );
};

export default Button;
