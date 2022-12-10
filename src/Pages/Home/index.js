import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Trending from '~/components/Trending/Trending';

import MovieSlideList from '~/components/MovieSlideList/MovieSlideList';
import Option from '~/Option/Option';
import { useMovie } from '~/GlobalState/useMovie';

const cx = classNames.bind(styles);

const Home = () => {
    const { MEDIA_TYPE, mediaType, setMediaType } = useMovie();

    return (
        <div className={cx('wrapper')}>
            <Trending />
            <div className={cx('option')}>
                <Option listOption={MEDIA_TYPE} option={mediaType} setOption={setMediaType} />
            </div>
            <MovieSlideList titleList={'Popular'} />
            <MovieSlideList titleList={'Top Rated'} />
            <MovieSlideList titleList={'Trending'} />
            {mediaType === 'movie' && <MovieSlideList titleList={'Up Coming'} />}
            {mediaType === 'tv' && <MovieSlideList titleList={'On air'} />}
        </div>
    );
};

export default Home;
