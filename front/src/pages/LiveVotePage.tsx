import React, {useContext} from 'react';
import {Frame} from "../components/Frame";
import {Vote} from "../components/Vote";
import styles from './Live.module.css';
import {isMobile} from 'react-device-detect';
import {SocketContext} from "../state/socketContext";

const LiveVotePage: React.FC = () => {
    const type = isMobile ? 'mobile' : 'desktop';
    const {
        hasMobile,
        hasDesktop,
    } = useContext(SocketContext);

    const showFrame = type === 'desktop' || !hasDesktop;
    const showVote = type === 'mobile' || !hasMobile;

    return (
        <div className={styles.VoteContainer}>
            {showFrame && <Frame />}
            {showVote && <Vote />}
        </div>
    );
}

export { LiveVotePage };