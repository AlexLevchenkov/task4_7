import styles from "./ColorPicker.module.scss";
import '/src/index.css';

interface IComponentProps {
  colors: {
    id: number;
    color: string;
  }[];
  selectedColorId: number | null;
  selectColor: (id: number) => void;
}

const ColorPicker = ({
  colors,
  selectedColorId,
  selectColor,
}: IComponentProps) => {

  return (
    <>
      <div className={styles.pickerWrapper} data-testid="ColorPicker">
        <h2 className={styles.title}>Color</h2>
        <div className={styles.pickerBlock}>
          {colors.map((colorItem) => (
            <div
              key={colorItem.id}
              className={`${styles.colorWrapper}${
                colorItem.id === selectedColorId ? ` ${styles.selected}` : ""
              }`}
              data-testid="ColorPicker-item"
            >
              <button
                className={styles.colorItem}
                style={{ backgroundColor: colorItem.color }}
                onClick={() => selectColor(colorItem.id)}
                data-testid="ColorPicker-button"
              ></button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
