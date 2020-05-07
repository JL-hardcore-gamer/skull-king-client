import React from 'react';
import styled from 'styled-components';

export const CURSOR_NORMAL = 'NORMAL';
export const CURSOR_CLICKABLE = 'CLICKABLE';
export const CURSOR_DISABLE = 'DISABLE';

const GeneratedCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100px;
  height: 130px;
  border-radius: 5px;
  border: 1px solid grey;
  background-color: ${({ bgColor }) => bgColor};
  cursor: ${({ cursor }) => cursor};
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
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

const Card = ({ type, color, value, icon1, icon2, cursor }) => {
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
    case 'green-choice':
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

  let cursorState;

  switch (cursor) {
    case CURSOR_NORMAL:
      cursorState = 'default';
      break;
    case CURSOR_CLICKABLE:
      cursorState = 'pointer';
      break;
    case CURSOR_DISABLE:
      cursorState = 'not-allowed';
      break;
    default:
      cursorState = 'default';
  }

  return (
    <GeneratedCard bgColor={color} cursor={cursorState}>
      {cardContent}
    </GeneratedCard>
  );
};

export default Card;
