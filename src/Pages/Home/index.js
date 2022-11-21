import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import TypeMovieTVshow from './TypeMovieTVshow/TypeMovieTVshow';
import * as Genres from '~/services/Genres/GetGenres';
import GetGenresOfMovie from '~/GetGenresOfMovie';
import Trending from '~/components/Trending/Trending';

const cx = classNames.bind(styles);

const Home = () => {
    // const [value, setValue] = useState([]);

    // const get = async () => {
    //     try {
    //         const res = await Genres.getGenres();
    //         setValue(res);
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

    return (
        <div className={cx('wrapper')}>
            {/* <TypeMovieTVshow /> */}
            {/* <button onClick={getg}>123</button> */}
            {/* {GetGenresOfMovie([28, 12, 878]).map((item, index) => (
                <div key={index}>{item.name}</div>
            ))} */}
            <Trending />
        </div>
    );
};

export default Home;
