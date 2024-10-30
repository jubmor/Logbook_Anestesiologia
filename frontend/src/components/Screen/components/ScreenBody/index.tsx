import React from "react";

type Props = {
  children: React.ReactNode;
  stickyFooterComponent?: React.ReactNode;
  bodyProps?: ScreenBodyProps;
};

export type ScreenBodyProps = {};

const ScreenBody = ({ children, stickyFooterComponent, bodyProps }: Props) => {
  return (
    <div className="screen_container__body_wrapper">
      <div className="screen_container__body_wrapper__container">{children}</div>
      {stickyFooterComponent && <>{stickyFooterComponent}</>}
    </div>
  );
};

export default ScreenBody;
