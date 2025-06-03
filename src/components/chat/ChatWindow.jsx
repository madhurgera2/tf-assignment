import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { chatService } from '../../services/chatService';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: var(--channel-bg);
`;

const ChatHeader = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--channel-bg);
  color: var(--text-primary);
`;

const ChatInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ChatName = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
`;

const ChannelIcon = styled.span`
  margin-right: 6px;
  font-size: 16px;
  color: var(--text-secondary);
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderButton = styled.button`
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

const DeleteButton = styled(HeaderButton)`
  color: #e01e5a;
  
  &:hover {
    color: #e01e5a;
    text-decoration: underline;
  }
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex: 1;
  color: var(--text-secondary);
`;

const EmptyState = styled.div`
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

const ChatWindow = ({ chatId, onDeleteChat }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (chatId) {
      setLoading(true);
      
      // Fetch chat details
      Promise.all([
        chatService.getChat(chatId),
        chatService.getMessages(chatId)
      ])
        .then(([chatData, messagesData]) => {
          setChat(chatData);
          setMessages(messagesData);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error loading chat:', err);
          setLoading(false);
        });
    } else {
      setChat(null);
      setMessages([]);
      setLoading(false);
    }
  }, [chatId]);
  
  const handleSendMessage = (content) => {
    chatService.sendMessage(chatId, content)
      .then(newMessage => {
        setMessages(prev => [...prev, newMessage]);
      })
      .catch(err => {
        console.error('Error sending message:', err);
      });
  };
  
  const handleDeleteChat = () => {
    if (window.confirm(`Are you sure you want to delete "${chat?.name}" chat?`)) {
      chatService.deleteChat(chatId)
        .then(() => {
          onDeleteChat(chatId);
        })
        .catch(err => {
          console.error('Error deleting chat:', err);
        });
    }
  };
  
  if (!chatId) {
    return (
      <ChatWindowContainer>
        <EmptyState>
          <h2>No chat selected</h2>
          <p>Select a chat from the list or create a new one to get started.</p>
        </EmptyState>
      </ChatWindowContainer>
    );
  }
  
  if (loading) {
    return (
      <ChatWindowContainer>
        <LoadingState>Loading chat...</LoadingState>
      </ChatWindowContainer>
    );
  }
  
  return (
    <ChatWindowContainer>
      <ChatHeader>
        <ChatInfo>
          <ChannelIcon>#</ChannelIcon>
          <ChatName>{chat?.name}</ChatName>
        </ChatInfo>
        <HeaderActions>
          <HeaderButton title="Add people">👥</HeaderButton>
          <HeaderButton title="Call">📞</HeaderButton>
          <HeaderButton title="Information">ℹ️</HeaderButton>
          <DeleteButton onClick={handleDeleteChat}>Delete Chat</DeleteButton>
        </HeaderActions>
      </ChatHeader>
      
      <MessageList messages={messages} />
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={!chat || loading}
        chatName={chat?.name}
      />
    </ChatWindowContainer>
  );
};

export default ChatWindow;
