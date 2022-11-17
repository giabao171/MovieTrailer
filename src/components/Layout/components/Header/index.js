import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';

import { Link } from 'react-router-dom';
import config from '~/config';
import Search from './Search/Search';

const cx = classNames.bind(styles);

const Header = () => {
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
                    <img
                        className={cx('avatar')}
                        src="https://cdn.memevui.com/2021/10/29/con-meo-cuoi-mum-mim-cam-doa-hoa-hong-do-choi-tang-ban.jpg"
                        alt="txtx"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
