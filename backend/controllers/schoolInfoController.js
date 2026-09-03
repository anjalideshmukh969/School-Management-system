import SchoolInfo from "../models/SchoolInfo.js";

// Public — no auth required, powers the About page
export const getSchoolInfo = async (req, res, next) => {
  try {
    let info = await SchoolInfo.findOne();
    if (!info) info = await SchoolInfo.create({}); // creates with schema defaults on first request
    res.json(info);
  } catch (err) {
    next(err);
  }
};

// Admin only — edit the school's public profile
export const updateSchoolInfo = async (req, res, next) => {
  try {
    let info = await SchoolInfo.findOne();
    if (!info) info = new SchoolInfo();
    Object.assign(info, req.body);
    await info.save();
    res.json(info);
  } catch (err) {
    next(err);
  }
};
