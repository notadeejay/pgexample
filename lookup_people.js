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

 const query = `
  SELECT first_name, last_name, birthdate
  FROM famous_people
  WHERE (first_name = $1 OR last_name = $1)`

client.connect((err) => {
  if (err) {
    console.error('Cannot connect', err)
    process.exit(1)
  }

  client.query(query, [args], (err, res) => {
    if (err) {
      console.error('Error running query', err);
    }
    console.log('Searching...')
    console.log('Found one person by the name ' + args)
    console.log(`- 1: ${res.rows[0].first_name} ${res.rows[0].last_name}, born ${moment(res.rows[0].birthdate).format("YYYY-MM-DD")}`);
    client.end();

  });
});
