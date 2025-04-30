import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './const/routes';

import Inicio from './Paginas/Inicio/Inicio';

import Peliculas from './Paginas/Peliculas/Peliculas'; 

import DetallePeliculaSerie from './Paginas/DetallePeliculaSerie/DetallePeliculaSerie'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/detalle/:id/:tipo" element={<DetallePeliculaSerie />} />

          <Route path={ROUTES.peliculas} element={<Peliculas />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
