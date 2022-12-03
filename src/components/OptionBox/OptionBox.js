import React, { Children } from 'react';
import classNames from 'classnames/bind';
import styles from './OptionBox.module.scss';

const cx = classNames.bind(styles);

const OptionBox = ({ children, className, title }) => {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('inner')}>
                <h4 className={cx('search-type-tit')}>{title}</h4>
                {children}
            </div>
        </div>
    );
};

export default OptionBox;
