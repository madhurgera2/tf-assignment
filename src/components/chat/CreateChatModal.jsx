import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 400px;
  max-width: calc(100% - 32px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e2e2e2;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const ModalBody = styled.div`
  padding: 16px;
`;

const ModalFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #e2e2e2;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

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
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!chatName.trim() || isSubmitting}
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
