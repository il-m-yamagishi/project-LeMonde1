import express, { Request } from 'express';
import helmet from 'helmet';
import expressWs from 'express-ws';
import { WebSocket } from 'ws';

const app = express();

expressWs(app);

app.use(helmet());
app.use(express.static(`${__dirname}/../static`));
(app as any).ws('/ws', handleWebSocket);

app.listen(8080);

let totalClicked = 0;

function handleWebSocket(ws: WebSocket, req: Request) {
    console.log('new user');
    ws.send(JSON.stringify({action: 'init', totalClicked}))
    ws.on('message', function (data) {
        console.log('on message', data);
        if (typeof data === 'string') {
            const payload = JSON.parse(data);
            switch (payload.action) {
                case 'click':
                    totalClicked++;
                    console.log('totalClicked = ', totalClicked);
                    break;
                default:
                    console.error('Unknown action');
                    break;
            }
        }
    });
}
