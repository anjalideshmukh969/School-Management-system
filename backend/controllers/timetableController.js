import Timetable from "../models/Timetable.js";

export const upsertTimetable = async (req, res, next) => {
  try {
    const { classRoom, day, periods } = req.body;
    const timetable = await Timetable.findOneAndUpdate(
      { classRoom, day },
      { periods },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(timetable);
  } catch (err) {
    next(err);
  }
};

export const getClassTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.find({ classRoom: req.params.classId })
      .populate({ path: "periods.teacher", populate: { path: "user", select: "name" } })
      .sort({ day: 1 });
    res.json(timetable);
  } catch (err) {
    next(err);
  }
};
