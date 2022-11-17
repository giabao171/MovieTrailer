import React from 'react';
import classNames from 'classnames/bind';
import styles from './MovieSearchItem.module.scss';
import Image from '~/Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { URL_IMAGE } from '~/Shared/Constants';

const cx = classNames.bind(styles);

const MovieSearchItem = ({ item }) => {
    // console.log(item);
    return (
        <div className={cx('wrapper')}>
            <Image className={cx('movie-image')} src={`${URL_IMAGE}${item.poster_path}`} alst={item.title} />
            <div className={cx('movie-info')}>
                <div className={cx('movie-title')}>
                    <span>{item.title}</span>
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
