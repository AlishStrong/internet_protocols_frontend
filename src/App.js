import React from 'react'
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom'
import Notifications from './components/Notifications'
import Landing from './pages/Landing'
import ReuqestToJoin from './pages/RequestToJoin'
import WhiteboardPage from './pages/WhiteboardPage'

const App = () => {
  return (
    <Router>
      <Notifications />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='whiteboard/:whiteboardId' element={<WhiteboardPage />} />
        <Route path='whiteboard/:whiteboardId/join' element={<ReuqestToJoin />} />
      </Routes>
    </Router>
  )
}

export default App
