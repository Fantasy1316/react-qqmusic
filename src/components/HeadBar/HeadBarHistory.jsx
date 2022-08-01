import React from 'react'
import { useNavigate } from 'react-router-dom'

import './HeadBarHistory.scss'

export default function HistoryControl() {
  const navigate = useNavigate()

  // 处理理由前进或后退
  const handleHistory = (type) => {
    navigate(type)
  }
  return (
    <div className='history-control'>
      <i className='iconfont icon-arrowleft' onClick={() => handleHistory(-1)}></i>
      <i className='iconfont icon-arrowright' onClick={() => handleHistory(1)}></i>
    </div>
  )
}
