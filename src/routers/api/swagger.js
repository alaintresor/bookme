import express from 'express';
import docs from '../../Documentation/index.doc';

const swaggerRouter = express.Router();

swaggerRouter.use('/', docs);

export default swaggerRouter;
