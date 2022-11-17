import React from 'react';
import classNames from 'classnames/bind';
import styles from './Trending.module.scss';

const cx = classNames.bind(styles);

const Trending = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('backgrond-movie')}></div>
            </div>
        </div>
    );
};

export default Trending;
