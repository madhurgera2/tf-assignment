import React, { useState } from 'react';
import { format } from 'date-fns';
import Avatar from '../common/Avatar';
import {
  ChatListContainer,
  WorkspaceHeader,
  WorkspaceName,
  NewMessageButton,
  SidebarContent,
  SidebarSection,
  SectionHeader,
  SectionTitle,
  SectionAdd,
  ChatItem,
  ChatIcon,
  ChatItemContent,
  ChatName,
  UnreadIndicator,
  UnreadBadge,
  EmptyState
} from './ChatList.styles';

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
