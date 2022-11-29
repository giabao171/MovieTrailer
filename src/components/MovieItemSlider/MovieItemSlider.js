import React from 'react';
import classNames from 'classnames/bind';
import styles from './MovieItemSlider.module.scss';
import { URL_IMAGE } from '~/Shared/Constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import config from '~/config';
import { useMovie } from '~/GlobalState/useMovie';

const cx = classNames.bind(styles);

const MovieItemSlider = ({ item }) => {
    const navigate = useNavigate();

    const { mediaType } = useMovie();

    const handleToDetail = (id) => {
        navigate(`${config.routes.home}${mediaType}/detail/${id}`);
    };

    return (
        <div className={cx('wrapper')} onClick={() => handleToDetail(item.id)}>
            <div className={cx('inner')}>
                <div
                    className={cx('movie-background')}
                    style={{
                        backgroundImage: `url(${URL_IMAGE}${item.poster_path})`,
                    }}
                >
                    <div className={cx('rate-box')}>
                        <span>{item.vote_average}</span>
                        <span className={cx('star-icon')}>
                            <FontAwesomeIcon icon={faStar} />
                        </span>
                    </div>

                    <div className={cx('desc')}>
                        <span>{item.title || item.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieItemSlider;
