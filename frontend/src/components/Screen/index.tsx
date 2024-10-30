import React from "react";

import "./styles.scss";
import ScreenHeader, { ScreenHeaderProps } from "./components/ScreenHeader";
import ScreenBody, { ScreenBodyProps } from "./components/ScreenBody";

import "./styles.scss";

type Props = {
  headerProps?: ScreenHeaderProps;
  bodyProps?: ScreenBodyProps;
  children: React.ReactNode;
  postHeaderComponent?: React.ReactNode;
  stickyFooterComponent?: React.ReactNode;
};

const Screen = ({
  headerProps,
  bodyProps,
  postHeaderComponent,
  stickyFooterComponent,
  children
}: Props) => {
  return (
    <div className="screen_container">
      <ScreenHeader {...headerProps} />
      {postHeaderComponent && (
        <div className="screen_container__post_header">{postHeaderComponent}</div>
      )}
      <ScreenBody {...bodyProps} stickyFooterComponent={stickyFooterComponent}>
        {children}
      </ScreenBody>
    </div>
  );
};

export default Screen;
