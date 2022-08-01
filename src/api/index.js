import Requset from '../utils/request'

// 设置cookie
export const userSetCookie = (args) => {
  return Requset('post', '/user/setCookie', args)
}

// 每日推荐歌单
export const recommendDaily = (args) => {
  return Requset('get', '/recommend/daily', args)
}

// 为你推荐歌单
export const recommendPlayList = (args) => {
  return Requset('get', '/recommend/playlist/u', args)
}

// 歌单详情
export const songList = (args) => {
  return Requset('get', '/songlist', args)
}

// 电台分类
export const radioCategory = (args) => {
  return Requset('get', '/radio/category', args)
}

// 电台歌曲
export const radio = (args) => {
  return Requset('get', '/radio', args)
}

// 歌曲详情
export const song = (args) => {
  return Requset('get', '/song', args)
}

// 歌曲播放链接
export const songUrls = (args) => {
  return Requset('post', '/song/urls', args)
}
