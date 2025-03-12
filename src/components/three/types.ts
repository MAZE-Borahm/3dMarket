import * as THREE from "three"

export interface SphereData {
  id: number
  position: [number, number, number]
  color: string
  size: number
}

export interface ModelInfo {
  size: THREE.Vector3
  offsetY: number
  boundingBox: THREE.Box3
}

export interface SphereProps {
  position: [number, number, number]
  color?: string
  size?: number
}

export interface ClickHandlerProps {
  onAddSphere: (position: [number, number, number]) => void
}

export interface SphereData {
  id: number // ID 추가 (멀티 모드용)
  position: [number, number, number]
  color: string
  size: number
}

export interface ModelInfo {
  size: THREE.Vector3
  offsetY: number
  boundingBox: THREE.Box3
}
