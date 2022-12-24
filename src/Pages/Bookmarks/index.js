import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Bookmarks.module.scss';
import config from '~/config';
import { useMovie } from '~/GlobalState/useMovie';
import MovieItem from '~/components/MovieItem/MovieItem';

import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { db } from '~/firebase';
import { onSnapshot, doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const Bookmarks = () => {
    const navigate = useNavigate();
    const { currentUser } = useMovie();
    const [listBookmarks, setListBookmarks] = useState([]);

    useEffect(() => {
        if (!!currentUser) {
            const getListBookmark = () => {
                try {
                    onSnapshot(doc(db, 'users', currentUser?.uid), (doc) => {
                        setListBookmarks(doc.data()?.bookmarks);
                        // doc.data()?.bookmarks.map((item) => console.log(item));
                    });
                } catch (error) {
                    console.log(error);
                }
            };
            getListBookmark();
        } else {
            navigate(`${config.routes.signIn}`);
        }
        // eslint-disable-next-line
    }, []);
    // console.log(listBookmarks);
    // console.log(currentUser);

    const handleToDetail = (id, typeMedia) => {
        navigate(`${config.routes.home}${typeMedia}/detail/${id}`);
    };

    const deleteBookmark = async (item) => {
        await updateDoc(doc(db, 'users', currentUser?.uid), {
            bookmarks: arrayRemove({
                poster_path: item.poster_path,
                id: item.id,
                vote_average: item.vote_average,
                media_type: item.media_type,
                ...(item.media_type === 'movie' && { title: item.title }),
                ...(item.media_type === 'tv' && { name: item.name }),
            }),
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <p className={cx('noti-bookmark-result')}>Your Bookmarks</p>
                {listBookmarks.length > 0 ? (
                    <div className={cx('bookmark-result')}>
                        {listBookmarks?.map((item, index) => (
                            <Tippy
                                placement="bottom"
                                interactive="true"
                                key={index}
                                render={(attrs) => (
                                    <div className={cx('del-wrapper')} onClick={() => deleteBookmark(item)}>
                                        <span>
                                            <FontAwesomeIcon icon={faDeleteLeft} />
                                        </span>
                                        Delete from bookmark
                                    </div>
                                )}
                            >
                                <div onClick={() => handleToDetail(item.id, item.media_type)}>
                                    <MovieItem item={item} />
                                </div>
                            </Tippy>
                        ))}
                    </div>
                ) : (
                    <div className={cx('no-bookmark')}>
                        <img src={images.noBookmark} />
                        <h2>Oh! Nothing here, Let's discover!!</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmarks;
