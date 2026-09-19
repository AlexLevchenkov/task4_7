import styles from "./Link.module.scss";
import '/src/index.css';

interface IComponentProps {
  href: string;
  disabled: boolean;
  label: string;
}

const Link = ({ href, disabled, label }: IComponentProps) => {
  return (
    <>
      <a
        href={disabled ? undefined : href}
        className={`${styles.link}${disabled ? ` ${styles.disabled}` : ""}`}
        data-testid="Link"
      >
        {label}
      </a>
    </>
  );
};

export default Link;
