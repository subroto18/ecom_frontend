import React, { PureComponent, Fragment } from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import parse from "html-react-parser";

import { connect } from "react-redux";
import { setCookie } from "../../../services/actions/commonAction";

class Cookie extends PureComponent {
  constructor() {
    super();
    this.state = {
      class: "",
      modal: true,
      cookie: false,
    };
    this.onAgree = this.onAgree.bind(this);
    this.onDisAgree = this.onDisAgree.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ cookie: true });
    }, 2000);
  }
  onAgree() {
    this.setState({
      modal: false,
    });
  }
  onDisAgree() {
    this.setState({
      modal: false,
    });
    this.props.setCookie("cookie", 1, 1);
  }
  render() {
    const html = `${this.props.cookieText}`;
    return (
      <Fragment>
        <Container>
          {this.state.cookie && (
            <Modal
              show={this.state.modal}
              backdrop="static"
              keyboard={false}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              className="popupModal"
            >
              <Modal.Body>
                <div className="cookieDiv">
                  <p> {parse(html)}</p>
                  <div>
                    <Button onClick={this.onAgree} className="mr-2 mt-2">
                      I Agree
                    </Button>
                    <Button onClick={this.onDisAgree} className="mt-2">
                      Not Agree
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  setCookie,
};

function mapStateToProps(state) {
  const cookieText = state.starterReducer.cookieText;
  return {
    cookieText,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cookie);
