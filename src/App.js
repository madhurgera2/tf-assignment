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

const SearchContainer = styled.div`
  flex: 1;
  max-width: 700px;
  margin: 0 16px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 5px 8px;
  color: var(--text-primary);
`;

const SearchIcon = styled.span`
  margin-right: 6px;
`;

const SearchText = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
`;

const HeaderNav = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavIcon = styled.div`
  color: var(--text-secondary);
  font-size: 18px;
  cursor: pointer;
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
      <AppHeader>
        <SearchContainer>
          <SearchBar>
            <SearchIcon>🔍</SearchIcon>
            <SearchText>Search Typeface</SearchText>
          </SearchBar>
        </SearchContainer>
        <HeaderNav>
          <NavIcon>🔔</NavIcon>
          <NavIcon>👤</NavIcon>
        </HeaderNav>
      </AppHeader>
      <AppContent>
        <ChatApp />
      </AppContent>
    </AppContainer>
  );
}

export default App;
