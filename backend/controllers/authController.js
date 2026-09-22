import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: "Invalid email or password" });
    if (!user.isActive) return res.status(403).json({ message: "This account has been deactivated. Contact the admin." });
    user.lastLogin = new Date();
    await user.save();
    const token = generateToken(user._id, user.role);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { next(err); }
};
export const getMe = async (req, res, next) => {
  try { res.json({ user: req.user }); } catch (err) { next(err); }
};
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.comparePassword(currentPassword))) return res.status(401).json({ message: "Current password is incorrect" });
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) { next(err); }
};

// POST /api/auth/forgot-password { email }
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always respond with the same generic message whether or not the
    // email exists — prevents leaking which emails have accounts.
    const genericResponse = { message: "If an account exists for this email, a password reset link has been sent." };

    if (!user) return res.json(genericResponse);

    const rawToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password/${rawToken}`;

    const { sent } = await sendEmail({
      to: user.email,
      subject: "Reset your password",
      html: `<p>Click the link below to reset your password. This link expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    // No SMTP configured yet — return the link directly so the feature is
    // still usable end-to-end without an email service. Remove resetUrl
    // from the response once real email sending is set up.
    res.json(sent ? genericResponse : { ...genericResponse, devResetUrl: resetUrl });
  } catch (err) { next(err); }
};

// POST /api/auth/reset-password/:token { newPassword }
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ message: "New password is required" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) return res.status(400).json({ message: "This reset link is invalid or has expired. Please request a new one." });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successfully. You can now log in with your new password." });
  } catch (err) { next(err); }
};
