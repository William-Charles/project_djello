import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import LoginForm from "../components/LoginForm";
import { getLoginRequest } from "../actions";
import serialize from "form-serialize";

class LoginContainer extends Component {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    //
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
    e.preventDefault();
    let form = e.target;
    const data = serialize(form, { hash: true });
    this.props.getLoginRequest(data);
  };

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/home" />;
    }
    return <LoginForm onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLoginRequest: data => {
      dispatch(getLoginRequest(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
