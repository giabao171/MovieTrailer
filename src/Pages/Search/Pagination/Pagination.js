import React from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import Button from '~/Button/Button';
import config from '~/config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Paginantion = ({ currentPage, endPage, querry }) => {
    const navigate = useNavigate();

    const ChangePage = (page, keySearch) => {
        navigate(`${config.routes.home}search/${keySearch}/${page}`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                {currentPage > 1 && (
                    <Button circle onClick={() => ChangePage(currentPage - 1, querry)}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                )}

                {currentPage < 5 ? (
                    <>
                        {new Array(endPage < 5 ? endPage : 5).fill('').map((_, index) => (
                            <Button
                                className={Number.parseInt(currentPage) === index + 1 && cx('page-number-active')}
                                circle
                                key={index}
                                onClick={() => ChangePage(index + 1, querry)}
                            >
                                {index + 1}
                            </Button>
                        ))}
                        {endPage > 5 && (
                            <>
                                {endPage > 6 && <span>...</span>}
                                <Button
                                    className={Number.parseInt(currentPage) === endPage && cx('page-number-active')}
                                    circle
                                    onClick={() => ChangePage(endPage, querry)}
                                >
                                    {endPage}
                                </Button>
                            </>
                        )}
                    </>
                ) : currentPage > endPage - 4 ? (
                    <>
                        <Button
                            className={Number.parseInt(currentPage) === 1 && cx('page-number-active')}
                            circle
                            onClick={() => ChangePage(1, querry)}
                        >
                            1
                        </Button>
                        <span>...</span>
                        {new Array(5).fill('').map((_, index) => (
                            <Button
                                className={
                                    Number.parseInt(currentPage) === endPage - 4 + index && cx('page-number-active')
                                }
                                circle
                                key={index}
                                onClick={() => ChangePage(endPage - 4 + index, querry)}
                            >
                                {endPage - 4 + index}
                            </Button>
                        ))}
                    </>
                ) : (
                    <>
                        <Button
                            className={Number.parseInt(currentPage) === 1 && cx('page-number-active')}
                            circle
                            onClick={() => ChangePage(1, querry)}
                        >
                            1
                        </Button>
                        <span>...</span>
                        {new Array(5).fill('').map((_, index) => (
                            <Button
                                className={
                                    Number.parseInt(currentPage) === currentPage - 2 + index && cx('page-number-active')
                                }
                                circle
                                onClick={() => ChangePage(currentPage - 2 + index, querry)}
                                key={index}
                            >
                                {currentPage - 2 + index}
                            </Button>
                        ))}
                        <span>...</span>
                        <Button
                            className={Number.parseInt(currentPage) === endPage && cx('page-number-active')}
                            circle
                            onClick={() => ChangePage(endPage, querry)}
                        >
                            {endPage}
                        </Button>
                    </>
                )}

                {currentPage < endPage && (
                    <Button circle onClick={() => ChangePage(endPage, querry)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Paginantion;
