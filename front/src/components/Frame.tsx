import React, {useContext} from 'react';
import styles from './Frame.module.css';
import {SocketContext} from "../state/socketContext";

const Frame: React.FC<any> = () => {
    const { url } = useContext(SocketContext);

    return (
        <iframe src={url || 'about:blank'} className={styles.Container} />
    )
}

export { Frame };