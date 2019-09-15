import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Profile() {
    return (
<Container>
        <Row xs="true" sm="true" md="true" lg="true" >
        <Col xs={2} xm={2} md={2} lg={2}></Col>
          <Col xs="true" sm="true" md="true" lg="true" >
                <Row>
                <Col xs={3} xm={3} md={3} lg={3}></Col>
                <Col xs="true" sm="true" md="true" lg="true" >
            <div style={{'width':800+'px'},{'margin':0+' auto'}}>      
                <div style={{'padding': 2+'em'}}>
                    <h1>{`Group.name`}</h1>
                    <div style={{'padding-top':  2+'em'}}></div>
                    <h3>Your friends</h3>
                    <ul>
                        <li><a href="/groups/{id}">{`friends.name`}</a></li>
                        <li><Button href="/addGroup">Add friend</Button></li>
                    </ul>
                    </div>
            </div>
            </Col>
            <Col xs={3} xm={3} md={3} lg={3}></Col>
            </Row>
        </Col>
          <Col xs={2} xm={2} md={2} lg={2}></Col>
      </Row>
      </Container>

    );
  }

  export default Profile;
