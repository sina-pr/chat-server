require('dotenv').config(); // Secures variables
const app = require('./utils/app').app; // Backend App (server)
const mongo = require('./utils/mongo'); // MongoDB (database)
const { PORT } = require('./constants');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const http = require('http');
const socketio = require('socket.io');

async function bootstrap() {
  // await mongo.connect();

  app.get('/', (req, res) => res.status(200).json({ message: 'Hello World!' }));
  app.get('/healthz', (req, res) => res.status(200).send());
  app.use('/auth', authRoutes);
  app.use('/students', studentRoutes);
  app.use('/products', productsRoutes);
  app.use('/users', usersRoutes);

  app.listen(3001, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
}

bootstrap();
