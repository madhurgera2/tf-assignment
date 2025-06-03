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
    background-color: #007a5a;
    color: white;
    border: none;
    
    &:hover {
      background-color: #148567;
    }
    
    &:active {
      background-color: #006e51;
    }
  `}
  
  ${props => props.variant === 'secondary' && `
    background-color: transparent;
    color: #D1D2D3;
    border: 1px solid #565856;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.06);
    }
    
    &:active {
      background-color: rgba(255, 255, 255, 0.12);
    }
  `}
  
  ${props => props.variant === 'text' && `
    background-color: transparent;
    color: #1D9BD1;
    border: none;
    padding: 6px 8px;
    
    &:hover {
      background-color: rgba(29, 155, 209, 0.06);
    }
    
    &:active {
      background-color: rgba(29, 155, 209, 0.12);
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
