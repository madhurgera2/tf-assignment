import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #1d1c1d;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 15px;
  line-height: 1.5;
  transition: border 0.2s ease;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #4a154b;
    box-shadow: 0 0 0 1px #4a154b;
  }
  
  &::placeholder {
    color: #9e9e9e;
  }
  
  &:disabled {
    background-color: #f8f8f8;
    cursor: not-allowed;
  }
`;

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  name,
  required = false,
  ...props
}) => {
  return (
    <InputWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledInput
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}
      />
    </InputWrapper>
  );
};

export default Input;
