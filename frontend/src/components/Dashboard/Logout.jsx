import { useNavigate } from 'react-router-dom';

const Logout = () => {
 const navigate = useNavigate();

 const logout = () => {
    // Remove the authentication token from local storage
    localStorage.removeItem('access_token');

    // Redirect the user to the login page
    navigate('/login');
 };

 // Return a button or any other element that, when clicked, will trigger the logout function
 return (
    <button onClick={logout}>Logout</button>
 );
};

export default Logout;
