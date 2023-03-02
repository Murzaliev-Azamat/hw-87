import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import OneNews from "./models/OneNews";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('onenews');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [azamat, adilet] = await User.create(
    {
      username: "Azamat",
      email: "azamat92@bk.ru",
      password: "12345",
      token: crypto.randomUUID()
    },
    {
      username: "Adilet",
      email: "adilet94@mail.ru",
      password: "333",
      token: crypto.randomUUID()
    }
  );

  const [aboutCars, aboutBooks] = await OneNews.create(
    {
      author: azamat._id,
      title: "About Cars",
      description: "Description about different cars",
      image: "fixtures/cars.jpg",
      date: new Date(),
    },
    {
      author: azamat._id,
      title: "About Books",
      description: "Description about different books",
      image: "fixtures/books.jpg",
      date: new Date(),
    },
    {
      author: adilet._id,
      title: "About Education",
      description: "Description about different education",
      image: "fixtures/education.jpg",
      date: new Date(),
    },
    {
      author: adilet._id,
      title: "About Buildings",
      description: "Description about different buildings",
      image: "fixtures/buildings.jpg",
      date: new Date(),
    },
  );


  await db.close();
};

void run();