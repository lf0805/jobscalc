/* Módulo controlador da página Job, funções que controlam e retornam página principal
de edição e adiçao de jobs, funçoes de controle como adicionar, editar 
e deletar estão nesse controlador */

/*Importaçao dos arquivos necessários para configuraçao das funçoes,a pasta model
contém arquivos de dados que vão ser utilizados por controladores e outros arquivos
JobUtils são algumas funções de cálculos utilizados nesse arquivo */
const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

//Exportaçao das funçoes a serem usados no arquivo de rotas(routes.js)
module.exports = {
        create(req, res){
            return res.render("job")
        },

        async save(req,res){
            //const jobs = await Job.get()
            //const lastId = jobs[jobs.length - 1]?.id || 0;
    
            await Job.create({
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now()
            })
            return res.redirect('/')
        },

        async show(req,res){
            const jobs = await Job.get()
            const profile = await Profile.get()
            const jobId = req.params.id
            const job = jobs.find(job => job.id === Number(jobId))
            if(!job){
                return res.send('Job not found')
            }
            job.budget = JobUtils.calculateBudget(job, profile["value-hour"])
            return res.render("job-edit",{job} )
        },
        //Função responsável pela edição dos trabalhos
        async update(req,res){
            //const jobs = await Job.get()
            const jobId = req.params.id
            /*Usa o find pra encontrar os trabalhos pelo ID, o find analisa o id
            enviado pelo front-end, ao encontra o ID igual, executa o IF
            */
            //const job = jobs.find(job => job.id == jobId)
            /*If que verifica se há trabalho, caso não haja apresenta uma página com uma mensagem
            */
            //if(!job){
            //    return res.send('Job not found')
            //}
            //constante que recebe os dados de edição dos trabalhos enviados
            const updatedJob = {
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }
            /* constante que recebe os dados editados, a funçao map
            parecida com a find analisa o id e econtra os trabalhos
            com ids iguais(aqui o Number(job.id) === Number(jobId))
            é usado para para garanti que os ids serão iguais) e altera os dados
            com os dados recebidos updatedJob 
            */
            /*const newJobs = jobs.map(job => {
                if(Number(job.id) === Number(jobId)){
                    job = updatedJob
                }
                return job
            })*/
            await Job.update(updatedJob, jobId)
            res.redirect('/')
            

        },
        /*função responsável por deletar os trabalhos, recebe id a ser deletado
        e envia para função delete no model Jobs.js */
        async delete(req,res){
            
            const jobId = req.params.id
            await Job.delete(jobId)
            return res.redirect('/')
        }

    }
