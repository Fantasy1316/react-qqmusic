import React, { useState } from 'react'
import { userSetCookie } from '../../api'
import './HeadBarSearch.scss'

export default function Search() {
  const [userCookie, setUserCookie] = useState('')

  const handleSetCookie = async () => {
    const result = await userSetCookie({ data: userCookie })

    console.log(result)
  }

  const handleInputChange = (e) => {
    setUserCookie(e.target.value)
  }

  return (
    <div className='search'>
      <i className='iconfont icon-sousuo' onClick={() => handleSetCookie()}></i>
      <input className='search-input' type='text' placeholder='搜索音乐' onChange={(e) => handleInputChange(e)} />
    </div>
  )
}
