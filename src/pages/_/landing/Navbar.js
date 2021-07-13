import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdFingerprint } from 'react-icons/md';
import { Button } from './Button';
import './Navbar.css'
import { IconContext } from 'react-icons/lib'
import logodark from '../../../assets/images/logo-dark.png';
// import firebase, { auth, provider } from './firebase'
// import { LoginContext, useAuth } from '../LoginContext'



function Navbar(props) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [button, setButton] = useState(true);
    const closeMobileMenu = () => setClick(false)
    const [user, setUser] = useState('');
    // const logincontext = useContext(LoginContext);
    // const { currentUser, logout } = useContext(LoginContext);
    let history = useHistory();
    // const logout = useAuth();




    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }
    // console.log(currentUser)
    useEffect(() => {
        showButton();
    }, []);


    // useEffect(() => {
    //     auth.onAuthStateChanged(userAuth => {
    //       this.setState({ user: userAuth});
    //     });
    // });
    // console.log(firebase.getCurrentUsername());

    window.addEventListener('resize', showButton);
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <div className="navbar-container container">
                        <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                            {/* <MdFingerprint className='navbar-icon' /> */}
                            <img src={logodark} className='navbar-icon' style={{width:'32px', height:'32px'}}/>
                        CrimeSpy

                    </Link>
                        <div className="menu-icon" onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className="nav-item">
                                <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                    Home
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/map' className="nav-links" onClick={closeMobileMenu}>
                                    Map
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about' className="nav-links" onClick={closeMobileMenu}>
                                    About
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/help' className="nav-links" onClick={closeMobileMenu}>
                                    Help
                            </Link>
                            </li>


                            {/* {currentUser ? <SignOutLink /> : <SignUpLink />} */}

                            {/* <SignOutLink /> */}


                            {/* <SignUpLink /> */}




                        </ul>
                    </div>
                </div>
            </IconContext.Provider>
        </>
    )








    // function SignOutLink() {
    //     return <li className="nav-btn">
    //         {
    //             button ? (
    //                 <Link className="btn-link" >
    //                     <Button buttonStyle='btn--outline' onCLick={logout}>
    //                         Log Out
    //     </Button>
    //                 </Link>
    //             ) : (
    //                     <Link className="btn-link" onClick={closeMobileMenu} onCLick={logout}>
    //                         <Button buttonStyle='btn--outline'
    //                             buttonSize='btn--mobile'
    //                         >
    //                             Log Out
    //     </Button>
    //                     </Link>
    //                 )
    //         }
    //     </li>

    // }
    // function SignUpLink() {
    //     return <li className="nav-btn">
    //         {
    //             button ? (
    //                 <Link to='/register' className="btn-link" >
    //                     <Button buttonStyle='btn--outline'>
    //                         Sign Up
    //                                                 </Button>
    //                 </Link>
    //             ) : (
    //                     <Link to='/register' className="btn-link" onClick={closeMobileMenu}>
    //                         <Button buttonStyle='btn--outline'
    //                             buttonSize='btn--mobile'
    //                         >
    //                             Sign Up
    //                                                 </Button>
    //                     </Link>
    //                 )
    //         }
    //     </li>

    // }
  

}







export default Navbar
