// express é um pacote do node que serve pra criar e configurar servidores
const express = require('express')
// O express.Router() a uma constante permite usar essa constante pra criar rotas entres as paginas
const routes = express.Router()
//Importa os controladores 
const ProfileController = require('./controllers/ProfileController')
const JobControllers = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

//Objeto Literal com os dados e métodos dos Jobs(como renderização e visualização)


/* Configuração de rotas entre as paginas html no servidor, o metodo get do 
Router permite configurar as rotas passando um caminho como parametro e depois
usando uma arrow funcion(ex: () => {}, caso haja apenas uma linha de codigo
as chaves não são necessárias) com requests e reponses pra retorno das páginas
(res = response), usando o metódo sendFile() retornando o caminho da página

(--
routes.get('/', (req, res)=> res.sendFile(views + "/index.html"))
routes.get('/job', (req, res) => res.sendFile(views + "/job.html"))
routes.get('/job/edit', (req, res) => res.sendFile(views + "/job-edit.html"))
routes.get('/', (req, res) => res.sendFile(views + "/profile.html")) 
--)

originalmente esse seria o código de configuração de rotas, entretanto com o 
uso do ejs o método usado passa a ser render() ao invés de sendFile já que
o ejs construirá a página html a partir do código javascript, então arquivo 
html pronto não será entregue diretamente e sim renderizado atráves do ejs
*/

// Pra refatorar o código as funções e dados das páginas estão em objetos literais acima
routes.get('/', DashboardController.index)
routes.get('/job', JobControllers.create)
//Recebe a requisição dos formulários enviados pelo html e insere no array Jobs
routes.post('/job', JobControllers.save)
routes.get('/job/:id', JobControllers.show)
routes.post('/job/:id', JobControllers.update)
routes.post('/job/delete/:id', JobControllers.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)




/*module.exports é uma função do javascript pra implementar as linhas de códigos
de um arquivo em outro arquivo */
module.exports = routes