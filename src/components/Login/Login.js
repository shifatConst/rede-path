import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import reactDom from 'react-dom';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {

    const [newUser, setNewUSer] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        image: '',
        error: '',
        success: false
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    // const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    image: ''
                }
                setUser(signedOutUser);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = (isPasswordValid && passwordHasNumber);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log(res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(function () {
            console.log('User name updated successfully', user);
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div className="text-center m-5">
            <div className="m-5 border p-5">
                <h1>Please Sign Up</h1>
                {/* <input type="checkbox" onChange={() => setNewUSer(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New user sign up</label> */}
                <form onSubmit={handleSubmit}>
                    {newUser && <input className="m-1" type="text" name="name" onBlur={handleBlur} placeholder="Your name" id="" />}
                    <br />
                    <input className="m-1" type="text" name="email" onBlur={handleBlur} placeholder="Your email" required />
                    <br />
                    <input className="m-1" type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
                    <br />
                    <input className="m-1" type="submit" value={newUser ? 'Sign up' : 'Log in'} />
                </form>
                <input type="checkbox" onChange={() => setNewUSer(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New user? Sign Up</label>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>}
                <p><b>Or</b></p>
                {
                    user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button>
                        : <button onClick={handleGoogleSignIn}>Sign in with Google</button>
                }
            </div>
        </div>
    );
}

export default Login;