import React, {useEffect, useReducer, useState} from 'react';
import {StartLivePage} from "./StartLivePage";
import Cookies from 'js-cookie';
import {LiveVotePage} from "./LiveVotePage";
import {SocketContext} from "../state/socketContext";
import {io} from "socket.io-client";
import {isMobile} from "react-device-detect";
import {initial, socketReducer} from "../state/socketReducer";

const LivePage: React.FC = () => {
    const [socket, setSocket] = useState<any>(null);
    const [state, dispatch] = useReducer(socketReducer, initial);

    useEffect(() => {
        const socket = io('ws://127.0.0.1:5001', {
            query: {
                "token": Cookies.get('token'),
                "type": isMobile ? "mobile" : 'desktop',
            }
        });

        socket.on('message', (msg: any) => {
            dispatch(msg);
        });

        setSocket(socket);
    }, []);

    return (
        <SocketContext.Provider value={{ ...state, socket }}>
            {state.live ? <LiveVotePage /> : <StartLivePage />}
        </SocketContext.Provider>
    );
}

export { LivePage };