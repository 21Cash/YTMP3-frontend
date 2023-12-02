import React, { useEffect, useState } from "react";
import InputBox from "../InputBox/InputBox";
import { backendUrl } from "../../constants";

const Homepage = () => {
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "visible";
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        console.log("Pinging Server");
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

  const styles = {
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      textAlign: "center",
      width: "100%",
    },
    navTitle: {
      padding: "0px 0px 0px 10px",
      fontSize: "2rem",
      margin: 0,
    },
  };

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

  const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <p>
          © {currentYear} Sushil L, No Rights Reserved |{" "}
          <a
            href="https://github.com/21Cash/YTMP3-frontend"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4a90e2", textDecoration: "none" }}
          >
            View Source Code
          </a>
        </p>
      </div>
    );
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#333",
          color: "#4a90e2",
          padding: "10px",
          textAlign: "center",
          boxSizing: "border-box",
          height: "60px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={styles.navTitle}>21YTMP3</h1>
        <ServerStatus status={serverStatus} />
      </div>

      <div
        style={{
          backgroundColor: "#1e1e1e",
          height: "calc(100vh - 60px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#4a90e2",
          padding: "20px",
          boxSizing: "border-box",
          marginTop: "60px",
        }}
      >
        <h1 style={styles.title}>Download MP3</h1>
        <InputBox />
      </div>

      <Footer />
    </>
  );
};

export default Homepage;
