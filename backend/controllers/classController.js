import ClassRoom from "../models/ClassRoom.js";
import Teacher from "../models/Teacher.js";

export const createClass = async (req, res, next) => {
  try {
    const classRoom = await ClassRoom.create(req.body);
    if (classRoom.classTeacher) {
      await Teacher.findByIdAndUpdate(classRoom.classTeacher, { $addToSet: { classesAssigned: classRoom._id } });
    }
    res.status(201).json(classRoom);
  } catch (err) {
    next(err);
  }
};

export const getClasses = async (req, res, next) => {
  try {
    const classes = await ClassRoom.find().populate({
      path: "classTeacher",
      populate: { path: "user", select: "name email" },
    });
    res.json(classes);
  } catch (err) {
    next(err);
  }
};

export const getClassById = async (req, res, next) => {
  try {
    const classRoom = await ClassRoom.findById(req.params.id).populate({
      path: "classTeacher",
      populate: { path: "user", select: "name email" },
    });
    if (!classRoom) return res.status(404).json({ message: "Class not found" });
    res.json(classRoom);
  } catch (err) {
    next(err);
  }
};

export const updateClass = async (req, res, next) => {
  try {
    const classRoom = await ClassRoom.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!classRoom) return res.status(404).json({ message: "Class not found" });
    res.json(classRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteClass = async (req, res, next) => {
  try {
    const classRoom = await ClassRoom.findByIdAndDelete(req.params.id);
    if (!classRoom) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted" });
  } catch (err) {
    next(err);
  }
};
