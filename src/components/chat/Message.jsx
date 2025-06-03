import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import Avatar from '../common/Avatar';

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
`;

const MessageContent = styled.div`
  max-width: 70%;
  margin: ${props => props.isOwn ? '0 16px 0 0' : '0 0 0 16px'};
`;

const MessageBubble = styled.div`
  background-color: ${props => props.isOwn ? 'var(--active-item)' : 'var(--input-bg)'};
  color: ${props => props.isOwn ? 'white' : 'var(--text-primary)'};
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 4px;
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageMeta = styled.div`
  display: flex;
  justify-content: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
  align-items: center;
  font-size: 11px;
  color: var(--text-secondary);
`;

const MessageTime = styled.span`
  margin-right: ${props => props.isOwn ? '0' : '8px'};
  margin-left: ${props => props.isOwn ? '8px' : '0'};
`;

const MessageStatus = styled.span`
  font-style: italic;
`;

const SystemMessage = styled.div`
  text-align: center;
  margin: 16px 0;
  font-size: 12px;
  color: var(--text-secondary);
  font-style: italic;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
`;

const SenderName = styled.span`
  font-weight: 600;
  color: ${props => props.isOwn ? '#1D9BD1' : '#2EB67D'};
  margin-right: 8px;
`;

const Message = ({ message }) => {
  const { content, sender, timestamp, status } = message;
  
  // If it's a system message, show it centered
  if (sender === 'system') {
    return <SystemMessage>{content}</SystemMessage>;
  }
  
  const isOwn = sender === 'me';
  const formattedTime = format(new Date(timestamp), 'h:mm a');
  
  return (
    <MessageContainer isOwn={isOwn}>
      <Avatar 
        name={isOwn ? 'Me' : sender} 
        size="36px" 
        color={isOwn ? '#1D9BD1' : '#2EB67D'} 
      />
      <MessageContent isOwn={isOwn}>
        <MessageMeta isOwn={isOwn}>
          <SenderName isOwn={isOwn}>{isOwn ? 'You' : sender}</SenderName>
          <MessageTime isOwn={isOwn}>{formattedTime}</MessageTime>
        </MessageMeta>
        <MessageBubble isOwn={isOwn}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </MessageBubble>
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
