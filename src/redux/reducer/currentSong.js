import { SET_CURRENT_SONG } from '../constance'

const initState = {
	mid: null, // 歌曲ID
	index: 0, // 在当前歌单index
	current: 0, // 当前播放时长
	duration: 0 // 歌曲总时长
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
