import React, { useRef, useEffect, useState } from 'react';
 
const CameraComponent = () => {
  const media = navigator.mediaDevices;
 
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState();
  const [stream, setStream] = useState();
  const videoRef = useRef(null);
 
  const getVideoDevices = async () => {
    try {
      const devices = await media.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      setSelectedDevice(videoDevices.length > 0 ? videoDevices[0].deviceId : undefined);
    } catch (error) {
      console.error('Error al enumerar dispositivos:', error);
    }
  };
 
  const getVideoStream = async () => {
    try {
      const selectedDeviceId = selectedDevice || (devices.length > 0 ? devices[0].deviceId : undefined);
      const mediaStream = await media.getUserMedia({ video: { deviceId: selectedDeviceId } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error al obtener el flujo de medios:', error);
    }
  };
 
  useEffect(() => {
    getVideoDevices();
  }, []);
 
  useEffect(() => {
    getVideoStream();
  }, [selectedDevice]);
 
  return (
<>
<div>
        CameraComponent
</div>
<select onChange={(e) => setSelectedDevice(e.target.value)}>
        {devices.map((device) => (
<option key={device.deviceId} value={device.deviceId}>
            {device.label || `Device ${device.deviceId}`}
</option>
        ))}
</select>
<video ref={videoRef} autoPlay playsInline />
</>
  );
};
 
export default CameraComponent;