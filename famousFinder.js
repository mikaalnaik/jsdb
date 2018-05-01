const pg = require("pg");
const settings = require("./settings"); // settings.json



const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  findFamous(client, process.argv[2], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(`Found ${result.length} people with the name ${process.argv[2]}`)
    for(let i = 0; i < result.length; i++) {
     console.log(`${result[i].first_name} ${result[i].last_name}`)
   }

    client.end()
  })

});



function findFamous(client, person, callback) {
  const query =
    `SELECT first_name, last_name, birthdate
     FROM famous_people
     WHERE first_name = $1 OR last_name = $1;`

  client.query(query, [person], (err, result) => {
      if (err) {
        callback(err)
        return
      }
      callback(null, result.rows)
    }
  );
}
