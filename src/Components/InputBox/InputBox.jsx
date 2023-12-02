import React, { useState } from "react";
import { backendUrl } from "../../constants";

const InputBox = () => {
  const [inputFieldData, setInputFieldData] = useState("");

  const handleDownloadClick = () => {
    const apiUrl = `${backendUrl}/convert?url=${inputFieldData}`;

    const downloadLink = document.createElement("a");
    downloadLink.href = apiUrl;
    downloadLink.download = "audio_file.mp3";

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  const handleContainerClick = () => {
    // Clear the input field when the container is clicked
    setInputFieldData("");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      backgroundColor: "#333",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%", // Set width to 100% for responsiveness
      maxWidth: "500px", // Add maxWidth to limit the width on larger screens
      boxSizing: "border-box",
      padding: "20px", // Add padding for better spacing
    },
    label: {
      marginBottom: "10px",
      color: "#fff",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #555",
      backgroundColor: "#555",
      color: "#fff",
    },
    button: {
      marginTop: "10px",
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#61dafb",
      color: "#black",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container} onClick={handleContainerClick}>
      <label style={styles.label}>
        Link:
        <input
          type="text"
          value={inputFieldData}
          onChange={(e) => setInputFieldData(e.target.value)}
          style={styles.input}
        />
      </label>
      <button onClick={handleDownloadClick} style={styles.button}>
        Download
      </button>
    </div>
  );
};

export default InputBox;
