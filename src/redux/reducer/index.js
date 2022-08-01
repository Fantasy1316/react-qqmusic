import { combineReducers } from 'redux'

import player from './player'
import playList from './playList'
import currentSong from './currentSong'

const reducers = combineReducers({
  player,
  playList,
  currentSong
})

export default reducers
