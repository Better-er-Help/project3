import {Link} from 'react-router-dom';
import { useRef, useState } from 'react'
import Smiley from '../imgs/AwesomeFace.png'
import './login.css'

function LoginForm(){

    return (
        <>
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
                        <input className="form-control"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="enterpass" className="form-label">Password</label>
                        <input type="password" className="form-control"/>
                      </div>
                      <a className="signup" href="sign.html">Sign up</a>
                      <button className="btn btn-primary float-end">Log in</button>
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