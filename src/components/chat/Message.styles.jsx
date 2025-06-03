import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

const MessageInputContainer = styled.div`
  display: flex;
  padding: 10px 16px 16px;
  border-top: 1px solid var(--border-color);
  background-color: var(--channel-bg);
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--input-bg);
  box-shadow: 0 0 0 1px var(--border-color);
`;

const InputField = styled.textarea`
  flex: 1;
  padding: 12px 16px 4px;
  border: none;
  font-size: 15px;
  background-color: var(--input-bg);
  color: var(--text-primary);
  min-height: 22px;
  line-height: 1.5;
  resize: none;
  font-family: Slack-Lato, Lato, appleLogo, sans-serif;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const FormattedPreview = styled.div`
  padding: 0 16px 8px;
  color: var(--text-primary);
  font-size: 15px;
  line-height: 1.5;
  font-family: Slack-Lato, Lato, appleLogo, sans-serif;
  overflow-wrap: break-word;
  max-height: 150px;
  overflow-y: auto;

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
  }

  .strike {
    text-decoration: line-through;
  }

  .link {
    color: #1D9BD1;
    text-decoration: underline;
  }

  .code {
    font-family: monospace;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 2px 4px;
    border-radius: 3px;
  }

  .codeBlock {
    font-family: monospace;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px;
    border-radius: 3px;
    display: block;
    margin: 8px 0;
    white-space: pre-wrap;
  }

  .bulletList {
    padding-left: 20px;
    list-style-type: disc;
  }

  .numberList {
    padding-left: 20px;
    list-style-type: decimal;
  }

  .listItem {
    margin-bottom: 4px;
  }
`;

const FormatToolbar = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 8px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--input-bg);
`;

const FormatButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;

  &:hover {
    color: var(--text-primary);
    background-color: var(--hover-bg);
  }

  &.active {
    color: var(--active-item);
    background-color: rgba(29, 155, 209, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px var(--active-item);
  }
`;

const BottomControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--input-bg);
`;

const LeftControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const RightControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 18px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    color: var(--text-primary);
    background-color: var(--hover-bg);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 18px;
  background-color: var(--border-color);
  margin: 0 4px;
`;

const SendButton = styled(ActionButton)`
  color: ${props => props.disabled ? 'var(--text-secondary)' : 'var(--active-item)'};
  transform: rotate(90deg);
  font-size: 22px;
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 8px;
  z-index: 10;
  width: 250px;
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 8px;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-bg);
  }
`;

const CloseButton = styled.button`
  background-color: var(--active-item);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0e5a8a;
  }
`;

const SuggestionContainer = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  background-color: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 8px;
  z-index: 10;
  width: 250px;
`;

const SuggestionList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 8px;
`;

const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--hover-bg);
  }
`;

const UserName = styled.span`
  margin-left: 8px;
  color: var(--text-primary);
  font-size: 14px;
`;

export {
  MessageInputContainer,
  StyledForm,
  InputField,
  FormattedPreview,
  FormatToolbar,
  FormatButton,
  BottomControls,
  LeftControls,
  RightControls,
  ActionButton,
  Divider,
  SendButton,
  EmojiPickerContainer,
  EmojiGrid,
  EmojiButton,
  CloseButton,
  SuggestionContainer,
  SuggestionList,
  SuggestionItem,
  UserName
};
