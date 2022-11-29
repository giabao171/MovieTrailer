import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MovieSlideList.module.scss';
import MovieItemSlider from '../MovieItemSlider/MovieItemSlider';
import * as MoviePopular from '~/services/GetListMovie/GetListPopular';
import * as MovieTopRates from '~/services/GetListMovie/GetListTopRate';
import * as MovieUpComing from '~/services/GetListMovie/GetListUpComing';
import * as MovieByGenres from '~/services/Explore/GetMovieByGenres';
import * as Trending from '~/services/Trending/GetMovieTrending';
import * as OnAir from '~/services/GetListTVshow/GetListOnAir';
import { useMovie } from '~/GlobalState/useMovie';

import './SliderStyle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const MovieSlideList = ({ titleList }) => {
    // useEffect(() => {
    //     setWi(!wi);
    // });
    // console.log(wi);
    // window.addEventListener('resize', () => {
    //     setWi(!wi);
    // });

    const { mediaType } = useMovie();

    const [listMovie, setListMovie] = useState([]);

    useEffect(() => {
        const getPopularMovie = async () => {
            try {
                if (titleList === 'Popular') {
                    const res = await MoviePopular.getListPopular(mediaType === 'movie' ? 'movie' : 'tv', 1);
                    setListMovie(res.results);
                }
                if (titleList === 'Top Rated') {
                    const res = await MovieTopRates.getListTopRate(mediaType === 'movie' ? 'movie' : 'tv', 1);
                    setListMovie(res.results);
                }
                if (titleList === 'Trending') {
                    const res = await Trending.getMovie(mediaType === 'movie' ? 'movie' : 'tv', 'week');
                    setListMovie(res.results);
                }
                if (titleList === 'Up Coming') {
                    const res = await MovieUpComing.getListUpComing();
                    setListMovie(res.results);
                }
                if (titleList === 'On air') {
                    const res = await OnAir.getListOnAir();
                    setListMovie(res.results);
                }
                if (titleList === 'Exciting Action') {
                    const res = await MovieByGenres.getListByGenres('1', '28');
                    setListMovie(res.results);
                }
                if (titleList === 'Drama for you') {
                    const res = await MovieByGenres.getListByGenres('1', '18');
                    setListMovie(res.results);
                }
                if (titleList === 'Animation for happy day') {
                    const res = await MovieByGenres.getListByGenres('1', '16');
                    setListMovie(res.results);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getPopularMovie();
    }, [mediaType]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-box')}>
                <div className={cx('title')}>{titleList}</div>
                <div className={cx('more-btn')}>
                    <span>More</span>
                    <FontAwesomeIcon icon={faAngleDown} className={cx('more-icon')} />
                </div>
            </div>
            <div className={cx('inner')}>
                {/* <div className={cx('blur-left')}></div>
                <div className={cx('blur-right')}></div> */}
                <Swiper
                    className={cx('mySwiper')}
                    modules={[Navigation]}
                    navigation
                    slidesPerView={5}
                    // slidesPerView="auto"
                    slidesPerGroup={5}
                    spaceBetween={15}
                    loop
                    effect={'fade'}
                    freeMode={true}
                >
                    {listMovie.map((item, index) => (
                        <SwiperSlide key={index}>
                            <MovieItemSlider item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MovieSlideList;
