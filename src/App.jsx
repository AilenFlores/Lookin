import { useState } from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from './Paginas/Inicio/Inicio'
import './App.css'

function App() {
  return (
    <div className="App">
       <Inicio />
      </div>
      //   <BrowserRouter>
      //   <Routes>
      //     <Route element={<Inicio />} path={ROUTES.inicio} />
      //     <Route element={<Favoritos />} path={ROUTES.inicio} />
      //   </Routes>
      // </BrowserRouter>
  )
}

export default App
