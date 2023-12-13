import React, { useState } from "react";
import { backendUrl } from "../../constants";

const InputBox = () => {
  const [inputFieldData, setInputFieldData] = useState("");
  const handleDownloadClick = async () => {
    try {
      const isPlaylistResponse = await fetch(
        `${backendUrl}/isPlaylistUrl?url=${inputFieldData}`
      );
      const isPlaylistData = await isPlaylistResponse.json();
      const isPlaylist = isPlaylistData.isPlaylist;

      if (!isPlaylist) {
        const apiUrl = `${backendUrl}/convert?url=${inputFieldData}`;
        const response = await fetch(apiUrl);
        const blob = await response.blob();
        const contentDisposition = response.headers.get("Content-Disposition");
        const filename =
          extractFilename(contentDisposition) || "default_filename"; // Use a default name if filename not found
        initiateDownload(URL.createObjectURL(blob), filename);
      } else {
        console.log("Detected that it's a Playlist URL.");
        const videoUrlsResponse = await fetch(
          `${backendUrl}/getUrls?playlistUrl=${inputFieldData}`
        );
        const videoUrlsData = await videoUrlsResponse.json();
        const videoUrls = videoUrlsData.urls;

        // Process requests and start download for each one as soon as it's fetched
        const downloadPromises = videoUrls.map(async (url) => {
          const apiUrl = `${backendUrl}/convert?url=${url}`;
          const response = await fetch(apiUrl);
          const blob = await response.blob();
          const contentDisposition = response.headers.get(
            "Content-Disposition"
          );
          console.log("Logging Disposition");
          console.log(contentDisposition);
          const filename =
            extractFilename(contentDisposition) || "default_filename"; // Use a default name if filename not found
          initiateDownload(URL.createObjectURL(blob), filename);
        });

        await Promise.all(downloadPromises);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario
    }
  };

  const extractFilename = (contentDisposition) => {
    if (contentDisposition && contentDisposition.indexOf("filename=") !== -1) {
      const match = contentDisposition.match(/filename="(.+?)"/);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };
  const initiateDownload = (downloadUrl, filename) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.setAttribute("download", filename);

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
