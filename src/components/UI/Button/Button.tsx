import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  disabled,
  className,
  ...rest
}) => {
  const isDisabled = Boolean(disabled) || loading;

  const cls = [styles.button, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cls}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"/>
            <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </button>
  );
};

export default Button;