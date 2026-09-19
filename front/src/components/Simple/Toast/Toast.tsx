import styles from "./Toast.module.scss";
import "/src/index.css";
import Close from "../../../assets/close.svg";

interface IComponentProps {
  isOpen: boolean;
  close: () => void;
  text: string;
}

const Toast = ({ isOpen, close, text = "" }: IComponentProps) => {
  return (
    <>
      <div
        className={styles.toast}
        data-testid="Toast"
        style={{
          opacity: Number(isOpen),
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <p className={styles.text}>{text}</p>
        <button className={styles.close} onClick={close}>
          <img
            className={styles.icon}
            src={Close}
            alt="close toast icon"
            data-testid={"Toast-close"}
          />
        </button>
      </div>
    </>
  );
};

export default Toast;
