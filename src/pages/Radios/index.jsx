import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { radioRecommend, radioCategory, radioDtail, radio } from '../../api'
import './index.scss'

export default function Radios() {
	const [rid, setRid] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)
	const [radioCate, setRadioCate] = useState([])
	const [radioRecommendCate, setRadiorecommendCate] = useState([])
	const [redioCateRecommend, setRedioCateRecommend] = useState([])

	// 获取电台推荐
	const getRadioCommend = async () => {
		const result = await radioRecommend({})

		if (result && result.code === 200) {
			const { djRadios: list = [] } = result
			setRadiorecommendCate(list)
		}
	}

	// 获取电台分类
	const getRadioCategary = async () => {
		const result = await radioCategory({})
		if (result && result.code === 200) {
			const { categories: list = [] } = result
			setRadioCate(list.slice(0, 10))

			const rid = list[0]?.id
			setRid(rid)
		}
	}

	// 获取电台详情
	const getRadioDetail = async () => {
		if (!rid) return
		const result = await radioDtail({
			type: rid
		})

		if (result && result.code === 200) {
			const { djRadios = [] } = result
			setRedioCateRecommend(djRadios)
		}
	}

	// 切换分类
	const handleChangeCate = (index) => {
		setActiveIndex(index)
		const type = radioCate[index].id
		setRid(type)
	}

	// 获取电台歌曲
	const getRadio = async (id) => {
		const result = await radio({ id })

		if (result) {
			// TODO
		}
	}

	// 切换推荐分类
	const handleChangeRecommendCate = (type) => {
		if (type === 'prev') {
			const res = radioRecommendCate.splice(radioRecommendCate.length - 1, 1)
			setRadiorecommendCate([...res, ...radioRecommendCate])
		} else {
			const res = radioRecommendCate.splice(0, 1)
			setRadiorecommendCate([...radioRecommendCate, ...res])
		}
	}

	useEffect(() => {
		getRadioCommend()
		getRadioCategary()
	}, [])

	useEffect(() => {
		getRadioDetail()
	}, [rid])

	return (
		<div className='radios'>
			<div className='radios-header'>
				<p className='radios-header--title'>上午好，让我们开启放松模式</p>
				<div className='radios-header--recommend'>
					<i
						className='iconfont icon-arrowleft'
						onClick={() => handleChangeRecommendCate('prev')}
					></i>
					<div className='recommend'>
						{radioRecommendCate.map((item, index) => {
							return (
								<div
									className='recommend-item'
									key={item.id}
									style={index >= 5 ? { display: 'none' } : {}}
									onClick={() => getRadio(item.id)}
								>
									<div className='recommend-item--pic'>
										<i className='iconfont icon-playfill'></i>
										<img src={item.picUrl} alt='' />
									</div>
									<p className='recommend-item--title'>{item.category}</p>
								</div>
							)
						})}
					</div>
					<i
						className='iconfont icon-arrowright'
						onClick={() => handleChangeRecommendCate('next')}
					></i>
				</div>
			</div>

			<div className='radios-all'>
				<p className='radios-all--title'>全部分类</p>
				<div className='radios-all--tabs'>
					{radioCate.map((item, index) => {
						return (
							<div
								className={
									activeIndex === index
										? 'tabs-item tabs-item_active'
										: 'tabs-item'
								}
								key={item.id}
								onClick={() => handleChangeCate(index)}
							>
								<p className='tabs-item--title'>{item.name}</p>
								<i className='iconfont icon-dian'></i>
							</div>
						)
					})}
				</div>
				<Row className='radios-all--list' gutter={[20, 24]}>
					{redioCateRecommend.map((item) => {
						return (
							<Col key={item.id} onClick={() => getRadio(item.id)}>
								<div className='list-item--cover'>
									<i className='iconfont icon-playfill'></i>
									<img src={item.picUrl} alt='' />
								</div>
								<p className='list-item--title'>{item.name}</p>
							</Col>
						)
					})}
				</Row>
			</div>
		</div>
	)
}
