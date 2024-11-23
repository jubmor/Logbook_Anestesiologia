import React from "react";

import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import "./styles.scss";

type Props = {
  label?: string;
  children: React.ReactNode;
  error?: boolean;
  errorText?: string | undefined;
  extraClass?: string;
  required?: boolean;
  tooltip?: React.ReactNode;
};

const InputWrapper = ({
  label,
  children,
  error,
  errorText,
  extraClass,
  required,
  tooltip
}: Props) => {
  return (
    <div className={`input-container ${extraClass ? extraClass : ""}`}>
      <div>
        {
          <div className={`input-container__header_wrapper`}>
            <div className={`input-container__header_wrapper__label_wrapper`}>
              {label && (
                <>
                  <p>{label}</p>
                  {required && (
                    <span className="input-container__header_wrapper__required-indicator">*</span>
                  )}
                </>
              )}
            </div>

            {tooltip && (
              <Tooltip describeChild title={tooltip}>
                <InfoOutlinedIcon className="input-container__header_wrapper__tooltip_icon" />
              </Tooltip>
            )}
          </div>
        }
      </div>
      {children}
      {error && errorText && (
        <div className="input-container__header_wrapper__error">{errorText}</div>
      )}
    </div>
  );
};

export default InputWrapper;
