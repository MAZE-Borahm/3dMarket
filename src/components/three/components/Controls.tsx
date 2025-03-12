import React from 'react'
import { OrbitControls } from '@react-three/drei'

interface ControlsProps {
  minDistance?: number
  maxDistance?: number
}

const Controls: React.FC<ControlsProps> = ({ minDistance = 2, maxDistance = 30 }) => {
  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.05}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2 - 0.1} // 조금 바닥 아래로 제한
    />
  )
}

export default Controls
