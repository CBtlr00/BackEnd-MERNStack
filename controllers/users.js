import User from "../models/User.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
export const updatePassword = async (req, res, next) => {
  const { userId, oldPassword,password, passwordConfirm } = req.body;
  console.log(req.body);
  const hash = await bcrypt.hash(req.body.password, 8);
 console.log(hash);
  try {
    const user = await User.findOne({ _id:userId });
    const isPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    if (!isPasswordCorrect) return next(new AppError("Old password not correct", 404));
    if (password !== passwordConfirm) return next(new AppError("Password don't match", 404));
    await User.updateOne(
      { _id: userId },
      {
        password:hash,
        passwordConfirm:hash
      }
    );
    res.status(200).json(user)
  } catch (errors) {
    next(err);
  }
};