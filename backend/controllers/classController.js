import ClassRoom from "../models/ClassRoom.js";
import Teacher from "../models/Teacher.js";
export const createClass = async (req, res, next) => {
  try {
    const classRoom = await ClassRoom.create(req.body);
    if (classRoom.classTeacher) await Teacher.findByIdAndUpdate(classRoom.classTeacher, { $addToSet: { classesAssigned: classRoom._id } });
    res.status(201).json(classRoom);
  } catch (err) { next(err); }
};
export const getClasses = async (req, res, next) => {
  try {
    const classes = await ClassRoom.find().populate({ path: "classTeacher", populate: { path: "user", select: "name email" } });
    res.json(classes);
  } catch (err) { next(err); }
};
export const getClassById = async (req, res, next) => {
  try {
    const classRoom = await ClassRoom.findById(req.params.id).populate({ path: "classTeacher", populate: { path: "user", select: "name email" } });
    if (!classRoom) return res.status(404).json({ message: "Class not found" });
    res.json(classRoom);
  } catch (err) { next(err); }
};
export const updateClass = async (req, res, next) => {
  try {
    const existing = await ClassRoom.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Class not found" });

    const previousTeacherId = existing.classTeacher?.toString();
    const classRoom = await ClassRoom.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // Keep Teacher.classesAssigned in sync when the class teacher changes
    const newTeacherId = classRoom.classTeacher?.toString();
    if (newTeacherId !== previousTeacherId) {
      if (previousTeacherId) await Teacher.findByIdAndUpdate(previousTeacherId, { $pull: { classesAssigned: classRoom._id } });
      if (newTeacherId) await Teacher.findByIdAndUpdate(newTeacherId, { $addToSet: { classesAssigned: classRoom._id } });
    }

    res.json(classRoom);
  } catch (err) { next(err); }
};
export const deleteClass = async (req, res, next) => {
  try {
    const classRoom = await ClassRoom.findByIdAndDelete(req.params.id);
    if (!classRoom) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted" });
  } catch (err) { next(err); }
};
