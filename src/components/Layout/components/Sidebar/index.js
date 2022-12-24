import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import OptionSidebar from './OptionSidebar/OptionSidebar';
import { useMovie } from '~/GlobalState/useMovie';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faArrowRightToBracket,
    faBookmark,
    faCompass,
    faHouse,
    faHouseCircleCheck,
    faMagnifyingGlass,
    faMagnifyingGlassMinus,
} from '@fortawesome/free-solid-svg-icons';
import { faCompass as faCompass2, faBookmark as faBookmark2 } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '~/firebase';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const { currentUser, setCurrentUser } = useMovie();
    // const [option, setOption] = useState('Home');

    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setCurrentUser(null);
            })
            .catch((error) => {
                // An error happened.
            });
    };
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* <NavLink to={`${config.routes.home}`} className={(nav) => cx('op-item', { active: nav.isActive })}> */}
                <OptionSidebar
                    title={'Home'}
                    bIcon={<FontAwesomeIcon icon={faHouseCircleCheck} />}
                    sIcon={<FontAwesomeIcon icon={faHouse} />}
                    to={config.routes.home}
                    // option={option}
                    // setOption={setOption}
                />
                {/* </NavLink> */}
                {/* <NavLink to={`${config.routes.home}search/ /1`}> */}
                <OptionSidebar
                    title={'Search'}
                    bIcon={<FontAwesomeIcon icon={faMagnifyingGlassMinus} />}
                    sIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    to={`${config.routes.home}search/ /1`}
                    // option={option}
                    // setOption={setOption}
                />
                {/* </NavLink> */}
                {/* <NavLink to={`${config.routes.discover}`}> */}
                <OptionSidebar
                    title={'Discover'}
                    bIcon={<FontAwesomeIcon icon={faCompass} />}
                    sIcon={<FontAwesomeIcon icon={faCompass2} />}
                    to={config.routes.discover}
                    // option={option}
                    // setOption={setOption}
                />
                {/* </NavLink> */}
                {/* <NavLink to={`${config.routes.bookmarks}`}> */}
                <OptionSidebar
                    title={'Bookmarks'}
                    bIcon={<FontAwesomeIcon icon={faBookmark} />}
                    sIcon={<FontAwesomeIcon icon={faBookmark2} />}
                    to={config.routes.bookmarks}
                />
                {currentUser !== null ? (
                    <div className={cx('menu-item')} onClick={logOut}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        <span>Log Out</span>
                    </div>
                ) : (
                    <Link to={`${config.routes.signIn}`}>
                        <div className={cx('menu-item')}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            <span>Log In</span>
                        </div>
                    </Link>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
