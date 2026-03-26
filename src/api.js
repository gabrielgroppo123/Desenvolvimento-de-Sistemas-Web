import 'dotenv/config'
import express from 'express';
import adicionarRotas from './routes.js';

const api = express();

api.use(express.json());

adicionarRotas(api);

const porta = process.env.PORTA;

api.listen(porta, () => console.log('API subiu na porta ' + porta));