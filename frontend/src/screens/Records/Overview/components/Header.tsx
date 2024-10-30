import React from "react";

import StyledButton from "@/components/StyledButton";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { PATHS } from "@/routes/paths";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "@/components/Screen/components/ScreenHeader";

const Header = () => {
  const navigate = useNavigate();

  return (
    <ScreenHeader
      title="Registos"
      subtext="Manage your records and details"
      actions={[
        {
          startIcon: <AddIcon />,
          text: "Novo",
          onClick: () => navigate(PATHS.NEW_RECORD)
        },
        {
          startIcon: <FileDownloadIcon />,
          text: "Download",
          onClick: () => {},
          variant: "outlined"
        }
      ]}
    />
  );
};

export default Header;
