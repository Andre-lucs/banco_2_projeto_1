import createError from 'http-errors';
import express, { json, urlencoded, static as static_ } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { connectRedis } from './database/RedisConnect.js';
import tryConnectMongoDB from './database/MongooseConnect.js';
//routers
import ocorrenciasRouter from './routes/ocorrencias.js';
import UserRouter  from './routes/users.js';

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//using routers
app.use('/ocorrencia', ocorrenciasRouter);

tryConnectMongoDB().catch(err => console.log(err));
connectRedis().catch(err => console.log(err));
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/ocorrencia', ocorrenciasRouter);
app.use('/usuario', UserRouter)

if (process.env.NODE_ENV !== 'test') {
  tryConnectMongoDB().catch(err => console.log(err));
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

export default app;
