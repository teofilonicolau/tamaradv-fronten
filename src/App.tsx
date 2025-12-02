// src/App.tsx — CORRIGIDO
import { Routes, Route } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/LayoutWrapper';

// Hubs
import { Home } from './pages/hubs/Home';
import { PrevidenciarioHub } from './pages/previdenciario/PrevidenciarioHub';
import { TrabalhistaHub } from './pages/trabalhista/TrabalhistaHub';
import { CalculadorasHub } from './pages/calculadoras/CalculadorasHub';
import { ProcessualHub } from './pages/processual/ProcessualHub';

// Calculadoras
import { HorasExtrasPage } from './pages/calculadoras/calculators/HorasExtrasPage';

// PÁGINA CORRETA DE CONSULTA IA
import ConsultaPage from './pages/consultas/ConsultaPage'; // ← CORRIGIDO AQUI!

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/previdenciario" element={<PrevidenciarioHub />} />
        <Route path="/trabalhista" element={<TrabalhistaHub />} />
        <Route path="/calculadoras" element={<CalculadorasHub />} />
        <Route path="/processual" element={<ProcessualHub />} />
        <Route path="/calculadoras/horas-extras" element={<HorasExtrasPage />} />

        {/* Rota correta da consulta IA */}
        <Route path="/consulta" element={<ConsultaPage />} />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;