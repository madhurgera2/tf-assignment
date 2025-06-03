import React, { useState, useRef, useEffect } from 'react';
import Avatar from '../common/Avatar';
import { createEditor, Editor, Transforms, Text, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import {
  MessageInputContainer,
  StyledForm,
  InputField,
  FormattedPreview,
  FormatToolbar,
  FormatButton,
  Divider,
  BottomControls,
  LeftControls,
  RightControls,
  ActionButton,
  SendButton,
  EmojiPickerContainer,
  EmojiGrid,
  EmojiButton,
  CloseButton,
  SuggestionContainer,
  SuggestionList,
  SuggestionItem,
  UserName
} from './Message.styles.jsx';

// Simple emoji picker component
const EmojiPicker = ({ onSelectEmoji, onClose }) => {
  const commonEmojis = [
    '😊', '👍', '🎉', '❤️', '🔥', 
    '😂', '🙏', '👏', '🤔', '😢', 
    '💪', '✅', '⭐', '💯', '🚀'
  ];
  
  return (
    <EmojiPickerContainer>
      <EmojiGrid>
        {commonEmojis.map((emoji, index) => (
          <EmojiButton 
            key={index} 
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </EmojiButton>
        ))}
      </EmojiGrid>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </EmojiPickerContainer>
  );
};

// Users for mention suggestions
const mockUsers = [
  { id: 1, name: 'Saurav Kumar' },
  { id: 2, name: 'Gokul Nk' },
  { id: 3, name: 'Aditya Shankar' },
  { id: 4, name: 'Ravi Prakash' },
  { id: 5, name: 'Priya Singh' }
];

// Mention suggestions component
const MentionSuggestions = ({ query, onSelectUser, onClose }) => {
  // Filter users based on query
  const filteredUsers = query.trim() === '' 
    ? mockUsers 
    : mockUsers.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
      );
  
  return (
    <SuggestionContainer>
      <SuggestionList>
        {filteredUsers.map(user => (
          <SuggestionItem 
            key={user.id} 
            onClick={() => onSelectUser(user)}
          >
            <Avatar size="24px" name={user.name} />
            <UserName>{user.name}</UserName>
          </SuggestionItem>
        ))}
      </SuggestionList>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </SuggestionContainer>
  );
};

