import React, { Suspense } from 'react'
import { Grid, Environment, ContactShadows } from '@react-three/drei'
import Model from './Model'
import Sphere from './Sphere'
import Controls from './Controls'
import { SphereData } from '@/components/three/types'
import ClickHandler from '@/components/three/ClickHandler'

interface SceneProps {
  multiMode: boolean
  singleSphere: SphereData | null
  multiSpheres: SphereData[]
  onUpdateSpherePosition: (position: [number, number, number]) => void
  onAddSphere: (position: [number, number, number]) => void
  modelUrl: string
}

const Scene: React.FC<SceneProps> = ({ multiMode, singleSphere, multiSpheres, onUpdateSpherePosition, onAddSphere, modelUrl = '/models/box.glb' }) => {
  return (
    <Suspense fallback={null}>
      {/* 환경광 */}
      <Environment preset='city' />

      {/* 모델 로드 */}
      <Model url={modelUrl} position={[0, 0, 0]} scale={1} />

      {/* 모드에 따라 다른 구체 렌더링 */}
      {multiMode
        ? // 멀티 모드: 여러 구체 렌더링
          multiSpheres.map((sphere) => <Sphere key={sphere.id} position={sphere.position} color={sphere.color} size={sphere.size} />)
        : // 싱글 모드: 단일 구체 렌더링
          singleSphere && <Sphere position={singleSphere.position} color={singleSphere.color} size={singleSphere.size} />}

      {/* 바닥 격자 */}
      <Grid args={[30, 30]} cellSize={1} cellThickness={1} cellColor='#6f6f6f' sectionSize={5} sectionThickness={1.5} sectionColor='#9d4b4b' fadeDistance={30} fadeStrength={1.5} infiniteGrid />

      {/* 그림자 */}
      <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={20} blur={1.5} far={10} />

      {/* 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

      {/* 카메라 컨트롤 */}
      <Controls />

      {/* 클릭 핸들러 */}
      <ClickHandler multiMode={multiMode} onUpdateSpherePosition={onUpdateSpherePosition} onAddSphere={onAddSphere} />
    </Suspense>
  )
}

export default Scene
