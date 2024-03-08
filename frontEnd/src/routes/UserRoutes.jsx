import { Routes, Route } from 'react-router-dom';
import UserPublic from '../protected/userPublic.jsx';
import UserProtect from '../protected/userProtected.jsx';
import Profile from '../pages/userPage/Profile'
import Login from '../pages/loginPage/Login.jsx'
import Otp from '../pages/otpPage/Otp'
import Signup from '../pages/signUp/SignUp'
import Notfound from '../components/profileComponents/Notfound.jsx';

function UserRoutes() {
    return (
        <Routes>
         
            <Route path='/register' element={<UserPublic> <Signup /></UserPublic>} />
            <Route path='/login' element={<UserPublic> <Login /></UserPublic>} />
            <Route path='/' element={<UserProtect> <Profile /></UserProtect>} />
            <Route path='/otp/:id' element={ <Otp />} />
            <Route path='*' element={<Notfound />} />
        </Routes>
    )
}

export default UserRoutes
