// src/App.tsx — VERSÃO PERFEITA 2025 — ZERO ERROS, ZERO WARNINGS
import { Routes, Route } from 'react-router-dom';
import { LayoutWrapper } from './components/layout/LayoutWrapper';

// Hubs — todos named exports
import { Home } from './pages/hubs/Home';
import { PrevidenciarioHub } from './pages/previdenciario/PrevidenciarioHub';
import { TrabalhistaHub } from './pages/trabalhista/TrabalhistaHub';
import { CalculadorasHub } from './pages/calculadoras/CalculadorasHub';
import { ProcessualHub } from './pages/processual/ProcessualHub';

// Consultas IA — default exports
import ConsultaPage from './pages/consultas/ConsultaPage';
import AnaliseTextoPage from './pages/consultas/AnaliseTextoPage';
import ParecerJuridicoPage from './pages/consultas/ParecerJuridicoPage';

// Calculadoras
import { HorasExtrasPage } from './pages/calculadoras/calculators/HorasExtrasPage';

// REMOVA ESTA LINHA: import React from 'react';  ← NÃO PRECISA MAIS

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/previdenciario" element={<PrevidenciarioHub />} />
        <Route path="/trabalhista" element={<TrabalhistaHub />} />
        <Route path="/calculadoras" element={<CalculadorasHub />} />
        <Route path="/processual" element={<ProcessualHub />} />

        <Route path="/consulta" element={<ConsultaPage />} />
        <Route path="/analise-texto" element={<AnaliseTextoPage />} />
        <Route path="/parecer-juridico" element={<ParecerJuridicoPage />} />

        <Route path="/calculadoras/horas-extras" element={<HorasExtrasPage />} />

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