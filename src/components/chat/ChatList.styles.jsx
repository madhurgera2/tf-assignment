import styled from 'styled-components';

export const ChatListContainer = styled.div`
  width: 260px;
  min-width: 260px;
  max-width: 260px;
  border-right: 1px solid var(--border-color);
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
`;

export const WorkspaceHeader = styled.div`
  padding: 0 16px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
`;

export const WorkspaceName = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  &::after {
    content: '▾';
    font-size: 12px;
    margin-left: 5px;
    color: var(--text-secondary);
  }
`;

export const NewMessageButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--text-primary);
  }
`;

export const SidebarContent = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

export const SidebarSection = styled.div`
  margin-bottom: 16px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--hover-item-sidebar);
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  
  &::before {
    content: '${props => props.expanded ? '▾' : '▸'}';
    font-size: 10px;
    margin-right: 6px;
  }
`;

export const SectionAdd = styled.span`
  color: var(--text-secondary);
  font-size: 16px;
  
  &:hover {
    color: var(--text-primary);
  }
`;

export const ChatItem = styled.div`
  padding: 4px 16px 4px 26px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  color: ${props => props.isActive ? 'white' : 'var(--sidebar-item)'};
  background-color: ${props => props.isActive ? 'var(--active-item)' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--active-item)' : 'var(--hover-item-sidebar)'};
  }
`;

export const ChatIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
  opacity: 0.8;
`;

export const ChatItemContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export const ChatName = styled.div`
  font-weight: ${props => props.unread ? '600' : '400'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;

export const UnreadIndicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: #2EB67D;
  border-radius: 50%;
  margin-left: 4px;
`;

export const UnreadBadge = styled.span`
  background-color: #2EB67D;
  color: white;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 10px;
  margin-left: 8px;
`;

export const EmptyState = styled.div`
  padding: 16px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
`;
