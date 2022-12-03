import React from 'react';
import classNames from 'classnames/bind';
import styles from './MovieItem.module.scss';
import Image from '~/Image/Image';
import images from '~/assets/images';
import { URL_IMAGE } from '~/Shared/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const cx = classNames.bind(styles);

const MovieItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <LazyLoadImage
                        className={cx('poster-img')}
                        src={
                            // item.poster_path || item.profile_path
                            //     ? `${URL_IMAGE}${item.poster_path}` || `${URL_IMAGE}${item.profile_path}`
                            //     : `${images.noImage}`
                            !!item.poster_path
                                ? `${URL_IMAGE}${item.poster_path}`
                                : !!item.profile_path
                                ? `${URL_IMAGE}${item.profile_path}`
                                : `${images.noImage}`
                        }
                        effect="blur"
                        // effect="opacity"
                        alt={item.title}
                    />
                    {!!item.poster_path && (
                        <div className={cx('rate-box')}>
                            <span>{item.vote_average}</span>
                            <span className={cx('star-icon')}>
                                <FontAwesomeIcon icon={faStar} />
                            </span>
                        </div>
                    )}
                    <div className={cx('movie-title')}>
                        <span>{item.title || item.name}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieItem;
