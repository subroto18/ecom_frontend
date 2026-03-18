import React, { PureComponent, Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import SimpleReactValidator from "simple-react-validator";
import Link from "next/link";
import {connect} from "react-redux";
class UserProfilePart extends PureComponent {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
      }
  render() {
    let date = this.props.birthday;
    date = new Date(date);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = date.getFullYear()
    const month =  monthNames[date.getMonth()]
    const day = date.getDate()
    return (
      <Fragment>
          <Card className="profile-info-card">
          <Card.Body className="profileInfoCardBody">
            <Row className="profileRow">
              <Col lg={4} md={4} className="mb-3 profileInfos">
                <p className="my-profile-title">Full Name</p>
                <p className="my-profile-answer">{this.props.name}</p>
              </Col>
              {this.props.email!==null &&
                  <Col lg={4} md={4} className="mb-3 profileInfos">
                    <p className="my-profile-title">Email{" "}</p>
                    <p className="my-profile-answer">{this.props.email}</p>
                  </Col>
              }
              {this.props.phone!==null &&
                  <Col lg={4} md={4} className="mb-3 profileInfos">
                    <p className="my-profile-title">Mobile Number{" "}</p>
                    <p className="my-profile-answer">{this.props.phone}</p>
                  </Col>
              }
              <Col lg={4} md={4} className="mb-3 profileInfos">
                <p className="my-profile-title">Birthday</p>
                <p className="my-profile-answer">{day} {month} {year}</p>
              </Col>
              <Col lg={4} md={4} className="mb-3 profileInfos">
                <p className="my-profile-title">Gender</p>
                <p className="my-profile-answer">{this.props.gender}</p>
              </Col>
              <Col lg={12} md={12} sm={12} className="mt-5 profileInfos">
                <a className="profile-info-sub-news2" href="#">
                  Subscribe to our newsletter
                </a>
                <br />
                <div className="buttons">
                  <div>
                  <Link href="/edit-profile" className="profile-edit-btn mt-3 mb-3 btn editBtn">
                  Edit Profile
                </Link>
                  </div>
                <div>
                <Link href="/change-password" className="change-password-btn btn changeBtn">Change Password</Link>
                </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Fragment>
    )
  }
}


function mapStateToProps(state) {

  const name = state.userReducer.name;
  const email = state.userReducer.email;
  const phone = state.userReducer.phone;
  const gender = state.userReducer.gender;
  const birthday = state.userReducer.birthday;
  return {
    name,
    email,
    phone,
    gender,
    birthday
  };
}

export default connect(mapStateToProps)(UserProfilePart);

