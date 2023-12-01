import React, { useState } from "react";
import { backendUrl } from "../../constants";

const InputBox = () => {
  const [inputFieldData, setInputFieldData] = useState("");

  const handleDownloadClick = () => {
    const apiUrl = `${backendUrl}/convert?url=${inputFieldData}`;

    // Create a link element
    const downloadLink = document.createElement("a");
    downloadLink.href = apiUrl;
    downloadLink.download = "audio_file.mp3"; // You can specify the desired file name

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Trigger a click event to simulate the download
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", // Center items horizontally and vertically
      borderRadius: "8px",
      backgroundColor: "#333", // Darker background color
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "500px", // Increase the width as needed
      height: "200px", // Adjust the height as needed
    },
    label: {
      marginBottom: "10px",
      color: "#fff",
    },
    input: {
      width: "100%", // Make the input field wider horizontally
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #555",
      backgroundColor: "#555", // Darker input field background color
      color: "#fff",
    },
    button: {
      marginTop: "10px", // Add some space between input and button
      padding: "8px 16px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#61dafb",
      color: "#fff",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
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
