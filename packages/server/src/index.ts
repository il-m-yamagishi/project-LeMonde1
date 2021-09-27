import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());

app.use(express.static(`${__dirname}/../static`));

app.listen(8080);
