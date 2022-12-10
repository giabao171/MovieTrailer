import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactIcon, TMDBIcon } from '~/Icon/Icon';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} style={{ backgroundImage: `url(${images.footer}` }}>
                <div className={cx('desc-web')}>
                    <p>CB Movie is a free movie site. The website's data is provided by The Movie DB's free API.</p>
                    <div className={cx('logo')}>
                        <span className={cx('icon')}>
                            <TMDBIcon />
                        </span>
                        <span className={cx('icon')}>
                            <ReactIcon />
                        </span>
                    </div>
                </div>
                <div className={cx('about-me')}>
                    <span>
                        <FontAwesomeIcon icon={faPhone} className={cx('phone-icon')} />
                        (+84) 0338876816
                    </span>
                    <div>
                        <a className={cx('icon-link')} href=" https://github.com/giabao171" target="_blank">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a
                            className={cx('icon-link')}
                            href=" https://www.facebook.com/profile.php?id=100013807157785"
                            target="_blank"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>
                <div className={cx('logo-web')}>
                    <img src={images.logo} />
                    <span>CB</span>
                    <span>Movie</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
