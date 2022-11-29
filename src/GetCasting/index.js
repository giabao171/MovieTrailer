import React, { useEffect, useState } from 'react';
import * as MovieCasting from '~/services/Movie/GetCasting';
import * as TVShowCasting from '~/services/TVShow/GetCasting';

const GetCasting = (type, idMovie) => {
    const [listCasting, setListCasting] = useState([]);
    const [listCrew, setListCrew] = useState([]);
    const listActor = [];
    const listDirector = [];

    useEffect(() => {
        const getMovieCasting = async () => {
            try {
                if (type === 'movie') {
                    const res = await MovieCasting.getCasting(idMovie);
                    setListCasting(res.cast);
                    setListCrew(res.crew);
                } else {
                    const res = await TVShowCasting.getCasting(idMovie);
                    setListCasting(res.cast);
                    setListCrew(res.crew);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getMovieCasting();
    }, [idMovie]);

    let nCast = listCasting.length;
    for (let i = 0; i < nCast; i++) {
        if (listCasting[i].known_for_department === 'Acting') listActor.push(listCasting[i]);
    }

    let nCrew = listCrew.length;
    for (let i = 0; i < nCrew; i++) {
        if (listCrew[i].job === 'Director' || listCrew[i].job === 'Series Director') listDirector.push(listCrew[i]);
    }

    return { actors: [...listActor], director: [...listDirector] };
};

export default GetCasting;
