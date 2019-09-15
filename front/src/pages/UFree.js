import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
class  UFree extends React.Component {
    idUsuario ='jframos29';
    idAdmin = '';
    nombreParche = '';
    day =0;
    date = new Date();
    constructor(props) {
        super(props);
        this.array=[];
        let current_datetime = new Date();
        this.date = current_datetime;
        this.state = {value: 'El llavero - admin: jframos29',
        date: this.date };
        this.darHora();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

      }
      
      tellDayInArray(str) {
          if(str==='Mon') return 0;
          else if (str==='Tue') return 1;
          else if (str==='Wed') return 2;
          else if (str==='Thu') return 3;
          else if (str==='Fri') return 4;
          else if (str==='Sat') return 5;
          else if (str==='Sun') return 6;
          
      }

      handleChange(event) {
        this.setState({value: event.target.value});
        
      }

      darHora() {
          console.log(this.date)
          let b = String(this.date).split(" ")[4].split(":");
          let dia = parseInt(this.tellDayInArray(String(this.date).split(" ")[0]))*144;
          let hora = parseInt(b[0])*6;
          let min = parseInt(b[1]);
          this.hora = dia+hora+min;
      }
 
      componentDidMount() {
        this.peticionGrupos();
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }

    isAvailable() {
        let headers = {
            headers: {
                'nombreParche': this.nombreParche,
                'idAdmin' : this.idAdmin,
                'hora' : 925
            }
        };
        var array=[];
          axios.get('http://ufree.herokuapp.com/parche/libres',  headers)
          .then((res) => {
            res.data.forEach(element => {
                array.push(String(element))
                console.log(array, typeof(array), array[0]);
            });
          })
          .then((res) => {
                const listItems = array.map((line) =>
            <li>{line}</li>
            );
            ReactDOM.render(
                <ul>{listItems}</ul>,
                document.getElementById('libres')
                ); 
            }
          )
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
          
        }
        


      handleSubmit(event) {
        
        this.idAdmin = this.state.value.split(" - admin: ")[1];
        this.nombreParche = this.state.value.split(" - admin: ")[0];
        console.log(this.nombreParche);
        console.log(this.state.value.split(" - admin: ")[0]);
        this.isAvailable();
        event.preventDefault();
      }
   
     peticionGrupos() {
        let headers = {
            headers: {
                'idUsuario': this.idUsuario
            }
        };

          axios.get('http://ufree.herokuapp.com/usuario/misParches',  headers)
          .then((res) => {
            res.data.forEach(element => {
                element.forEach(element2 => {
                    this.array.push(element2.nombreParche+" - admin: "+element2.idAdmin);
                    this.getGroups(this.array)
                });
            });
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          })
        return this.array;
        
    }

    getGroups(array) {
        const listItems = array.map((event) =>
            <option value={event}>{event}</option>
        );
        ReactDOM.render(
            <select  value={this.state.value} onChange={this.handleChange} name="groups">{listItems}</select>,
            document.getElementById('list')
          );}
         


    render() {
        return (
            <Container>
        <Row xs sm md lg>
        <Col xs={1} xm={1} md={1} lg={1}></Col>
          <Col xs sm md lg>
                <form onSubmit={this.handleSubmit}>

                <br/><br/>
                    <div id="list"></div>
                    <input type="submit" value="Check"/>
                    </form>
                    <div id="libres">We'll show you your available friends as soon as you choose the group you'll check</div>
            </Col>
            <Col xs={1} xm={1} md={1} lg={1}></Col>
            </Row></Container>);
    } 

}
export default UFree;