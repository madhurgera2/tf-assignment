import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 4px;
  background-color: ${props => props.color || '#553399'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
  text-transform: uppercase;
`;

const Avatar = ({ name, size, color }) => {
  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
    : 'U';

  return (
    <StyledAvatar size={size} color={color}>
      {initials}
    </StyledAvatar>
  );
};

export default Avatar;
