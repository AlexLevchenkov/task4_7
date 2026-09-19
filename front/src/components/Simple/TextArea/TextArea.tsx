import { ChangeEvent, useRef } from "react";
import styles from "./TextArea.module.scss";
import '/src/index.css';

interface IComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const TextArea = ({ label, value, onChange, name }: IComponentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <>
      <div className={styles.textAreaWrapper} data-testid="TextArea">
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <textarea
          ref={textareaRef}
          className={styles.textArea}
          name={name}
          value={value}
          onChange={handleChange}
          data-testid={"TextArea-field"}
        />
      </div>
    </>
  );
};

export default TextArea;
