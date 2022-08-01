import { ADD_PLAY_LIST, DELETE_PALY_LIST, UPDATE_PLAY_LIST } from '../constance'

// 更新歌单
export const updatePlayList = (payload) => ({ type: UPDATE_PLAY_LIST, payload })
