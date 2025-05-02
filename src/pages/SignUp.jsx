import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { sign_up } from '../services/auth';

function SignUp() {
    const location = useLocation();
    const user = location.state?.data;
console.log(user)
    const [name, setName] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const navigate = useNavigate();
    let validated = true
    const handleNavigate = () => {
        navigate('/login', { replace: true, state: { data: user }});
    };


    const navigateHome = (user) => {
        navigate(`/home/${user}`,{ replace: true, state: { data: user }});
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?[0-9]{1,3}?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=\S.*$).{8,}$/;

        const signUpData = {
            name: name.trim(),
            email: email,
            phone_number: phone_number,
            password: password,
            role: user
        };

        if (!signUpData.name) {
            setNameError("Name Required");
            setTimeout(() => {
                setNameError("");
            }, 3000);
            validated = false
        }else if (/\s{2,}/.test(name)) {
            setNameError('Name should not contain consecutive spaces');
            setTimeout(() => {
                setNameError("");
            }, 3000);
            validated = false
          } else if (signUpData.name.length < 3) {
            setNameError("Name Must Contains Atleast 3 Characters");
            setTimeout(() => {
                setNameError("");
            }, 3000);
            validated = false
        }
        else if (signUpData.name.length > 20) {
            setNameError("Name Should Not Contain More Than 20 Characters");
            setTimeout(() => {
                setNameError("");
            }, 3000);
            validated = false
        }else if (!/^[A-Za-z\s]+$/.test(signUpData.name)) {
            setNameError('Name should contain only letters and spaces');
            setTimeout(() => {
                setNameError("");
            }, 3000);
            validated = false
        }

        if (!signUpData.email) {

            setEmailError("Email Required");
            setTimeout(() => {
                setEmailError("");
            }, 3000);
            validated = false
        }

        if (!signUpData.phone_number) {

            setPhoneNumberError("Phone Number Required");
            setTimeout(() => {
                setPhoneNumberError("");
            }, 3000);
            validated = false
        }else if (!phoneRegex.test(signUpData.phone_number) || signUpData.phone_number.length !=  10) {
            setPhoneNumberError('Invalid phone number format');
            setTimeout(() => {
                setPhoneNumberError("");
            }, 3000);
            validated = false
          }

        if (!signUpData.password) {
            setPasswordError("Password Required");
            setTimeout(() => {
                setPasswordError("");
            }, 3000);
            validated = false


        } else if (signUpData.password.length < 8) {
            setPasswordError("Password Must Contains Atleast 8 Characters");
            setTimeout(() => {
                setPasswordError("");
            }, 3000);
            validated = false

        }
        else if (!passwordRegex.test(password)) {
            setPasswordError(
              'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character, and have no spaces.'
            );
            setTimeout(() => {
                setPasswordError("");
            }, 5000);
            validated = false
          }else if (signUpData.password.length > 20) {
            setPasswordError("Password Should Not Contain More Than 20 Characters");
            setTimeout(() => {
                setPasswordError("");
            }, 3000);
            validated = false

        }
        if (validated) {

            try {
                const response = await sign_up(signUpData)

                if (!response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (!data.detail[0].msg) {

                        throw new Error(data.detail);
                    }else if (data.detail[0].msg.split(':')[0].includes("email")) {
                        
                        setEmailError(data.detail[0].msg.split(':')[1]);
                        setTimeout(() => {
                            setEmailError("");
                        }, 3000);
                        return;                        
                    }
                    throw new Error(data.detail[0].msg.split(':')[1]);
                }

                const data = await response.json();

                console.log('Login successful', data);
                localStorage.setItem('token', data.token);
                navigateHome(user)

            } catch (error) {
                setError(error.message);
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        }

    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-center  container'>
                <form className='d-flex justify-content-evenly gap-3 align-items-center sign_up flex-column border p-5 '>
                    <h1>Sign Up</h1>

                    <div className='d-flex gap-5 width-100 row'>
                        <label className='col-3 p-0'>Name: </label>
                        <div className='width-100 col'>

                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                            {nameError && <p className="error text-danger">{nameError}</p>}
                        </div>
                    </div>

                    <div className='d-flex gap-5 row width-100'>
                        <label className='col-3 p-0'>Email: </label>
                        <div className='width-100 col'>

                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                            {emailError && <p className="error text-danger">{emailError}</p>}
                        </div>
                    </div>

                    <div className='d-flex gap-5 row width-100'>
                        <label className='col-3 p-0'>Phone Number: </label>
                        <div className='width-100 col'>

                            <input
                                type='text'
                                value={phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}

                            />
                            {phoneNumberError && <p className="error text-danger">{phoneNumberError}</p>}
                        </div>
                    </div>

                    <div className='d-flex gap-5 row width-100'>
                        <label className='col-3 p-0'>Password: </label>
                        <div className='width-100 col'>

                            <input
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            {passwordError && <p className="error text-danger">{passwordError}</p>}
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-3 row'>
                        <div className='col'>

                        <button className='btn btn-success' type='submit' onClick={handleSignUp}>
                            Sign Up
                        </button>
                        {error && <p className="error text-danger">{error}</p>}
                        </div>

                    </div>
                    <div className='row'>
                        <p>Already Have An Account?<span className='sign_up_nav p-2 text-white' onClick={handleNavigate}>Login</span></p>
                    </div>
                </form>

            </div>
        </>
    )
}

export default SignUp