import React, { useEffect, useState } from 'react';
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

const cx = classNames.bind(styles);

const SignIn = () => {
    const navigate = useNavigate();

    const [formValue, setFormValue] = useState({ email: '', password: '' });
    const [formError, setFormError] = useState({});

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

    console.log(formValue);

    return (
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${images.footer})` }}>
            <div className={cx('inner')}>
                <div className={cx('sign-in-btn', 'back-btn')} onClick={handleBack}>
                    {' '}
                    Back
                </div>
                <div className={cx('signin-modal')}>
                    <div className={cx('title')}>Sign In</div>
                    <div className={cx('social-account')}>
                        <p>You can use</p>
                        <div className={cx('social-list')}>
                            <Button circle className={cx('s-btn')}>
                                <GoogleIcon />
                            </Button>
                            <Button circle className={cx('s-btn', 'face-icon')}>
                                <FacebookIcon />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('form-box')}>
                        <form>
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
                                />
                                <FontAwesomeIcon icon={faEnvelope} className={cx('ip-icon')} />
                            </div>
                            <p>{formError.email}</p>
                            <div className={cx('password-part', 'ip-box')}>
                                <input
                                    name="password"
                                    className={cx('password-ip', 'input')}
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={formValue.password}
                                    onChange={(e) => handleChangeIp(e)}
                                    onFocus={handeErrors}
                                />
                                <FontAwesomeIcon icon={faLock} className={cx('ip-icon')} />
                            </div>
                            <p>{formError.password}</p>
                            <button className={cx('sign-in-btn')}>Sign In</button>
                        </form>
                    </div>
                    <div className={cx('sign-up')}>
                        You don't have account?<p>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
