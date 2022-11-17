import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebouce } from '~/Debouce';
import * as movieServices from '~/services/Search/SearchMovie';

import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import MovieSearchItem from '~/components/MovieSearchItem/MovieSearchItem';

const cx = classNames.bind(styles);

const Search = () => {
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
                const result = await movieServices.search(debounceValue);
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

    return (
        <div>
            <HeadlessTippy
                interactive="true"
                visible={searchResult.length > 0 && showResult}
                render={(attrs) => (
                    <div className={cx('search-result')}>
                        <PopperWrapper>
                            {searchResult?.slice(0, 4).map((item, index) => (
                                <MovieSearchItem item={item} key={index} />
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
                    />
                    {!!searchValue && !showLoading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {showLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default Search;
