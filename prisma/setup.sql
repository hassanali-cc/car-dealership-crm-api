CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name ENUM('Director', 'Manager', 'SalesPerson', 'Receptionist') NOT NULL,
    hierarchyLevel INT NOT NULL
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employeeNumber INT UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    roleId INT NOT NULL,
    createdBy INT NULL,
    FOREIGN KEY (roleId) REFERENCES Role(id),
    FOREIGN KEY (createdBy) REFERENCES User(employeeNumber)
);

CREATE TABLE Customer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customerId INT UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100) NULL,
    dealType ENUM('ALL', 'NEW', 'USED'),
    createdBy INT NOT NULL,
    FOREIGN KEY (createdBy) REFERENCES User(employeeNumber)
);

CREATE TABLE Deal (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dealId INT UNIQUE NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    dealType ENUM('NEW', 'USED'),
    status ENUM('ACTIVE', 'INPROGRESS', 'SOLD', 'HOLD') NOT NULL,
    createdBy INT NOT NULL,
    purchasedBy INT,
    soldBy INT,
    FOREIGN KEY (createdBy) REFERENCES User(employeeNumber),
    FOREIGN KEY (purchasedBy) REFERENCES Customer(customerId),
    FOREIGN KEY (soldBy) REFERENCES User(employeeNumber)
);


CREATE TABLE Assignment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customerId INT NOT NULL,
    salespersonId INT NOT NULL,
    dealId INT,
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp,
    closedAt timestamp,
    status ENUM('OPEN', 'SOLD', 'PROSPECT', 'CLOSED') NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customer(customerId),
    FOREIGN KEY (salespersonId) REFERENCES User(employeeNumber),
    FOREIGN KEY (dealId) REFERENCES Deal(dealId)
);