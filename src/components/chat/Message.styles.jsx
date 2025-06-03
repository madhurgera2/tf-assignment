import styled from 'styled-components';

// Message container
export const MessageContainer = styled.div`
  padding: 8px 20px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: #222529;
  }
`;

// Message header with user info
export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

// Username styling
export const Username = styled.span`
  font-weight: bold;
  color: #d1d2d3;
  margin-right: 8px;
`;

// Timestamp styling
export const Timestamp = styled.span`
  color: #9a9a9a;
  font-size: 12px;
`;

// Message content with rich text formatting
export const MessageContent = styled.div`
  color: #d1d2d3;
  font-size: 15px;
  line-height: 1.5;
  
  a {
    color: #1d9bd1;
    text-decoration: underline;
  }
  
  strong {
    font-weight: bold;
  }
  
  em {
    font-style: italic;
  }
  
  .strikethrough {
    text-decoration: line-through;
  }
  
  pre {
    background-color: #1a1d21;
    padding: 10px;
    border-radius: 4px;
    margin: 5px 0;
    overflow-x: auto;
  }
  
  code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 13px;
    background-color: #1a1d21;
    padding: 2px 4px;
    border-radius: 3px;
  }
`;

// Avatar container
export const StyledAvatar = styled.div`
  width: ${props => props.size || '36px'};
  height: ${props => props.size || '36px'};
  border-radius: 4px;
  background-color: ${props => props.color || '#4a154b'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 10px;
`;
