import { SET_CURRENT_SONG } from '../constance'

const initState = {
  mid: null,
  index: 0,
  current: 0,
  duration: 0
}

const currentSong = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_CURRENT_SONG:
      const newState = {
        ...state,
        ...payload
      }
      return newState

    default:
      return state
  }
}

export default currentSong
