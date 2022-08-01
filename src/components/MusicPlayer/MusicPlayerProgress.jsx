import React, { useEffect } from 'react'
import './MusicPlayerProgress.scss'

export default function MusicPlayerProgress(props) {
  // 设置进度条
  const progressRate = () => {
    const { current, duration } = props
    const rate = !current || !duration ? 0 : Math.floor((current / duration) * 100)
    return rate
  }

  useEffect(() => {
    progressRate()
  }, [props])

  return (
    <div className='music-player-progress'>
      <div className='wrapper'>
        <div className='wrapper-content' style={{ width: `${progressRate()}%` }}></div>
        <div className='wrapper-indicator' style={{ left: `${progressRate()}%` }}></div>
      </div>
    </div>
  )
}
