import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('inner')}>
                <p>SideBar</p>
            </div>
        </aside>
    );
};

export default Sidebar;
