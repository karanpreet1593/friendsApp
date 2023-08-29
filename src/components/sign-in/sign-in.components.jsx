import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-in.styles.scss'
import {signInAuthUserWithEmailAndPassword} from '../../utils/firebase.utils'

const defaultFormFields = {
    email: '',
    password: ''
  };

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const {user}= await signInAuthUserWithEmailAndPassword(
              email,
              password
            );
            if (user) {
                navigate('/home')
            }
            resetFormFields();
          } catch (error) {
            switch (error.code) {
              case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
              case 'auth/user-not-found':
                alert('no user associated with this email');
                break;
              default:
                console.log(error);
            }
          }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormFields({ ...formFields, [name]: value });
      }

    return(
        <div className="sign-in-container">
            <div className='sign-in-form'>
                <h2>Log In</h2>
                <div className='form'>
                  <form className='form' onSubmit={handleSubmit}>
                      <input 
                      className='form-input'
                      label='Email'
                      type='email'
                      placeholder='Email'
                      required
                      onChange={handleChange}
                      name='email'
                      value={email}
                      />
                      <input
                      className='form-input'
                      label='Password'
                      type='password'
                      placeholder='Password'
                      required
                      onChange={handleChange}
                      name='password'
                      value={password}
                      />
                      <button 
                      className='form-button'
                      type='submit'>Log In</button>
                  </form>
                </div>
                
            </div>
        </div>
    );
};

export default SignIn