import React, { useState } from 'react'
import { Popover, Drawer } from 'antd'
import { useDispatch } from 'react-redux'
import { setPlayerStatus } from '../../redux/action/player'
import { setCurrentSong } from '../../redux/action/currentSong'
import { handleTimestampFormat, handleGetSiner } from '../../utils'
import './MusicPlayerFun.scss'

import defaultCover from '../../assets/images/player-cover.png'

export default function MusicPlayerFun(props) {
	const [playListShow, setPlayListShow] = useState(false)
	const dispatch = useDispatch()

	// 音量控制头部内容
	const volumeTitle = () => {
		return (
			<div className='volume-title'>
				<div className='volume-title--progress'>
					<div className='volume-title--progress_content'></div>
					<div className='volume-title--progress_indicator'></div>
				</div>
				<div className='volume-title--num'>{props.player.volume * 100}%</div>
			</div>
		)
	}

	// 音量控制底部内容
	const volumeContent = () => {
		return (
			<div className='volume-content' onClick={handleSetPlayerMute}>
				{props.player.mute ? (
					<i className='iconfont icon-guanbiyinliang-02'></i>
				) : (
					<i className='iconfont icon-yinliangjian'></i>
				)}
			</div>
		)
	}

	// 控制播放器是否静音
	const handleSetPlayerMute = () => {
		const mute = props.player.mute ? false : true
		dispatch(setPlayerStatus({ mute }))
	}

	// 播放列表
	const renderPlayList = () => {
		return (
			<div className='music-play-list'>
				<div className='list-header'>
					<p className='list-header--title'>播放列表</p>
					<p className='list-header--fun'>
						<span className='list-header--fun_item item-total'>共14首歌曲</span>
						<span className='list-header--fun_item'>
							<i className='iconfont icon-jia'></i> 添加到
						</span>
						<span className='list-header--fun_item'>
							<i className='iconfont icon-shanchu'></i> 清空
						</span>
					</p>
				</div>
				<div className='list-body'>
					{props.playList.map((item, index) => {
						return (
							<div
								className={
									props.currentSong.index === index
										? 'list-body--item list-body--item_current'
										: 'list-body--item'
								}
								onClick={() => handleChangeSong(item.id, index)}
								key={item.id}
							>
								<div className='item-cover'>
									<img src={item.al.picUrl || defaultCover} alt='' />
								</div>
								<div className='item-infos'>
									<p className='item-infos--name'>{item.name}</p>
									<p className='item-infos--singer'>
										{handleGetSiner(item.ar)}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}

	// 切换歌曲
	const handleChangeSong = (mid, index) => {
		dispatch(
			setCurrentSong({
				mid,
				index,
				duration: 0,
				current: 0
			})
		)
		dispatch(setPlayerStatus({ status: 1 }))
	}

	return (
		<div className='music-player-fun'>
			<div className='fun-item fun-item--time'>
				{handleTimestampFormat(props.currentSong.current, 'mm:ss', 's')} /{' '}
				{handleTimestampFormat(props.currentSong.duration, 'mm:ss', 's')}
			</div>
			<div className='fun-item fun-item--volume'>
				<Popover
					placement='top'
					title={volumeTitle}
					content={volumeContent}
					trigger='click'
				>
					{props.player.mute ? (
						<i className='iconfont icon-guanbiyinliang-02'></i>
					) : (
						<i className='iconfont icon-yinliangjian'></i>
					)}
				</Popover>
			</div>
			<div className='fun-item fun-item--lyric'>
				<i className='iconfont icon-cibiaoquanyi'></i>
			</div>
			<div className='fun-item fun-item--list'>
				<i
					className='iconfont icon-24gf-playlistMusic4'
					onClick={() => setPlayListShow(true)}
				></i>
				<span className='list-count'>{props.playList.length}</span>
			</div>

			{/* 播放列表 */}
			<Drawer
				width={280}
				onClose={() => setPlayListShow(false)}
				visible={playListShow}
				getContainer={false}
				closable={false}
				style={{ position: 'absolute' }}
				maskStyle={{ backgroundColor: 'transparent' }}
			>
				{renderPlayList()}
			</Drawer>
		</div>
	)
}
