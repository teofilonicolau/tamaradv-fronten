// src/App.tsx — VERSÃO FINAL 2025 (12 calculadoras + tudo perfeito)
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
import { ProcessualCivilHub } from './pages/processual-civil/ProcessualCivilHub';

// Páginas individuais
import ConsultaPage from './pages/consultas/ConsultaPage';
import AnaliseTextoPage from './pages/consultas/AnaliseTextoPage';
import ParecerJuridicoPage from './pages/consultas/ParecerJuridicoPage';

// Calculadora genérica (todas as 12 usam essa) - CORREÇÃO AQUI
import CalculatorPage from './pages/forms/CalculatorPage';

// Forms
import GenericTrabalhistaForm from './pages/forms/GenericTrabalhistaForm';
import GenericConsumidorForm from './pages/forms/GenericConsumidorForm';
import GenericCivilForm from './pages/forms/GenericCivilForm';
import GenericProcessualCivilForm from './pages/forms/GenericProcessualCivilForm';

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        {/* PÁGINAS PRINCIPAIS */}
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

        {/* PROCESSUAL CIVIL */}
        <Route path="/processual-civil" element={<ProcessualCivilHub />} />
        <Route path="/processual-civil/execucao-titulo" element={<GenericProcessualCivilForm />} />
        <Route path="/processual-civil/monitoria" element={<GenericProcessualCivilForm />} />
        <Route path="/processual-civil/embargos-terceiro" element={<GenericProcessualCivilForm />} />
        <Route path="/processual-civil/impugnacao-cumprimento" element={<GenericProcessualCivilForm />} />

        {/* TRABALHISTA */}
        <Route path="/trabalhista/peticao-vinculo" element={<GenericTrabalhistaForm />} />
        <Route path="/trabalhista/quesitos-insalubridade" element={<GenericTrabalhistaForm />} />

        {/* CALCULADORAS — TODAS AS 12 (usando CalculatorPage genérico) */}
        <Route path="/calculadoras/tempo-especial" element={<CalculatorPage />} />
        <Route path="/calculadoras/revisao-vida-toda" element={<CalculatorPage />} />
        <Route path="/calculadoras/regra-transicao-ec103" element={<CalculatorPage />} />
        <Route path="/calculadoras/periodo-graca" element={<CalculatorPage />} />
        <Route path="/calculadoras/horas-extras" element={<CalculatorPage />} />
        <Route path="/calculadoras/verbas-rescisorias" element={<CalculatorPage />} />
        <Route path="/calculadoras/adicional-noturno" element={<CalculatorPage />} />
        <Route path="/calculadoras/pensao-alimenticia" element={<CalculatorPage />} />
        <Route path="/calculadoras/valor-causa" element={<CalculatorPage />} />
        <Route path="/calculadoras/liquidacao-sentenca" element={<CalculatorPage />} />
        <Route path="/calculadoras/juros-mora" element={<CalculatorPage />} />
        <Route path="/calculadoras/correcao-monetaria" element={<CalculatorPage />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
              <div className="text-center">
                <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  404
                </h1>
                <p className="text-4xl mt-8 text-gray-700 font-bold">Página não encontrada</p>
                <a
                  href="/"
                  className="mt-12 inline-block px-16 py-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-2xl font-bold rounded-3xl shadow-2xl hover:scale-110 transition-all duration-300"
                >
                  Voltar ao Início
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;