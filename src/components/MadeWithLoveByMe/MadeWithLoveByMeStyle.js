import styled from 'styled-components';

export const Container = styled.p`
  text-align: center;
  margin: 0px;
  height: 10vh;
`;

export const HeartIcon = styled.i`
  color: ${(props) => props.heartColor};
`;
