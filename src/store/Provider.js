import React, { useState } from 'react';
import { createContext } from 'react';

const HookContext = createContext();

const GlobalState = ({ children }) => {
    const [gg, setgg] = useState(1);

    const values = {
        gg,
        setgg,
    };
    return <HookContext.Provider value={values}>{children}</HookContext.Provider>;
};

export { HookContext, GlobalState };
