CREATE EXTENSIONS IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    userID PRIMARY KEY DEFAULT gen_random_uuid(),
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone INT NOT NULL,
    roles VARCHAR(10) NOT NULL,
    passwords VARCHAR(256) NOT NULL,
    isActive BOOLEAN NOT NULL, 
    activationTokenId VARCHAR(36) NOT NULL,
    activationTokenHash VARCHAR(255) NOT NULL,
    activationTokenExpiry BIGINT NOT NULL,
    createdAt TIMESTAMP DEFAULT NOW()
);