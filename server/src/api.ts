import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { Request, Response } from 'express';

import routes from './routes';

import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import sequelize from './sequelizer/mySequelize';
import authenticateToken from './middlewares/authenticateToken';



(async () => {
    await sequelize.sync({
        alter: true,
    });
  
    const app = express();
    // Application-Level Middleware

    if (process.env.CORS_ENB === 'true') {
        app.use(
            cors({
                origin: true,
                credentials: true,
            }),
        );
    }

    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        }),
    );

    const apiRouter = express.Router();
    // Routes
    
    apiRouter.use('/auth', routes.auth);
    apiRouter.use('/register', routes.register);

    const authorizedApiRouter = express.Router();
    authorizedApiRouter.use('/bidders', authenticateToken, routes.bidder);
    authorizedApiRouter.use('/items', authenticateToken, routes.item);
    authorizedApiRouter.use('/bid', authenticateToken, routes.bid);
    

    app.use('/api', apiRouter);
    app.use('/api', authorizedApiRouter);
    app.use('/api-doc', routes.swagger);

    app.get('/api-healthcheck', routes.healthCheck);

    app.use(notFoundHandler);
    app.use(errorHandler);

    // Start
    const PORT = Number(process.env.SERVER_PORT) || 4001;
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT} ${process.env.APP_URL}`);
    });
  })();