// Simple utility to format markdown text for preview
const formatMarkdown = (text) => {
  if (!text) return '';
  
  // Format the text with HTML elements instead of markdown syntax
  let formatted = text;
  
  // Bold
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>');
  
  // Italic
  formatted = formatted.replace(/_(.*?)_/g, '<span class="italic">$1</span>');
  
  // Strikethrough
  formatted = formatted.replace(/~~(.*?)~~/g, '<span class="strike">$1</span>');
  
  // Links
  formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="link">$1</a>');
  
  // Code blocks
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<div class="codeBlock">$1</div>');
  
  // Inline code
  formatted = formatted.replace(/`([^`]+)`/g, '<span class="code">$1</span>');
  
  // Bullet lists - simplified regex to avoid complex patterns
  const bulletListItems = [];
  const lines = formatted.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('•')) {
      bulletListItems.push(lines[i].replace(/^\s*•\s+(.*)$/, '<li class="listItem">$1</li>'));
      lines[i] = '';
    }
  }
  
  if (bulletListItems.length > 0) {
    formatted = lines.join('\n');
    formatted += `<ul class="bulletList">${bulletListItems.join('')}</ul>`;
  }
  
  // Numbered lists - simplified regex to avoid complex patterns
  const numberedListItems = [];
  const lines2 = formatted.split('\n');
  for (let i = 0; i < lines2.length; i++) {
    if (/^\s*\d+\.\s/.test(lines2[i])) {
      numberedListItems.push(lines2[i].replace(/^\s*\d+\.\s(.*)$/, '<li class="listItem">$1</li>'));
      lines2[i] = '';
    }
  }
  
  if (numberedListItems.length > 0) {
    formatted = lines2.join('\n');
    formatted += `<ol class="numberList">${numberedListItems.join('')}</ol>`;
  }
  
  // Format line breaks
  formatted = formatted.replace(/\n/g, '<br />');
  
  return formatted;
};



const MessageInput = ({ onSendMessage, disabled, chatName = 'general' }) => {
  const [message, setMessage] = useState('');
  const [formatOptions, setFormatOptions] = useState({
    bold: false,
    italic: false,
    strike: false,
    link: false,
    bulletList: false,
    numberList: false,
    code: false,
    codeBlock: false
  });
  
  // UI state
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  
  const textareaRef = useRef(null);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Send the message with formatting intact
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const saveSelection = () => {
    if (textareaRef.current) {
      setSelectionStart(textareaRef.current.selectionStart);
      setSelectionEnd(textareaRef.current.selectionEnd);
    }
  };

  const restoreSelection = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(selectionStart, selectionEnd);
    }
  };
  
  const toggleFormat = (format) => {
    // This actually applies the formatting and updates the state
    setFormatOptions(prev => ({
      ...prev,
      [format]: !prev[format]
    }));
  };

  const getSelectedText = () => {
    if (textareaRef.current) {
      return message.substring(selectionStart, selectionEnd);
    }
    return '';
  };
  
  const insertText = (textToInsert) => {
    if (textareaRef.current) {
      const start = selectionStart;
      const end = selectionEnd;
      const beforeText = message.substring(0, start);
      const afterText = message.substring(end);
      
      const newText = `${beforeText}${textToInsert}${afterText}`;
      setMessage(newText);
      
      // Set cursor position after insertion
      const newPosition = start + textToInsert.length;
      
      // Use setTimeout to ensure state has been updated
      setTimeout(() => {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };
  
  const applyFormatting = (format) => {
    saveSelection();
    const selectedText = getSelectedText();
    
      // Apply formatting only if text is selected or format is list
    if (selectedText || format.includes('List')) {
      switch (format) {
        case 'bold':
          insertFormatting('**', '**', selectedText);
          break;
        case 'italic':
          insertFormatting('_', '_', selectedText);
          break;
        case 'strike':
          insertFormatting('~~', '~~', selectedText);
          break;
        case 'link':
          const url = selectedText.includes('http') ? selectedText : 'https://';
          if (selectedText && selectedText.includes('http')) {
            insertFormatting('[', `](${url})`, selectedText);
          } else {
            insertFormatting('[', `](${url})`, selectedText);
          }
          break;
        case 'bulletList':
          if (selectedText) {
            // Format each line with bullet
            const lines = selectedText.split('\n');
            const formattedText = lines.map(line => `• ${line}`).join('\n');
            insertReplacement(formattedText, selectedText);
          } else {
            insertText('• ');
          }
          break;
        case 'numberList':
          if (selectedText) {
            // Format each line with numbers
            const lines = selectedText.split('\n');
            const formattedText = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
            insertReplacement(formattedText, selectedText);
          } else {
            insertText('1. ');
          }
          break;
        case 'code':
          insertFormatting('`', '`', selectedText);
          break;
        case 'codeBlock':
          insertFormatting('```\n', '\n```', selectedText);
          break;
        default:
          break;
      }
      
      // Toggle the format option state
      toggleFormat(format);
      
      // No need to set preview mode anymore as we're using WYSIWYG
    }
  };
  
  // Helper function to insert formatting around selected text
  const insertFormatting = (before, after, selectedText) => {
    if (textareaRef.current) {
      const start = selectionStart;
      const end = selectionEnd;
      const beforeText = message.substring(0, start);
      const afterText = message.substring(end);
      
      const newText = `${beforeText}${before}${selectedText}${after}${afterText}`;
      setMessage(newText);
      
      // Set cursor position after insertion
      const newPosition = start + before.length + selectedText.length + after.length;
      
      // Use setTimeout to ensure state has been updated
      setTimeout(() => {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };
  
  // Helper function to replace selected text
  const insertReplacement = (replacement, selectedText) => {
    if (textareaRef.current) {
      const start = selectionStart;
      const end = selectionEnd;
      const beforeText = message.substring(0, start);
      const afterText = message.substring(end);
      
      const newText = `${beforeText}${replacement}${afterText}`;
      setMessage(newText);
      
      // Set cursor position after replacement
      const newPosition = start + replacement.length;
      
      // Use setTimeout to ensure state has been updated
      setTimeout(() => {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };
  
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };
  
  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setMessage(newValue);
    resizeTextarea();
  };
  
  const handleSelect = () => {
    saveSelection();
  };
  
  return (
    <MessageInputContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormatToolbar>
          <FormatButton 
            type="button" 
            title="Bold (⌘B)" 
            className={formatOptions.bold ? 'active' : ''}
            onClick={() => applyFormatting('bold')}
          >
            <strong>B</strong>
          </FormatButton>
          <FormatButton 
            type="button" 
            title="Italic (⌘I)" 
            className={formatOptions.italic ? 'active' : ''}
            onClick={() => applyFormatting('italic')}
          >
            <em>I</em>
          </FormatButton>
          <FormatButton 
            type="button" 
            title="Strikethrough (⌘Shift+X)" 
            className={formatOptions.strike ? 'active' : ''}
            onClick={() => applyFormatting('strike')}
          >
            <span style={{ textDecoration: 'line-through' }}>S</span>
          </FormatButton>
          <FormatButton 
            type="button" 
            title="Link (⌘Shift+U)" 
            className={formatOptions.link ? 'active' : ''}
            onClick={() => applyFormatting('link')}
          >
            🔗
          </FormatButton>
          <Divider />
          <FormatButton 
            type="button" 
            title="Bulleted list (⌘Shift+8)" 
            className={formatOptions.bulletList ? 'active' : ''}
            onClick={() => applyFormatting('bulletList')}
          >
            •
          </FormatButton>
          <FormatButton 
            type="button" 
            title="Numbered list (⌘Shift+7)" 
            className={formatOptions.numberList ? 'active' : ''}
            onClick={() => applyFormatting('numberList')}
          >
            1.
          </FormatButton>
          <Divider />
          <FormatButton 
            type="button" 
            title="Code (⌘Shift+C)" 
            className={formatOptions.code ? 'active' : ''}
            onClick={() => applyFormatting('code')}
          >
            {'<>'}
          </FormatButton>
          <FormatButton 
            type="button" 
            title="Code block (⌘Shift+Alt+C)" 
            className={formatOptions.codeBlock ? 'active' : ''}
            onClick={() => applyFormatting('codeBlock')}
          >
            {'{}'}
          </FormatButton>
        </FormatToolbar>
        
        {/* Hidden textarea to store raw markdown */}
        <div style={{ display: 'none' }}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            onSelect={handleSelect}
            onBlur={saveSelection}
          />
        </div>
        
        {/* WYSIWYG editor - show only formatted content */}
        <FormattedPreview 
          contentEditable
          dangerouslySetInnerHTML={{ __html: message ? formatMarkdown(message) : '' }}
          placeholder={`Message ${chatName ? `#${chatName}` : 'Saurav Kumar'}`}
          onInput={(e) => {
            // Capture HTML content and convert back to markdown
            const html = e.currentTarget.innerHTML;
            // This is a simplified approach - in a real implementation you'd need
            // a more sophisticated HTML-to-markdown converter
            setMessage(html.replace(/<[^>]*>/g, ''));
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          onClick={() => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              saveSelection();
            }
          }}
          style={{
            minHeight: '44px',
            outline: 'none',
            padding: '12px 16px',
            lineHeight: '1.5',
            fontSize: '15px',
            color: 'var(--text-primary)',
            backgroundColor: 'transparent'
          }}
        />
        
        <BottomControls>
          <LeftControls>
            <ActionButton 
              title="Add" 
              disabled={disabled}
              onClick={() => insertText('+ ')}
            >
              +
            </ActionButton>
            <ActionButton 
              title="Format text" 
              disabled={disabled}
              onClick={() => {
                // This button could be used for other formatting options
                // or to show a formatting menu
              }}
            >
              Aa
            </ActionButton>
            <ActionButton 
              title="Emoji" 
              disabled={disabled}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              😊
            </ActionButton>
            <ActionButton 
              title="Mention someone" 
              disabled={disabled}
              onClick={() => setShowMentionSuggestions(!showMentionSuggestions)}
            >
              @
            </ActionButton>
            <div className="picker-container">
              {showEmojiPicker && (
                <EmojiPicker 
                  onSelectEmoji={(emoji) => {
                    insertText(emoji);
                    setShowEmojiPicker(false);
                  }}
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}
              {showMentionSuggestions && (
                <MentionSuggestions 
                  query={mentionQuery}
                  onSelectUser={(user) => {
                    insertText(`@${user.name} `);
                    setShowMentionSuggestions(false);
                  }}
                  onClose={() => setShowMentionSuggestions(false)}
                />
              )}
            </div>
          </LeftControls>
          
          <RightControls>
            <SendButton 
              type="submit" 
              title="Send message"
              disabled={!message.trim() || disabled}
            >
              ➤
            </SendButton>
          </RightControls>
        </BottomControls>
      </StyledForm>
    </MessageInputContainer>
  );
};

export default MessageInput;