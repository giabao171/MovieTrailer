import React from 'react';
import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

const Skeleton = ({ className }) => {
    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <div className={cx('inner')}>123456789</div>
        </div>
    );
};

export default Skeleton;
