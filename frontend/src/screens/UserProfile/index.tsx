import React from "react";

import UserContainer from "./components/UserContainer";
import Screen from "@/components/Screen";

import "./styles.scss";
const UserProfile = () => {
  return (
    <Screen>
      <div className="user_profile_page_container">
        <div>
          <div className="user_profile_page_container__header_image_container" />
          <UserContainer />
        </div>
      </div>
    </Screen>
  );
};

export default UserProfile;
