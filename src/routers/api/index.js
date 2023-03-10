import express from 'express';
import userRouter from './users';
import swaggerRouter from './swagger.js';
import authRouter from './authentication';
import bookRouter from './book.routes'
import eventRouter from './event.routes'
import searchRouter from './search.routes'
import paymentRouter from './payment.js'

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/user/auth', authRouter);
apiRouter.use('/docs', swaggerRouter);
apiRouter.use('/book',bookRouter);
apiRouter.use('/event',eventRouter);
apiRouter.use('/search',searchRouter);
apiRouter.use('/payment',paymentRouter);
// apiRouter.use('/trip-request',tripRequest);

export default apiRouter;
