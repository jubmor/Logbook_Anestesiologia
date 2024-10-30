import React from "react";

import "../styles.scss";
import { useAppSelector } from "@/store/hooks";

import defaultUserImage from "@/assets/images/defaultUserImage.png";

import EditIcon from "@mui/icons-material/Edit";

const UserContainer = () => {
  const user = useAppSelector((state) => state.auth.user);

  const userImage = defaultUserImage; //user?.profileImage ||

  return (
    <div className="user_profile_page_container__user_container">
      <div
        className="user_profile_page_container__user_container__image"
        style={{
          backgroundImage: `url(${userImage})`
        }}
      >
        <div
          onClick={() => {}}
          className="user_profile_page_container__user_container__image__edit"
        >
          <EditIcon />
        </div>
      </div>

      <div className="user_profile_page_container__user_container__basic_data">
        <h5>User Name</h5>
        <p>usermail@mail.com</p>
      </div>
    </div>
  );
};

export default UserContainer;
