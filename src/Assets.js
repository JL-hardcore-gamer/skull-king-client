import React from 'react';
import styled from 'styled-components';

import { cardList } from './utils';
import Card from './Card';

const GeneratedCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const CardContainer = styled.div`
  margin: 10px;
`;

const Assets = () => {
  return (
    <div>
      Assets
      <GeneratedCardContainer>
        {cardList.map((card, idx) => {
          return (
            <CardContainer key={idx}>
              <Card {...card} />
            </CardContainer>
          );
        })}
      </GeneratedCardContainer>
    </div>
  );
};

export default Assets;
