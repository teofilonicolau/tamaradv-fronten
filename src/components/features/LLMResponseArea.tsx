// arquivo: src/components/features/LLMResponseArea.tsx
import React from 'react';
import styled from 'styled-components';
import { FaCopy, FaFilePdf } from 'react-icons/fa';
import type { IEthicsDisclaimer } from '../../types/ILLM';
import { exportToPDF } from '../../utils/pdfGenerator'; // Função auxiliar

// Estilos
const ResponseContainer = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
`;

const ContentArea = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
`;

const ActionFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  background-color: #007bff; /* Azul TamarAI */
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

interface LLMResponseAreaProps {
  title: string;
  generatedText: string;
  disclaimer: IEthicsDisclaimer;
}

export const LLMResponseArea: React.FC<LLMResponseAreaProps> = ({ title, generatedText, disclaimer }) => {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    alert('Texto copiado para a área de transferência!');
  };

  const handleExportPDF = () => {
    exportToPDF(generatedText, title, disclaimer);
  };

  return (
    <ResponseContainer>
      <h3>Resultado: {title}</h3>
      <ContentArea>
        {generatedText}
      </ContentArea>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
        {disclaimer.disclaimer}
      </div>

      <ActionFooter>
        <Button onClick={handleCopy} title="Copiar o texto completo">
          <FaCopy /> Copiar
        </Button>
        <Button onClick={handleExportPDF} title="Gerar PDF da petição/resposta">
          <FaFilePdf /> Gerar PDF
        </Button>
      </ActionFooter>
    </ResponseContainer>
  );
};