// filepath: /d:/OneDrive/Desktop/medintel/medintel-frontend/src/App.js
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import PrescriptionUpload from './components/PrescriptionUpload';
import DiagnosisForm from './components/DiagnosisForm';
import DrugInteractionCheck from './components/DrugInteractionCheck';
import TelemedicineIntegration from './components/TelemedicineIntegration';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

  body {
    background-color: #f0f0f0;
    color: #333;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #007bff;
  margin-bottom: 20px;
  font-weight: 600;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Title>
          <span className="text-blue-600">Med</span>
          <span className="text-white">Intel</span>
        </Title>
        <PrescriptionUpload />
        <DiagnosisForm />
        <DrugInteractionCheck />
        <TelemedicineIntegration />
      </AppContainer>
    </>
  );
};

export default App;