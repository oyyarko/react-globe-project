// src/components/Globe.js
import React, { useRef, useState } from "react";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import Marker, { latLongToVector3 } from "./marker";

const getScreenPosition = (vector, camera, canvas) => {
    const widthHalf = 0.5 * canvas.clientWidth;
    const heightHalf = 0.5 * canvas.clientHeight;
  
    vector.project(camera);
  
    vector.x = (vector.x * widthHalf) + widthHalf;
    vector.y = - (vector.y * heightHalf) + heightHalf;
  
    return {
      x: vector.x,
      y: vector.y
    };
  };

const Globe = ({ popup, setPopup }) => {
  const globeRef = useRef();
  const { camera, gl } = useThree();

//   useFrame(() => {
//     globeRef.current.rotation.y += 0.001; // Rotate globe
//   });

  const markers = [
    { lat: 40.7128, lon: -74.006, label: "New York" },
    { lat: 51.5074, lon: -0.1278, label: "London" },
    { lat: 35.6895, lon: 139.6917, label: "Tokyo" },
    { lat: 28.7041, lon: 77.1025, label: "New Delhi" },
  ];

  const handleMarkerClick = (label, position) => {
    const screenPosition = getScreenPosition(position.clone(), camera, gl.domElement);
    setPopup({ visible: popup.visible ? false : true, label, position: screenPosition });
  };

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} intensity={3} />
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={new THREE.TextureLoader().load("/8k_earth_daymap.jpg")}
          bumpMap={new THREE.TextureLoader().load("/8k_earth_clouds.jpg")}
          bumpScale={0.05}
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            lat={marker.lat}
            lon={marker.lon}
            radius={1}
            onClick={() =>
              handleMarkerClick(
                marker.label,
                latLongToVector3(marker.lat, marker.lon, 1)
              )
            }
          />
        ))}
      </mesh>
      <Stars />
      <OrbitControls enableZoom={true} />
    </>
  );
};

export default Globe;
