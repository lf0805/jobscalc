const Database = require("./config")

const initDb = {

    async init() {
        //Abre o banco de dados
        const db = await Database()

        //Executa comando SQL
        //Cria tabelas
        await db.exec(`CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`)

        await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
)`)


        await db.run(`INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
)VALUES(
    "Lucas Franco",
    "https://scontent.ffor13-1.fna.fbcdn.net/v/t1.0-9/49701113_528299677648189_8954135268806361088_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=b9EdU0qSPh8AX9-KS2G&_nc_ht=scontent.ffor13-1.fna&oh=2f0244438e7841cb58c4c8ecf52a5fa4&oe=608286B6",
    3000,
    10,
    5,
    5,
    75
);`)

        await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES(
    "Pizzaria Guloso",
    5,
    3,
    1617514376018
);`)

        await db.run(`INSERT INTO jobs(
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES(
    "OneTwo Project",
    5,
    4,
    1617514376018
);`)

        //Fecha o banco de dados
        await db.close();
    }
}

initDb.init()