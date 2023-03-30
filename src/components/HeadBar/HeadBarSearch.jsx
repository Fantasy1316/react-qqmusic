import React from 'react'
import './HeadBarSearch.scss'

export default function Search() {
	return (
		<div className='search'>
			<i className='iconfont icon-sousuo'></i>
			<input className='search-input' type='text' placeholder='搜索音乐' />
		</div>
	)
}
