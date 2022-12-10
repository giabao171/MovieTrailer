import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import * as SearchMovie from '~/services/Search/SearchMovie';
import { useParams, useNavigate } from 'react-router-dom';
import MovieItem from '~/components/MovieItem/MovieItem';
import Pagination from '~/components/Pagination/Pagination';
import Skeleton from '~/Skeleton/Skeleton';
import { useMovie } from '~/GlobalState/useMovie';
import Button from '~/Button/Button';
import config from '~/config';
import OptionBox from '~/components/OptionBox/OptionBox';
import images from '~/assets/images';
import Image from '~/Image/Image';

const cx = classNames.bind(styles);

const Search = () => {
    const { searchKey, page } = useParams();
    const navigate = useNavigate();

    const { SEARCH_TYPE } = useMovie();

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

    // console.log(searchResult);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [searchKey, page]);

    useEffect(() => {
        const runTime = setTimeout(() => setDelay(false), 900);
        return () => clearTimeout(runTime);
    }, [searchKey, page, searchType]);

    const handleToDetail = (id, typeMedia) => {
        if (searchType === 'person') {
            navigate(`${config.routes.home}person/detail/${id}`);
        } else if (searchType === 'multi') {
            navigate(`${config.routes.home}${typeMedia}/detail/${id}`);
        } else {
            navigate(`${config.routes.home}${searchType}/detail/${id}`);
        }
    };

    // console.log(delay);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {searchKey !== ' ' ? (
                    <p className={cx('noti-search')}>
                        Your search results for "<span>{searchKey}</span>" ({searchResult.total_results} results){' '}
                    </p>
                ) : (
                    <p className={cx('noti-search', 'noti-default')}>
                        Search every you want <Image className={cx('logo-item')} src={images.logo} alt="logo" />
                        <span>CB Movie</span> here to help you !!!
                    </p>
                )}

                <div className={cx('search-of-type')}>
                    {searchKey !== ' ' ? (
                        searchResult.results?.length !== 0 ? (
                            <div className={cx('search-result')}>
                                {delay === false &&
                                    searchResult.results?.map((item, index) => (
                                        <div
                                            key={index}
                                            className={cx('wrapper-item')}
                                            onClick={() => handleToDetail(item.id, item.media_type)}
                                        >
                                            <MovieItem item={item} />
                                        </div>
                                    ))}
                                {!searchResult && new Array(20).fill('').map((_, index) => <Skeleton key={index} />)}
                            </div>
                        ) : (
                            <Image src={images.searchNotFound} alt="No result found" />
                        )
                    ) : (
                        <Image className={cx('default-img')} src={images.searchDefault} alt="Search default" />
                    )}
                    <OptionBox className={cx('option-wrapper')} title="Search type">
                        {/* <h4 className={cx('search-type-tit')}>Search type</h4> */}
                        <div className={cx('type-list')}>
                            {SEARCH_TYPE.map((item, index) => (
                                <Button
                                    key={index}
                                    className={
                                        searchType !== item.value ? cx('option-btn') : cx('option-btn', 'btn-active')
                                    }
                                    onClick={() => setSearchType(item.value)}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </div>
                    </OptionBox>
                </div>
            </div>
            {searchKey !== ' ' && (
                <Pagination currentPage={page} endPage={searchResult.total_pages} querry={searchKey} />
            )}
        </div>
    );
};

export default Search;
