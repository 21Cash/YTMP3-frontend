import React, { useState } from "react";
import { backendUrl } from "../../constants";
import { json } from "react-router-dom";

const InputBox = () => {
  const [inputFieldData, setInputFieldData] = useState("");
  const [statusText, setStatusText] = useState("");
  const [downloadProgress, setDownloadProgress] = useState("");

  const handleDownloadClick = async () => {
    try {
      setStatusText("Starting Download...");
      const isPlaylistResponse = await fetch(
        `${backendUrl}/isPlaylistUrl?url=${inputFieldData}`
      );
      const isPlaylistData = await isPlaylistResponse.json();
      const isPlaylist = isPlaylistData.isPlaylist;

      if (!isPlaylist) {
        const apiUrl = `${backendUrl}/convert?url=${inputFieldData}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          setStatusText(
            `File Download Failed. Error Info : ${response.status}`
          );
          return;
        }
        setStatusText("Starting Download...");
        const blob = await response.blob();
        const contentDisposition = response.headers.get("Content-Disposition");
        const filename =
          extractFilename(contentDisposition) || "default_filename"; // Use a default name if filename not found

        await initiateDownload(URL.createObjectURL(blob), filename);
      } else {
        setStatusText("Fetching Video Urls From Playlist");
        const videoUrlsResponse = await fetch(
          `${backendUrl}/getUrls?playlistUrl=${inputFieldData}`
        );
        const videoUrlsData = await videoUrlsResponse.json();
        const videoUrls = videoUrlsData.urls;

        setStatusText("Downloading Playlist...");
        setDownloadProgress(`0/${videoUrls.length}`);

        let completedDownloads = 0;

        for (let i = 0; i < videoUrls.length; i++) {
          const url = videoUrls[i];
          try {
            const apiUrl = `${backendUrl}/convert?url=${url}`;
            const response = await fetch(apiUrl);
            const blob = await response.blob();
            const contentDisposition = response.headers.get(
              "Content-Disposition"
            );
            const filename =
              extractFilename(contentDisposition) || "default_filename";

            await initiateDownload(URL.createObjectURL(blob), filename);

            completedDownloads++;
            setDownloadProgress(`${completedDownloads}/${videoUrls.length}`);
          } catch (error) {
            console.error("Error:", error);
            setStatusText("Download Failed");
          }
        }

        setStatusText("All Downloads Completed");
        setDownloadProgress("");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusText("Download Failed");
      // Handle general download failure if required
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

  const initiateDownload = async (downloadUrl, filename) => {
    try {
      setStatusText("Starting Download.... ");
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      if (downloadUrl.includes("Internal-Server-Error")) {
        throw new Error("Download Failed");
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.setAttribute("download", filename);

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setStatusText("Download started.");
    } catch (error) {
      console.error("Error:", error);
      setStatusText("Download Failed");
    }
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
      width: "100%",
      maxWidth: "500px",
      boxSizing: "border-box",
      padding: "20px",
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
    statusText: {
      marginTop: "10px",
      color: "#fff",
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
      <div style={styles.statusText}>{statusText}</div>
      {downloadProgress && (
        <div style={styles.statusText}>Progress: {downloadProgress}</div>
      )}
    </div>
  );
};

export default InputBox;
