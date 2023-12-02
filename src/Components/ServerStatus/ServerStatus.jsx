import React, { useEffect, useState } from "react";
import { backendUrl } from "../../constants";
const ServerStatus = () => {
  const [serverStatus, setServerStatus] = useState(null);
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        console.log("Pinging Server");
        setServerStatus("Checking Status...");
        const response = await fetch(`${backendUrl}/test`);
        if (response.ok) {
          console.log("Ping Success");
          setServerStatus("Online");
        } else {
          console.log("Ping Failed");
          setServerStatus("Offline");
        }
      } catch (error) {
        console.error("Error checking server status:", error);
        setServerStatus("Offline");
      }
    };

    checkServerStatus();
  }, []);

  let statusColor = "#ff0000";

  if (serverStatus === "Online") {
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
      <p>Server: {serverStatus}</p>
    </div>
  );
};

export default ServerStatus;
