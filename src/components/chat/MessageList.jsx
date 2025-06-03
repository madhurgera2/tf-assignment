import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Message from './Message';

const MessageListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: var(--channel-bg);
  display: flex;
  flex-direction: column;
`;

const EmptyStateMessage = styled.div`
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
