import React from "react";

import "./styles.scss";

type Props = {
  label?: string;
  children: React.ReactNode;
  error?: boolean;
  errorText?: string | undefined;
  extraClass?: string;
  required?: boolean;
};

const InputWrapper = ({ label, children, error, errorText, extraClass, required }: Props) => {
  return (
    <div className={`input-container ${extraClass ? extraClass : ""}`}>
      {label && (
        <div className={`input-container__label_wrapper`}>
          <p>{label}</p>
          {required && <span className="input-container__required-indicator">*</span>}
        </div>
      )}
      {children}
      {error && errorText && <div className="input-container__error">{errorText}</div>}
    </div>
  );
};

export default InputWrapper;
