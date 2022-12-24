import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';

import { Link } from 'react-router-dom';
import config from '~/config';
import Search from './Search/Search';
import { useMovie } from '~/GlobalState/useMovie';
import Image from '~/Image/Image';

const cx = classNames.bind(styles);

const Header = () => {
    const { currentUser } = useMovie();
    // console.log(currentUser);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-inner')}>
                        <img src={images.logo} alt="BeoMovie" className={cx('logo-svg')} />
                        <div className={cx('title-web')}>
                            <span className={cx('tit1')}>CB</span>
                            <span className={cx('tit2')}>Movie</span>
                        </div>
                    </Link>
                </div>
                <Search />
                <div className={cx('actions')}>
                    {!!currentUser?.displayName ? (
                        <Image className={cx('avatar')} src={currentUser.photoURL} />
                    ) : (
                        <Image className={cx('avatar')} src={images.noImage} />
                    )}
                    {!!currentUser?.displayName ? <p>{currentUser.displayName}</p> : <p>Stranger</p>}
                </div>
            </div>
        </header>
    );
};

export default Header;
