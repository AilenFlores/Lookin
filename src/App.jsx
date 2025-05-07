import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './const/routes';
import Inicio from './Paginas/Inicio/Inicio';
import ContenidoLista from './Paginas/ContenidoLista/ContenidoLista';
import Favoritos from './Paginas/Favoritos/Favoritos';
import Pagina404 from './Paginas/Pagina404/Pagina404';
import DetallePeliculaSerie from './Paginas/DetallePeliculaSerie/DetallePeliculaSerie'; 
import './App.css';
import ResultadosBusqueda from './Paginas/ResultadosBusqueda/ResultadosBusqueda';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={ROUTES.inicio} element={<Inicio />} />
          <Route path={ROUTES.detalle} element={<DetallePeliculaSerie />} />
          <Route path={ROUTES.favoritos} element={<Favoritos />} />
          <Route path={ROUTES.peliculas} element={<ContenidoLista tipo="movie" />} />
          <Route path={ROUTES.series} element={<ContenidoLista tipo="tv" />} />
          <Route path={ROUTES.buscar} element={<ResultadosBusqueda />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
