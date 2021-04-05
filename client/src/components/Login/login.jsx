import { Link, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import './login.css'
import { useStoreContext } from "../../utils/GlobalStore"

function LoginForm(){

  const [{name, token}, dispatch] = useStoreContext()
  const [showModal, setShowModal] = useState(false)
  const [authFail, setAuthFail] = useState(false)
  const [log, setLog] = useState(false)
  const userRef = useRef()
  const passRef = useRef()
  let history = useHistory()
  let pcUser = ''


  function toggleModal(){
    setShowModal(true)
  }

  function dismissModal (){
    setShowModal(false)
  }

  function logout(){
    setLog(false)
    dispatch({type:"USER_LOGOUT"})
  }

  useEffect(function(){
    if (localStorage.getItem("email") !== null) {
      pcUser = localStorage.getItem("email")
      setLog(true)
      }
    if(pcUser !== ''){
      dispatch({ type: 'ALREADY_SIGNEDIN', data: {name:pcUser}})
    }
  }, [])


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
    
    const {token, email, message} = await fetch('/login', fetchOptions).then(r=>r.json())
    console.log(message)

    if (message === 'Auth successful') {
      localStorage.token = token
      localStorage.email = email
      pcUser = email
      dispatch({ type: 'USER_LOGIN', data: {name:email, token: token }})
      history.push('/publicChat')
      dismissModal()
      setLog(true)
    } else if ( message === 'No such being!') {
      passRef.current.value = ''
      setAuthFail(true)
    }
  }

    return (
        <>
        {log ? <button type="button" className="btn btn-dark" onClick={logout}>
                    Logout
          </button>
          :
          <div className="logdiv">
            <Link to='/signup' className="btn btn-dark newUser">New user</Link>
            <button type="button" className="btn btn-dark" onClick={toggleModal}>
                      Log in
            </button> 
          </div>
          }
          

        <div className="modalSign" style={{display: showModal === true ? 'block' : 'none'}}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Log in</h5>
                <h6 className="authFail" style={{display: authFail ? 'block' : 'none'}}>Wrong username or password</h6>
                <button className="btn closeModal" onClick={dismissModal}>&times;</button>
              </div>
              <div className="modalBody">
                  
                  <div className="containerModal">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="enteruse" className="form-label">Username</label>
                        <input className="form-control" ref={userRef}/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="enterpass" className="form-label">Password</label>
                        <input type="password" className="form-control" ref={passRef}/>
                      </div>
                      <Link to='/signup' className="signupA" onClick={dismissModal}>Sign-up</Link>
                      <button className="btn btn-primary float-end" onClick={login}>Log in</button>
                    </form>
                  </div>

              </div>
            </div>
        </div>
      </>
    )
}

export default LoginForm