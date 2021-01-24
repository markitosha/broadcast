enum SocketAction {
    start = 'broadcast_start',
    devices = 'connection',
    vote = 'poll_start',
    end = 'broadcast_end',
    vote_send = 'vote',
    result = 'poll_results',
    vote_end = 'poll_end',
    devices_update = 'disconnection'
}

const initial = {
    live: false,
    wait: true
};

const len = (value: number) => value.toString().length;

const socketReducer = (state: any, action: any) => {
    switch (action.type) {
        case SocketAction.end:
            return { ...state, live: false, wait: true };
        case SocketAction.start:
            return { ...state, live: true };
        case SocketAction.devices:
        case SocketAction.devices_update:
            const hasMobile = action.payload.find((value: string) => value === 'mobile');
            const hasDesktop = action.payload.find((value: string) => value === 'desktop');

            return { ...state, hasMobile, hasDesktop };
        case SocketAction.vote:
            return {
                ...state,
                vote: true,
                wait: false,
                id: action.payload.id,
                timer: action.payload.timer_seconds,
                question: action.payload.question,
                firstAnswer: action.payload.first_answer,
                secondAnswer: action.payload.second_answer,
                firstPercent: 0,
                secondPercent: 0,
                firstPercentLen: 1,
                secondPercentLen: 1,
                winner: -1,
            };
        case SocketAction.result:
            if (action.payload.id !== state.id) {
                return state;
            }

            return {
                ...state,
                firstPercent: action.payload.first_answer_percent,
                secondPercent: action.payload.second_answer_percent,
                firstPercentLen: len(action.payload.first_answer_percent),
                secondPercentLen: len(action.payload.second_answer_percent)
            };
        case SocketAction.vote_end:
            if (action.payload.id !== state.id) {
                return state;
            }

            return {
                ...state,
                timer: 'голосование окончено',
                activeVote: false,
                winner: action.payload.winner,
            };
        default:
            return state;
    }
}

export { socketReducer, initial, SocketAction };