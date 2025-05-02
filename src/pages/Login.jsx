
import { useLocation,  useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/auth';


function Login() {

    const navigate = useNavigate();

  const handleNavigate = () => {

    navigate('/sign_up', { replace: true, state: { data: user }});
};

const navigateHome = (user) => {
    navigate(`/home/${user}`, { replace: true, state: { data: user }});
}
    const location = useLocation();
    const user = location.state?.data;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    let validated = true;
    const handleLogin = async (event) => {
        event.preventDefault();
        setEmailError("");
        setPasswordError("");

        const loginData = {
            email: email,
            password: password,
            role: user
        };

        if (!loginData.email) {

            setEmailError("Email Required");
            setTimeout(() => {
                setEmailError("");
            }, 3000);
            validated = false
        }
        if (!loginData.password) {
            setPasswordError("Password Required");
            setTimeout(() => {
                setPasswordError("");
            }, 3000);
            validated = false


        } else if (loginData.password.length < 8) {
            setPasswordError("Password Must Contains Atleast 8 Characters");
            setTimeout(() => {
                setPasswordError("");
            }, 3000);
            validated = false

        }
        if (validated) {

            try {
                const response = await login(loginData)


                if (!response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (!data.detail[0].msg){

                        throw new Error(data.detail);
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
    };




    return (
        <>
            <div className='d-flex flex-column align-items-center justify-content-evenly container '>
                <form className='d-flex justify-content-evenly gap-3 align-items-center login flex-column border p-5'>
                    <h1>Login</h1>

                        <div className='d-flex gap-5 width-100 row'>
                            <label className='col-1'>Email: </label>
                            <div className='width-100 col'>

                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />
                                {emailError && <p className="error text-danger">{emailError}</p>}
                            </div>
                        </div>

                        <div className='d-flex gap-5 width-100 row'>
                            <label className='col-1'>Password: </label>
                            <div className='width-100 col'>

                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                {passwordError && <p className="error text-danger">{passwordError}</p>}
                            </div>
                        </div>
                    <div className='d-flex flex-column gap-3'>

                        <button className='btn btn-success' type='submit' onClick={handleLogin}>
                            Login
                        </button>
                        {error && <p className="error text-danger">{error}</p>}
                    </div>
                    <div>
                        <p>Don't Have Any Account? <span className='sign_up_nav p-2  text-white' onClick={handleNavigate}>Sign Up</span></p>
                    </div>
                </form>

            </div>
        </>
    );
}

export default Login

