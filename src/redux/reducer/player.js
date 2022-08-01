import { SET_PLAYER_STATUS } from '../constance'

// 初始化播放信息
const initState = {
  status: 0, // 播放状态，0:暂停 1:播放
  type: 0, // 播放循环类型 0：随机播放， 1：循环播放， 2：单曲循环
  volume: 0.5, // 播放器音量 0-1
  mute: false // 静音
}

const player = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_PLAYER_STATUS:
      const newState = {
        ...state,
        ...payload
      }
      return newState

    default:
      return state
  }
}

export default player
