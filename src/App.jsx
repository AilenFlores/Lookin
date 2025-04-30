import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './Paginas/Inicio/Inicio';
import DetallePeliculaSerie from './Paginas/DetallePeliculaSerie/DetallePeliculaSerie'; // o el nombre real del archivo
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/detalle/:id/:tipo" element={<DetallePeliculaSerie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
<BrowserRouter>
<Routes>
  <Route element={<Home />} path={ROUTES.home} />
  <Route element={<Details />} path={ROUTES.pokemon} />
  <Route element={<Juegos />} path={ROUTES.juegos} />
</Routes>
</BrowserRouter>