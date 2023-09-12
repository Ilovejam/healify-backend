const mongoose = require('mongoose');
const User = require('./models/User');  // Yolu modelinize göre ayarlayın

async function run() {
  await mongoose.connect('mongodb://localhost:27017/healifyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("MongoDB'ye bağlandık.");
  });

  const user = new User({
    user_name: "healer_emily",
    user_id: "2",
    birthdate: new Date('1990-01-25'),
    languages: ["English", "French"],
    gender: "Female",
    phone: "+1 987-654-3210",
    facebook_handle: "healer.emily",
    twitter_handle: "healer_emily",
    instagram_handle: "healer.emily",
    business_name: "Emily's Wellness Hub",
    specialties: ["Yoga", "Meditation"],
    practice_description: "I offer yoga and guided meditation to improve mental and physical health.",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA"
    },
    experience_years: 5,
    session_type: ["In Person", "Video"],
    education: ["Yoga Instructor Certification", "Meditation Coach Course"],
    inspiration: "The transformational power of mindfulness.",
    success_story: "Helped a client lose 20 pounds through yoga and diet change.",
    hobbies: ["Hiking", "Cooking"],
    certifications: ["Certified Yoga Instructor"]
  });
  

  try {
    const savedUser = await user.save();
    console.log('Kullanıcı kaydedildi:', savedUser);
  } catch (err) {
    console.error('Kullanıcı kaydedilemedi:', err);
  }

  mongoose.connection.close();
}

run().catch(console.dir);


