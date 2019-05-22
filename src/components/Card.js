import styled from 'styled-components';

const Card = styled.div`
  color: #fff;
  width: 33.333333%;  /* ideally the width would be set externally by an external component, like Grid etc  */
  height: 450px;
  text-shadow: 1px 1px 0 #000;
  background-size: cover;
  background-position: top;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

Card.Popularity = styled.div`
  font-size: 40px;
  padding: 10px;
`;

export default Card;