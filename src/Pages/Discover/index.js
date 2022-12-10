import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Discover.module.scss';
import * as DiscoverM from '~/services/Explore/GetDiscover';
import * as Genres from '~/services/Genres/GetGenres';
import Image from '~/Image/Image';
import images from '~/assets/images';
import MovieItem from '~/components/MovieItem/MovieItem';
import OptionBox from '~/components/OptionBox/OptionBox';
import Button from '~/Button/Button';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useMovie } from '~/GlobalState/useMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import Ghost from '~/components/Ghost/Ghost';

const cx = classNames.bind(styles);

const Discover = () => {
    const navigate = useNavigate();

    const { MEDIA_TYPE, SORT_BY } = useMovie();

    const [page, setPage] = useState(1);
    const [discoverList, setDiscoverList] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [delay, setDelay] = useState(true);

    const [showSort, setShowSort] = useState(true);
    const [showGenres, setShowGenres] = useState(true);
    const [stringGenres, setStringGenres] = useState([]);

    const [typeValue, setTypeValue] = useState(MEDIA_TYPE[0].value);
    const [sortValue, setSortValue] = useState(SORT_BY[0]);

    useEffect(() => {
        const DiscoverMovie = async () => {
            try {
                const res = await DiscoverM.getListDiscover(typeValue, sortValue.value, stringGenres.join(), page);
                setDiscoverList((prev) => [...prev, ...res?.results]);
                // setDiscoverList(res?.results);
            } catch (error) {
                console.log(error);
            }
        };
        DiscoverMovie();
    }, [typeValue, sortValue, stringGenres, page]);

    useEffect(() => {
        const GetGenres = async () => {
            try {
                const res = await Genres.getGenres(typeValue);
                setGenresList(res);
            } catch (error) {
                console.log(error);
            }
        };
        GetGenres();
    }, [typeValue]);

    useEffect(() => {
        const runTime = setTimeout(() => setDelay(false), 900);
        return () => clearTimeout(runTime);
    }, [typeValue, sortValue, stringGenres]);

    const selectGenres = (idGenres) => {
        if (stringGenres.includes(idGenres)) {
            setStringGenres(stringGenres.filter((id) => id !== idGenres));
        } else {
            setStringGenres((prev) => [...prev, idGenres]);
        }
    };

    const resetList = () => {
        setPage(1);
        setDiscoverList([]);
    };

    const handleToDetail = (idMovie) => {
        navigate(`${config.routes.home}${typeValue}/detail/${idMovie}`);
    };

    // console.log(genresList);
    // console.log(discoverList);
    // console.log(typeValue);
    // console.log(sortValue);
    // console.log(stringGenres);
    // console.log(discoverList?.length);
    // console.log(page);
    return (
        <InfiniteScroll
            dataLength={discoverList.length}
            next={() => {
                setPage(page + 1);
            }}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            // loader={<Ghost />}
        >
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h2 className={cx('default-title')}>
                        Let's <Image className={cx('logo-item')} src={images.logo} alt="logo" />
                        <span>CB Movie</span> help you to discover your hobby
                    </h2>
                    <div className={cx('discover-content')}>
                        {discoverList.length !== 0 ? (
                            <div className={cx('discover-list')}>
                                {delay === false &&
                                    discoverList?.map(
                                        (item, index) =>
                                            !!item.poster_path && (
                                                <div
                                                    className={cx('movie-item')}
                                                    key={index}
                                                    onClick={() => {
                                                        handleToDetail(item.id);
                                                    }}
                                                >
                                                    <MovieItem item={item} />
                                                </div>
                                            ),
                                    )}
                            </div>
                        ) : (
                            delay === false && (
                                <div className={cx('no-fit')}>
                                    <Image className={cx('img-fit')} src={images.noFilter} alt="No film fit" />
                                    {/* <Ghost /> */}
                                    <h2>Sorry we can't find your film</h2>
                                </div>
                            )
                        )}
                        <div className={cx('discover-option')}>
                            <OptionBox className={cx('option-wrapper')} title="You choose">
                                <div className={cx('type-title', 'header')}>
                                    <h4>Type</h4>
                                </div>
                                <div className={cx('type-list')}>
                                    {MEDIA_TYPE.map((item, index) => (
                                        <Button
                                            key={index}
                                            className={
                                                typeValue === item.value
                                                    ? cx('type-btn', 'type-active')
                                                    : cx('type-btn')
                                            }
                                            onClick={() => {
                                                setTypeValue(item.value);
                                                resetList();
                                            }}
                                        >
                                            {item.title}
                                        </Button>
                                    ))}
                                </div>
                                <div className={cx('sort-header', 'header')} onClick={() => setShowSort(!showSort)}>
                                    <h4 className={cx('type-title')}>Sort by: {sortValue.title}</h4>
                                    <span className={showSort ? cx('more-icon', 'mi-active') : cx('more-icon')}>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                </div>
                                {showSort && (
                                    <div className={cx('type-list', 'sort')}>
                                        {SORT_BY.map((item, index) => (
                                            <Button
                                                key={index}
                                                className={
                                                    sortValue === item ? cx('type-btn', 'type-active') : cx('type-btn')
                                                }
                                                onClick={() => {
                                                    setSortValue(item);
                                                    resetList();
                                                }}
                                            >
                                                {item.title}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                                <div className={cx('sort-header', 'header')} onClick={() => setShowGenres(!showGenres)}>
                                    <h4 className={cx('type-title')}>Genres</h4>
                                    <span className={showGenres ? cx('more-icon', 'mi-active') : cx('more-icon')}>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </span>
                                </div>
                                {showGenres && (
                                    <div className={cx('genres')}>
                                        {genresList.map((item, index) => (
                                            <Button
                                                rounded
                                                key={index}
                                                className={
                                                    stringGenres.includes(item.id)
                                                        ? cx('genres-btn', 'gr-btn-active')
                                                        : cx('genres-btn')
                                                }
                                                onClick={() => {
                                                    selectGenres(item.id);
                                                    resetList();
                                                }}
                                            >
                                                {item.name}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </OptionBox>
                        </div>
                    </div>
                </div>
            </div>
        </InfiniteScroll>
    );
};

export default Discover;
