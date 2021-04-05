import { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './signup.css'


function SignUpPage(){

    const userRef = useRef()
    const passRef = useRef()
    let history = useHistory()

    const [color, setColor] = useState("")
    const [exists, setExists] = useState(false)

    useEffect(function(){

            const colors = ["blue", "red", "orange", "green", "purple", "pink"];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            setColor(randomColor)  
    })

    async function signup(e){
        e.preventDefault()
        const data = {
            email: userRef.current.value,
            password: passRef.current.value,
            color: color
        }

        const fetchOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
          }
          fetchOptions.body = JSON.stringify(data)
        
        const {message} = await fetch('/signup', fetchOptions).then(r=>r.json())

        if (message === 'User created') {
            history.push('/publicChat')
        } else if (message === 'Mail exists'){
            setExists(true)
        }
    }

    return(
        <div className="wrapper">
            <form className="signupForm">
                <h6 style={{display: exists ? 'block' : 'none', color: 'red'}}>Email already exists</h6>
                <div>
                    <label htmlFor="username" className="form-label">Email</label>
                    <input className="form-control" ref={userRef}/>
                </div>
                <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" ref={passRef}/>
                </div>
                <button to='/publicChat' className="btn btn-primary signupBTN" onClick={signup}>Sign up</button>
            </form>
        </div>
    )
}

export default SignUpPage