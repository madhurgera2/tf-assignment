import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.variant === 'primary' && `
    background-color: #4a154b;
    color: white;
    border: none;
    
    &:hover {
      background-color: #611f69;
    }
    
    &:active {
      background-color: #350d36;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    color: #4a154b;
    border: 1px solid #4a154b;
    
    &:hover {
      background-color: rgba(74, 21, 75, 0.06);
    }
    
    &:active {
      background-color: rgba(74, 21, 75, 0.12);
    }
  `}
  
  ${props => props.variant === 'text' && `
    background-color: transparent;
    color: #4a154b;
    border: none;
    padding: 6px 8px;
    
    &:hover {
      background-color: rgba(74, 21, 75, 0.06);
    }
    
    &:active {
      background-color: rgba(74, 21, 75, 0.12);
    }
  `}
  
  ${props => props.fullWidth && `
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${props => props.children ? '8px' : '0'};
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  fullWidth = false,
  icon,
  onClick,
  ...props 
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      {...props}
    >
      {icon && icon}
      {children}
    </StyledButton>
  );
};

export default Button;
