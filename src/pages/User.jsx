

import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();

  const handleNavigate = (event) => {
    const buttonText = event.target.textContent.toLowerCase(); 
    console.log("Button text:", buttonText); 
    navigate('/login', { state: { data: buttonText } });
  };

  return (
    <div className='d-flex justify-content-evenly'>
      <button onClick={handleNavigate}className='btn btn-success'>Student</button>
      <button onClick={handleNavigate}className='btn btn-danger'>Academy</button>
      <button onClick={handleNavigate}className='btn btn-primary'>Company</button>
    </div>
  );
}

export default User;
