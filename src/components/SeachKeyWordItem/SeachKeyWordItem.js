import React from 'react';
import classNames from 'classnames/bind';
import style from './SeachKeyWordItem.module.scss';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

const SeachKeyWordItem = ({ item }) => {
    const navigate = useNavigate();

    const handleToSearch = (keyWord) => {
        navigate(`${config.routes.home}search/${keyWord}/1`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} onClick={() => handleToSearch(item.name)}>
                {item.name}
            </div>
        </div>
    );
};

export default SeachKeyWordItem;
