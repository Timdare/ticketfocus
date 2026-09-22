import mysql2 from "mysql2/promise";

export const mySqlPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "@Mysql12",
    database: "ticketfocus_db"
});

