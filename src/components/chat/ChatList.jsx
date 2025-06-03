import React, { useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import Avatar from '../common/Avatar';

const ChatListContainer = styled.div`
  width: 260px;
  border-right: 1px solid var(--border-color);
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
`;

const WorkspaceHeader = styled.div`
  padding: 0 16px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
`;

const WorkspaceName = styled.h2`
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

const NewMessageButton = styled.button`
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

const SidebarContent = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

const SidebarSection = styled.div`
  margin-bottom: 16px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--hover-item-sidebar);
  }
`;

const SectionTitle = styled.h3`
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

const SectionAdd = styled.span`
  color: var(--text-secondary);
  font-size: 16px;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const ChatItem = styled.div`
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

const ChatIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
  opacity: 0.8;
`;

const ChatItemContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const ChatName = styled.div`
  font-weight: ${props => props.unread ? '600' : '400'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const UnreadIndicator = styled.div`
  width: 8px;
  height: 8px;
  background-color: #2EB67D;
  border-radius: 50%;
  margin-left: 4px;
`;



const UnreadBadge = styled.span`
  background-color: #2EB67D;
  color: white;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 10px;
  margin-left: 8px;
`;

const EmptyState = styled.div`
  padding: 16px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
`;

const ChatList = ({
  chats = [],
  activeChat,
  onSelectChat,
  onAddChat,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    starred: true,
    channels: true,
    directMessages: true,
    apps: false
  });
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  
  return (
    <ChatListContainer>
      <WorkspaceHeader>
        <WorkspaceName>Typeface</WorkspaceName>
        <NewMessageButton onClick={onAddChat} title="Create new message">
          ✎
        </NewMessageButton>
      </WorkspaceHeader>
      
      <SidebarContent>
        {/* Threads section */}
        <ChatItem onClick={() => {}} isActive={false}>
          <ChatIcon>🧵</ChatIcon>
          <ChatItemContent>
            <ChatName>Threads</ChatName>
          </ChatItemContent>
        </ChatItem>
        
        {/* Huddles section */}
        <ChatItem onClick={() => {}} isActive={false}>
          <ChatIcon>🔊</ChatIcon>
          <ChatItemContent>
            <ChatName>Huddles</ChatName>
          </ChatItemContent>
        </ChatItem>
        
        {/* Drafts section */}
        <ChatItem onClick={() => {}} isActive={false}>
          <ChatIcon>📝</ChatIcon>
          <ChatItemContent>
            <ChatName>Drafts & sent</ChatName>
          </ChatItemContent>
        </ChatItem>
        
        
        {/* Channels section */}
        <SidebarSection>
          <SectionHeader onClick={() => toggleSection('channels')}>
            <SectionTitle expanded={expandedSections.channels}>Channels</SectionTitle>
            <SectionAdd onClick={(e) => { e.stopPropagation(); onAddChat(); }}>+</SectionAdd>
          </SectionHeader>
          
          {expandedSections.channels && (
            <div>
              {chats.length === 0 ? (
                <EmptyState>
                  No channels yet. Create one to get started!
                </EmptyState>
              ) : (
                chats.map((chat) => (
                  <ChatItem 
                    key={chat.id} 
                    onClick={() => onSelectChat(chat.id)}
                    isActive={activeChat === chat.id}
                  >
                    <ChatIcon>#</ChatIcon>
                    <ChatItemContent>
                      <ChatName unread={chat.unreadCount > 0}>{chat.name}</ChatName>
                      {chat.unreadCount > 0 && <UnreadIndicator />}
                    </ChatItemContent>
                    {chat.unreadCount > 0 && (
                      <UnreadBadge>{chat.unreadCount}</UnreadBadge>
                    )}
                  </ChatItem>
                ))
              )}
            </div>
          )}
        </SidebarSection>
      </SidebarContent>
    </ChatListContainer>
  );
};

export default ChatList;
