import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import * as SearchMovie from '~/services/Search/SearchMovie';
import { useParams, useNavigate } from 'react-router-dom';
import MovieItem from '~/components/MovieItem/MovieItem';
import Paginantion from './Pagination/Pagination';
import Skeleton from '~/Skeleton/Skeleton';
import { useMovie } from '~/GlobalState/useMovie';
import Button from '~/Button/Button';
import config from '~/config';

const cx = classNames.bind(styles);

const Search = () => {
    const { searchKey, page } = useParams();
    const navigate = useNavigate();

    const { mediaType } = useMovie();

    const [searchResult, setSearchResult] = useState({});
    const [delay, setDelay] = useState(true);
    const [searchType, setSearchType] = useState('movie');

    useEffect(() => {
        const getSearchValue = async () => {
            try {
                const res = await SearchMovie.search(searchType, searchKey, page);
                setDelay(true);
                setSearchResult(res);
            } catch (error) {
                console.log(error);
            }
        };
        window.scrollTo(0, 0);
        getSearchValue();
    }, [searchKey, page, searchType]);

    console.log(searchResult);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [searchKey, page]);

    useEffect(() => {
        const runTime = setTimeout(() => setDelay(false), 1000);
        return () => clearTimeout(runTime);
    }, [searchKey, page, searchType]);

    const handleToDetail = (id) => {
        navigate(`${config.routes.home}${searchType}/detail/${id}`);
    };

    console.log(delay);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <p className={cx('noti-search')}>
                    Your search results for "<span>{searchKey}</span>" ({searchResult.total_results} results){' '}
                </p>
                <div className={cx('search-of-type')}>
                    <div className={cx('search-result')}>
                        {delay === false &&
                            searchResult.results?.map((item, index) => (
                                <div className={cx('wrapper-item')} onClick={() => handleToDetail(item.id)}>
                                    <MovieItem item={item} key={index} />
                                </div>
                            ))}
                        {!searchResult && new Array(20).fill('').map((_, index) => <Skeleton key={index} />)}
                    </div>
                    <div className={cx('type-search')}>
                        <Button onClick={() => setSearchType('tv')}>TV Show</Button>
                        <Button onClick={() => setSearchType('movie')}>Movie</Button>
                    </div>
                </div>
            </div>
            <Paginantion currentPage={page} endPage={searchResult.total_pages} querry={searchKey} />
        </div>
    );
};

export default Search;
