import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './Vote.module.css';
import classNamesBind from "classnames/bind";
import {SocketContext} from "../state/socketContext";
import {SocketAction} from "../state/socketReducer";

const cx = classNamesBind.bind(styles);

const formatTimer = (time: number | string) => {
    if (typeof time === 'number') {
        const min = Math.floor(time / 60);
        const sec = time % 60;

        return `${min}:${sec > 9 ? sec : '0' + sec}`;
    }

    return time;
};

const Vote: React.FC<any> = () => {
    const state = useContext(SocketContext);
    const [showStats, setShowStats] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [timer, setTimer] = useState(0);
    let interval = useRef<any>(null);

    const handleVote = (index: number) => () => {
        if (selected !== -1) {
            return;
        }

        setSelected(index);
        setShowStats(true);
        state.socket.emit('message', {type: SocketAction.vote_send, payload: { answer: index, id: state.id }});
    }

    useEffect(() => {
        setSelected(-1);
        setShowStats(false);

        if (interval.current) {
            clearInterval(interval.current);
            interval.current = null;
        }
    }, [state.id]);

    useEffect(() => {
        setTimer(state.timer);

        if (typeof state.timer === 'string') {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }

            setShowStats(true);
            return ;
        }

        interval.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 0) {
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        }
    }, [state.timer]);

    return (
        <div className={cx(styles.Container, {
            Wait: state.wait
        })}>
            {state.wait && <div className={styles.Text}>
                Скоро здесь появится общее голосование, где вы&nbsp;сможете выбирать варианты ответов и&nbsp;влиять
                на&nbsp;ход балета.
            </div>}
            {state.vote && <div className={styles.VoteContainer}>
                <div className={styles.Timer}>{formatTimer(timer)}</div>
                <div className={styles.Question}>{state.question || 'Какое действие вы выберете?'}</div>
                <div className={styles.Variants}>
                    <div className={cx(styles.Vote, {
                        Hoverable: selected === -1,
                        Selected: selected === 1,
                        Winner: state.winner === 1,
                        Loser: state.winner === 2,
                        ShowStats: showStats
                    })} onClick={handleVote(1)}>
                        <div className={styles.Chosen}>Вы&nbsp;выбрали</div>
                        <div className={styles.InnerBorder}/>
                        {state.firstAnswer || 'Первый вариант'}
                        <div className={styles.Stats}>
                            <div className={styles.TextStat}
                                 style={{left: `calc(${state.firstPercent}% - ${state.firstPercentLen * 10}px)`}}>{state.firstPercent}%
                            </div>
                            <div className={styles.CurrentStat} style={{width: `${state.firstPercent}%`}}/>
                        </div>
                    </div>
                    <div className={cx(styles.Vote, {
                        Hoverable: selected === -1,
                        Selected: selected === 2,
                        Winner: state.winner === 2,
                        Loser: state.winner === 1,
                        ShowStats: showStats
                    })} onClick={handleVote(2)}>
                        <div className={styles.Chosen}>Вы&nbsp;выбрали</div>
                        <div className={styles.InnerBorder}/>
                        {state.secondAnswer || 'Второй вариант'}
                        <div className={styles.Stats}>
                            <div className={styles.TextStat}
                                 style={{left: `calc(${state.secondPercent}% - ${state.secondPercentLen * 10}px)`}}>{state.secondPercent}%
                            </div>
                            <div className={styles.CurrentStat} style={{width: `${state.secondPercent}%`}}/>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export {Vote};