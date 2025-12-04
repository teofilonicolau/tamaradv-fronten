// src/App.tsx — VERSÃO 100% CORRETA E FUNCIONAL 2025
import { Routes, Route } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/LayoutWrapper';

// Hubs
import { Home } from './pages/hubs/Home';
import { PrevidenciarioHub } from './pages/previdenciario/PrevidenciarioHub';
import { TrabalhistaHub } from './pages/trabalhista/TrabalhistaHub';
import { CalculadorasHub } from './pages/calculadoras/CalculadorasHub';
import { ConsultasHub } from './pages/consultas/ConsultasHub';
import ConsumidorHub from './pages/consumidor/ConsumidorHub';
import CivilHub from './pages/civil/CivilHub';

// PROCESSUAL CIVIL — CORRIGIDO: É NAMED EXPORT
import { ProcessualCivilHub } from './pages/processual-civil/ProcessualCivilHub';

// FORMS — CORRIGIDO: O MAIS IMPORTANTE
import GenericTrabalhistaForm from './pages/forms/GenericTrabalhistaForm';
import GenericConsumidorForm from './pages/forms/GenericConsumidorForm';
import GenericCivilForm from './pages/forms/GenericCivilForm';
import GenericProcessualCivilForm from './pages/forms/GenericProcessualCivilForm'; // ← ERA AQUI O ERRO!

// Consultas IA e Calculadoras
import ConsultaPage from './pages/consultas/ConsultaPage';
import AnaliseTextoPage from './pages/consultas/AnaliseTextoPage';
import ParecerJuridicoPage from './pages/consultas/ParecerJuridicoPage';
import { HorasExtrasPage } from './pages/calculadoras/calculators/HorasExtrasPage';

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/previdenciario" element={<PrevidenciarioHub />} />
        <Route path="/trabalhista" element={<TrabalhistaHub />} />
        <Route path="/calculadoras" element={<CalculadorasHub />} />
        <Route path="/consultas/ia" element={<ConsultasHub />} />
        <Route path="/consulta" element={<ConsultaPage />} />
        <Route path="/analise-texto" element={<AnaliseTextoPage />} />
        <Route path="/parecer-juridico" element={<ParecerJuridicoPage />} />

        {/* CONSUMIDOR */}
        <Route path="/consumidor" element={<ConsumidorHub />} />
        <Route path="/consumidor/peticao-vicio-produto" element={<GenericConsumidorForm />} />
        <Route path="/consumidor/peticao-cobranca-indevida" element={<GenericConsumidorForm />} />

        {/* CIVIL */}
        <Route path="/civil" element={<CivilHub />} />
        <Route path="/civil/peticao-cobranca" element={<GenericCivilForm />} />
        <Route path="/civil/peticao-indenizacao" element={<GenericCivilForm />} />

        {/* PROCESSUAL CIVIL — TUDO CERTO AGORA */}
        <Route path="/processual-civil" element={<ProcessualCivilHub />} />
        <Route path="/processual-civil/execucao-titulo" element={<GenericProcessualCivilForm />} />
        <Route path="/processual-civil/monitoria" element={<GenericProcessualCivilForm />} />
        <Route path="/processual-civil/embargos-terceiro" element={<GenericProcessualCivilForm />} />
        <Route path="/processual-civil/impugnacao-cumprimento" element={<GenericProcessualCivilForm />} />

        {/* TRABALHISTA */}
        <Route path="/trabalhista/peticao-vinculo" element={<GenericTrabalhistaForm />} />
        <Route path="/trabalhista/quesitos-insalubridade" element={<GenericTrabalhistaForm />} />

        {/* CALCULADORAS */}
        <Route path="/calculadoras/horas-extras" element={<HorasExtrasPage />} />

        {/* 404 */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50"><h1 className="text-9xl font-black text-purple-600">404</h1><p>Página não encontrada</p><a href="/">Voltar</a></div>} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;