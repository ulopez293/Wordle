import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import Score from './pages/Score/Score'
import { Provider } from 'jotai'

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
