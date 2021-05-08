const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  async index(req, res) {
    //jobs e profile recebem funçoes pra acessar os dados dos arquivos model
    const jobs = await Job.get();
    const profile = await Profile.get();
    //dados dos status
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };
    // Total de horas de cada projeto em progresso
    let jobTotalHours = 0
    /* Atualiza os dados referentes aos trabalhos mostrados na tela,
    utilizando o map ele visualiza cada trabalho e atribui os dados de
    dias restantes e os outros dados*/
    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      /* Sempre que o map passa por um trabalho ele verifica se o dia de 
        trabalhos restantes é igual ou menor que 0, caso seja ele atribui como
        dono ou progress a variável status */
      const status = remaining <= 0 ? "done" : "progress";

      /*Recebe o status como referencia caso o status seja done ele soma 1 a
        done, caso seja progress ele adiciona 1 a progress, isso acontece
        sempre que o map roda, fazendo assim a contagem de trabalhos em progresso e 
        concluido */
      statusCount[status] += 1;
      // jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
      if(status == 'progress'){
          jobTotalHours += Number(job['daily-hours'])
      }
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"]),
      };
    });
    const freeHours = profile["hours-per-day"] - jobTotalHours
    return res.render("index", {
      job: updatedJobs,
      profile,
      statusCount: statusCount,
      freeHours,
    });
  },
};
