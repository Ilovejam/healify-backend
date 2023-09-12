const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Healify = require("./../models/healifyModel");
const { currentUserByRequest } = require("./../utils/currentUser");

exports.saveHealify = catchAsync(async (req, res, next) => {
  const user = await currentUserByRequest(req);
  const userId = user._id;

  const healifyData = {
    languages: req.body.languages,
    gender: req.body.gender,
    businessName: req.body.businessName,
    specialties: req.body.specialties,
    description: req.body.description,
    location: {
      city: req.body.location.city,
      state: req.body.location.state,
      country: req.body.location.country,
    },
    yearsOfPractice: req.body.yearsOfPractice,
    sessionType: req.body.sessionType,
    education: req.body.education,
    inspiration: req.body.inspiration,
    successStory: req.body.successStory,
    hobbies: req.body.hobbies,
    certifications: req.body.certifications,
    userId: userId,
  };

  const healify = new Healify(healifyData);

  await healify.save();

  res.status(200).json({
    status: "success",
    data: healify,
  });
});

exports.getHealifies= catchAsync(async (req, res, next) => {
  const user = await currentUserByRequest(req);
  const userId = user._id;

  const healifies = await Healify.find({ userId });

  res.status(200).json({
    status: "success",
    data: healifies,
  });
});
