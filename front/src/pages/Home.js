import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Profile() {
    return (
        <Container>
        <Row xs sm md lg>
        <Col xs={1} xm={1} md={1} lg={1}></Col>
          <Col xs sm md lg>
                <Row>
                <Col xs={0} xm={0} md={1} lg={1}></Col>
                <Col xs sm md lg>
              <div style={{'width':800+'px'},{'margin':0+' auto'}}>      
                  <div style={{'padding': 7+'em'}}>
                      <h1>Welcome to UFree</h1>
                      <h3>Stop bothering your friends in Whatsapp or Messenger!<br/>
                Register, create a group, schedule your week events ONCE and you'll know 
                in real time which of your friends have some time available!!
                    </h3>
                      </div>
              </div>
              </Col>
            <Col xs={0} xm={0} md={1} lg={1}></Col>
            </Row>

        </Col>
          <Col xs={1} xm={1} md={1} lg={1}></Col>
      </Row>
      </Container>
    );
  }

  export default Profile;
