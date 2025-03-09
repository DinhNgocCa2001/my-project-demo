import React, { useState, useEffect } from "react";
import {QrReader} from "react-qr-reader";

const QRScanner1213 = () => {
  const [facingMode, setFacingMode] = useState("environment"); // "environment" = camera sau, "user" = camera trước
  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [data, setData] = useState("123");

  // Lấy danh sách các thiết bị video (camera)
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === "videoinput");
      setDevices(videoDevices);

      console.log(videoDevices);  // Kiểm tra xem các thiết bị video có được phát hiện không

      // Nếu có các thiết bị camera, đặt camera đầu tiên làm mặc định
      if (videoDevices.length > 0) {
        setCurrentDevice(videoDevices[0].deviceId);
      } else {
        console.error("No video devices found.");
      }
    }).catch(error => {
      console.error("Error enumerating devices:", error);
    });
  }, []);

  // Hàm để chuyển đổi giữa camera trước và sau
  const toggleCamera = () => {
    if (facingMode === "environment") {
      setFacingMode("user"); // Sử dụng camera trước
    } else {
      setFacingMode("environment"); // Sử dụng camera sau
    }
  };
  const handleScanner = (result, error) => {
    console.log("Scanned Data: ", result);
    setData(result);
  }

  return (
    <div>
      <button onClick={toggleCamera}>
        {facingMode === "environment" ? "Switch to Front Camera" : "Switch to Back Camera"}
      </button>

      {/* QR Reader */}
      <QrReader
        delay={1000}
        style={{ width: "100%" }}
        constraints={{
                    facingMode: "environment", // Camera trước hoặc sau
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                }}
        deviceId={currentDevice}
        onResult={handleScanner}
        onError={(err) => {
          console.error("Error reading QR: ", err);
        }}
      />
      <div>
      abc
        {data?.text}
      </div>
    </div>
  );
};

export default QRScanner1213;
