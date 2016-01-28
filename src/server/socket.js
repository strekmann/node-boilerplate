import log from '../server/lib/logger';

const usernames = {};
let numUsers = 0;

function socket(io) {
    io.on('connection', socket => {
        log.info('socket connected', socket.id, socket.request.user.name);
        io.emit('usercount', { users: io.engine.clientsCount });

        socket.on('disconnect', function() {
            io.emit('usercount', { users: io.engine.clientsCount });
        })
    });
}

export default socket;
