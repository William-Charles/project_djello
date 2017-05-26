import React from "react";
import { Card, CardBlock, CardSubtitle } from "reactstrap";

const CardCard = ({ card }) => {
  return (
    <div>
      <Card>
        <CardBlock>
          <CardSubtitle>{card.title}</CardSubtitle>
        </CardBlock>
      </Card>
    </div>
  );
};

export default CardCard;
