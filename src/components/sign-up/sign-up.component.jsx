import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-up.styles.scss'
import {
  createAuthUserWithEmailAndPassword,
  db,
  storage
} from '../../utils/firebase.utils'
import { updateProfile } from 'firebase/auth';
import AddPic from '../../assets/image-gallery.png';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const captlizedFirstLetter = (str) => {
     return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      const file = event.target[4].files[0];
      

      if (password !== confirmPassword) {
        alert('passwords do not match');
        return;
      }

      try {
          const {user} = await createAuthUserWithEmailAndPassword(
            email,
            password
          );
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);

          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                //Update profile
                await updateProfile(user, {
                  displayName,
                  photoURL: downloadURL,
                });

                //create user on firestore
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                 //create empty user chats on firestore
                await setDoc(doc(db, "userChats", user.uid), {});

                if(user) {
                  navigate('/home')
                }
               
              } catch (err) {
                console.log("inner catch",err);
              }
            });
          });

          resetFormFields();
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
          } else {
            console.log('user creation encountered an error', error);
          }
      }
  }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormFields({ ...formFields, [name]: value });
      }

    return(
        <div className="sign-up-container">
            <div className='sign-in-form'>
                <h2>Sign Up</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <input 
                    className='form-input'
                    label='Display Name'
                    type='text'
                    placeholder='Display Name'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                    />
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
                    <input
                    className='form-input'
                    label='Confirm Password'
                    type='password'
                    placeholder='Confirm Password'
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                    />
                    <input style={{ display: "none" }}
                     type="file" id="file" />
                    <label className='avatar' htmlFor="file">
                      <img src={AddPic} alt="" />
                      <span>Add an avatar</span>
                    </label>
                    <button
                    className='form-button'
                     type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp