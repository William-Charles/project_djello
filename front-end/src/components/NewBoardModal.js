/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import serialize from "form-serialize";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import { createBoard, createCard } from "../actions";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.toggle();
    let form = e.target;
    const data = serialize(form, { hash: true });
    this.props.createBoard(data);
  };

  onSuccessSubmit = e => {
    e.preventDefault();
    this.toggle();
    let form = e.target;
    const data = serialize(form, { hash: true });
    this.props.createCard(data);
  };

  render() {
    if (this.props.color === "success") {
      this.onSubmit = this.onSuccessSubmit;
    }
    return (
      <div>
        <Button color={this.props.color} onClick={this.toggle}>
          {this.props.title}
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input type="hidden" name="parent" value={this.props.parent} />
                <Input type="text" name="title" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createBoard: data => {
      dispatch(createBoard(data));
    },
    createCard: data => {
      dispatch(createCard(data));
    }
  };
};

export default connect(null, mapDispatchToProps)(ModalExample);
