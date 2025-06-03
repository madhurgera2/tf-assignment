import React from 'react';
import { format } from 'date-fns';
import Avatar from '../common/Avatar';
import {
  MessageContainer,
  MessageContent,
  MessageBubble,
  MessageMeta,
  MessageTime,
  SenderName,
  MessageImageContainer,
  MessageImage,
  ImageCaption,
  FileContainer,
  FileIcon,
  FileName
} from './Message.styles';

const Message = ({ message }) => {
  const { content, sender, timestamp, image, file } = message;
  
  const isOwn = sender === 'me';
  const formattedTime = format(new Date(timestamp), 'h:mm a');
  
  const renderMessageContent = () => {
    // Case 1: Message with image and caption
    if (image) {
      return (
        <MessageImageContainer>
          <MessageImage src={image.url} alt="Image attachment" />
          {content && <ImageCaption isOwn={isOwn} dangerouslySetInnerHTML={{ __html: content }} />}
        </MessageImageContainer>
      );
    }
    
    // Case 2: Message with file attachment
    if (file) {
      return (
        <>
          <FileContainer>
            <FileIcon>{file.extension?.toUpperCase() || 'DOC'}</FileIcon>
            <FileName>{file.name}</FileName>
          </FileContainer>
          {content && <MessageBubble isOwn={isOwn}>{content}</MessageBubble>}
        </>
      );
    }
    
    // Case 3: Regular text message
    return <MessageBubble isOwn={isOwn} dangerouslySetInnerHTML={{ __html: content }} />;
  };
  
  return (
    <MessageContainer isOwn={isOwn}>
      {!isOwn && <Avatar name={sender} size="32px" />}
      <MessageContent isOwn={isOwn}>
        {renderMessageContent()}
        <MessageMeta isOwn={isOwn}>
          {!isOwn && <SenderName isOwn={isOwn}>{sender}</SenderName>}
          <MessageTime isOwn={isOwn}>{formattedTime}</MessageTime>
        </MessageMeta>
      </MessageContent>
    </MessageContainer>
  );
};

export default Message;
