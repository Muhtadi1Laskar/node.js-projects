CREATE TABLE IF NOT EXISTS users (
    userID SERIAL PRIMARY key,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone INT NOT NULL,
    roles VARCHAR(10) NOT NULL,
    passwords VARCHAR(30) NOT NULL,
    isActive BOOLEAN NOT NULL, 
    activationToken VARCHAR(255) NOT NULL,

    createdAt TIMESTAMP DEFAULT NOW()
);