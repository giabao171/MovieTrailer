import axios from 'axios';
import { API_URL } from '~/Shared/Constants';

const httpRequest = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);

    return response.data;
};
