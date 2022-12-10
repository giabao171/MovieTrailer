import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PersonDetail.module.scss';
import * as Person from '~/services/Person/GetPersonDetails';
import * as PersonFilm from '~/services/Person/GetPersonListFilm';
import Image from '~/Image/Image';
import { URL_IMAGE } from '~/Shared/Constants';
import Button from '~/Button/Button';
import { useMovie } from '~/GlobalState/useMovie';
import MovieItem from '~/components/MovieItem/MovieItem';
import config from '~/config';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useParams, useNavigate } from 'react-router-dom';
import OptionBox from '~/components/OptionBox/OptionBox';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const PersonDetail = () => {
    const { idperson } = useParams();
    const navigate = useNavigate();

    const { MEDIA_TYPE } = useMovie();

    const [personDetail, setPersonDetail] = useState({});
    const [listMovie, setListMovie] = useState([]);
    const [delay, setDelay] = useState(true);
    const [type, setType] = useState(MEDIA_TYPE[0].value);

    useEffect(() => {
        const getPersonDetail = async () => {
            try {
                const res = await Person.getDetail(idperson);
                setPersonDetail(res);
            } catch (error) {
                console.log(error);
            }
        };
        getPersonDetail();
    }, [idperson]);

    useEffect(() => {
        const getListMovie = async () => {
            try {
                const res = await PersonFilm.getListFilm(idperson, type);
                setDelay(true);
                setListMovie(res.cast);
            } catch (error) {
                console.log(error);
            }
        };
        getListMovie();
    }, [idperson, type]);

    useEffect(() => {
        const runTime = setTimeout(() => setDelay(false), 900);
        return () => clearTimeout(runTime);
    }, [type, idperson]);

    // console.log(personDetail);
    // console.log(listMovie);

    const handleToDetail = (id) => {
        navigate(`${config.routes.home}${type}/detail/${id}`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('desc-person')}>
                    <div
                        className={cx('person-poster')}
                        style={{
                            backgroundImage: !!personDetail.profile_path
                                ? `url(${URL_IMAGE}${personDetail.profile_path})`
                                : `url(${images.noImage}`,
                        }}
                    >
                        {/* <LazyLoadImage
                            className={cx('person-img')}
                            src={`${URL_IMAGE}${personDetail?.profile_path}`}
                            alt={personDetail.name}
                            effect="blur"
                        /> */}
                        <div>{personDetail.name}</div>
                    </div>
                    <div className={cx('person-info')}>
                        <p>
                            <span>Birthday: </span>
                            {personDetail.birthday}
                        </p>
                        {personDetail.gender === 2 ? (
                            <p>He war born in {personDetail.place_of_birth}</p>
                        ) : (
                            <p>She war born in {personDetail.place_of_birth}</p>
                        )}
                        <p>{personDetail.biography}</p>
                        {(!personDetail.birthday || !personDetail.place_of_birth || !personDetail.place_of_birth) && (
                            <p>Sorry, infomation is updating</p>
                        )}
                    </div>
                </div>
                {type === 'movie' ? (
                    <h3 className={cx('list-tit')}>List of movie {personDetail.name}</h3>
                ) : (
                    <h3 className={cx('list-tit')}>List of TV Show {personDetail.name}</h3>
                )}
                <div className={cx('person-film')}>
                    <div className={cx('film-of-type')}>
                        <div className={cx('movie-box')}>
                            {listMovie?.length !== 0 ? (
                                <div className={cx('list-movie')}>
                                    {delay === false &&
                                        listMovie?.map((item, index) => (
                                            <div
                                                key={index}
                                                className={cx('wrapper-item')}
                                                onClick={() => handleToDetail(item.id)}
                                            >
                                                <MovieItem item={item} />
                                            </div>
                                        ))}
                                    {/* {!searchResult && new Array(20).fill('').map((_, index) => <Skeleton key={index} />)} */}
                                </div>
                            ) : (
                                <div className={cx('no-fit')}>
                                    <Image className={cx('img-fit')} src={images.noFilter} alt="No film fit" />
                                    <h2>Sorry, info is updating</h2>
                                </div>
                            )}
                        </div>
                        <OptionBox className={cx('option-wrapper')} title="Type">
                            <div className={cx('type-list')}>
                                {MEDIA_TYPE.map((item, index) => (
                                    <Button
                                        key={index}
                                        className={
                                            type !== item.value ? cx('option-btn') : cx('option-btn', 'btn-active')
                                        }
                                        onClick={() => setType(item.value)}
                                    >
                                        {item.title}
                                    </Button>
                                ))}
                            </div>
                        </OptionBox>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonDetail;
