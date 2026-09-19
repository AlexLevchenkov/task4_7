import { useState } from "react";
import styles from "./Dropdown.module.scss";
import "/src/index.css";
import DownSmall from "../../../assets/down-small.svg";

export interface IItem {
  id: string | number;
  value: string;
  title: string;
}

interface IComponentProps {
  selected?: IItem;
  list: IItem[];
  changeValue: (item: IItem) => void;
}

const Dropdown = ({ selected, list, changeValue }: IComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeIsOpenStatus = () => {
    setIsOpen((prev) => !prev);
  };

  const selectValue = (value: IItem) => {
    changeValue(value);
    changeIsOpenStatus();
  };

  return (
    <>
      <div className={styles.wrapper} data-testid="Dropdown">
        <button
          className={`${styles.selectedBlock}${
            isOpen ? ` ${styles.isOpen}` : ""
          }`}
          onClick={changeIsOpenStatus}
          data-testid={"Dropdown-button"}
        >
          <div className={styles.selectedItem}>{selected?.title}</div>
          <img
            className={styles.icon}
            src={DownSmall}
            alt="dropdown icon"
          />
        </button>
        <div
          className={`${styles.listWrapper}${
            isOpen ? ` ${styles.isOpen}` : ""
          }`}
        >
          <div className={styles.listBlock}>
            {
              list.map((item) => (
                <button
                  key={item.id}
                  className={styles.listItem}
                  onClick={() => selectValue(item)}
                  data-testid={"Dropdown-option"}
                >
                  {item.title}
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
