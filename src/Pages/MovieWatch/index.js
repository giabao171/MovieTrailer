import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Moviewatch.module.scss';
import { useParams } from 'react-router-dom';
import { EmbedMovieLink, EmbedTVshowLink } from '~/EmbedLink/EmbedLink';
import SimlarMovie from '~/SimlarMovie/SimlarMovie';
import * as MovieDetail from '~/services/Movie/GetMovieDetail';
import * as Episode from '~/services/TVShow/GetDetailEp';
import YearRelease from '~/components/YearRelease/YearRelease';
import Button from '~/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import SeasonTVShow from './SeasonTVShow/SeasonTVShow';

const cx = classNames.bind(styles);

const MovieWatch = () => {
    const [movieDetail, setMovieDetail] = useState({});
    const [episodeDetails, setEpisodeDetails] = useState({});
    const { idmovie, typemedia, season, episode } = useParams();

    useEffect(() => {
        const getMovieDetail = async () => {
            try {
                const res = await MovieDetail.getDetail(typemedia, idmovie);
                setMovieDetail(res);
            } catch (error) {
                console.log(error);
            }
        };

        getMovieDetail();
        // eslint-disable-next-line
    }, [idmovie, typemedia]);

    useEffect(() => {
        const getEpisodeDetail = async () => {
            try {
                const res = await Episode.getDetailEpisode(idmovie, season, episode);
                setEpisodeDetails(res);
            } catch (error) {
                console.log(error);
            }
        };
        getEpisodeDetail();
    }, [idmovie, typemedia, season, episode]);

    // console.log(movieDetail);
    // console.log(movieDetail.release_date);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('movie-box')}>
                    <div className={cx('movie-video')}>
                        <iframe
                            className={cx('movie-iframe')}
                            src={
                                typemedia === 'movie'
                                    ? EmbedMovieLink(movieDetail.id)
                                    : EmbedTVshowLink(movieDetail.id, season, episode)
                            }
                            title="Film Video Player"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className={cx('desc-box')}>
                        <div className={cx('movie-desc')}>
                            <h3 className={cx('movie-title')}>{movieDetail.title || movieDetail?.name}</h3>
                            {typemedia === 'movie' && (
                                <Button
                                    rounded
                                    leftIcon={<FontAwesomeIcon icon={faCalendar} />}
                                    className={cx('year-release')}
                                >
                                    {!!movieDetail?.release_date && YearRelease(movieDetail?.release_date)}
                                </Button>
                            )}
                            {/* <div className={cx('rate-box')}> */}
                            <Button className={cx('rate-box')} rounded leftIcon={<FontAwesomeIcon icon={faStar} />}>
                                {movieDetail.vote_average}
                            </Button>
                            {/* </div> */}
                        </div>
                        {typemedia === 'tv' && (
                            <div className={cx('movie-current-ep')}>
                                <span>{`Season ${season} - Episode ${episode} `}</span>
                                <div>{episodeDetails.name}</div>
                            </div>
                        )}
                    </div>
                    {typemedia === 'tv' ? (
                        <div className={cx('episode-box')}>
                            <h4>Season:</h4>
                            {movieDetail?.seasons?.map((item, index) => (
                                <SeasonTVShow key={index} idTVShow={idmovie} ssNumber={item?.season_number} />
                            ))}
                        </div>
                    ) : (
                        <div className={cx('over-view')}>
                            <div>Overview:</div>
                            <p>{movieDetail.overview}</p>
                        </div>
                    )}
                </div>
                <SimlarMovie idmovie={idmovie} typemedia={typemedia} />
            </div>
        </div>
    );
};

export default MovieWatch;
