import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './const/routes';

import Inicio from './Paginas/Inicio/Inicio';
import ContenidoLista from './Paginas/ContenidoLista/ContenidoLista';
import DetallePeliculaSerie from './Paginas/DetallePeliculaSerie/DetallePeliculaSerie'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/detalle/:id/:tipo" element={<DetallePeliculaSerie />} />

          <Route path="/peliculas" element={<ContenidoLista tipo="movie" />} />
          <Route path="/series" element={<ContenidoLista tipo="tv" />} />

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
