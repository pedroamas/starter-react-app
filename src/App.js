import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Chess from "./pages/Chess"
import Minesweeper from "./pages/Minesweeper"
import Snake from "./pages/Snake"
import FreeCell from "./pages/FreeCell"
import Player from "./pages/Player"
import Streaming from "./pages/Streaming"
import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/Footer'

function App(props) {
  
  return (
     <Router>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chess" element={<Chess />} />
          <Route path="/minesweeper" element={<Minesweeper />} />
          <Route path="/snake" element={<Snake />} />

          </Routes>
          <div className="push"></div>
        <Footer/>
        
      </Router> 
      
      
  );

}
export default App;