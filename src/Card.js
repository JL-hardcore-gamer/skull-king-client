import React from 'react';
import styled from 'styled-components';

const GeneratedCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 130px;
  border-radius: 5px;
  border: 1px solid grey;
  background-color: ${({ bgColor }) => bgColor};
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const CardContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CardNumber = styled.span`
  font-size: 30px;
`;

const Card = ({ type, color, value, icon1, icon2 }) => {
  let cardContent = null;
  switch (type) {
    case 'red':
    case 'blue':
    case 'yellow':
    case 'black':
      cardContent = (
        <CardContent>
          <CardNumber>{value}</CardNumber>
        </CardContent>
      );
      break;
    case 'purple':
    case 'pink':
    case 'grey':
    case 'white':
      cardContent = (
        <>
          <CardTitle>{value}</CardTitle>
          <CardContent>
            <i className={`fas ${icon1} fa-3x`} />
          </CardContent>
        </>
      );
      break;
    case 'green':
      cardContent = (
        <>
          <CardTitle>{value}</CardTitle>
          <CardContent>
            <div>
              <i className={`fas ${icon1} fa-2x`} />
              <span style={{ fontSize: '40px' }}>/</span>
              <i className={`fas ${icon2} fa-2x`} />
            </div>
          </CardContent>
        </>
      );
      break;
    default:
      cardContent = (
        <CardContent>
          <CardNumber>{value}</CardNumber>
        </CardContent>
      );
  }

  return <GeneratedCard bgColor={color}>{cardContent}</GeneratedCard>;
};

export default Card;
