import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SeasonTVShow.module.scss';
import * as Season from '~/services/TVShow/GetEp';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { URL_IMAGE } from '~/Shared/Constants';
import images from '~/assets/images';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useParams, useNavigate } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const SeasonTVShow = ({ idTVShow, ssNumber }) => {
    const { idmovie, typemedia, season, episode } = useParams();
    const navigate = useNavigate();

    const [listEpisode, setListEpisode] = useState([]);
    const [showEp, setShowEp] = useState(false);

    useEffect(() => {
        const getEpTVShow = async () => {
            try {
                const res = await Season.getEpisode(idTVShow, ssNumber);
                setListEpisode(res);
            } catch (error) {
                console.log(error);
            }
        };
        getEpTVShow();
    }, [idTVShow, ssNumber]);

    const showEpisode = () => {
        setShowEp(!showEp);
    };

    const changeEpisode = (ssNumber, epNumber) => {
        navigate(`${config.routes.home}watch/${typemedia}/${idmovie}/${ssNumber}/${epNumber}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [idmovie, typemedia, season, episode]);
    // console.log(showEp);
    // console.log(listEpisode);

    // console.log(typeof listEpisode?.episodes[0].season_number);

    // const console11 = (a, b) => {
    //     console.log(typeof a);
    //     console.log(typeof b);
    // };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-ss')} onClick={showEpisode}>
                    <span
                        className={!showEp ? cx('ss-title') : cx('ss-title-active')}
                    >{`Season ${listEpisode?.season_number}: ${listEpisode?.name}`}</span>
                    {!showEp ? (
                        <span className={cx('more-down-icon')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    ) : (
                        <span className={cx('more-down-icon')}>
                            <FontAwesomeIcon icon={faChevronUp} />
                        </span>
                    )}
                    {/* <span className={cx('more-down-icon')}>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </span> */}
                </div>
                {showEp && (
                    <div className={cx('ep-box')}>
                        <div className={cx('ep-list')}>
                            {listEpisode?.episodes?.map((item, index) => (
                                <div
                                    key={index}
                                    className={
                                        season === item.season_number.toString() &&
                                        episode === item.episode_number.toString()
                                            ? cx('ep-item', 'cr-active')
                                            : cx('ep-item')
                                    }
                                    onClick={() => changeEpisode(item.season_number, item.episode_number)}
                                >
                                    <LazyLoadImage
                                        className={cx('poster-ep')}
                                        src={
                                            !!item?.still_path
                                                ? `${URL_IMAGE}${item?.still_path}`
                                                : `${images.noBackground}`
                                        }
                                        effect="blur"
                                    />
                                    <div className={cx('ep-desc')}>
                                        {/* <span className={cx('ep-title')}>{item?.name}</span> */}
                                        <p className={cx('ep-number')}>
                                            {`Ep ${item?.episode_number}: ${item?.name}`}{' '}
                                        </p>
                                        <p className={cx('ep-runtime')}>{item?.runtime} min</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeasonTVShow;
