import SchoolInfo from "../models/SchoolInfo.js";
export const getSchoolInfo = async (req, res, next) => {
  try {
    let info = await SchoolInfo.findOne();
    if (!info) info = await SchoolInfo.create({});
    res.json(info);
  } catch (err) { next(err); }
};
export const updateSchoolInfo = async (req, res, next) => {
  try {
    let info = await SchoolInfo.findOne();
    if (!info) info = new SchoolInfo();
    Object.assign(info, req.body);
    await info.save();
    res.json(info);
  } catch (err) { next(err); }
};
