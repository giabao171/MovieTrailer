import React from 'react';
import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

const Wrapper = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('search-title')}>Result</h4>
            {children}
        </div>
    );
};

export default Wrapper;
