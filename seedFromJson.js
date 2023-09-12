const mongoose = require('mongoose');
const fs = require('fs');

const User = require('./models/User'); // User modelini buradan alıyoruz

// Veritabanına bağlan
mongoose.connect('mongodb://localhost:27017/healify', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.log('Failed to connect to MongoDB', err);
});

// JSON dosyasını oku
fs.readFile('users.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading the file', err);
  } else {
    // Dosya okunduysa, JSON'u parse et
    const users = JSON.parse(data);

    // Kullanıcıları tek tek ekleyelim
    User.insertMany(users)
      .then((res) => {
        console.log('Users inserted', res);
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log('Error: ', err);
        mongoose.connection.close();
      });
  }
});
