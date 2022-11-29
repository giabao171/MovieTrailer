import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getListUpComing = async (page = '1') => {
    try {
        const res = await httpRequests.get(`/movie/upcoming?language=en-US`, {
            params: {
                api_key: API_KEY,
                page,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
