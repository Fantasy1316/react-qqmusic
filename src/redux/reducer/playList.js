import { ADD_PLAY_LIST, DELETE_PALY_LIST, UPDATE_PLAY_LIST } from '../constance'

// 初始化播放列表
const initState = []

const playList = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_PLAY_LIST:
      return payload

    case DELETE_PALY_LIST:
      return payload

    case UPDATE_PLAY_LIST:
      return payload

    default:
      return state
  }
}

export default playList
