import log from './lib/logger';

let numUsers = 0;
const usernames = {};

function socketRoutes(io) {
    io.on('connection', socket => {
        let addedUser = false;
        log.info('socket connected', socket.id, socket.request.user.name);
        io.emit('action', { type: 'SOCKET_SET_USERCOUNT', payload: io.engine.clientsCount });

        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data,
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {
            // we store the username in the socket session for this client
            socket.username = username;
            // add the client's username to the global list
            usernames[username] = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', { numUsers });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers,
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', () => {
            socket.broadcast.emit('typing', {
                username: socket.username,
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', () => {
            socket.broadcast.emit('stop typing', {
                username: socket.username,
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
            io.emit('usercount', { users: io.engine.clientsCount });
            // remove the username from global usernames list
            if (addedUser) {
                delete usernames[socket.username];
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers,
                });
            }
        });
    });
}

export default socketRoutes;
