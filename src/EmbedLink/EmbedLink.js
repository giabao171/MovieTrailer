import { EMBED_TO } from '~/Shared/Constants';

export const EmbedMovieLink = (idMovie) => {
    return `${EMBED_TO}/movie?id=${idMovie}`;
};

export const EmbedTVshowLink = (idMovie, season, ep) => {
    return `${EMBED_TO}/tv?id=${idMovie}&s=${season}&e=${ep}`;
};
