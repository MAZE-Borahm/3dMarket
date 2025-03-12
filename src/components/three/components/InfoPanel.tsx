import React from "react"
import { SphereData } from "@/components/three/types"
import styles from "@/components/three/three.module.scss"

interface InfoPanelProps {
  multiMode: boolean
  singleSphere: SphereData | null
  multiSpheres: SphereData[]
  onToggleMode: () => void
  onResetSpheres: () => void
  onRemoveSphere: (id: number) => void
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  multiMode,
  singleSphere,
  multiSpheres,
  onToggleMode,
  onResetSpheres,
  onRemoveSphere,
}) => {
  return (
    <div className={styles["info-panel"]}>
      <h2>3D 좌표 표시기</h2>

      {/* 모드 전환 버튼 */}
      <div className="mode-toggle">
        <button onClick={onToggleMode} className={`mode-button ${multiMode ? "multi" : "single"}`}>
          {multiMode ? "멀티 모드" : "싱글 모드"}
        </button>
        <span className="mode-desc">
          {multiMode ? "여러 개의 구체를 생성할 수 있습니다" : "하나의 구체만 생성할 수 있습니다"}
        </span>
      </div>

      <p>바닥을 클릭하여 {multiMode ? "구체를 추가하거나" : "구체를 이동하고"} 좌표를 확인하세요</p>

      {/* 싱글 모드일 때 좌표 표시 */}
      {!multiMode && (
        <div className={styles.coordinates}>
          <h3>구체 좌표:</h3>
          {singleSphere ? (
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>X:</strong>
                  </td>
                  <td>{singleSphere.position[0]}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Y:</strong>
                  </td>
                  <td>{singleSphere.position[1]}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Z:</strong>
                  </td>
                  <td>{singleSphere.position[2]}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>아직 구체가 생성되지 않았습니다. 바닥을 클릭해보세요.</p>
          )}
        </div>
      )}

      {/* 멀티 모드일 때 좌표 목록 표시 */}
      {multiMode && (
        <div className="coordinates-list">
          <h3>구체 목록 ({multiSpheres.length}개):</h3>
          {multiSpheres.length > 0 ? (
            <div className="spheres-list">
              {multiSpheres.map((sphere) => (
                <div key={sphere.id} className="sphere-item">
                  <div className="sphere-color" style={{ backgroundColor: sphere.color }}></div>
                  <div className="sphere-coords">
                    X: {sphere.position[0]}, Y: {sphere.position[1]}, Z: {sphere.position[2]}
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => onRemoveSphere(sphere.id)}
                    title="제거"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>아직 구체가 없습니다. 바닥을 클릭하여 구체를 추가하세요.</p>
          )}
        </div>
      )}

      {/* 리셋 버튼 */}
      <button className={styles["action-button"]} onClick={onResetSpheres}>
        {multiMode
          ? multiSpheres.length > 0
            ? "모든 구체 제거"
            : "중앙에 구체 추가"
          : singleSphere
          ? "구체 위치 초기화"
          : "구체 생성"}
      </button>
    </div>
  )
}

export default InfoPanel
