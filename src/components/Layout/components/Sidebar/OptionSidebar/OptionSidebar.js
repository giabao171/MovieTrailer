import React from 'react';
import classNames from 'classnames/bind';
import styles from './OptionSidebar.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

const OptionSidebar = ({ title, bIcon, sIcon, to, option, onClick }) => {
    return (
        <NavLink
            to={to}
            // className={option === title ? cx('menu-item', 'active') : cx('menu-item')}
            className={(nav) => cx('menu-item', { active: nav.isActive })}
            onClick={() => {
                // setOption(title);
                onClick = { onClick };
                // onClick_func();
            }}
        >
            <span className={cx('op-bicon', 'icon')}>{bIcon}</span>
            <span className={cx('op-sicon', 'icon')}>{sIcon}</span>
            <span className={cx('op-title')}>{title}</span>
        </NavLink>
    );
};

export default OptionSidebar;
