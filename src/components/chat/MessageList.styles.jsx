import styled from 'styled-components';

export const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: var(--channel-bg);
  display: flex;
  flex-direction: column;
`;

export const EmptyStateMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  text-align: center;
  
  h3 {
    margin-bottom: 8px;
    color: var(--text-primary);
  }
  
  p {
    margin: 0;
    max-width: 300px;
  }
`;
