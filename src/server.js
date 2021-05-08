// express é um pacote do node que serve pra criar e configurar servidores
const express = require("express")
const server = express()



//Require busca os códigos do arquivos routes.js
const routes = require("./routes")
const path = require("path")

/*configuração view engine, permite alteração dos arquivos html com javascript
(para isso é necessário instalação do ejs através de npm e alteração da 
extensão dos arquivos html para ejs, então ejs = html ) */
server.set('view engine', 'ejs')


/*Nota: o ejs por padrão já procuraria o dirétorio views para encontrar as 
páginas, mas ele procura na pasta padrão do projeto, como aqui o diretório
views está dentro do src é necessário especificar o caminho, usando o módulo
path e o método join, é possivel mudar a localização da pasta views, uma outra
forma de fazer seria adicionando uma constante ao arquivo routes.js
(ex: const = __dirname[__dirname aponta o diretório atual] + "/views/") 
criando um caminho especifico e fazendo
a configuração dos caminhos das rotas no arquivo 
(ex:routes.get('/', (req, res)=> res.sendFile(views + "/index.html")))
usando o path.join facilita a configuração no arquivo routes.js pois diminui as]
as linhas de códigos necessárias
*/
server.set('views', path.join(__dirname, 'views'))

// habilitar arquivos estáticos
server.use(express.static("public"))

//habilitar req.body
server.use(express.urlencoded({extended: true}))

//routes
server.use(routes)

/*Listen, inicia o servido na porta dada como parâmetro aqui 3000,
o console log dá inicio ao servidor 
*/

server.listen(3000, () => console.log('rodando'))





