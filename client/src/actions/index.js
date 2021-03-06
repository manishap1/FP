import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR

} from './types'

const ROOT_URL = 'http://localhost:3090'

export function signinUser({ email,password}){
    return function(dispatch){
  
// submit email and password to the server
axios.post(`${ROOT_URL}/signin`,{email,password})
.then(response =>{
    //if request is good
//-update state to indiacte user is authenticated
dispatch({type:AUTH_USER});
//save the jwt token
localStorage.setItem('token',response.data.token);
//redirect tothe route '/feature'
browserHistory.push('/feature');
 })
.catch(()=>{
    //if request is bad..
//show an error to the user
 dispatch(authError('bad login info'));

 });
    }
}

export function authError(error){
    return{
        type : AUTH_ERROR,
        payload : error
    };
}