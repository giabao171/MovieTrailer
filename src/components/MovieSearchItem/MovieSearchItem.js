import React from 'react';
import classNames from 'classnames/bind';
import styles from './MovieSearchItem.module.scss';
import Image from '~/Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { URL_IMAGE } from '~/Shared/Constants';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useMovie } from '~/GlobalState/useMovie';

const cx = classNames.bind(styles);

const MovieSearchItem = ({ item }) => {
    const navigate = useNavigate();

    const { mediaType } = useMovie();

    const handleToDetail = (id) => {
        navigate(`${config.routes.home}${mediaType}/detail/${id}`);
    };
    // console.log(item);
    return (
        <div className={cx('wrapper')} onClick={() => handleToDetail(item.id)}>
            <Image className={cx('movie-image')} src={`${URL_IMAGE}${item.poster_path}`} alst={item.title} />
            <div className={cx('movie-info')}>
                <div className={cx('movie-title')}>
                    <span>{item.title || item.name}</span>
                </div>
                <div className={cx('overview')}>{item.overview}</div>
            </div>
            <div className={cx('rating')}>
                <span>{item.vote_average}</span>
                <FontAwesomeIcon icon={faStar} className={cx('star')} />
            </div>
        </div>
    );
};

export default MovieSearchItem;
