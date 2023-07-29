import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.2rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 2rem;
  width: 2.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;



function UserAvatar() {

    const { user } = useSelector((state) => state.auth);
  return (
    <StyledUserAvatar>
        <Avatar 
        // src={avatar || "default-user.jpg"}
        src={ "default-user.jpg"}
        alt={`Avatar of ${user && user.name} `}
        
        />

        <span>{user && user.name}</span>
        
        </StyledUserAvatar>
  )
}

export default UserAvatar