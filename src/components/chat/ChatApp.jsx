import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { chatService, createChatSocket } from '../../services/chatService';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import CreateChatModal from './CreateChatModal';

const ChatAppContainer = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const ChatApp = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Load all chats on component mount
  useEffect(() => {
    chatService.getChats()
      .then(response => {
        setChats(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading chats:', error);
        setLoading(false);
      });
  }, []);
  
  // Mock real-time updates with the chat socket
  useEffect(() => {
    const socket = createChatSocket();
    
    socket.connect().then(() => {
      console.log('Connected to chat socket');
      
      // No real implementation needed for this mock
      const cleanup = socket.addListener((event) => {
        // This would handle real-time events in a real app
        console.log('Socket event:', event);
      });
      
      return () => {
        cleanup();
        socket.disconnect();
      };
    });
  }, []);
  
  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
  };
  
  const handleAddChat = () => {
    setIsCreateModalOpen(true);
  };
  
  const handleCreateChat = (name) => {
    return chatService.createChat(name)
      .then(newChat => {
        setChats(prev => [...prev, newChat]);
        setActiveChat(newChat.id);
      });
  };
  
  const handleDeleteChat = (chatId) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    if (activeChat === chatId) {
      setActiveChat(chats.length > 0 ? chats[0].id : null);
    }
  };
  
  return (
    <ChatAppContainer>
      <ChatList 
        chats={chats}
        activeChat={activeChat}
        onSelectChat={handleSelectChat}
        onAddChat={handleAddChat}
      />
      
      <ChatWindow 
        chatId={activeChat} 
        onDeleteChat={handleDeleteChat}
      />
      
      <CreateChatModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateChat={handleCreateChat}
      />
    </ChatAppContainer>
  );
};

export default ChatApp;
