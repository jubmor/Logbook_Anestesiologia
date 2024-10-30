import { useAppSelector } from "@/store/hooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectPresentation = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div style={{ display: "flex", flex: 1, justifyItems: "center", alignItems: "center" }}>
      <div
        style={{
          alignItems: "center",
          border: "1px solid red",
          display: "flex",
          flex: 1,
          justifyItems: "center",
          justifyContent: "center",
          gap: 20
        }}
      >
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default ProjectPresentation;
