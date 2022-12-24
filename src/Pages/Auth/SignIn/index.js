import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import Button from '~/Button/Button';
import { FacebookIcon, GoogleIcon } from '~/Icon/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useMovie } from '~/GlobalState/useMovie';
// import { SignInWithProvider } from '../SignInWithProvider';

import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth, db } from '~/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

const cx = classNames.bind(styles);

const SignIn = () => {
    const navigate = useNavigate();

    const { setCurrentUser, currentUser } = useMovie();
    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const [formError, setFormError] = useState({});
    const [error, setError] = useState('');

    const signInWithProvider = (type, provider) => {
        signInWithPopup(auth, provider).then(async (result) => {
            const user = result.user;

            let credential;
            let accessToken;
            if (type === 'facebook') {
                credential = FacebookAuthProvider.credentialFromResult(result);
                accessToken = credential.accessToken;
                setCurrentUser({ ...user, photoURL: user.photoURL + '?access_token=' + accessToken });
            }
            if (type === 'google') {
                setCurrentUser(user);
            }

            let isStored = false;
            const querySnapshot = await getDocs(collection(db, 'users'));
            querySnapshot.forEach((item) => {
                if (item.id === user.uid) {
                    isStored = true;
                }
            });

            if (isStored) {
                navigate(config.routes.home);
                return;
            } else {
                setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    ...(type === 'google' && { photo: user.photoURL }),
                    ...(type === 'facebook' && { photo: user.photoURL + '?access_token=' + accessToken }),
                    bookmarks: [],
                });
                navigate(config.routes.home);
            }
        });
    };

    const signInWithEmailPass = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, formValue.email, formValue.password);
            // console.log(user.user);
            if (!!user) {
                setCurrentUser(user.user);
                navigate(`${config.routes.home}`);
            } else {
                setError('Something Wrong');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeIp = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };

    const validate = (value) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const errors = {};

        if (!emailRegex.test(value.email)) {
            errors.email = 'This email is invalid!';
        }
        if (value.password.length <= 6) {
            errors.password = 'Password is more than 6 characters';
        }
        // if (value.email === '') {
        //     errors.email = 'Email is required!';
        // }
        // if (value.password === '') {
        //     errors.password = 'Password is required!';
        // }

        return errors;
    };

    const handeErrors = () => {
        setFormError(validate(formValue));
    };

    const handleBack = () => {
        navigate(`${config.routes.home}`);
    };

    const handleToSignUp = () => {
        navigate(`${config.routes.signUp}`);
    };

    // console.log(formValue);

    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${images.footer})` }}>
            <div className={cx('inner')}>
                <div className={cx('sign-in-btn', 'back-btn')} onClick={handleBack}>
                    Back
                </div>
                <div className={cx('signin-modal')}>
                    <div className={cx('title')}>Sign In</div>
                    <div className={cx('social-account')}>
                        <p>You can use</p>
                        <div className={cx('social-list')}>
                            <Button
                                circle
                                className={cx('s-btn')}
                                onClick={() => signInWithProvider('google', new GoogleAuthProvider())}
                            >
                                <GoogleIcon />
                            </Button>
                            <Button
                                circle
                                className={cx('s-btn', 'face-icon')}
                                onClick={() => signInWithProvider('facebook', new FacebookAuthProvider())}
                            >
                                <FacebookIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('form-box')}>
                        <form
                            onSubmit={(e) => {
                                signInWithEmailPass(e);
                                handeErrors();
                            }}
                        >
                            <p>or your account</p>
                            <div className={cx('email-part', 'ip-box')}>
                                <input
                                    name="email"
                                    className={cx('email-ip', 'input')}
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={formValue.email}
                                    onChange={(e) => handleChangeIp(e)}
                                    // onFocus={handeErrors}
                                />
                                <FontAwesomeIcon icon={faEnvelope} className={cx('ip-icon')} />
                            </div>
                            <p className={cx('error')}>{formError.email}</p>
                            <div className={cx('password-part', 'ip-box')}>
                                <input
                                    name="password"
                                    className={cx('password-ip', 'input')}
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={formValue.password}
                                    onChange={(e) => handleChangeIp(e)}
                                    // onFocus={handeErrors}
                                />
                                <FontAwesomeIcon icon={faLock} className={cx('ip-icon')} />
                            </div>
                            <p className={cx('error')}>{formError.password}</p>
                            <p className={cx('error')}>{error}</p>
                            <button className={cx('sign-in-btn')} type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>

                    <div className={cx('sign-up')}>
                        You don't have account?<p onClick={handleToSignUp}>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
