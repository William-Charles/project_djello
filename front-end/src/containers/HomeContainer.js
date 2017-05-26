import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import BoardList from "../components/BoardList";
import { getLoginRequest, getBoards } from "../actions";
import serialize from "form-serialize";

class HomeContainer extends Component {
  // constructor() {
  //   super();
  //
  // }

  componentDidMount() {
    const testBoardArray = [];

    this.props.getBoards(testBoardArray);
  }
  // componentWillReceiveProps(newProps) {
  //   let newResults = newProps.results;
  //
  //   if (newProps.searchTerm !== "") {
  //     newResults = newResults.filter(stock => {
  //       return stock.ticker.includes(newProps.searchTerm);
  //     });
  //     this.props.getLoginRequest(newResults);
  //   }
  // }

  onSubmit = e => {
    let form = e.target;
    const data = serialize(form, { hash: true });
    this.props.getLoginRequest(data);
  };

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <BoardList
            boards={this.props.boards}
            isFetching={this.props.isFetching}
          />
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    boards: state.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLoginRequest: data => {
      dispatch(getLoginRequest(data));
    },
    getBoards: data => {
      dispatch(getBoards(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
