// src/components/three/Sphere.tsx
import React from "react"
import { SphereProps } from "@/components/three/types"

const Sphere: React.FC<SphereProps> = ({ position, color = "hotpink", size = 0.2 }) => {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
    </mesh>
  )
}

export default Sphere
