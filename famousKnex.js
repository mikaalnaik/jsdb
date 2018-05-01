const settings = require("./settings"); // settings.json


const knex = require('knex')({
  client: 'pg',
  connection: {
    database: settings.database,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});




knex('famous_people').select('first_name','last_name','birthdate')
.where({'first_name' : process.argv[2]})
.orWhere({'last_name' : process.argv[2]})
.asCallback(function(err,rows){

  if (err) return console.log('err');
  for (let keys in rows)
  console.log(`${rows[keys].first_name} ${rows[keys].last_name} was born on ${rows[keys].birthdate}`)
  knex.destroy()
})
