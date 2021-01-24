import React from "react";
import styles from './Time.module.css';
import classNamesBind from "classnames/bind";

const cx = classNamesBind.bind(styles);

const Time: React.FC<any> = (props) => (
    <div className={cx(styles.Block, {
        BlockRose: props.rose
    })}>
        <div className={cx(styles.Time, {
            Rose: props.rose
        })}>
            7 февраля 2021{props.rose ? <br /> : ','}&nbsp;
        </div>
        <div className={cx(styles.Time, {
            Rose: props.rose
        })}>
            17:00
        </div>
        <div className={cx(styles.GMT, {
            RoseGMT: props.rose
        })}>
            МСК
        </div>
    </div>
);

export { Time };

