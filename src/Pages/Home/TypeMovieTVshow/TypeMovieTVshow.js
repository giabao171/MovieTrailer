import React, { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TypeMovieTVshow.module.scss';

import Button from '~/Button/Button';

const cx = classNames.bind(styles);

const TypeMovieTVshow = () => {
    const lineRef = useRef();
    const tvshowBtnRef = useRef();
    const movieBtnRef = useRef();

    const handleChangeUnderline = (pos) => {
        lineRef.current.setAttribute('style', `transform: translateX(${pos}%)`);
    };

    const selectTvShowType = () => {
        tvshowBtnRef.current.setAttribute('style', `color: var(--font-color)`);
        movieBtnRef.current.setAttribute('style', `color: var(--font-color-opa)`);
    };

    const selectMovieType = () => {
        movieBtnRef.current.setAttribute('style', `color: var(--font-color)`);
        tvshowBtnRef.current.setAttribute('style', `color: var(--font-color-opa)`);
    };

    useEffect(() => {
        selectMovieType();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('type-film')}>
                <div className={cx('movie-type')}>
                    <Button
                        ref={movieBtnRef}
                        className={cx('btn-type')}
                        onClick={() => {
                            handleChangeUnderline(0);
                            selectMovieType();
                        }}
                    >
                        Movie
                    </Button>
                </div>
                <div className={cx('tvshow-type')}>
                    <Button
                        ref={tvshowBtnRef}
                        className={cx('btn-type')}
                        onClick={() => {
                            handleChangeUnderline(100);
                            selectTvShowType();
                        }}
                    >
                        TV Show
                    </Button>
                </div>
                <div className={cx('under-line')} ref={lineRef}></div>
            </div>
        </div>
    );
};

export default TypeMovieTVshow;
