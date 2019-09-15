import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Profile.css';
import axios from 'axios';
function Profile() {
    
    const schedule = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ,0,0,0,0,0,0];
 

    function checkDay(num) {
        const day = Math.floor(num/144);
        let ansDay = "";
        if(day===0){
            ansDay="Monday"
        }
        else if(day===1) {
            ansDay="Tuesday"
        }
        else if(day===2) {
            ansDay="Wednesday"
        }
        else if(day===3) {
            ansDay="Thursday"
        }
        else if(day===4) {
            ansDay="Friday"
        }
        else if(day===5) {
            ansDay="Saturday"
        }
        else if(day===6) {
            ansDay="Sunday"
        }
        return ansDay;
    }

    function checkHourRange(num) {
        const hour = Math.floor((num%144)/6);
        const mod = (num%144)%6;
        let ans=""
        if(mod===0) {
            ans=hour+":"+"00 - "+hour+":"+"09";
        }
        else if(mod===1) {
            ans=hour+":"+"10 - "+hour+":"+"19";
        }
        else if(mod===2) {
            ans=hour+":"+"20 - "+hour+":"+"29";
        }
        else if(mod===3) {
            ans=hour+":"+"30 - "+hour+":"+"39";
        }
        else if(mod===4) {
            ans=hour+":"+"40 - "+hour+":"+"49";
        }
        else if(mod===5) {
            ans=hour+":"+"50 - "+hour+":"+"59";
        }
        return ans;
    }

    function busyHours (schedule) {
        let array =[]
        var i;
        for (i = 0; i < schedule.length; i++) {
            var day;
            var hourRange;
            if(schedule[i]===1){
                day=checkDay(i);
                hourRange=checkHourRange(i);
                array.push(day+" "+hourRange);
            }
            
          }

        const listItems = array.map((scheduleEvent) =>
            <li>{scheduleEvent}</li>
        );
        ReactDOM.render(
            <ul>{listItems}</ul>,
            document.getElementById('list')
          );
          
    }


    function peticionGrupos() {
        let headers = {
            headers: {
                'idUsuario': 'jframos29'
            }
        };
        var array=[];
          axios.get('http://ufree.herokuapp.com/usuario/misParches',  headers)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            console.log("RESPONSE RECEIVED: ", res.data);
            res.data.forEach(element => {
                console.log(element);
                
                element.forEach(element2 => {
                   
                  
                    console.log(element2.idAdmin)
                    console.log(element2.nombreParche) 
                    array.push(element2.nombreParche+" - admin: "+element2.idAdmin);
                    console.log(array);
                    getGroups(array)
                });
                
            });
            
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
        return array;
        
    }

    function getGroups(array) {
        console.log("llega", array);
        const listItems = array.map((line) =>
            <li><a href='/grupo/'>{line}</a></li>
        );
        ReactDOM.render(
            <ul>{listItems}</ul>,
            document.getElementById('groups')
            ); 
              }
         
    useEffect(() => {
        busyHours(schedule);
        console.log()

        peticionGrupos();
      });

    return (
        <Container>
        <Row xs sm md lg>
        <Col xs={2} xm={2} md={2} lg={2}></Col>
          <Col xs sm md lg>
                <Row>
                <Col xs={3} xm={3} md={3} lg={3}></Col>
                <Col xs sm md lg>
            <div style={{'width':800+'px'},{'margin':0+' auto'}}>      
                <div style={{'padding': 2+'em'}}>
                    <h1>Welcome {`user`}</h1>
                    <div style={{'padding-top':  2+'em'}}></div>
                    
                    </div>
            </div>
            </Col>
            <Col xs={3} xm={3} md={3} lg={3}></Col>
            </Row>
        </Col>
          <Col xs={2} xm={2} md={2} lg={2}></Col>
      </Row>
      <div id="toCenter">
          
      </div>
      <div id="toLeft">
      <h3>Your groups</h3>
      <div id="groups">Cargando tus grupos...</div>
                    <Button href="/addGroup">Add new group</Button>
                    <br/>
                    <br/>
                    <Button href="/busyHours">Add busy hours</Button>
                    <br/>
                    <br/>
                    <Button href="/UFree">Check who is available</Button>
                    
                    </div>

    <div id="toRight">
        <h3>Your schedule</h3>
        <div id="list">Cargando tu calendario</div>
                    </div>
      </Container>
    );
  }

  export default Profile;
