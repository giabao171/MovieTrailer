import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Trending.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import Button from '~/Button/Button';
import * as Trend from '~/services/Trending/GetMovieTrending';
import { URL_IMAGE } from '~/Shared/Constants';
import YearRelease from '../YearRelease/YearRelease';
import GetGenresOfMovie from '~/GetGenresOfMovie';

const cx = classNames.bind(styles);

const Trending = () => {
    const [trendingList, setTrendingList] = useState([]);
    const [movie, setMovie] = useState({});
    const [nextMovie, setNextMovie] = useState({});
    const [prevMovie, setPrevMovie] = useState({});

    useEffect(() => {
        try {
            const getTrending = async () => {
                const res = await Trend.getMovie();
                setTrendingList(res.results.slice(0, 6));
            };

            getTrending();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        setMovie(trendingList[0]);
    }, [trendingList]);

    console.log(movie);

    let genresMovie = GetGenresOfMovie(movie?.genre_ids);

    useEffect(() => {
        let n = trendingList.length;
        for (let i = 0; i < n; ++i) {
            if (movie?.id === trendingList[i].id) {
                if (i === 0) {
                    setPrevMovie(trendingList[0]);
                    setNextMovie(trendingList[i + 1]);
                } else if (i === n - 1) {
                    setPrevMovie(trendingList[i - 1]);
                    setNextMovie(trendingList[0]);
                } else {
                    setPrevMovie(trendingList[i - 1]);
                    setNextMovie(trendingList[i + 1]);
                }
            }
        }
    }, [movie]);

    const changeVide = (type) => {
        if (type === 'next') setMovie(nextMovie);
        if (type === 'prev') setMovie(prevMovie);
    };

    useEffect(() => {
        const autoNext = setTimeout(() => {
            changeVide('next');
        }, 5000);

        return () => clearTimeout(autoNext);
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('button-left')} onClick={() => changeVide('prev')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={cx('button-right')} onClick={() => changeVide('next')}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div
                    className={cx('backgrond-movie')}
                    style={{
                        backgroundImage: `url(${URL_IMAGE}${movie?.backdrop_path})`,
                    }}
                >
                    <FontAwesomeIcon icon={faPlayCircle} className={cx('play-icon')} />
                    <div className={cx('movie-infomation')}>
                        <div className={cx('movie-desc')}>
                            <h2 className={cx('movie-name')}>{movie?.title || movie?.name}</h2>
                            <div className={cx('date-release')}>
                                <div className={cx('rating-des')}>
                                    <FontAwesomeIcon icon={faStar} className={cx('star-icon')} />
                                    {`${movie?.vote_average}|${movie?.vote_count}`}
                                </div>
                                <p>-</p>
                                {(!!movie?.release_date || !!movie?.first_air_date) && (
                                    <div className={cx('date')}>
                                        {YearRelease(movie?.release_date || movie?.first_air_date)}
                                    </div>
                                )}
                            </div>
                            <div className={cx('movie-detail')}>
                                {!!movie?.genre_ids && (
                                    <div className={cx('genres')}>
                                        {genresMovie.map((item, index) => (
                                            <Button key={index}>{item.name}</Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={cx('over-view')}>{movie?.overview}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;
