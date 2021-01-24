import React from "react";
import styles from "./Input.module.css";
import classNamesBind from "classnames/bind";

const cx = classNamesBind.bind(styles);

const Input: React.FC<any> = ({name, placeholder, register, errors }) => (
    <input
        name={name}
        placeholder={placeholder}
        className={cx(styles.Input, {
            Error: errors && errors[name]
        })}
        ref={register({required: true})}
    />
);

export { Input };