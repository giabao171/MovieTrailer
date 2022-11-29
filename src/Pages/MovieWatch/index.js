import React from 'react';
import classNames from 'classnames/bind';
import styles from './Moviewatch.module.scss';
import { useParams } from 'react-router-dom';
import { EMBED_TO } from '~/Shared/Constants';
import { EmbedMovieLink } from '~/EmbedLink/EmbedLink';

const cx = classNames.bind(styles);

const MovieWatch = () => {
    const { idmovie } = useParams();
    return (
        <div className={cx('wrapper')}>
            {/* <iframe
                className={cx('movie-if')}
                src={EmbedMovieLink(idmovie)}
                title="Film Video Player"
                frameBorder="0"
                allowFullScreen
            ></iframe> */}
        </div>
    );
};

export default MovieWatch;
