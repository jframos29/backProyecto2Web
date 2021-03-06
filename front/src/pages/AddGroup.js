/* eslint-disable react/react-in-jsx-scope */
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class AddGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: '',
      group: ''
    };
this.handleSubmit = this.handleSubmit.bind(this);
this.onGroupChange = this.onGroupChange.bind(this);
}

onGroupChange(event) {
this.setState({ group: event.target.value });
}


handleSubmit(event) { 
event.preventDefault();
sessionStorage.setItem('group', this.state.group);
let jsonString = [
  {
    "idUser":""+this.state.group,

  }
]
var obj = JSON.stringify(jsonString);
axios.post(`http://localhost:5000/usuario/registrarParche`, { obj })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
}

render() {

return (
    <div>
      <form className="form" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Nombre grupo" onChange={this.onGroupChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
);
}
}

export default AddGroup;

