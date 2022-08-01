import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { radioCategory, radio } from '../../api'
import './index.scss'

export default function Radios() {
  const [radioCate, setRadioCate] = useState([])
  const [radioRecommendCate, setRadiorecommendCate] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  // 获取电台分类
  const getRadioCategary = async () => {
    const result = await radioCategory({})
    if (result) {
      const list = result.data || []
      const recommendList = []
      list.forEach((item) => {
        const { title, list } = item
        if (title !== '最近') {
          recommendList.push(list[2])
        }
      })
      setRadiorecommendCate(recommendList)
      setRadioCate(list)
    }
  }

  // 切换分类
  const handleChangeCate = (index) => {
    setActiveIndex(index)
  }

  // 当前分类数据列表
  const currentCateList = () => {
    return radioCate[activeIndex] ? radioCate[activeIndex].list : []
  }

  // 获取电台歌曲
  const getRadio = async (id) => {
    const result = await radio({ id })

    if (result) {
      console.log(result)
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
    getRadioCategary()
  }, [])

  return (
    <div className='radios'>
      <div className='radios-header'>
        <p className='radios-header--title'>上午好，让我们开启放松模式</p>
        <div className='radios-header--recommend'>
          <i className='iconfont icon-arrowleft' onClick={() => handleChangeRecommendCate('prev')}></i>
          <div className='recommend'>
            {radioRecommendCate.map((item, index) => {
              return (
                <div className='recommend-item' key={item.id} style={index >= 5 ? { display: 'none' } : {}} onClick={() => getRadio(item.id)}>
                  <div className='recommend-item--pic'>
                    <i className='iconfont icon-playfill'></i>
                    <img src={item.pic_url} alt='' />
                  </div>
                  <p className='recommend-item--title'>{item.title}</p>
                </div>
              )
            })}
          </div>
          <i className='iconfont icon-arrowright' onClick={() => handleChangeRecommendCate('next')}></i>
        </div>
      </div>

      <div className='radios-all'>
        <p className='radios-all--title'>全部分类</p>
        <div className='radios-all--tabs'>
          {radioCate.map((item, index) => {
            return (
              <div className={activeIndex === index ? 'tabs-item tabs-item_active' : 'tabs-item'} key={item.id} onClick={() => handleChangeCate(index)}>
                <p className='tabs-item--title'>{item.title}</p>
                <i className='iconfont icon-dian'></i>
              </div>
            )
          })}
        </div>
        <Row className='radios-all--list' gutter={[20, 24]}>
          {currentCateList().map((item) => {
            return (
              <Col key={item.id} onClick={() => getRadio(item.id)}>
                <div className='list-item--cover'>
                  <i className='iconfont icon-playfill'></i>
                  <img src={item.pic_url} alt='' />
                </div>
                <p className='list-item--title'>{item.title}</p>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}
