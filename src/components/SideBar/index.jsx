import React from 'react'
import { NavLink } from 'react-router-dom'
import SideBarControl from './SideBarControl'
import './index.scss'

import QQMusicLogo from '../../assets/images/QQMusic-logo.png'

export default function SideBar() {
  const computedNavLinkClassName = ({ isActive }) => {
    return isActive ? 'item-list--link item-list--link_active' : 'item-list--link'
  }
  return (
    <div className='sidebar'>
      <SideBarControl />
      <div className='sidebar-logo'>
        <img src={QQMusicLogo} alt='' />
      </div>
      <div className='sidebar-nav'>
        <div className='sidebar-nav--item'>
          <p className='item-title'>在线音乐</p>
          <ul className='item-list'>
            <NavLink className={computedNavLinkClassName} to='/recommend'>
              <i className='iconfont icon-recommend'></i>
              <span>推荐</span>
            </NavLink>
            <NavLink className={computedNavLinkClassName} to='/musicshop'>
              <i className='iconfont icon-yinle'></i>
              <span>音乐馆</span>
            </NavLink>
            <NavLink className={computedNavLinkClassName} to='/videos'>
              <i className='iconfont icon-shipin'></i>
              <span>视频</span>
            </NavLink>
            <NavLink className={computedNavLinkClassName} to='/radios'>
              <i className='iconfont icon-diantai'></i>
              <span>电台</span>
            </NavLink>
          </ul>
        </div>

        <div className='sidebar-nav--item'>
          <p className='item-title'>我的音乐</p>
          <ul className='item-list'>
            <li className='item-list--link'>
              <i className='iconfont icon-like'></i>
              <span>我喜欢</span>
            </li>
            <li className='item-list--link'>
              <i className='iconfont icon-diannao'></i>
              <span>本地歌曲</span>
            </li>
            <li className='item-list--link'>
              <i className='iconfont icon-xiazai'></i>
              <span>下载歌曲</span>
            </li>
            <li className='item-list--link'>
              <i className='iconfont icon-shijian'></i>
              <span>最近播放</span>
            </li>
            <li className='item-list--link'>
              <i className='iconfont icon-zhengque'></i>
              <span>已购音乐</span>
            </li>
            <li className='item-list--link'>
              <i className='iconfont icon-yinle'></i>
              <span>微云音乐网盘</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
