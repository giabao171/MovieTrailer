import React, { useEffect, useState } from 'react';
import * as Genres from '~/services/Genres/GetGenres';

const GetGenresOfMovie = (listGenresId = []) => {
    const [listAllGenres, setListAllGenres] = useState([]);
    const listGenresOfMovie = [];

    useEffect(() => {
        const getAllGenres = async () => {
            try {
                const res = await Genres.getGenres();
                setListAllGenres(res);
            } catch (error) {
                console.log(error);
            }
        };
        getAllGenres();
    }, []);

    const lengListAll = listAllGenres.length;
    const lengListGenresId = listGenresId.length;

    for (let i = 0; i < lengListAll; ++i) {
        for (let j = 0; j < lengListGenresId; ++j) {
            if (listGenresId[j] === listAllGenres[i].id) {
                listGenresOfMovie.push(listAllGenres[i]);
            }
        }
    }
    return listGenresOfMovie;
};

export default GetGenresOfMovie;
