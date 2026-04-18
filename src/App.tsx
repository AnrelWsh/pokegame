import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SilhouetteGame } from './pages/SilhouetteGame';
import { PokedexGame } from './pages/PokedexGame';
import { TypesGame } from './pages/TypesGame';
import { WeaknessesGame } from './pages/WeaknessesGame';
import { CryGame } from './pages/CryGame';
import { StatsGame } from './pages/StatsGame';
import { MovesGame } from './pages/MovesGame';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/silhouette" element={<SilhouetteGame />} />
          <Route path="/pokedex" element={<PokedexGame />} />
          <Route path="/types" element={<TypesGame />} />
          <Route path="/faiblesses" element={<WeaknessesGame />} />
          <Route path="/cri" element={<CryGame />} />
          <Route path="/stats" element={<StatsGame />} />
          <Route path="/capacites" element={<MovesGame />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
