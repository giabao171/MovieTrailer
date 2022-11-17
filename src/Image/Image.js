import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
import images from '~/assets/images';

const Image = forwardRef(({ className, src, alt, fallback: customFallBack = images.noImage }, ref) => {
    const [fallBack, setFallBack] = useState('');
    const handelError = () => {
        setFallBack(customFallBack);
    };
    return (
        <img
            ref={ref}
            className={classNames(styles.wrapper, className)}
            src={fallBack || src}
            alt={alt}
            loading="eager"
            onError={handelError}
        />
    );
});

export default Image;
