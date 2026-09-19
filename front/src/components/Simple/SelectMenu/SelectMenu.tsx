import { useRef, useState } from "react";
import styles from "./SelectMenu.module.scss";
import "/src/index.css";

export interface IItem {
  id: string | number;
  value: string;
  title: string;
  color?: string;
}

interface IComponentProps {
  label?: string;
  selected: IItem;
  list: IItem[];
  changeValue: (item: IItem) => void;
  disable?: boolean;
}

const SelectMenu = ({
  label,
  selected,
  list,
  changeValue,
  disable
}: IComponentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const listBlockRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    if (!disable) {
      setIsOpen((prev) => !prev);
      if (!isOpen && listBlockRef.current) {
        const selectedOptionIndex = list.indexOf(selected);
        if (selectedOptionIndex !== -1) {
          const selectedOptionElement = listBlockRef.current.children[selectedOptionIndex] as HTMLElement;
          if (selectedOptionElement) {
            listBlockRef.current.scrollTop = selectedOptionElement.offsetTop;
          }
        }
      }
    }
  };

  const selectValue = (value: IItem) => {
    changeValue(value);
    toggleMenu();
  };
  
  if (!selected) {
    return <></>
  }

  return (
    <>
      <div className={styles.wrapper} data-testid="SelectMenu">
        {label && <h3 className={styles.title}>{label}</h3>}
        <button
          className={(selected?.color ? `${styles.selectedBlock} ${styles.haveColor}` : styles.selectedBlock) + (disable ? ` ${styles.disable}` : "")}
          onClick={toggleMenu}
          data-testid={"SelectMenu-button"}
        >
          {selected.title}
          {selected.color && (
            <span
              className={styles.color}
              style={{ backgroundColor: selected.color }}
            />
          )}
        </button>
        <div
          className={`${styles.listWrapper}${
            isOpen ? ` ${styles.isOpen}` : ""
          }`}
        >
          <div className={styles.listBlock} ref={listBlockRef}>
            {
              list.map((item) => (
                <button
                  key={item.id}
                  className={selected.color ? `${styles.listItem} ${styles.haveColor}` : styles.listItem}
                  onClick={() => selectValue(item)}
                  data-testid="SelectMenu-option"
                >
                  {item.title}
                  {selected.color && (
                    <span
                      className={styles.color}
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMenu;
