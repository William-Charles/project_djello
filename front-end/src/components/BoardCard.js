import React from "react";
import CardCard from "./CardCard.js";
import { connect } from "react-redux";
import { createCard } from "../actions";

import {
  Card,
  CardImg,
  CardText,
  CardBlock,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import NewBoardModal from "../components/NewBoardModal";

const BoardCard = ({ board }) => {
  // console.log("This is from BoardCard");
  // console.log(board);
  // console.log("++++++++++++++++++");
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
        <CardBlock>
          <NewBoardModal
            title={"New Card"}
            color={"success"}
            parent={board.title}
          />
        </CardBlock>

      </Card>
    </div>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     createCard: data => {
//       dispatch(createCard(data));
//     }
//   };
// };

export default BoardCard;
