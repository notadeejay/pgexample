const settings = require('./settings');
const knex = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex,public'
});


const args = process.argv.slice(2);

const newPerson = {
  first_name: args[0],
  last_name: args[1],
  birthdate: args[2]
}


const addFamousPeople = (data) => {
 knex('famous_people')
    .insert(data)
    .then( (results) => {
      console.log("Added new user");
    })
    .catch( (err) => {
      throw err;
    })
    .then(() => {
      knex.destroy();
    })
}

addFamousPeople(newPerson);