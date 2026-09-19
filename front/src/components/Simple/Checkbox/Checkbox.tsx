import styles from "./Checkbox.module.scss";
import "/src/index.css";
import CheckboxFill from "../../../assets/checkbox-fill.svg";
import CheckboxLine from "../../../assets/checkbox-line.svg";

interface IComponentProps {
  status: boolean;
  onChange: () => void;
  name: string;
  label?: string;
  color?: string;
}

const Checkbox = ({ status, onChange, name, label = "", color }: IComponentProps) => {
  return (
    <>
      <div
        className={styles.checkboxWrapper}
        onClick={onChange}
        data-testid="Checkbox"
      >
        <input
          className={styles.checkbox}
          type="checkbox"
          name={name}
          checked={status}
          onChange={() => {}}
        />
        {status ? (
          <img
            className={`${styles.icon} ${styles.true}`}
            style={{filter: color}}
            src={CheckboxFill}
            alt="checkbox-checked icon"
          />
        ) : (
          <img
            className={`${styles.icon} ${styles.false}`}
            style={{filter: color}}
            src={CheckboxLine}
            alt="checkbox-unchecked icon"
          />
        )}
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default Checkbox;
