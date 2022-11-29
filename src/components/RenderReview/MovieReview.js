import React from 'react';
import classNames from 'classnames/bind';
import styles from './MovieReview.module.scss';

const cx = classNames.apply(styles);

const MovieReview = () => {
    return <div className={cx('wrapper')}></div>;
};

export default MovieReview;
