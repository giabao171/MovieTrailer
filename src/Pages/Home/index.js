import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import TypeMovieTVshow from './TypeMovieTVshow/TypeMovieTVshow';
import * as Genres from '~/services/Genres/GetGenres';
import GetGenresOfMovie from '~/GetGenresOfMovie';
import * as GetMovie from '~/services/GetListMovie/GetListPopular';
import Trending from '~/components/Trending/Trending';
// import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import MovieSlideList from '~/components/MovieSlideList/MovieSlideList';
import Tippy from '@tippyjs/react/headless';
import Option from '~/Option/Option';
import { useMovie } from '~/GlobalState/useMovie';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';

// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

// import '~/Pages/Home/Home.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Home = () => {
    // const [value, setValue] = useState(true);

    // const get = async () => {
    //     try {
    //         const res = await GetMovie.getListPopular();
    //         setValue(res.results);
    //     } catch (error) {}
    // };
    // const res = GetGenresOfMovie([28, 12, 878]);
    // const getg = () => {
    //     // setValue(123456);
    //     const res = GetGenresOfMovie('123456789');
    //     setValue(res);
    //     // console.log(123);
    // };
    // console.log(value);

    // const getG = () => {
    //     const res = GetGenresOfMovie([28, 12, 878]);
    //     setValue(res);
    // };
    // const swiper = useSwiper();

    // SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

    // let ele = document.querySelector('.swiper-button-next');
    const { MEDIA_TYPE, mediaType, setMediaType } = useMovie();

    return (
        <div className={cx('wrapper')}>
            {/* <TypeMovieTVshow /> */}
            {/* <button onClick={getg}>123</button> */}
            {/* {GetGenresOfMovie([28, 12, 878]).map((item, index) => (
                <div key={index}>{item.name}</div>
            ))} */}
            <Trending />

            <div className={cx('option')}>
                <Option listOption={MEDIA_TYPE} option={mediaType} setOption={setMediaType} />
            </div>
            <MovieSlideList titleList={'Popular'} />
            <MovieSlideList titleList={'Top Rated'} />
            <MovieSlideList titleList={'Trending'} />
            {mediaType == 'movie' && <MovieSlideList titleList={'Up Coming'} />}
            {mediaType == 'tv' && <MovieSlideList titleList={'On air'} />}

            {/* <h3 className={cx('suggest')}>Suggest for you</h3>
            <MovieSlideList titleList={'Exciting Action'} />
            <MovieSlideList titleList={'Drama for you'} />
            <MovieSlideList titleList={'Animation for happy day'} /> */}

            {/* <Tippy
                interactive="true"
                visible={value}
                render={(attrs) => <div className={cx('search-result')}>123456789</div>}
                onClickOutside={() => setValue(false)}
            >
                {/* <button onMouseEnter={() => setValue(true)}>123</button> */}
            {/* </Tippy>  */}

            {/* <button onClick={get}> click me</button> */}
        </div>
    );
};

export default Home;
