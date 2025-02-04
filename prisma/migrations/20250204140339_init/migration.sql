-- CreateTable
CREATE TABLE `Assignment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `salespersonId` INTEGER NOT NULL,
    `dealId` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `closedAt` TIMESTAMP(0) NULL,
    `status` ENUM('OPEN', 'SOLD', 'PROSPECT', 'CLOSED') NOT NULL,

    INDEX `customerId`(`customerId`),
    INDEX `dealId`(`dealId`),
    INDEX `salespersonId`(`salespersonId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NULL,
    `dealType` ENUM('ALL', 'NEW', 'USED') NULL,
    `createdBy` INTEGER NOT NULL,

    UNIQUE INDEX `customerId`(`customerId`),
    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `email`(`email`),
    INDEX `createdBy`(`createdBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dealId` INTEGER NOT NULL,
    `make` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,
    `year` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `dealType` ENUM('NEW', 'USED') NULL,
    `status` ENUM('ACTIVE', 'INPROGRESS', 'SOLD', 'HOLD') NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `purchasedBy` INTEGER NULL,
    `soldBy` INTEGER NULL,

    UNIQUE INDEX `dealId`(`dealId`),
    INDEX `createdBy`(`createdBy`),
    INDEX `purchasedBy`(`purchasedBy`),
    INDEX `soldBy`(`soldBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('Director', 'Manager', 'Sales Person', 'Receptionist') NOT NULL,
    `hierarchyLevel` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeNumber` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `createdBy` INTEGER NULL,

    UNIQUE INDEX `employeeNumber`(`employeeNumber`),
    UNIQUE INDEX `email`(`email`),
    INDEX `createdBy`(`createdBy`),
    INDEX `roleId`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`customerId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_ibfk_2` FOREIGN KEY (`salespersonId`) REFERENCES `User`(`employeeNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assignment` ADD CONSTRAINT `Assignment_ibfk_3` FOREIGN KEY (`dealId`) REFERENCES `Deal`(`dealId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `User`(`employeeNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `User`(`employeeNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_ibfk_2` FOREIGN KEY (`purchasedBy`) REFERENCES `Customer`(`customerId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_ibfk_3` FOREIGN KEY (`soldBy`) REFERENCES `User`(`employeeNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `User`(`employeeNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION;
