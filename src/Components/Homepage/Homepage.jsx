import React, { useEffect } from "react";
import InputBox from "../InputBox/InputBox";

const Homepage = () => {
  useEffect(() => {
    // Set overflow hidden for the html and body elements
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Cleanup function to restore overflow on component unmount
    return () => {
      document.documentElement.style.overflow = "visible";
      document.body.style.overflow = "visible";
    };
  }, []);

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
          height: "60px", // Set the height of the navigation bar
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <h1 style={styles.navTitle}>21YTMP3</h1>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#1e1e1e",
          height: "calc(100vh - 60px)", // Set height to 100vh minus the navigation bar height
          overflow: "hidden", // Hide overflow to prevent scrolling
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#4a90e2",
          padding: "20px",
          boxSizing: "border-box",
          marginTop: "60px", // Add margin to prevent content from being covered by the fixed navigation bar
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
