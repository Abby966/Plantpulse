import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "environment",
};

const CameraScan = ({ onPredict }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
    onPredict(image, "camera"); // Pass base64 image to backend
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Live Scan Using Camera</h2>
      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={videoConstraints}
      />
      <br />
      <button onClick={capture} style={{ marginTop: "10px", padding: "10px 20px" }}>
        Scan Plant
      </button>
      {imageSrc && <img src={imageSrc} alt="Captured" style={{ marginTop: "10px", width: "200px" }} />}
    </div>
  );
};

export default CameraScan;
