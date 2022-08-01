import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPlayerStatus } from '../../redux/action/player'
import './MusicPlayerControl.scss'

export default function MusicPlayerControl(props) {
  // 播放循环类型 0：随机播放， 1：循环播放， 2：单曲循环
  const [playType, setPlayType] = useState(0)

  // 渲染循环控制组件
  const renderPlayType = () => {
    if (playType === 0) {
      return <i className='iconfont icon-suiji'></i>
    } else if (playType === 1) {
      return <i className='iconfont icon-24gl-repeat2'></i>
    } else {
      return <i className='iconfont icon-24gl-repeatOnce2'></i>
    }
  }

  // 更改播放循环类别
  const dispatch = useDispatch()
  const handleChangePlayType = () => {
    let type = props.type

    if (type < 2) {
      type += 1
    } else {
      type = 0
    }

    dispatch(setPlayerStatus({ type }))
  }

  // 更改播放状态
  const handleChangePlatStatus = () => {
    const status = props.status ? 0 : 1
    dispatch(setPlayerStatus({ status }))
  }

  useEffect(() => {
    setPlayType(props.type)
  }, [props])

  return (
    <div className='music-player-control'>
      <div className='control-like'>
        <i className='iconfont icon-like1'></i>
      </div>
      <div className='control-core'>
        <i className='iconfont icon-skipprevious'></i>
        <div onClick={handleChangePlatStatus}>{props.status ? <i className='iconfont icon-zanting'></i> : <i className='iconfont icon-play-filling'></i>}</div>
        <i className='iconfont icon-skip-next'></i>
      </div>
      <div className='control-type' onClick={handleChangePlayType}>
        {renderPlayType()}
      </div>
    </div>
  )
}
