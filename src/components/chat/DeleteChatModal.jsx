import React from 'react';
import Button from '../common/Button';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalMessage,
  ModalFooter
} from './DeleteChatModal.styles';

const DeleteChatModal = ({ isOpen, onClose, onConfirm, chatName }) => {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Delete Chat</ModalTitle>
        </ModalHeader>
        
        <ModalBody>
          <ModalMessage>
            Are you sure you want to delete "{chatName}" chat? This action cannot be undone.
          </ModalMessage>
        </ModalBody>
        
        <ModalFooter>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onClose}
            style={{ backgroundColor: 'transparent', color: '#D1D2D3', border: '1px solid #565856' }}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={onConfirm}
            style={{ backgroundColor: '#E01E5A', color: 'white', border: 'none' }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteChatModal;
