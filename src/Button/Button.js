import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            to,
            href,
            primary = false,
            outline = false,
            text = false,
            small = false,
            large = false,
            rounded = false,
            square = false,
            circle = false,
            disabled = false,
            action = false,
            children,
            className,
            leftIcon,
            rightIcon,
            topIcon,
            onClick,
            type,
            ...passProps
        },
        ref,
    ) => {
        let Comp = 'button';

        const props = {
            onClick,
            type,
            ...passProps,
        };

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        //remove event listener when btn is disabled
        //c1: Nếu dùng cách này pahir thêm tay từng sự kiện
        // if (disabled) {
        //     delete props.onClick;
        // }

        //c2: xóa hết tất cả sự kiện bắt đầu bằng "on"(cách này tối ưu hơn)
        if (disabled) {
            Object.keys(props).forEach((key) => {
                if (key.startsWith('on') && typeof props[key] === 'function') {
                    delete props[key];
                }
            });
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary,
            outline,
            text,
            small,
            square,
            large,
            rounded,
            action,
            disabled,
            circle,
        });
        return (
            <Comp className={classes} {...props} ref={ref}>
                {topIcon && <span className={cx('icon')}>{topIcon}</span>}
                {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                <span className={cx('title')}>{children}</span>
                {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            </Comp>
        );
    },
);

export default Button;
