// src/components/Marker.js
import React from 'react';
import * as THREE from 'three';

const Marker = ({ lat, lon, radius, onClick }) => {
  const position = latLongToVector3(lat, lon, radius);
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.01, 10, 10]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export const latLongToVector3 = (lat, lon, radius, height = 0) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius + height) * Math.sin(phi) * Math.cos(theta);
  const y = (radius + height) * Math.cos(phi);
  const z = (radius + height) * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

export default Marker;