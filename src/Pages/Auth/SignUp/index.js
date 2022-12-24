import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useMovie } from '~/GlobalState/useMovie';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '~/firebase';
import { doc, setDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

const SignUp = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useMovie();

    const [formValue, setFormValue] = useState({ userName: '', email: '', password: '' });
    const [formError, setFormError] = useState({});
    const [eror, setEror] = useState('');

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

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const user = (await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)).user;
            console.log(user);
            setDoc(doc(db, 'users', user.uid), {
                name: formValue.userName,
                photo: images.searchDefault,
                bookmarks: [],
            });
            if (!!user) {
                setCurrentUser({ ...user, displayName: formValue.userName, photoURL: images.searchDefault });
                navigate(`${config.routes.home}`);
                console.log(currentUser);
            }
        } catch (error) {
            // console.log(error);
            setEror('Sign up failed');
        }
    };

    const handeErrors = () => {
        setFormError(validate(formValue));
    };

    const handleBack = () => {
        navigate(`${config.routes.home}`);
    };

    const handleToSignIn = () => {
        navigate(`${config.routes.signIn}`);
    };

    console.log(formValue);

    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${images.footer})` }}>
            <div className={cx('inner')}>
                <div className={cx('sign-in-btn', 'back-btn')} onClick={handleBack}>
                    Back
                </div>
                <div className={cx('signin-modal')}>
                    <div className={cx('title')}>Make Your Account</div>
                    <div className={cx('form-box')}>
                        <form
                            onSubmit={(e) => {
                                handleSignUp(e);
                                handeErrors();
                            }}
                        >
                            {/* <p>or your account</p> */}
                            <div className={cx('username-part', 'ip-box')}>
                                <input
                                    name="userName"
                                    className={cx('username-ip', 'input')}
                                    type="text"
                                    placeholder="User name"
                                    required
                                    value={formValue.userName}
                                    onChange={(e) => handleChangeIp(e)}
                                    // onBlur={handeErrors}
                                />
                                <FontAwesomeIcon icon={faUser} className={cx('ip-icon')} />
                            </div>
                            <p className={cx('error')}>{formError.userName}</p>
                            <div className={cx('email-part', 'ip-box')}>
                                <input
                                    name="email"
                                    className={cx('email-ip', 'input')}
                                    type="text"
                                    placeholder="Email"
                                    required
                                    value={formValue.email}
                                    onChange={(e) => handleChangeIp(e)}
                                    // onBlur={handeErrors}
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
                            <p className={cx('error')}>{eror}</p>
                            <button className={cx('sign-in-btn')} type="submit">
                                Sign In
                            </button>
                        </form>
                        {/* <button className={cx('sign-in-btn')} onClick={handleSignUp}>
                            Sign Up
                        </button> */}
                    </div>

                    <div className={cx('sign-up')}>
                        You really have account?<p onClick={handleToSignIn}>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
