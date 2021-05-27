const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cluster = require('cluster');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CryptoRouter = require('./routes/cryptoRoutes');
const AuthRouter = require('./routes/authRoutes');
const UserRouter = require('./routes/userRoutes');
const PortfolioRouter = require('./routes/portfolioRoutes');
const cookieParser = require('cookie-parser');
require('./utils/cache');
require('dotenv').config();
process.env.UV_THREADPOOL_SIZE = 4;

const corsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: true,
  preflightContinue: false,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MONGO DB CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

if (cluster.isMaster) {
  const numCpus = require('os').cpus().length;
  require('./utils/cronJob');

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  app.use('/api/v1', CryptoRouter);
  app.use('/api/v1/auth', AuthRouter);
  app.use('/api/v1/user', UserRouter);
  app.use('/api/v1/portfolio', PortfolioRouter);

  app.listen(9000, () => {
    console.log('Server started');
  });
}
