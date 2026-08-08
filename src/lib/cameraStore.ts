/**
 * 跨页面挂载的相机记忆：
 * 进入详情页前地图卸载，返回时恢复视角（并从节点拉回全景）。
 */

export interface CameraState {
  x: number
  y: number
  zoom: number
}

export const cameraStore: {
  cam: CameraState | null
  /** 是否已穿过 Hero 进入探索模式 */
  entered: boolean
  /** 最近一次点击进入详情的节点，用于返回时短暂高亮 */
  lastFocusId: string | null
} = {
  cam: null,
  entered: false,
  lastFocusId: null,
}
