// src/components/three/Model.tsx
import React, { useRef, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { ModelInfo } from "@/components/three/types"

interface ModelProps {
  url: string
  position?: [number, number, number]
  scale?: number
  onLoad?: (info: ModelInfo) => void
}

const Model: React.FC<ModelProps> = ({ url, position = [0, 0, 0], scale = 1, onLoad }) => {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  // 모델을 그리드 위에 정확히 배치하는 함수
  useEffect(() => {
    if (!modelRef.current) return

    try {
      // 원본 위치 저장
      const originalPosition = new THREE.Vector3().copy(modelRef.current.position)

      // 바운딩 박스 계산을 위해 일시적으로 모델 위치 초기화
      modelRef.current.position.set(0, 0, 0)

      // 정확한 바운딩 박스 계산
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const size = new THREE.Vector3()
      box.getSize(size)

      // 하단 Y값 계산
      const bottomY = box.min.y

      // 디버깅 정보
      console.log("모델 초기화 위치 Y:", modelRef.current.position.y)
      console.log("바운딩 박스 min:", box.min)
      console.log("바운딩 박스 max:", box.max)
      console.log("모델 크기:", size)
      console.log("바닥 Y값:", bottomY)

      // 모델 위치 복원
      modelRef.current.position.copy(originalPosition)

      // *** 핵심 수정 부분 ***
      // 모델 바닥이 정확히 그리드(y=0) 위에 오도록 계산
      // 기본 위치(position[1])에 바닥 오프셋(-bottomY)을 더함
      const yPosition = position[1] - bottomY

      // 최종 위치 설정
      modelRef.current.position.set(
        position[0],
        yPosition, // 수정된 Y 위치
        position[2]
      )

      console.log("최종 위치 Y:", yPosition)
      console.log(`모델이 그리드 위에 배치됨: ${-bottomY.toFixed(4)} 단위 올림`)

      // 모델 로드 완료 콜백
      if (onLoad) {
        onLoad({
          size,
          offsetY: -bottomY,
          boundingBox: box,
        })
      }
    } catch (error) {
      console.error("모델 위치 조정 중 오류:", error)
    }
  }, [scene, position, onLoad])

  // 모델 렌더링
  return (
    <primitive
      ref={modelRef}
      object={scene}
      // 초기 위치 설정은 position 사용
      // (useEffect에서 정확한 위치 다시 계산)
      position={position}
      scale={scale}
      dispose={null}
    />
  )
}

export default Model
