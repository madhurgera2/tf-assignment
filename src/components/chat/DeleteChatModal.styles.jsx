import styled from 'styled-components';

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background-color: #1A1D21;
  border-radius: 8px;
  width: 400px;
  max-width: calc(100% - 32px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  color: #D1D2D3;
  border: 1px solid #383838;
`;

export const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #383838;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #D1D2D3;
  font-weight: 600;
`;

export const ModalBody = styled.div`
  padding: 16px;
`;

export const ModalMessage = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.5;
`;

export const ModalFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #383838;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
