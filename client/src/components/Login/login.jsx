import {Link} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import Smiley from '../imgs/AwesomeFace.png'
import './login.css'
import { useStoreContext } from "../../utils/GlobalStore"

function LoginForm(){

  const [{name, token}, dispatch] = useStoreContext()

  let pcUser = ''

  useEffect(function(){
    if (localStorage.getItem("email") !== null) {
      pcUser = localStorage.getItem("email")}
    if(pcUser !== ''){
      dispatch({ type: 'ALREADY_SIGNEDIN', data: {name:pcUser}})
    }
  }, [])

  const userRef = useRef()
  const passRef = useRef()

  async function login(e){
    e.preventDefault()

    const data = {
        email: userRef.current.value,
        password: passRef.current.value
    }

    const fetchOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json" }
      }
      fetchOptions.body = JSON.stringify(data)
    
    const {token, email} = await fetch('/login', fetchOptions).then(r=>r.json())

    localStorage.token = token
    localStorage.email = email
    pcUser = email

    dispatch({ type: 'USER_LOGIN', data: {name:email, token: token }})
  }

  function test(){
    console.log(pcUser)
    console.log({name,token})
  }

    return (
        <>

        <button onClick={test}>test</button>
        <div className="navbar">
          <div className="container mx-2" style={{width: 'max-content'}}>
            <img src={Smiley} alt="" width="30px" height="30px"/>
            <Link to='/'>Chat</Link>
            <Link to='/signup'>Sign-up</Link>
          </div>
          <button type="button" className="btn float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Log in
                </button>
        </div>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Log in</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  
                  <div className="container d-flex justify-content-center">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="enteruse" className="form-label">Username</label>
                        <input className="form-control" ref={userRef}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="enterpass" className="form-label">Password</label>
                        <input type="password" className="form-control" ref={passRef}/>
                      </div>
                      <a className="signup"><Link to='/signup'>Sign-up</Link></a>
                      <button className="btn btn-primary float-end" onClick={login}>Log in</button>
                    </form>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default LoginForm