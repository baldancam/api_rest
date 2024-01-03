import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import './database';

import cors from 'cors';
import express from 'express';

import alunoRoutes from './routes/alunoRoutes';
import fotoRoutes from './routes/fotoRoutes';
import homeRoutes from './routes/homeRoutes';
import tokenRoutes from './routes/tokenRoutes';
import userRoutes from './routes/userRoutes';

const whiteList = ['https://consumo-api-reactv5.mcbcode.com', 'http://localhost:3001'];

const corsOption = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.error(`ERRO - Blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOption));

    this.app.use(express.urlencoded({ expended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
