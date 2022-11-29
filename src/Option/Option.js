import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Option.module.scss';
import Button from '~/Button/Button';

const cx = classNames.bind(styles);

const Option = ({ listOption, option, setOption }) => {
    useEffect(() => {
        setOption(listOption[0].value);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('option-list')}>
                {listOption.map((item, index) => (
                    <Button
                        square
                        leftIcon={item.icon}
                        key={index}
                        className={option === item.value ? cx('option-btn', 'active') : cx('option-btn')}
                        onClick={() => setOption(item.value)}
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Option;
