import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Recommend = lazy(() => import('../pages/Recommend'))
const MusicShop = lazy(() => import('../pages/MusicShop'))
const Videos = lazy(() => import('../pages/Videos'))
const Radios = lazy(() => import('../pages/Radios'))

const routes = [
  {
    path: '/recommend',
    element: <Recommend />
  },
  {
    path: '/musicshop',
    element: <MusicShop />
  },
  {
    path: '/videos',
    element: <Videos />
  },
  {
    path: '/radios',
    element: <Radios />
  },
  {
    path: '/',
    element: <Navigate to='/recommend' />
  }
]

export default routes
