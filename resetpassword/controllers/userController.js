import User from '../models/userModel.js';


const createUser = async (req, res) => {
  try {
    const { name, email, password, profilePic, status, mobile, countryCode } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      profilePic,
      status,
      mobile,
      countryCode,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Error resetting password' });
    }
};


const softDeleteUser = async (req, res) => {
    const { id } = req.params; 

    try {
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await user.update({ deletedAt: new Date() });
  
      res.status(200).json({ message: 'User soft deleted successfully' });
    } catch (error) {
      console.error('Error soft deleting user:', error);
      res.status(500).json({ error: 'Error soft deleting user' });
    }
};


export { createUser, resetPassword, softDeleteUser };
