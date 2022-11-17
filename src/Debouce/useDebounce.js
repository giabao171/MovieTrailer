import React, { useEffect, useState } from 'react';

const Debounce = (value, delay) => {
    const [debouceValue, setDebouceValue] = useState(value);
    useEffect(() => {
        const handle = setTimeout(() => setDebouceValue(value), delay);

        return () => clearTimeout(handle);
        // eslint-disable-next-line
    }, [value]);
    return debouceValue;
};

export default Debounce;
