import * as httpRequests from '~/utils/httpRequest';
import { API_KEY } from '~/Shared/Constants';

export const getListOnAir = async (page = '1') => {
    try {
        const res = await httpRequests.get(`/tv/on_the_air?language=en-US`, {
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
