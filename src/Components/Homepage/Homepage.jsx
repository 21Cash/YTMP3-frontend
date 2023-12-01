import React from "react";
import InputBox from "../InputBox/InputBox";

const HomePage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#1f1f1f", // Dark mode background color
    },
    title: {
      fontSize: "4rem", // Increased font size
      color: "#61dafb", // Accent color for the title
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>YTMP3</div>
      <div style={styles.inputBoxContainer}>
        <InputBox />
      </div>
    </div>
  );
};

export default HomePage;
