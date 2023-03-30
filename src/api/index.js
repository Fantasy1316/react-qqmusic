import Requset from '../utils/request'

// 为你推荐歌单
export const recommendPlayList = (args) => {
	return Requset('get', '/personalized', args)
}

// 歌单所有歌曲
export const playListAllSongs = (args) => {
	return Requset('get', '/playlist/track/all', args)
}

// 歌曲播放链接
export const songUrl = (args) => {
	return Requset('get', '/song/url', args)
}

// 推荐歌曲
export const recommendNewSongs = (args) => {
	return Requset('get', '/personalized/newsong', args)
}

// 歌单详情
export const songList = (args) => {
	return Requset('get', '/songlist', args)
}

// 电台推荐
export const radioRecommend = (args) => {
	return Requset('get', '/dj/recommend', args)
}

// 电台分类
export const radioCategory = (args) => {
	return Requset('get', '/dj/catelist', args)
}

// 电台详情
export const radioDtail = (args) => {
	return Requset('get', '/dj/recommend/type', args)
}

// 电台歌曲
export const radio = (args) => {
	return Requset('get', '/radio', args)
}
