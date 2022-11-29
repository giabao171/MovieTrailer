import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MovieDetail.module.scss';
import { useParams } from 'react-router-dom';
import * as Movie from '~/services/Movie/GetMovieDetail';
import * as Media from '~/services/Media/GetMedia';
import * as Similar from '~/services/Movie/GetMovieSimilar';
import { URL_IMAGE } from '~/Shared/Constants';
import { useMovie } from '~/GlobalState/useMovie';
import Button from '~/Button/Button';
import GetCasting from '~/GetCasting';
import Option from '~/Option/Option';
import Image from '~/Image/Image';
import images from '~/assets/images';
import MediaItem from '~/MediaItem/MediaItem';
import config from '~/config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const MovieDetail = () => {
    const { idmovie, typemedia } = useParams();
    const navigate = useNavigate();

    const { INTERACTION_LIST, OPTION_DETAIL } = useMovie();
    const divRef = useRef();

    const [details, setDetails] = useState({});
    const [media, setMedia] = useState([]);
    const [option, setOption] = useState({});
    const [similarList, setSimilarList] = useState({});

    const listCasting = GetCasting(typemedia, idmovie);

    useEffect(() => {
        const getDetailMovie = async () => {
            try {
                const res = await Movie.getDetail(typemedia, idmovie);
                setDetails(res);
                setOption('Overview');
            } catch (error) {
                console.log(error);
            }
        };
        setMedia([]);
        getDetailMovie();
    }, [idmovie]);

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
    }, [idmovie]);

    useEffect(() => {
        const getSimilarMovie = async () => {
            try {
                const res = await Similar.getSimilar(typemedia, idmovie);
                setSimilarList(res);
            } catch (error) {
                console.log(error);
            }
        };

        getSimilarMovie();
    }, [idmovie]);

    const handleToDetail = (idMovie) => {
        navigate(`${config.routes.home}${typemedia}/detail/${idMovie}`);
    };

    const handleToWatch = (idMovie) => {
        navigate(`${config.routes.home}watch/${idMovie}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        divRef.current.scrollTo(0, 0);
    }, [idmovie]);

    // console.log(media);

    console.log(listCasting);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Image className={cx('poter-img')} src={`${URL_IMAGE}${details.poster_path}`} alt={details.name} />
                <div
                    className={cx('background')}
                    style={
                        details.backdrop_path
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
                            {INTERACTION_LIST.map((item, index) => (
                                <Button border circle key={index} className={cx('interaction-btn')}>
                                    {item.icon}
                                </Button>
                            ))}
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
                    <div className={cx('similar-part')}>
                        <h3 className={cx('title-simi')}>You might like</h3>
                        <div className={cx('similar-list')} ref={divRef}>
                            {similarList.results?.slice(0, 5).map((item, index) => (
                                <div key={index} className={cx('similar-item')} onClick={() => handleToDetail(item.id)}>
                                    {/* <LazyLoadImage
                                        className={cx('similar-poster')}
                                        src={`${URL_IMAGE}${item.poster_path}`}
                                        alt={item.title}
                                    /> */}
                                    <Image
                                        className={cx('similar-poster')}
                                        src={`${URL_IMAGE}${item.poster_path}`}
                                        alt={item.title}
                                    />
                                    <div className={cx('similar-info')}>
                                        <span>{item.title}</span>
                                        <Button
                                            rounded
                                            className={cx('rate-similar')}
                                            leftIcon={<FontAwesomeIcon icon={faStar} />}
                                        >
                                            {item.vote_average}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
