import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { songUrl } from '../../api'
import { setCurrentSong } from '../../redux/action/currentSong'

export default function PlayerCore() {
	const [currentSongUrl, setCurrentSongUrl] = useState('')
	const playerRef = useRef(null)
	const { player, playList, currentSong } = useSelector((state) => state)
	const dispatch = useDispatch()

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
	const getSongUrl = async () => {
		if (!currentSong.mid) return
		const result = await songUrl({ id: currentSong.mid })

		if (result && result.code === 200) {
			const { data = [] } = result
			const url = data[0]?.url
			console.log(data[0])
			setCurrentSongUrl(url)
		}
	}

	useEffect(() => {
		getSongUrl()
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
			/** 待优化  */
			const current = playerRef.current.currentTime
			if (player.status) {
				dispatch(setCurrentSong({ current }))
			}
		}, 500)

		return () => clearInterval(timer)
	}, [player])

	return (
		<div>
			{/* <audio ref={playerRef} controls src={currentSongUrl}></audio> */}
			<audio ref={playerRef}>
				<source src={currentSongUrl} type='audio/ogg' />
				<source src={currentSongUrl} type='audio/mpeg' />
				Your browser does not support the audio element.
			</audio>
		</div>
	)
}
