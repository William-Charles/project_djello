import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBlock,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

const CardCard = ({ card }) => {
  return (
    <div>
      <Card>
        <CardBlock>
          <CardSubtitle>{card.title}</CardSubtitle>
          <CardText>
            {card.desc}
          </CardText>
        </CardBlock>
      </Card>
    </div>
  );
};

export default CardCard;
