import React, { useState, useRef, useEffect } from 'react';
import LinkModal from './LinkModal';
import {
  MessageInputContainer,
  StyledForm,
  FormatToolbar,
  FormatButton,
  EditorArea,
  FilePreviewContainer,
  FilePreviewImage,
  FilePreviewName,
  RemoveFileButton,
  BottomControls,
  SendButton,
  FileUploadButton,
  HiddenFileInput
} from './MessageInput.styles';

const MessageInput = ({ onSendMessage, disabled, chatName = 'general' }) => {
  const fileInputRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [formatOptions, setFormatOptions] = useState({
    bold: false,
    italic: false,
    strike: false,
    link: false,
  });

  const editorRef = useRef(null);

  const checkIfEmpty = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText.trim();
      setIsEmpty(text === '');
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedFile) {
      const caption = editorRef.current ? editorRef.current.innerHTML : '';
      
      onSendMessage(caption, selectedFile);
      
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      setIsEmpty(true);
      clearSelectedFile();
      
      setFormatOptions({
        bold: false,
        italic: false,
        strike: false,
        link: false
      });
    } else if (editorRef.current && !isEmpty) {
      const content = editorRef.current.innerHTML;
      
      onSendMessage(content);
      
      editorRef.current.innerHTML = '';
      setIsEmpty(true);
      
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
      span.textContent = '\u200B';
      
      range.insertNode(span);
      
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
          // Save the current selection before opening modal
          setCurrentSelection({
            range: selection.getRangeAt(0).cloneRange(),
            text: selection.toString()
          });
          setIsLinkModalOpen(true);
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
      
      <LinkModal 
        isOpen={isLinkModalOpen}
        onClose={() => {
          setIsLinkModalOpen(false);
          setFormatOptions({ ...formatOptions, link: false });
          editorRef.current.focus();
        }}
        onConfirm={(url) => {
          const openInNewWindow = document.getElementById('open-new-window')?.checked;
          
          if (currentSelection) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(currentSelection.range);
            
            if (openInNewWindow) {
              const range = currentSelection.range.cloneRange();
              const linkElement = document.createElement('a');
              linkElement.href = url;
              linkElement.target = '_blank';
              linkElement.rel = 'noopener noreferrer';
              linkElement.textContent = currentSelection.text;
              range.deleteContents();
              range.insertNode(linkElement);
              setFormatOptions({ ...formatOptions, link: true });
            } else {
              applyFormatToSelection('createLink', url, true);
            }
          }
          
          setIsLinkModalOpen(false);
          setTimeout(() => {
            editorRef.current.focus();
          }, 0);
        }}
      />
    </MessageInputContainer>
  );
};

export default MessageInput;