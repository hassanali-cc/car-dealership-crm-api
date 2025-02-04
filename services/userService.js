const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async ({ employeeNumber, name, email, password, roleId }) => {
  const passwordHash = bcrypt.hashSync(password, 12);
  const user = await prisma.user.create({
    data: {
      employeeNumber,
      name,
      email,
      passwordHash: password,
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
    if (isMatch) return { success: true, message: 'Logged in successfully', data: user };
    else return { success: false, message: 'Incorrect password' };
  } else {
    return { success: false, message: 'No account is associated with this email' };
  }
};

module.exports = {
  createUser,
  loginUser
};
