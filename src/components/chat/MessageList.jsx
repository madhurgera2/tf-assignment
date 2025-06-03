import React, { useRef, useEffect } from 'react';
import Message from './Message';
import { MessageListContainer, EmptyStateMessage } from './MessageList.styles';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  if (!messages || messages.length === 0) {
    return (
      <MessageListContainer>
        <EmptyStateMessage>
          <h3>No messages yet</h3>
          <p>Start the conversation by typing a message below.</p>
        </EmptyStateMessage>
      </MessageListContainer>
    );
  }

  return (
    <MessageListContainer>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </MessageListContainer>
  );
};

export default MessageList;
