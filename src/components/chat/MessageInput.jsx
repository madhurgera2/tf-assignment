import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const MessageInputContainer = styled.div`
  background-color: #222529;
  border-radius: 8px;
  margin: 0 16px 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormatToolbar = styled.div`
  display: flex;
  padding: 8px 16px;
  border-bottom: 1px solid #383a3e;
  gap: 8px;
`;

const FormatButton = styled.button`
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

const EditorArea = styled.div`
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

const FilePreviewContainer = styled.div`
  padding: 8px 16px;
  border-bottom: 1px solid #383a3e;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FilePreviewImage = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 8px;
`;

const FilePreviewName = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: var(--text-secondary);
`;

const RemoveFileButton = styled.button`
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

const BottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid #383a3e;
`;

const SendButton = styled.button`
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

const FileUploadButton = styled.button`
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

const HiddenFileInput = styled.input`
  display: none;
`;

const MessageInput = ({ onSendMessage, disabled, chatName = 'general' }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Current formatting state
  const [formatOptions, setFormatOptions] = useState({
    bold: false,
    italic: false,
    strike: false,
    link: false
  });

  // Track editor reference and empty state
  const editorRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  // Update empty state
  const checkIfEmpty = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText.trim();
      setIsEmpty(text === '');
    }
  };

  // Handle paste events to remove formatting
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Send message handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedFile) {
      // Send file as message
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const isImage = selectedFile.type.startsWith('image/');
        
        let messageContent;
        if (isImage) {
          // For image files, include the preview
          messageContent = `
            <div class="file-message">
              <div class="file-name">${selectedFile.name}</div>
              <div class="file-preview">
                <img src="${fileContent}" alt="${selectedFile.name}" style="max-width: 100%; max-height: 300px; border-radius: 4px;" />
              </div>
            </div>
          `;
        } else {
          // For non-image files, just show the filename
          messageContent = `<div class="file-message">File: ${selectedFile.name}</div>`;
        }
        
        onSendMessage(messageContent);
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
      return;
    }
    
    if (editorRef.current && !isEmpty) {
      // Get HTML content
      const content = editorRef.current.innerHTML;
      
      // Send the message
      onSendMessage(content);
      
      // Reset editor
      editorRef.current.innerHTML = '';
      setIsEmpty(true);
      
      // Reset format options
      setFormatOptions({
        bold: false,
        italic: false,
        strike: false,
        link: false
      });
    }
  };
  
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };
  
  const clearSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const insertMarkerAtCursor = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.id = 'format-marker';
      span.textContent = '\u200B'; // Zero-width space
      
      range.insertNode(span);
      
      // Move cursor after marker
      range.setStartAfter(span);
      range.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(range);
      
      return span;
    }
    return null;
  };

  const getSelectionOrInsertMarker = () => {
    const selection = window.getSelection();
    const hasSelection = selection.toString().length > 0;
    
    if (!hasSelection && editorRef.current) {
      return insertMarkerAtCursor();
    }
    
    return null;
  };

  const applyFormatToSelection = (command, value = null, turnOn = true) => {
    const marker = getSelectionOrInsertMarker();
    
    if (turnOn) {
      document.execCommand(command, false, value);
    } else {
      switch (command) {
        case 'bold':
          document.execCommand('bold', false);
          break;
        case 'italic':
          document.execCommand('italic', false);
          break;
        case 'strikeThrough':
          document.execCommand('strikeThrough', false);
          break;
        case 'createLink':
          document.execCommand('unlink', false);
          break;
        default:
          break;
      }
    }
    
    if (marker) {
      marker.parentNode.removeChild(marker);
    }
  };

  const toggleFormat = (format) => {
    if (document.activeElement !== editorRef.current) {
      editorRef.current.focus();
    }
    
    const newState = !formatOptions[format];
    setFormatOptions({ ...formatOptions, [format]: newState });
    
    switch (format) {
      case 'bold':
        applyFormatToSelection('bold', null, newState);
        break;
      case 'italic':
        applyFormatToSelection('italic', null, newState);
        break;
      case 'strike':
        applyFormatToSelection('strikeThrough', null, newState);
        break;
      case 'link':
        const selection = window.getSelection();
        const hasSelection = selection.toString().length > 0;
        
        if (newState && hasSelection) {
          const url = prompt('Enter URL:', 'https://');
          if (url) {
            applyFormatToSelection('createLink', url, true);
          } else {
            setFormatOptions({ ...formatOptions, link: false });
          }
        } else if (!newState) {
          applyFormatToSelection('createLink', null, false);
        } else {
          setFormatOptions({ ...formatOptions, link: false });
        }
        break;
      default:
        break;
    }
    
    checkIfEmpty();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
      return;
    }
    
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          toggleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          toggleFormat('italic');
          break;
        default:
          break;
      }
    }
  };

  const handleInput = () => {
    checkIfEmpty();
  };

  const checkFormatState = () => {
    setFormatOptions({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      strike: document.queryCommandState('strikeThrough'),
      link: document.queryCommandState('createLink')
    });
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        checkFormatState();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <MessageInputContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormatToolbar>
          <FormatButton 
            type="button"
            className={formatOptions.bold ? 'active' : ''}
            onClick={() => toggleFormat('bold')}
            title="Bold (Ctrl+B)"
          >
            B
          </FormatButton>
          <FormatButton 
            type="button"
            className={formatOptions.italic ? 'active' : ''}
            onClick={() => toggleFormat('italic')}
            title="Italic (Ctrl+I)"
          >
            I
          </FormatButton>
          <FormatButton 
            type="button"
            className={formatOptions.strike ? 'active' : ''}
            onClick={() => toggleFormat('strike')}
            title="Strikethrough"
          >
            S
          </FormatButton>
          <FormatButton 
            type="button"
            className={formatOptions.link ? 'active' : ''}
            onClick={() => toggleFormat('link')}
            title="Link"
          >
            🔗
          </FormatButton>
        </FormatToolbar>
        
        {selectedFile && (
          <FilePreviewContainer>
            {filePreview && (
              <FilePreviewImage src={filePreview} alt="Preview" />
            )}
            <FilePreviewName>{selectedFile.name}</FilePreviewName>
            <RemoveFileButton onClick={clearSelectedFile} title="Remove file">
              ✕
            </RemoveFileButton>
          </FilePreviewContainer>
        )}
        
        <EditorArea 
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={`Message ${chatName}`}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
        
        <BottomControls>
          <FileUploadButton 
            type="button" 
            onClick={triggerFileInput}
            disabled={disabled}
            title="Upload an image"
          >
            +
          </FileUploadButton>
          <HiddenFileInput 
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
          />
          <SendButton 
            type="submit" 
            disabled={(isEmpty && !selectedFile) || disabled}
          >
            Send 
          </SendButton>
        </BottomControls>
      </StyledForm>
    </MessageInputContainer>
  );
};

export default MessageInput;