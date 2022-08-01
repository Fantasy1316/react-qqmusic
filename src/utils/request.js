import axios from 'axios'
import { message } from 'antd'

const service = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axios 请求拦截器
service.interceptors.response.use((res) => {
  const { result } = res.data

  switch (result) {
    case 100:
      return res.data

    default:
      message.warn('网络拥挤，请稍后再试～')
  }
})

const Requset = (method, url, args) => {
  const data = {
    method,
    url
  }

  if (method === 'get') {
    data.params = args
  } else {
    data.data = args
  }

  return service(data)
}

export default Requset
