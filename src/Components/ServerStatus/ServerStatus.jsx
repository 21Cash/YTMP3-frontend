import React from "react";

const ServerStatus = ({ status }) => {
  let statusColor = "#ff0000";

  if (status === "Online") {
    statusColor = "#00ff00";
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: statusColor,
          marginRight: "5px",
        }}
      ></div>
      <p>Server: {status}</p>
    </div>
  );
};

export default ServerStatus;
