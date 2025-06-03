import React from 'react';
import styled from 'styled-components';
import './App.css';
import ChatApp from './components/chat/ChatApp';

const AppContainer = styled.div`
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--channel-bg);
  color: var(--text-primary);
`;

const AppHeader = styled.header`
  background-color: var(--sidebar-bg);
  color: white;
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: 40px;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  background-color: var(--channel-bg);
`;

function App() {
  return (
    <AppContainer>
      <AppHeader />
      <AppContent>
        <ChatApp />
      </AppContent>
    </AppContainer>
  );
}

export default App;
