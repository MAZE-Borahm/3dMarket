import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import styles from '@/components/three/three.module.scss'
import { SphereData } from '@/components/three/types'
import InfoPanel from '@/components/three/components/InfoPanel'
import Scene from '@/components/three/components/Scene'

const ThreeApp: React.FC = () => {
  // 모드 상태 관리 (true: 멀티 모드, false: 싱글 모드)
  const [multiMode, setMultiMode] = useState<boolean>(true)

  // 싱글 모드 구체 상태
  const [singleSphere, setSingleSphere] = useState<SphereData | null>(null)

  // 멀티 모드 구체 상태
  const [multiSpheres, setMultiSpheres] = useState<SphereData[]>([])

  // 모드 전환 함수
  const toggleMode = useCallback(() => {
    setMultiMode((prev) => !prev)
  }, [])

  // 싱글 모드: 구체 위치 업데이트 함수
  const updateSpherePosition = useCallback(
    (position: [number, number, number]) => {
      // 이미 구체가 있으면 위치만 업데이트
      if (singleSphere) {
        setSingleSphere((prev) =>
          prev
            ? {
                ...prev,
                position,
              }
            : {
                id: Date.now(),
                position,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                size: 0.1,
              }
        )
        console.log(`구체 위치 업데이트: (${position.join(', ')})`)
      }
      // 구체가 없으면 새로 생성
      else {
        setSingleSphere({
          id: Date.now(),
          position,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          size: 0.1,
        })
        console.log(`구체 생성됨: 위치 (${position.join(', ')})`)
      }
    },
    [singleSphere]
  )

  // 멀티 모드: 구체 추가 함수
  const addSphere = useCallback((position: [number, number, number]) => {
    const newSphere: SphereData = {
      id: Date.now(),
      position,
      color: 'blue',
      // color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      // size: Math.random() * 0.2 + 0.2,
      size: 0.2,
    }

    setMultiSpheres((prev) => [...prev, newSphere])
    console.log(`새 구체 추가됨: ID ${newSphere.id}, 위치 (${position.join(', ')})`)
  }, [])

  // 멀티 모드: 구체 제거 함수
  const removeSphere = useCallback((id: number) => {
    setMultiSpheres((prev) => prev.filter((sphere) => sphere.id !== id))
    console.log(`구체 제거됨: ID ${id}`)
  }, [])

  // 리셋 함수
  const resetSpheres = useCallback(() => {
    if (multiMode) {
      // 멀티 모드에서는 모든 구체 제거 또는 중앙에 하나 추가
      if (multiSpheres.length > 0) {
        setMultiSpheres([])
        console.log('모든 구체 제거됨')
      } else {
        addSphere([0, 0.15, 0])
      }
    } else {
      // 싱글 모드에서는 구체 위치 초기화 또는 생성
      if (singleSphere) {
        setSingleSphere({
          ...singleSphere,
          position: [0, 0.15, 0],
        })
        console.log('구체 위치 초기화됨')
      } else {
        setSingleSphere({
          id: Date.now(),
          position: [0, 0.15, 0],
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          size: 0.3,
        })
        console.log('기본 구체 생성됨')
      }
    }
  }, [multiMode, multiSpheres.length, singleSphere, addSphere])

  return (
    <div className={styles['app-container']}>
      {/* 정보 패널 */}
      <InfoPanel multiMode={multiMode} singleSphere={singleSphere} multiSpheres={multiSpheres} onToggleMode={toggleMode} onResetSpheres={resetSpheres} onRemoveSphere={removeSphere} />

      {/* Three.js 캔버스 */}
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }} className={styles.canvas}>
        <Scene
          multiMode={multiMode}
          singleSphere={singleSphere}
          multiSpheres={multiSpheres}
          onUpdateSpherePosition={updateSpherePosition}
          onAddSphere={addSphere}
          modelUrl='/models/acceptCoffee.glb'
        />
      </Canvas>
    </div>
  )
}

export default ThreeApp
