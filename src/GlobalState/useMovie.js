import { useContext } from 'react';
import { HookContext } from '~/store/Provider';

const useMovie = () => {
    return useContext(HookContext);
};

export { useMovie };
