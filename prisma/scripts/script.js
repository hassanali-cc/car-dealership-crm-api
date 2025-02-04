const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function createRoles() {
    const roles = await prisma.role.createMany({
        data: [
            { name: "Director", hierarchyLevel: 1 },
            { name: "Manager", hierarchyLevel: 2 },
            { name: "SalesPerson", hierarchyLevel: 3 },
            { name: "Receptionist", hierarchyLevel: 4 },
        ],
    });

    console.log("Created roles:", roles);
}

async function createUser() {
    const passwordHash = await bcrypt.hash("Admin@123", 12);
    const newUser = await prisma.user.create({
        data: {
            employeeNumber: 1001,
            name: "John Doe",
            email: "john@dev.com",
            passwordHash,
            roleId: 1,
        },
    });

    console.log("Created user:", newUser);
}

async function loginUser ()  {
    const user = await prisma.user.findUnique({
        where: { email: "john@dev.com" },
    })
    console.log("user: ", user);
    if (user) {
        const { passwordHash } = user;
        const isMatch = await bcrypt.compare("Admin@123", passwordHash);
        console.log("isMatch: ", isMatch);
    }
};

async function main() {
    // await createRoles();
    // await createUser();
    await loginUser()
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
