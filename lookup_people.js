const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function formatDate (date) {
  let dateObj = new Date(date);
  let month = dateObj.getUTCMonth() + 1;
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  if (month < 10) {
    return year + "-0" + month + "-" + day;
  } else {
    return year + "-" + month + "-" + day;
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE (first_name = $1::varchar OR last_name = $1::varchar)', [args], (err, res) => {
    if (err) {
      return console.error("error running query", err);
    }


    console.log(`- 1: ${res.rows[0].first_name} ${res.rows[0].last_name}, born ${formatDate(res.rows[0].birthdate)}`);
    client.end();

  });
});
