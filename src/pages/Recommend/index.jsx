import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'antd'
import { recommendPlayList, songList } from '../../api'
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
    if (result) {
      const { list = [] } = result.data
      setorderList(list)
    }
  }

  // 获取歌单详情
  const getSongList = async (id) => {
    const result = await songList({ id })
    if (result) {
      const { songlist = [] } = result.data
      dispatch(updatePlayList(songlist))
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
    orderListRef.current.scrollLeft = orderListRef.current.clientWidth * orderListScrollCount
  }, [orderListScrollCount])

  return (
    <div className='recommend'>
      <p className='recommend-title'>推荐</p>
      <div className='recommend-order'>
        <p className='recommend-order--title'>你的歌单补给站</p>
        <div className='recommend-order--list'>
          <i className='iconfont icon-arrowleft' onClick={() => handleOrderListTurnPage('prev')}></i>
          <Row className='list' gutter={[20, 20]} ref={orderListRef}>
            {orderList.map((item) => {
              return (
                <Col className='list-item' span={6} key={item.content_id}>
                  <div className='list-item--cover'>
                    <img src={item.cover} alt='' />
                    <div className='cover-mask'></div>
                    <i className='iconfont icon-play-filling' onClick={() => getSongList(item.content_id)}></i>
                    <p className='cover-num'>
                      <i className='iconfont icon-18erji-2'></i>
                      <span>{handleUnitTransform(item.listen_num)}</span>
                    </p>
                  </div>
                  <p className='list-item--title'>{item.title}</p>
                </Col>
              )
            })}
          </Row>
          <i className='iconfont icon-arrowright' onClick={() => handleOrderListTurnPage('next')}></i>
        </div>
      </div>
    </div>
  )
}
