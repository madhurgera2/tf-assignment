import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #D1D2D3;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #565856;
  border-radius: 4px;
  font-size: 15px;
  line-height: 1.5;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  background-color: #222529;
  color: #D1D2D3;
  
  &:focus {
    outline: none;
    border-color: #1264A3;
    box-shadow: 0 0 0 1px #1264A3;
  }
  
  &::placeholder {
    color: #9A9A9A;
  }
  
  &:disabled {
    background-color: #383A3E;
    cursor: not-allowed;
    color: #9A9A9A;
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
