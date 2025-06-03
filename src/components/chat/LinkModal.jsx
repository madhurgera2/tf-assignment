import React, { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from './LinkModal.styles';

const LinkModal = ({ isOpen, onClose, onConfirm }) => {
  const [url, setUrl] = useState('https://');
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onConfirm(url);
    }
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Insert Link</ModalTitle>
          </ModalHeader>
          
          <ModalBody>
            <Input
              label="URL"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              ref={inputRef}
            />
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <input 
                type="checkbox" 
                id="open-new-window" 
                defaultChecked={true} 
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="open-new-window" style={{ fontSize: '14px' }}>
                Open link in new window
              </label>
            </div>
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
              type="submit" 
              style={{ backgroundColor: '#1264A3', color: 'white', border: 'none' }}
            >
              Insert
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LinkModal;
