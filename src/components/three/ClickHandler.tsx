import React, { useEffect, useCallback } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ClickHandlerProps {
  multiMode: boolean
  onUpdateSpherePosition: (position: [number, number, number]) => void
  onAddSphere: (position: [number, number, number]) => void
}

const ClickHandler: React.FC<ClickHandlerProps> = ({ multiMode, onUpdateSpherePosition, onAddSphere }) => {
  const { camera, raycaster, pointer, gl } = useThree()

  const handleClick = useCallback(() => {
    // 레이캐스팅으로 클릭한 위치 계산
    raycaster.setFromCamera(pointer, camera)

    // 지면과의 교차 확인
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0) // y=0 평면
    const intersectPoint = new THREE.Vector3()

    raycaster.ray.intersectPlane(floorPlane, intersectPoint)

    // 구체 위치 업데이트
    if (intersectPoint) {
      const position: [number, number, number] = [parseFloat(intersectPoint.x.toFixed(3)), parseFloat(intersectPoint.y.toFixed(3)), parseFloat(intersectPoint.z.toFixed(3))]

      console.log(`클릭 위치: (${position.join(', ')})`)

      // 모드에 따라 다른 함수 호출
      if (multiMode) {
        onAddSphere(position)
      } else {
        onUpdateSpherePosition(position)
      }
    }
  }, [camera, pointer, raycaster, multiMode, onUpdateSpherePosition, onAddSphere])

  // 캔버스에 클릭 이벤트 리스너 추가
  useEffect(() => {
    const canvas = gl.domElement
    canvas.addEventListener('click', handleClick)

    // 클린업 함수
    return () => {
      canvas.removeEventListener('click', handleClick)
    }
  }, [gl, handleClick])

  return null
}

export default ClickHandler
