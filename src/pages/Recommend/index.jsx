import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'antd'
import { recommendPlayList, playListAllSongs } from '../../api'
import { updatePlayList } from '../../redux/action/playList'
import { handleUnitTransform } from '../../utils'
import './index.scss'

export default function Recommend() {
	const [orderList, setorderList] = useState([])
	const orderListRef = useRef(null)
	const [orderListScrollCount, setOrderListScrollCount] = useState(0)
	const dispatch = useDispatch()

	// 获取推荐歌单
	const getRecommendPlayList = async () => {
		const result = await recommendPlayList({})
		if (result && result.code === 200) {
			const { result: list = [] } = result
			setorderList(list)
		}
	}

	// 获取歌单详情
	const getPlayListAllSongs = async (id) => {
		const result = await playListAllSongs({ id })
		if (result && result.code === 200) {
			const { songs = [] } = result
			dispatch(updatePlayList(songs))
		}
	}

	// 歌单下一页滚动
	const handleOrderListTurnPage = (type) => {
		if (type === 'prev') {
			if (orderListScrollCount > 0) {
				setOrderListScrollCount(orderListScrollCount - 1)
			}
		} else {
			if (orderListScrollCount < 2) {
				setOrderListScrollCount(orderListScrollCount + 1)
			}
		}
	}

	useEffect(() => {
		if (!orderList.length) {
			getRecommendPlayList()
		}
		orderListRef.current.scrollLeft =
			orderListRef.current.clientWidth * orderListScrollCount
	}, [orderListScrollCount])

	return (
		<div className='recommend'>
			<p className='recommend-title'>推荐</p>
			<div className='recommend-order'>
				<p className='recommend-order--title'>你的歌单补给站</p>
				<div className='recommend-order--list'>
					<i
						className='iconfont icon-arrowleft'
						onClick={() => handleOrderListTurnPage('prev')}
					></i>
					<Row className='list' gutter={[20, 20]} ref={orderListRef}>
						{orderList.map((item) => {
							return (
								<Col className='list-item' span={6} key={item.id}>
									<div className='list-item--cover'>
										<img src={item.picUrl} alt='' />
										<div className='cover-mask'></div>
										<i
											className='iconfont icon-play-filling'
											onClick={() => getPlayListAllSongs(item.id)}
										></i>
										<p className='cover-num'>
											<i className='iconfont icon-18erji-2'></i>
											<span>{handleUnitTransform(item.playCount)}</span>
										</p>
									</div>
									<p className='list-item--title'>{item.name}</p>
								</Col>
							)
						})}
					</Row>
					<i
						className='iconfont icon-arrowright'
						onClick={() => handleOrderListTurnPage('next')}
					></i>
				</div>
			</div>
		</div>
	)
}
