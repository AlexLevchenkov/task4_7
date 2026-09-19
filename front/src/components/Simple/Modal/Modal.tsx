import { ReactNode } from "react";
import styles from "./Modal.module.scss";
import "/src/index.css";

interface IComponentProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  editItem?: () => void;
  deleteItem?: () => void;
  close: () => void;
}

const Modal = ({ isOpen, title, children, editItem, deleteItem, close }: IComponentProps) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modalWrapper} data-testid="Modal">
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.control}>
              {editItem && (
                <button
                  className={`${styles.button} ${styles.edit}`}
                  onClick={editItem}
                  data-testid={"Modal-delete"}
                />
              )}
              {deleteItem && (
                <button
                  className={`${styles.button} ${styles.delete}`}
                  onClick={deleteItem}
                  data-testid={"Modal-delete"}
                />
              )}
              <button
                className={`${styles.button} ${styles.close}`}
                onClick={close}
                data-testid={"Modal-close"}
              />
            </div>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
