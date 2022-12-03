import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebouce } from '~/Debouce';
// import * as movieServices from '~/services/Search/SearchMovie';
import * as SearchKey from '~/services/Search/SearchKeyWord';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import MovieSearchItem from '~/components/MovieSearchItem/MovieSearchItem';
// import { useMovie } from '~/GlobalState/useMovie';
import SeachKeyWordItem from '~/components/SeachKeyWordItem/SeachKeyWordItem';

const cx = classNames.bind(styles);

const Search = () => {
    const navigate = useNavigate();

    // const { mediaType } = useMovie();

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const inputRef = useRef();
    const debounceValue = useDebouce(searchValue, 500);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }
        setShowLoading(true);

        const fetch = async () => {
            try {
                // const result = await movieServices.search(mediaType, debounceValue, 1);
                const result = await SearchKey.searchKeyWord(debounceValue, 1);
                setSearchResult(result.results);
                setShowLoading(false);
            } catch (error) {
                setShowLoading(false);
            }
        };

        fetch();
    }, [debounceValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleChangeSearchValue = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
        setShowResult(true);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleToSearch = (key) => {
        if (key !== '') navigate(`${config.routes.home}search/${key}/1`);
        setSearchResult([]);
    };

    const handleToSearchKey = (e, key) => {
        if (e.keyCode === 13) {
            if (key !== '') navigate(`${config.routes.home}search/${key}/1`);
            setSearchResult([]);
        }
    };

    // console.log(searchResult);
    return (
        <div>
            <HeadlessTippy
                interactive="true"
                visible={searchResult.length > 0 && showResult}
                render={(attrs) => (
                    <div className={cx('search-result')}>
                        <PopperWrapper>
                            {searchResult?.slice(0, 7).map((item, index) => (
                                // <MovieSearchItem item={item} key={index} />
                                <SeachKeyWordItem item={item} key={index} />
                            ))}
                            {/* <MovieSearchItem /> */}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onChange={handleChangeSearchValue}
                        placeholder="Search..."
                        spellCheck={false}
                        onKeyDown={(e) => handleToSearchKey(e, searchValue)}
                    />
                    {!!searchValue && !showLoading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {showLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onClick={() => handleToSearch(searchValue)}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
