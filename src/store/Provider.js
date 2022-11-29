import { faEllipsis, faFilm, faHeart, faShareNodes, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { createContext } from 'react';

const HookContext = createContext();

const GlobalState = ({ children }) => {
    const [mediaType, setMediaType] = useState('Movie');

    const INTERACTION_LIST = [
        {
            title: 'Like',
            icon: <FontAwesomeIcon icon={faHeart} />,
        },
        {
            title: 'Share',
            icon: <FontAwesomeIcon icon={faShareNodes} />,
        },
        {
            title: 'More',
            icon: <FontAwesomeIcon icon={faEllipsis} />,
        },
    ];

    const OPTION_DETAIL = [
        {
            title: 'Overview',
            value: 'Overview',
        },
        {
            title: 'Info',
            value: 'Info',
        },
        {
            title: 'Cast',
            value: 'Cast',
        },
        {
            title: 'Media',
            value: 'Media',
        },
    ];

    const MEDIA_TYPE = [
        {
            title: 'Movie',
            value: 'movie',
            // icon: <FontAwesomeIcon icon={faFilm} />,
        },
        {
            title: 'TV Show',
            value: 'tv',
            // icon: <FontAwesomeIcon icon={faTv} />,
        },
    ];

    const values = {
        //list-------------------
        INTERACTION_LIST,
        OPTION_DETAIL,
        MEDIA_TYPE,

        //state-----------------
        mediaType,
        setMediaType,
    };
    return <HookContext.Provider value={values}>{children}</HookContext.Provider>;
};

export { HookContext, GlobalState };
