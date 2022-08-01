import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { songUrls } from '../../api'
import { setCurrentSong } from '../../redux/action/currentSong'

export default function PlayerCore() {
  const playerRef = useRef(null)

  const { player, playList, currentSong } = useSelector((state) => {
    return state
  })

  const dispatch = useDispatch()

  // 当前播放歌曲链接
  const currentSongUrl = () => {
    return playList[currentSong.index]?.song_url
  }

  // 控制播放器播放/暂停
  const handlePlayerChange = () => {
    const { status, mute } = player

    if (status) {
      playerRef.current.play()
    } else {
      playerRef.current.pause()
    }

    playerRef.current.muted = mute
  }

  // 获取歌曲详情
  const getSongDetail = async () => {
    if (!currentSong.mid) return
    const result = await songUrls({ songmid: currentSong.mid })
  }

  useEffect(() => {
    getSongDetail()
    handlePlayerChange()

    // 监听歌曲可以播放
    playerRef.current.addEventListener('canplay', (e) => {
      // 更新当前歌曲时间
      const { duration } = e.target
      dispatch(setCurrentSong({ duration }))

      // 如果当前为播放状态，直接播放歌曲
      if (player.status) {
        playerRef.current.play()
      }
    })

    const timer = setInterval(() => {
      /** 代优化  */
      const current = playerRef.current.currentTime
      if (player.status) {
        dispatch(setCurrentSong({ current }))
      }
    }, 500)

    return () => clearInterval(timer)
  }, [player])

  return (
    <div>
      <audio ref={playerRef} src={currentSongUrl()}></audio>
    </div>
  )
}
