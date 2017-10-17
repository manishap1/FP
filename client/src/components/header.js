import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


class Header extends Component{
    renderLinks(){
        if(this.props.authenticated){
            //show a link to sign out
          return <li className="nav-item">
         <Link className="nav-link" to="/signout">
              Sign Out
           </Link>
          </li>
        } else {
            //show a link to sign in or sign up
           return [
                     <li className="nav-item" key={1}>
                       <Link className="nav-link" to="/signin" >
                        Sign in
                       </Link>
                     </li>,
                     <li className="nav-item" key={2}>
                       <Link className="nav-link" to="/signup">
                         Sign up
                      </Link>
                    </li>
           ]; 
        }
        
    }
    render(){
        return(
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                      
                       <Link to="/" className="navbar-brand">FoodChain</Link>
                       <div
                     className="collapse navbar-collapse"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                           {this.renderLinks()}
                         </ul>
                       </div>
                     </nav>
        );
    }
}

function mapStateToProps(state){
    return {
      authenticated: state.auth.authenticated
    };
}
export default connect()(Header);