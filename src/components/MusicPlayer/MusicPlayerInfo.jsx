import React, { useEffect } from 'react'
import { handleGetSiner } from '../../utils'
import './MusicPlayerInfo.scss'

import defaultCover from '../../assets/images/player-cover.png'

export default function MusicPlayerInfo(props) {
  // 当前播放歌曲信息
  const currentSongInfo = () => {
    const {
      playList,
      currentSong: { index }
    } = props

    return playList.length ? playList[index] : { songname: ' QQ音乐-听我想听', singer: [{ name: '当前暂无可播放歌曲' }] }
  }

  useEffect(() => {
    currentSongInfo()
  }, [props])

  return (
    <div className='music-player-info'>
      <div className='info-cover'>
        <img src={currentSongInfo().song_cover || defaultCover} alt='' />
      </div>
      <div className='info-detail'>
        <p className='info-detail--title'>{currentSongInfo().songname}</p>
        <p className='info-detail--singer'>{handleGetSiner(currentSongInfo().singer)}</p>
      </div>
    </div>
  )
}
