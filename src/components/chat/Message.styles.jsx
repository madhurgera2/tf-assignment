import styled from 'styled-components';

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: ${props => props.isOwn ? 'row-reverse' : 'row'};
  align-items: flex-end;
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

const SenderName = styled.span`
  font-weight: 600;
  color: ${props => props.isOwn ? '#1D9BD1' : '#2EB67D'};
  margin-right: 8px;
`;

const MessageImageContainer = styled.div`
  margin-bottom: 4px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
`;

const MessageImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px 4px 0 0;
`;

const ImageCaption = styled.div`
  padding: 8px 12px;
  background-color: ${props => props.isOwn ? 'var(--active-item)' : 'var(--input-bg)'};
  color: ${props => props.isOwn ? 'white' : 'var(--text-primary)'};
  border-radius: 0 0 4px 4px;
  font-size: 14px;
`;

const FileContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 4px;
`;

const FileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: #1D9BD1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: white;
  font-size: 16px;
`;

const FileName = styled.div`
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export {
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
};
