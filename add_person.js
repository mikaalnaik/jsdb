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

console.log(process.argv[2], process.argv[3], process.argv[4])

knex('famous_people')
.insert({'first_name' : process.argv[2], 'last_name': process.argv[3], 'birthdate': process.argv[4]})
.then(function(res){
  knex.destroy()
  // if (err) {
  //   console.log("err", err);
  //   return
  // }
  console.log("res", res);
})

knex('famous_people')
  .where({ 'last_name' : 'Newman' })
  .del()
