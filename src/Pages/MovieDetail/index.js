import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MovieDetail.module.scss';
import { useParams } from 'react-router-dom';
import * as Movie from '~/services/Movie/GetMovieDetail';
import * as Media from '~/services/Media/GetMedia';
import { URL_IMAGE } from '~/Shared/Constants';
import { useMovie } from '~/GlobalState/useMovie';
import Button from '~/Button/Button';
import GetCasting from '~/GetCasting';
import Option from '~/Option/Option';
import Image from '~/Image/Image';
import images from '~/assets/images';
import MediaItem from '~/MediaItem/MediaItem';
import SimlarMovie from '~/SimlarMovie/SimlarMovie';
import config from '~/config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart, faPlay, faShareNodes, faStar } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
import { db } from '~/firebase';
import { arrayUnion, arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

const MovieDetail = () => {
    const { idmovie, typemedia } = useParams();
    const navigate = useNavigate();

    const { OPTION_DETAIL, currentUser } = useMovie();

    const [details, setDetails] = useState({});
    const [media, setMedia] = useState([]);
    const [option, setOption] = useState({});
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [tryBookmarks, setTryBookmarks] = useState(false);

    const listCasting = GetCasting(typemedia, idmovie);

    useEffect(() => {
        const getDetailMovie = async () => {
            try {
                const res = await Movie.getDetail(typemedia, idmovie);
                setDetails(res);
                setOption('Overview');
                // setReRender(!reRender);
            } catch (error) {
                console.log(error);
            }
        };
        setMedia([]);
        getDetailMovie();
    }, [idmovie]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
        onSnapshot(doc(db, 'users', currentUser?.uid), (doc) => {
            setIsBookmarked(doc.data()?.bookmarks.some((item) => item.id === details.id));
        });
        // console.log(isBookmarked);
        // console.log(tryBookmarks);
        // eslint-disable-next-line
    }, [idmovie, currentUser, tryBookmarks]);

    const updateBookmark = async () => {
        setTryBookmarks(!tryBookmarks);
        await updateDoc(doc(db, 'users', currentUser?.uid), {
            bookmarks: !isBookmarked
                ? arrayUnion({
                      poster_path: details?.poster_path,
                      id: details?.id,
                      vote_average: details?.vote_average,
                      media_type: typemedia,
                      ...(typemedia === 'movie' && { title: details?.title }),
                      ...(typemedia === 'tv' && { name: details?.name }),
                  })
                : arrayRemove({
                      poster_path: details?.poster_path,
                      id: details?.id,
                      vote_average: details?.vote_average,
                      media_type: typemedia,
                      ...(typemedia === 'movie' && { title: details?.title }),
                      ...(typemedia === 'tv' && { name: details?.name }),
                  }),
        });
    };

    useEffect(() => {
        const getMedialMovie = async () => {
            try {
                const res = await Media.getMedia(typemedia, idmovie);
                const n = res.results.length;
                for (let i = 0; i < n; ++i) {
                    if (res.results[i].type === 'Trailer') setMedia((prev) => [...prev, res.results[i]]);
                }
                // setMedia(res.results);
            } catch (error) {
                console.log(error);
            }
        };

        getMedialMovie();
        // eslint-disable-next-line
    }, [idmovie]);

    const handleToWatch = (idMovie) => {
        if (typemedia === 'movie') {
            navigate(`${config.routes.home}watch/${typemedia}/${idMovie}/none/none`);
        } else {
            navigate(`${config.routes.home}watch/${typemedia}/${idMovie}/1/1`);
        }
    };

    const handleToSignIn = () => {
        navigate(`${config.routes.signIn}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        // divRef.current.scrollTo(0, 0);
    }, [idmovie]);

    // console.log(media);

    // console.log(listCasting);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <LazyLoadImage
                    className={cx('poter-img')}
                    src={!!details.poster_path ? `${URL_IMAGE}${details.poster_path}` : `${images.noImage}`}
                    alt={details.name}
                />
                <div
                    className={cx('background')}
                    style={
                        !!details.backdrop_path
                            ? { backgroundImage: `url(${URL_IMAGE}${details.backdrop_path})` }
                            : { backgroundImage: `url(${images.noBackground})` }
                    }
                >
                    <div className={cx('background-info')}>
                        <h2 className={cx('movie-title')}>{details.title || details.name}</h2>
                        <div className={cx('genres')}>
                            {details.genres?.map((item, index) => (
                                <Button key={index}>{item.name}</Button>
                            ))}
                        </div>
                        <div className={cx('interaction-list')}>
                            <Tippy content={!!isBookmarked ? 'Added to bookmark' : 'Add to bookmark'} placement="left">
                                <Button
                                    circle
                                    className={
                                        !!isBookmarked ? cx('interaction-btn', 'active-b') : cx('interaction-btn')
                                    }
                                    onClick={!!currentUser ? updateBookmark : handleToSignIn}
                                >
                                    <FontAwesomeIcon icon={faHeart} />
                                </Button>
                            </Tippy>
                            <Tippy content="Share" placement="bottom">
                                <Button circle className={cx('interaction-btn')}>
                                    <FontAwesomeIcon icon={faShareNodes} />
                                </Button>
                            </Tippy>
                            <Tippy content="More" placement="right">
                                <Button circle className={cx('interaction-btn')}>
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </Button>
                            </Tippy>
                        </div>
                        <div className={cx('rating')}>
                            <div className={cx('rating-icon')}>
                                <FontAwesomeIcon icon={faStar} className={cx('icon')} />
                            </div>
                            <div className={cx('rating-number')}>
                                <div className={cx('rating-point')}>{details.vote_average} / 10</div>
                                <span className={cx('rating-count')}>{details.vote_count} Review</span>
                            </div>
                        </div>
                        <div className={cx('buttons')}>
                            <Button
                                className={cx('play-movie-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                onClick={() => handleToWatch(details.id)}
                            >
                                Play
                            </Button>
                            <Button className={cx('play-trailer-btn')} onClick={() => setOption('Media')}>
                                Trailer
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('more-info')}>
                    <div className={cx('option-view')}>
                        <Option listOption={OPTION_DETAIL} option={option} setOption={setOption} />

                        <div className={cx('option-part')}>
                            {option === 'Overview' && (
                                <div className={cx('overview-part')}>
                                    <h4 className={cx('tagline')}>"{details.tagline}"</h4>
                                    <h4 className={cx('story-line')}>Story:</h4>
                                    <div className={cx('overview-story')}>{details.overview}</div>
                                </div>
                            )}
                            {option === 'Info' && (
                                <div className={cx('info-part')}>
                                    <div className={cx('info-item')}>
                                        <h4>Status:</h4>
                                        <span>{details.status}</span>
                                    </div>
                                    {typemedia === 'movie' ? (
                                        <div className={cx('info-item')}>
                                            <h4>Release Date:</h4>
                                            <span>{details.release_date}</span>
                                        </div>
                                    ) : (
                                        <div className={cx('info-item')}>
                                            <h4>First Air Date:</h4>
                                            <span>{details.first_air_date}</span>
                                        </div>
                                    )}
                                    <div className={cx('info-item')}>
                                        <h4>Run Time:</h4>
                                        {typemedia === 'movie' ? (
                                            <span>{details.runtime} min</span>
                                        ) : (
                                            <span>{details.episode_run_time} min per episode</span>
                                        )}
                                    </div>
                                    <div className={cx('info-item')}>
                                        <h4>Production companies:</h4>
                                        {details.production_companies?.map((item, index) => (
                                            <span key={index}>{item.name}, </span>
                                        ))}
                                    </div>
                                    <div className={cx('info-item')}>
                                        <h4>Production Countries:</h4>
                                        {details.production_countries?.map((item, index) => (
                                            <span key={index}>{item.name}, </span>
                                        ))}
                                    </div>
                                    <div className={cx('info-item')}>
                                        <h4>Spoken Language:</h4>
                                        {details.spoken_languages?.map((item, index) => (
                                            <span key={index}>{item.english_name}, </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {option === 'Cast' && (
                                <div className={cx('cast-part')}>
                                    <h4 className={cx('cast-type')}>Director</h4>
                                    <div className={cx('director-box', 'box')}>
                                        {listCasting.director.map((item, index) => (
                                            <div className={cx('casting-item')} key={index}>
                                                <Image
                                                    className={cx('cast-img')}
                                                    src={`${URL_IMAGE}${item.profile_path}`}
                                                    alt={item.name}
                                                />
                                                <div className={cx('cast-info')}>
                                                    <span className={cx('name')}>{item.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <h4 className={cx('cast-type')}>Actor</h4>
                                    <div className={cx('actor-box', 'box')}>
                                        {listCasting.actors.slice(0, 5).map((item, index) => (
                                            <div className={cx('casting-item')} key={index}>
                                                <Image
                                                    className={cx('cast-img')}
                                                    src={`${URL_IMAGE}${item.profile_path}`}
                                                    alt={item.name}
                                                />
                                                <div className={cx('cast-info')}>
                                                    <span className={cx('name')}>{item.name}</span>
                                                    <p> as {item.character}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {option === 'Media' && (
                                <div className={cx('media-part')}>
                                    {media.slice(0, 3).map((item, index) => (
                                        <div className={cx('media-item')} key={index}>
                                            <MediaItem videoKey={item.key} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <SimlarMovie idmovie={idmovie} typemedia={typemedia} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
