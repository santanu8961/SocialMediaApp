import React, { Component } from 'react';
import './LoginComponent.css';
import {LoginController} from '../../Controllers/LoginController'

class RegisterComponent extends Component {
    state = 
    {FirstName:"",
      LastName:"",
      password:"",
      confirmpassword:"",
      email:"",
      age:""

            }
            handleChange(event) {
              this.setState({value: event.target.value});
            }

            resetData = (bool)=>{
              if(bool){
              this.setState({
                FirstName:"",
                LastName:"",
                password:"",
                confirmpassword:"",
                email:"",
                age:""
              })
            }
            }

    render() { 
        return ( 
            <div className="wrapper">
            <form className="form-signin">       
              <h2 className="form-signin-heading">Please Register</h2>
              <input type="text" value={this.state.FirstName}   onChange={(event)=>this.setState({FirstName:event.target.value})} className="form-control" name="firstname" placeholder="First Name" required="" autoFocus="" />
              <input type="text" value={this.state.LastName} onChange={(event)=>this.setState({LastName:event.target.value})}  className="form-control" name="lastname" placeholder="Last Name" required="" autoFocus="" />
              <input type="text" value={this.state.age} onChange={(event)=>this.setState({age:event.target.value})}  className="form-control" name="age" placeholder="Age" required="" autoFocus="" />
              <input type="password" value={this.state.password} onChange={(event)=>this.setState({password:event.target.value})}  className="form-control" name="password" placeholder="Password" required=""/>
              <input type="password"  value={this.state.confirmpassword} className="form-control" onChange={(event)=>this.setState({confirmpassword:event.target.value})} name="confirmpassword" placeholder="Confirm Password" required=""/>
              <input type="email" value={this.state.email} onChange={(event)=>this.setState({email:event.target.value})}  className="form-control" name="emailid" placeholder="Enter your Email" required=""/>      
             
              <button onClick={(e)=>{e.preventDefault();this.resetData(LoginController.signupController(this.state))}} 
              
              className="btn btn-lg btn-primary btn-block" type="submit">Register</button>   
            </form>
          </div>
          
                  );
    }
}
 
export default RegisterComponent;