import { API_KEY } from '~/Shared/Constants';
import * as httpRequest from '~/utils/httpRequest';

export const getDetail = async (idPerson) => {
    try {
        const res = httpRequest.get(`/person/${idPerson}?language=en-US`, {
            params: {
                api_key: API_KEY,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
