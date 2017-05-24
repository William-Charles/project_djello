import React from "react";
import { Container, Row, Col } from "reactstrap";
import Spinner from "./Spinner";
import BoardCard from "./BoardCard";
import NewBoardModal from "./NewBoardModal";

const BoardList = ({ boards, isFetching }) => {
  if (isFetching) {
    return <Spinner />;
  }

  const listOfBoards = boards.map(board => {
    return (
      <Col md="12" lg="3" key={board.title}>
        <BoardCard board={board} />
        <br />
      </Col>
    );
  });

  return (
    <div>
      <h1>Welcome to the Boards</h1>
      <NewBoardModal buttonLabel={"Create New Board"} />
      <br />
      <Row>
        {listOfBoards}
      </Row>

    </div>
  );
};

export default BoardList;
