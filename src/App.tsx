// src/App.tsx
import { Routes, Route } from 'react-router-dom';

// Layout
import { LayoutWrapper } from './components/layout/LayoutWrapper';

// Hubs principais
import { Home } from './pages/hubs/Home';
import { PrevidenciarioHub } from './pages/direito/previdenciario/PrevidenciarioHub';
import { TrabalhistaHub } from './pages/direito/trabalhista/TrabalhistaHub';
import { CalculadorasHub } from './pages/direito/calculadoras/CalculadorasHub';
import { ProcessualHub } from './pages/direito/processual/ProcessualHub';

// Páginas individuais
import { HorasExtrasPage } from './pages/calculadoras/HorasExtrasPage';
import ConsultaPage from './pages/forms/ConsultaPage';

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Hubs principais */}
        <Route path="/previdenciario" element={<PrevidenciarioHub />} />
        <Route path="/trabalhista" element={<TrabalhistaHub />} />
        <Route path="/calculadoras" element={<CalculadorasHub />} />
        <Route path="/processual" element={<ProcessualHub />} />

        {/* Calculadoras individuais */}
        <Route path="/calculadoras/horas-extras" element={<HorasExtrasPage />} />

        {/* Consulta IA (opcional) */}
        <Route path="/consulta" element={<ConsultaPage />} />

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
                <p className="text-3xl mt-6 text-gray-600 dark:text-gray-400">
                  Página não encontrada
                </p>
                <a
                  href="/"
                  className="mt-10 inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xl font-bold rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-1"
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