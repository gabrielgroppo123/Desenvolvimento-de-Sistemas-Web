import calculadoraController from './controller/calculadoraController.js'
import produtoController from './controller/produtoController.js'
export default function adicionarRotas(api){
    api.use(calculadoraController);
    api.use(produtoController);
}