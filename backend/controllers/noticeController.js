import Notice from "../models/Notice.js";
export const createNotice = async (req, res, next) => {
  try { const notice = await Notice.create({ ...req.body, postedBy: req.user._id }); res.status(201).json(notice); } catch (err) { next(err); }
};
export const getNotices = async (req, res, next) => {
  try {
    const audience = req.user.role;
    const notices = await Notice.find({ audience: { $in: ["all", audience] } }).populate("postedBy", "name role").sort({ isPinned: -1, createdAt: -1 });
    res.json(notices);
  } catch (err) { next(err); }
};
export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json({ message: "Notice deleted" });
  } catch (err) { next(err); }
};
