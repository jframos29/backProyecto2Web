/* eslint-disable react/react-in-jsx-scope */
import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordConf: '',
      redirect: false,
      username: '',
      telefono: '',
      nombre: ''
    };
this.handleSubmit = this.handleSubmit.bind(this);
this.handleSubmitSignUp = this.handleSubmit.bind(this);
this.onUsernameChange = this.onUsernameChange.bind(this);
this.onPasswordChange = this.onPasswordChange.bind(this);
this.onNameChange = this.onNameChange.bind(this);
this.onPasswordConfChange = this.onPasswordConfChange.bind(this);
this.onPhoneChange = this.onPhoneChange.bind(this);

}

onUsernameChange(event) {
this.setState({ username: event.target.value });
}

onPasswordChange(event) {
this.setState({ password: event.target.value });
}

onPasswordConfChange(event) {
  this.setState({ passwordConf: event.target.value });
  }


onPhoneChange(event) {
    this.setState({ telefono: event.target.value });
    }
  

onNameChange(event) {
      this.setState({ nombre: event.target.value });
      }
    
        

handleSubmit(event) { 
event.preventDefault();
sessionStorage.setItem('username', this.state.username);
let jsonString = [
  {
    "idUsuario":""+this.state.username,
    "contrasena":""+this.state.password
    
  }
]
var obj = JSON.stringify(jsonString);
axios.post(`http://ufree.herokuapp.com/login/`, { obj })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
}

handleSubmitSignUp(event) { 
  event.preventDefault();
  sessionStorage.setItem('username', this.state.username);
  let jsonString = [
    {
      "idUsuario":""+this.state.username,
      "contrasena":""+this.state.password,
      "contrasenaConf":""+this.state.password,
      "telefono":""+this.state.telefono,
      "nombre":""+this.state.nombre,
    }
  ]
  var obj = JSON.stringify(jsonString);
  axios.post(`http://ufree.herokuapp.com/login/registrar`, { obj })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
  }


render() {

return (
  <div>
    <div>
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="username" onChange={this.onUsernameChange} />
        <input type="password" placeholder="password" onChange={this.onPasswordChange} />
        <input type="submit" value="Login" />
      </form>
    </div>
    <br/>
    <div>
      <form className="form-signup" onSubmit={this.handleSubmitSignUp}>
        <input type="text" placeholder="username" onChange={this.onUsernameChange} />
        <input type="password" placeholder="password" onChange={this.onPasswordChange} />
        <input type="password" placeholder="Confirm password" onChange={this.onPasswordConfChange} />
        <input type="phone" placeholder="phone" onChange={this.onPhoneChange} />
        <input type="text" placeholder="name" onChange={this.onNameChange} />
        
        <input type="submit" value="SignUp" />
      </form>
    </div>

    </div>

);
}
}

export default Login;
