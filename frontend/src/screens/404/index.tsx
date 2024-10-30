import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/404");
  }, []);

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
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </div>
  );
};

export default Error404;
