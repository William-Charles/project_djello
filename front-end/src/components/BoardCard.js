import React from "react";
import CardCard from "./CardCard.js";
import {
  Card,
  CardImg,
  CardText,
  CardBlock,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

const BoardCard = ({ board }) => {
  const cardList = board.cards.map(card => {
    return <CardCard key={card.title} card={card} />;
  });

  return (
    <div>
      <Card>
        <CardBlock>
          <CardTitle>{board.title}</CardTitle>
          <CardSubtitle>
            {board.desc}
          </CardSubtitle>
        </CardBlock>
        <CardBlock>
          {cardList}
        </CardBlock>
      </Card>
    </div>
  );
};

export default BoardCard;
