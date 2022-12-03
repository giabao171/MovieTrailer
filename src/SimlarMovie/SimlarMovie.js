import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SimlarMovie.module.scss';
import * as Similar from '~/services/Movie/GetMovieSimilar';

import Button from '~/Button/Button';
import { URL_IMAGE } from '~/Shared/Constants';
import Image from '~/Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const SimlarMovie = ({ idmovie, typemedia }) => {
    const navigate = useNavigate();

    const [similarList, setSimilarList] = useState({});

    useEffect(() => {
        const getSimilarMovie = async () => {
            try {
                const res = await Similar.getSimilar(typemedia, idmovie);
                setSimilarList(res);
            } catch (error) {
                console.log(error);
            }
        };

        getSimilarMovie();
        // eslint-disable-next-line
    }, [idmovie]);

    const handleToDetail = (idMovie) => {
        navigate(`${config.routes.home}${typemedia}/detail/${idMovie}`);
    };

    return (
        <div className={cx('similar-part')}>
            <h3 className={cx('title-simi')}>You might like</h3>
            <div className={cx('similar-list')}>
                {similarList.results?.slice(0, 5).map((item, index) => (
                    <div key={index} className={cx('similar-item')} onClick={() => handleToDetail(item.id)}>
                        {/* <LazyLoadImage
                        className={cx('similar-poster')}
                        src={`${URL_IMAGE}${item.poster_path}`}
                        alt={item.title}
                    /> */}
                        <Image
                            className={cx('similar-poster')}
                            src={`${URL_IMAGE}${item.poster_path}`}
                            alt={item.title}
                        />
                        <div className={cx('similar-info')}>
                            <span>{item.title || item.name}</span>
                            <Button rounded className={cx('rate-similar')} leftIcon={<FontAwesomeIcon icon={faStar} />}>
                                {item.vote_average}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimlarMovie;
