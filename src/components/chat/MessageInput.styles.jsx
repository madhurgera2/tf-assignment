import styled from 'styled-components';

export const MessageInputContainer = styled.div`
  background-color: #222529;
  border-radius: 8px;
  margin: 0 16px 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormatToolbar = styled.div`
  display: flex;
  padding: 8px 16px;
  border-bottom: 1px solid #383a3e;
  gap: 8px;
`;

export const FormatButton = styled.button`
  background-color: transparent;
  color: #9a9a9a;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s;
  
  &:hover {
    background-color: #393b3f;
    color: #ffffff;
  }
  
  &.active {
    background-color: #393b3f;
    color: #1d9bd1;
  }
`;

export const EditorArea = styled.div`
  min-height: 40px;
  max-height: 200px;
  overflow-y: auto;
  padding: 10px 16px;
  color: var(--text-primary);
  outline: none;
  word-break: break-word;
  line-height: 1.5;
  
  &[contenteditable="false"] {
    background-color: #3c3f44;
    cursor: not-allowed;
  }
  
  &:empty:before {
    content: attr(data-placeholder);
    color: var(--text-secondary);
    pointer-events: none;
  }
`;

export const FilePreviewContainer = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid #383a3e;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const FilePreviewImage = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 8px;
`;

export const FilePreviewName = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: var(--text-secondary);
`;

export const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  margin-left: 8px;
  
  &:hover {
    color: #e01e5a;
  }
`;

export const BottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid #383a3e;
`;

export const SendButton = styled.button`
  background-color: #007a5a;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #008f69;
  }
  
  &:disabled {
    background-color: #2c4a3e;
    cursor: not-allowed;
  }
`;

export const FileUploadButton = styled.button`
  background-color: transparent;
  color: #9a9a9a;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;
  
  &:hover {
    color: #ffffff;
  }
  
  &:disabled {
    color: #555;
    cursor: not-allowed;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
