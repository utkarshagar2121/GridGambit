import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './Screen/Landing';
import { Game } from './Screen/Game';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen bg-neutral-800'>
          <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
