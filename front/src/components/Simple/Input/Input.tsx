import { useState } from "react";
import styles from "./Input.module.scss";
import '/src/index.css';
import EyeLine from "../../../assets/eye-line.svg";
import EyeClose from "../../../assets/eye-close-line.svg";

interface IComponentProps {
  type: "text" | "password";
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
}

const Input = ({
  type,
  disabled = false,
  value,
  onChange,
  label,
  name,
  placeholder,
  errorMessage,
}: IComponentProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const changePasswordStatus = () => {
    if (disabled) {
      return;
    }
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${styles.inputWrapper}${
          disabled ? ` ${styles.disabled}` : ""
        }`}
        data-testid="Input"
      >
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>  
        )}
        <div className={styles.inputBlock}>
          <input
            className={`${styles.input}${errorMessage ? ` ${styles.haveError}` : ""}`}
            disabled={disabled}
            type={showPassword || type === "text" ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            data-testid="Input-field"
          />
          {type === "password" && (
            <button
              className={styles.showPassword}
              onClick={changePasswordStatus}
              data-testid="Input-button"
            >
              {showPassword ? (
                <img
                  className={styles.icon}
                  src={EyeLine}
                  alt="hide password icon"
                />
              ) : (
                <img
                  className={styles.icon}
                  src={EyeClose}
                  alt="show password icon"
                />
              )}
            </button>
          )}
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
    </>
  );
};

export default Input;
