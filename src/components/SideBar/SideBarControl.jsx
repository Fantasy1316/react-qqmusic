import React from 'react'
import './SideBarControl.scss'

export default function WindowControl() {
  return (
    <div className='window-control'>
      <div className='window-control--item window-control--item_close'>
        <i className='iconfont icon-close'></i>
      </div>
      <div className='window-control--item window-control--item_minimize'>
        <i className='iconfont icon-minimize'></i>
      </div>
      <div className='window-control--item window-control--item_maximize'>
        <i className='iconfont icon-max'></i>
      </div>
    </div>
  )
}
