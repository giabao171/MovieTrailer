import React from 'react';
import classNames from 'classnames/bind';
import styles from './Ghost.module.scss';

const cx = classNames.bind(styles);

const Ghost = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('spooky')}>
                <div className={cx('left-eye')}></div>
                <div className={cx('right-eye')}></div>
                <div className={cx('mouth')}></div>
                <div className={cx('feet')}></div>
                <div className={cx('shadow')}>...Loading</div>
            </div>
        </div>
    );
};

export default Ghost;
