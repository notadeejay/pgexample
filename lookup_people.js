const pg = require("pg");
const settings = require("./settings");
const moment = require("moment")
const args = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE (first_name = $1::varchar OR last_name = $1::varchar)', [args], (err, res) => {
    if (err) {
      return console.error("error running query", err);
    }


    console.log(`- 1: ${res.rows[0].first_name} ${res.rows[0].last_name}, born ${moment(res.rows[0].birthdate).format("YYYY-MM-D")}`);
    client.end();

  });
});
