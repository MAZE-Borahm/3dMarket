import React, { useRef, useState, useEffect } from 'react'
import { useThree, ThreeEvent } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { SphereData } from '@/components/three/types'

interface DraggableSphereProps {
  sphere: SphereData
  onPositionUpdate: (id: number, newPosition: [number, number, number]) => void
  selected: boolean
  onSelect: (id: number) => void
}

const DraggableSphere: React.FC<DraggableSphereProps> = ({ sphere, onPositionUpdate, selected, onSelect }) => {
  const { id, position, color, size } = sphere
  const { camera, raycaster, gl } = useThree()

  const sphereRef = useRef<THREE.Mesh>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<[number, number, number]>(position)
  const [showCoordinates, setShowCoordinates] = useState(false)

  // 드래그 로직을 위한 상태 변수들
  const dragPlane = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0))
  const dragOffset = useRef<THREE.Vector3>(new THREE.Vector3())

  // 구체 선택
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation() // 이벤트 버블링 방지
    onSelect(id)
  }

  // 드래그 시작
  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()

    if (!sphereRef.current) return

    setIsDragging(true)
    setShowCoordinates(true)

    // 화면 좌표를 정규화된 디바이스 좌표로 변환
    const normalizedPoint = new THREE.Vector2((e.nativeEvent.clientX / window.innerWidth) * 2 - 1, -(e.nativeEvent.clientY / window.innerHeight) * 2 + 1)

    // 마우스 위치에서 레이 생성
    raycaster.setFromCamera(normalizedPoint, camera)

    const intersectPoint = new THREE.Vector3()

    // 구체와 평면 사이의 교차점 찾기
    raycaster.ray.intersectPlane(dragPlane.current, intersectPoint)

    // 구체 위치와 교차점 사이의 오프셋 계산
    dragOffset.current.copy(sphereRef.current.position).sub(intersectPoint)

    // 마우스 캡처
    gl.domElement.setPointerCapture(e.pointerId)

    // 이벤트 리스너 등록
    gl.domElement.addEventListener('pointermove', handlePointerMove)
    gl.domElement.addEventListener('pointerup', handlePointerUp)
  }

  // 드래그 중
  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || !sphereRef.current) return

    // 화면 좌표를 정규화된 디바이스 좌표로 변환
    const normalizedPoint = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)

    // 레이캐스팅
    raycaster.setFromCamera(normalizedPoint, camera)

    // 평면과의 교차점 구하기
    const intersectPoint = new THREE.Vector3()
    raycaster.ray.intersectPlane(dragPlane.current, intersectPoint)

    // 오프셋 적용하여 구체 위치 업데이트
    intersectPoint.add(dragOffset.current)

    // Y 값 고정 (지면 위에서만 이동)
    intersectPoint.y = position[1]

    // 구체 위치 업데이트
    sphereRef.current.position.copy(intersectPoint)

    // 현재 위치 상태 업데이트 (좌표 표시용)
    setCurrentPosition([parseFloat(intersectPoint.x.toFixed(3)), parseFloat(intersectPoint.y.toFixed(3)), parseFloat(intersectPoint.z.toFixed(3))])
  }

  // 드래그 종료
  const handlePointerUp = (e: PointerEvent) => {
    if (!isDragging || !sphereRef.current) return

    setIsDragging(false)

    // 일정 시간 후 좌표 표시 숨기기
    setTimeout(() => {
      if (!selected) {
        setShowCoordinates(false)
      }
    }, 1500)

    // 마우스 캡처 해제
    gl.domElement.releasePointerCapture(e.pointerId)

    // 최종 위치 업데이트
    const finalPosition: [number, number, number] = [
      parseFloat(sphereRef.current.position.x.toFixed(3)),
      parseFloat(sphereRef.current.position.y.toFixed(3)),
      parseFloat(sphereRef.current.position.z.toFixed(3)),
    ]

    // 부모 컴포넌트에 위치 업데이트 알림
    onPositionUpdate(id, finalPosition)

    // 이벤트 리스너 제거
    gl.domElement.removeEventListener('pointermove', handlePointerMove)
    gl.domElement.removeEventListener('pointerup', handlePointerUp)
  }

  // 포인터가 구체에 올라갔을 때
  const handlePointerOver = () => {
    setShowCoordinates(true)
    document.body.style.cursor = 'grab'
  }

  // 포인터가 구체에서 벗어났을 때
  const handlePointerOut = () => {
    if (!isDragging && !selected) {
      setShowCoordinates(false)
    }
    document.body.style.cursor = 'auto'
  }

  // 선택 상태가 변경되면 좌표 표시 상태도 업데이트
  useEffect(() => {
    setShowCoordinates(selected || isDragging)
  }, [selected, isDragging])

  // 클린업
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto'
      gl.domElement.removeEventListener('pointermove', handlePointerMove)
      gl.domElement.removeEventListener('pointerup', handlePointerUp)
    }
  }, [gl])

  return (
    <mesh ref={sphereRef} position={position} onClick={handleClick} onPointerDown={handlePointerDown} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={selected ? color : undefined} emissiveIntensity={selected ? 0.5 : 0} wireframe={isDragging} />

      {/* 좌표 표시 */}
      {showCoordinates && (
        <Html
          position={[0, size * 1.5, 0]}
          center
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          X: {currentPosition[0]} Y: {currentPosition[1]} Z: {currentPosition[2]}
        </Html>
      )}
    </mesh>
  )
}

export default DraggableSphere
