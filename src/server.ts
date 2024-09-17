/**
    * @description      : 
    * @author           : Hp
    * @group            : 
    * @created          : 17/09/2024 - 16:52:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/09/2024
    * - Author          : Hp
    * - Modification    : 
**/
// src/server.ts
// Configurations de Middlewares
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './swagger';
import morgan from 'morgan';
import { ONE_HUNDRED, SIXTY } from './core/constants';
import routerPost from './routes/routespost';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
	rateLimit({
		max: ONE_HUNDRED,
		windowMs: SIXTY,
		message: 'Trop de Requete à partir de cette adresse IP '
	})
);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/post', routerPost);

setupSwagger(app);
export default app;
