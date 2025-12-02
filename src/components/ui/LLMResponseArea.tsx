// src/components/ui/LLMResponseArea.tsx
import React from 'react';
import styled from 'styled-components';
import { FaCopy, FaFilePdf } from 'react-icons/fa';
import { exportToPDF } from '@/utils/pdfGenerator'; // ← com alias @/

const Container = styled.div`
  margin-top: 3rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #bae6fd;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #1e40af;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #e0e7ff;
  font-family: 'Georgia', serif;
  line-height: 1.8;
  color: #1f2937;
  white-space: pre-wrap;
  min-height: 200px;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
`;

interface LLMResponseAreaProps {
  title: string;
  content: string;
  disclaimer?: string;
}

export const LLMResponseArea: React.FC<LLMResponseAreaProps> = ({
  title,
  content,
  disclaimer = "Esta é uma sugestão gerada por IA. Revise com atenção antes de usar em juízo."
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      alert('Texto copiado para a área de transferência!');
    });
  };

  const handlePDF = () => {
    // AQUI ESTÁ A CORREÇÃO QUE VOCÊ PRECISAVA!
    exportToPDF(content, title, { disclaimer });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <div className="text-sm text-gray-600 mt-4 italic text-right">
        {disclaimer}
      </div>
      <Footer>
        <ActionButton onClick={handleCopy}>
          <FaCopy /> Copiar Texto
        </ActionButton>
        <ActionButton onClick={handlePDF}>
          <FaFilePdf /> Gerar PDF
        </ActionButton>
      </Footer>
    </Container>
  );
};