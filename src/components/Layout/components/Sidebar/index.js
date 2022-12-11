import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import OptionSidebar from './OptionSidebar/OptionSidebar';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faCompass,
    faHouse,
    faHouseCircleCheck,
    faMagnifyingGlass,
    faMagnifyingGlassMinus,
} from '@fortawesome/free-solid-svg-icons';
import { faCompass as faCompass2 } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [option, setOption] = useState('Home');
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <OptionSidebar
                    title={'Home'}
                    bIcon={<FontAwesomeIcon icon={faHouseCircleCheck} />}
                    sIcon={<FontAwesomeIcon icon={faHouse} />}
                    to={config.routes.home}
                    option={option}
                    setOption={setOption}
                />
                <OptionSidebar
                    title={'Search'}
                    bIcon={<FontAwesomeIcon icon={faMagnifyingGlassMinus} />}
                    sIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    to={`${config.routes.home}search/ /1`}
                    option={option}
                    setOption={setOption}
                />
                <OptionSidebar
                    title={'Discover'}
                    bIcon={<FontAwesomeIcon icon={faCompass} />}
                    sIcon={<FontAwesomeIcon icon={faCompass2} />}
                    to={config.routes.discover}
                    option={option}
                    setOption={setOption}
                />
                <OptionSidebar
                    title={'Log in'}
                    bIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                    sIcon={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
                    to={config.routes.signIn}
                    option={option}
                    setOption={setOption}
                />
            </div>
        </aside>
    );
};

export default Sidebar;
