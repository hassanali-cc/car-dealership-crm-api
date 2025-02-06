const bcrypt = require('bcrypt');
const prisma = require('../prisma');
const { generateAuthTokens } = require('../middlewares/auth');

const createUser = async ({ employeeNumber, name, email, password, roleId }) => {
  const passwordHash = bcrypt.hashSync(password, 12);
  const user = await prisma.user.create({
    data: {
      employeeNumber,
      name,
      email,
      passwordHash,
      roleId,
    },
  });
  if (user) return { success: true, message: 'User created successfully', data: user };
  else return { success: false, message: 'Unable to create user' };
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user) {
    const { passwordHash } = user;
    const isMatch = await bcrypt.compare(password, passwordHash);
    delete user.passwordHash
    if (isMatch) {
      const authTokens = await generateAuthTokens(user);

      return { success: true, message: 'Logged in successfully', data: { user, authTokens }};
    } else return { success: false, message: 'Incorrect email or password' };
  } else {
    return { success: false, message: 'No account is associated with this email' };
  }
};

module.exports = {
  createUser,
  loginUser
};
