import React from 'react'
import { useSelector } from 'react-redux'
import MusicPlayerControl from './MusicPlayerControl'
import MusicPlayerInfo from './MusicPlayerInfo'
import MusicPlayerProgress from './MusicPlayerProgress'
import MusicPlayerFun from './MusicPlayerFun'
import './index.scss'

export default function MusicPlayer() {
  const { player, currentSong, playList } = useSelector((state) => state)

  return (
    <div className='music-player'>
      <MusicPlayerProgress {...currentSong} />
      <div className='music-player--content'>
        <div className='content-item content-item--left'>
          <MusicPlayerInfo currentSong={currentSong} playList={playList} />
        </div>
        <div className='content-item content-item--middle'>
          <MusicPlayerControl status={player.status} type={player.type} />
        </div>
        <div className='content-item content-right'>
          <MusicPlayerFun player={player} currentSong={currentSong} playList={playList} />
        </div>
      </div>
    </div>
  )
}
