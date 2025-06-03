import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { chatService } from '../../services/chatService';
import DeleteChatModal from './DeleteChatModal';
import {
  ChatWindowContainer,
  ChatHeader,
  ChatInfo,
  ChatName,
  ChannelIcon,
  HeaderActions,
  HeaderButton,
  DeleteButton,
  LoadingState,
  EmptyState
} from './ChatWindow.styles';

const ChatWindow = ({ chatId, onDeleteChat }) => {
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
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
  
  const handleSendMessage = (content, attachment = null) => {
    chatService.sendMessage(chatId, content, attachment)
      .then(newMessage => {
        setMessages(prev => [...prev, newMessage]);
      })
      .catch(err => {
        console.error('Error sending message:', err);
      });
  };
  
  const handleDeleteChat = () => {
    setIsDeleteModalOpen(true);
  };
  
  const confirmDeleteChat = () => {
    chatService.deleteChat(chatId)
      .then(() => {
        setIsDeleteModalOpen(false);
        onDeleteChat(chatId);
      })
      .catch(err => {
        console.error('Error deleting chat:', err);
        setIsDeleteModalOpen(false);
      });
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
          <DeleteButton onClick={handleDeleteChat}>🗑️</DeleteButton>
        </HeaderActions>
      </ChatHeader>
      
      <MessageList messages={messages} />
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        disabled={!chat || loading}
        chatName={chat?.name}
      />
      
      <DeleteChatModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteChat}
        chatName={chat?.name}
      />
    </ChatWindowContainer>
  );
};

export default ChatWindow;
