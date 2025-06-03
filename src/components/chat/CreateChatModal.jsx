import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from './CreateChatModal.styles';

const CreateChatModal = ({ isOpen, onClose, onCreateChat }) => {
  const [chatName, setChatName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatName.trim()) {
      setIsSubmitting(true);
      onCreateChat(chatName.trim())
        .finally(() => {
          setIsSubmitting(false);
          setChatName('');
          onClose();
        });
    }
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Create New Chat</ModalTitle>
          </ModalHeader>
          
          <ModalBody>
            <Input
              label="Chat Name"
              placeholder="Enter a name for your chat"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              required
              autoFocus
            />
          </ModalBody>
          
          <ModalFooter>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              disabled={isSubmitting}
              style={{ backgroundColor: 'transparent', color: '#D1D2D3', border: '1px solid #565856' }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!chatName.trim() || isSubmitting}
              style={{ backgroundColor: '#007a5a', color: 'white', border: 'none' }}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateChatModal;
