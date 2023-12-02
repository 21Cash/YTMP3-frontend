import React from "react";
import InputBox from "../InputBox/InputBox";

const Homepage = () => {
  return (
    <>
      {/* New Navigation Bar */}
      <div
        style={{
          backgroundColor: "#333", // Background color for the navigation bar
          color: "#4a90e2",
          padding: "10px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h1 style={styles.navTitle}>21YTMP3</h1>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#1e1e1e",
          height: "100vh", // Set height to 100vh for fullscreen
          overflow: "hidden", // Hide overflow to prevent scrolling
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#4a90e2",
          margin: 0,
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h1 style={styles.title}> Download MP3</h1> {/* Updated title header */}
        <InputBox />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

const styles = {
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  navTitle: {
    fontSize: "2rem", // Adjusted font size for the navigation bar title
    margin: 0,
  },
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

export default Homepage;
