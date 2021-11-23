const db = require("./models/index");
const path = require('path');
const fs = require("fs");
const dataFile = './data/data.json';

setTimeout(
  () =>
    db.sequelize
      .authenticate()
      .then(async () => {

        console.log(`Authenticated`);

        await db.sequelize.drop();

        db.sequelize.sync({ force: true }).then(() => {

          console.log(`Synchronized. Seeding DB`);

          const dataRaw = fs.readFileSync(path.join(__dirname, dataFile));

          const dataParsed = JSON.parse(dataRaw);
  
          dataParsed.forEach(item => {
            db.Items.create(item).then((data) => console.log('Id: ' + data.id + ' inserted successfully'));
          });


        });


      })
      .catch((err) => console.log(`Error occurred `, err)),
  3000
);
