const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//prev install npm i dotenv
dotenv.config({ path: './config.env' });

const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

//const DB = process.env.DATABASE.replace(
//('<PASSWORD>', process.env.DATABASE_PASSWORD)
//);

const mongoDB =
  'mongodb+srv://Nicokondek:9ox0Dv9wl7DjYUVE@cluster0.zlbafdd.mongodb.net/natours?retryWrites=true&w=majority';

mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));
//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
//DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
//run in terminal node ./dev-data/data/import-dev-data.js --delete
//run in terminal node ./dev-data/data/import-dev-data.js --import
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
