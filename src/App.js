import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import Loading from './components/Loading'
import SideBar from './components/SideBar'
import HeadBar from './components/HeadBar'
import MusicPlayer from './components/MusicPlayer'
import PlayerCore from './components/PlayerCore'
import './App.less'

export default function App() {
  const element = useRoutes(routes)

  return (
    <div className='app-container'>
      <div className='app-container--content'>
        <SideBar />
        <div className='view'>
          <div className='view-content'>
            <HeadBar />
            <Suspense fallback={<Loading />}>{element}</Suspense>
            <MusicPlayer />
          </div>
        </div>
      </div>
      <PlayerCore />
    </div>
  )
}
