import React from 'react'
import HeadBarHistory from './HeadBarHistory'
import HeadBarSearch from './HeadBarSearch'
import './index.scss'

export default function HeadBar() {
  return (
    <div className='headbar'>
      <HeadBarHistory />
      <HeadBarSearch />
    </div>
  )
}
