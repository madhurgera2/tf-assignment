import styled from 'styled-components';

export const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  overflow: hidden;
  background-color: var(--channel-bg);
`;

export const ChatHeader = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--channel-bg);
  color: var(--text-primary);
`;

export const ChatInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ChatName = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
`;

export const ChannelIcon = styled.span`
  margin-right: 6px;
  font-size: 16px;
  color: var(--text-secondary);
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--text-primary);
  }
`;

export const DeleteButton = styled(HeaderButton)`
  color: #e01e5a;
  
  &:hover {
    color: #e01e5a;
    text-decoration: underline;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  color: var(--text-secondary);
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  color: var(--text-secondary);
  text-align: center;
  
  h2 {
    margin-bottom: 8px;
    color: var(--text-primary);
  }
  
  p {
    margin: 0;
    max-width: 400px;
  }
`;
