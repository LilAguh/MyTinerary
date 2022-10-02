import '../styles/SingInForm.css'
import { useState } from 'react'
import { usePostUserSingInMutation, useSignInTokenMutation } from '../features/userApi'
import Alert from './alerts/Alert'
import checkIcon from '../assets/icons/check.png'
import errorIcon from '../assets/icons/exclamation.png'

export default function SingInForm() {
  const [userLogin] = usePostUserSingInMutation()
  const [signInToken] = useSignInTokenMutation()

  const [login, setLogin] = useState({
    mail: "",
    password: "",
    form: "form",
    role: ""
  })

  const captureData = (event) => {
    const { name, value } = event.target
    setLogin({ ...login, [name]: value })
  }


  const [list, setList] = useState([])
  let toastProperties = null

  const showAlert = type => {
    switch (type) {
      case 'success':
        toastProperties = {
          id: list.length + 1,
          title: 'Welcome',
          description: 'Successful SignIn',
          backgroundColor: '#5cb85c',
          icon: checkIcon
        }
        break;
      case 'error':
        toastProperties = {
          id: list.length + 1,
          title: 'Error',
          description: 'Wrong email or password',
          backgroundColor: '#d9534f',
          icon: errorIcon
        }
        break;
      default:
        toastProperties = [];
    }
    setList([...list, toastProperties])
  }


  const saveData = (event) => {
    event.preventDefault()

    const userData = {
      mail: login.mail,
      password: login.password,
      form: login.form,
      role: login.role
    }
    userLogin(userData)
      .then(Response => {
        if (Response.data.success === true) {
          showAlert('success')

          let ls = localStorage.setItem('token', Response.data.response.token)
          signInToken(ls)
          window.location.replace('/')
        }
        else {
          showAlert('error')
        }
      })

    event.target.reset()
  }


  return (
    <div className='SingInForm-container'>
      <form onSubmit={saveData} className='SingInForm-form'>
        <input onChange={captureData} name='mail' className='SingInForm-input' placeholder='Email' type='text' required />
        <input onChange={captureData} name='password' className='SingInForm-input' placeholder='Password' type='password' required />
        <button className='SingInFor-btn'>Sing In</button>
      </form>
      <Alert toastlist={list} setList={setList} />
    </div>
  )
}
