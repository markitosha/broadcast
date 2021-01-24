const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
    socket.on('message', msg => console.log(msg));

    setTimeout(() => {
        socket.emit('message', { type: 'broadcast_start', payload: 'about:blank' });
    }, 1000);
    setTimeout(() => {
        socket.emit('message', { type: 'connection', payload: ['desktop'] });
    }, 5000);
    setTimeout(() => {
        socket.emit('message', { type: 'poll_start', payload: {
            id: 'test1',
            question: 'Что вы выберете?',
            first_answer: 'Первый ответ',
            second_answer: 'Второй ответ подлиннее, что поделать',
            timer_seconds: 60,
        }});

        let percent1 = 50;
        let percent2 = 50;

        const interval = setInterval(() => {
            socket.emit('message', { type: 'poll_results', payload: {
                id: 'test1',
                question: 'Что вы выберете?',
                first_answer: 'Первый ответ',
                second_answer: 'Второй ответ подлиннее, что поделать',
                first_answer_percent: percent1,
                second_answer_percent: percent2,
            }});

            percent1 -= 1;
            percent2 += 1;
        }, 2000);

        setTimeout(() => {
            socket.emit('message', { type: 'poll_end', payload: {
                id: 'test1',
                winner: 2
            }});

            clearInterval(interval);

            setTimeout(() => {
                socket.emit('message', { type: 'poll_start', payload: {
                        id: 'test2',
                        question: 'Второй вопрос подлиннее может быть сложный очень сложный?',
                        first_answer: 'Первый ответ в этот раз длиннее предыдущего',
                        second_answer: 'Второй ответ',
                        timer_seconds: 60,
                    }});

                let percent1 = 50;
                let percent2 = 50;

                const interval = setInterval(() => {
                    socket.emit('message', { type: 'poll_results', payload: {
                            id: 'test2',
                            question: 'Что вы выберете?',
                            first_answer: 'Первый ответ',
                            second_answer: 'Второй ответ подлиннее, что поделать',
                            first_answer_percent: percent1,
                            second_answer_percent: percent2,
                        }});

                    percent1 += 1;
                    percent2 -= 1;
                }, 2000);

                setTimeout(() => {
                    socket.emit('message', { type: 'poll_end', payload: {
                            id: 'test2',
                            winner: 1
                        }});

                    clearInterval(interval);

                    setTimeout(() => {
                        socket.emit('message', { type: 'broadcast_end' });
                    }, 6000);
                }, 60000);
            }, 6000);
        }, 60000);
    }, 6000);
});

http.listen(5001, () => {
    console.log('listening on *:5001');
});
