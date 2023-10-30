create table user(
    id int auto_increment primary key,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
create table tokens(
    id int auto_increment primary key,
    refreshToken VARCHAR(255) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
create table activation(
    id int auto_increment primary key,
    isActivated BOOLEAN DEFAULT 0,
    activationLink VARCHAR(255) DEFAULT '',
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
create table userInfo(
    id int auto_increment primary key,
    name VARCHAR(255) NOT NULL,
    registrationDate VARCHAR(255) NOT NULL,
    profileInfo VARCHAR(255) DEFAULT '',
    avatarName VARCHAR(255) DEFAULT '',
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
-- create table userInfo(
--     id int auto_increment primary key,
--     name VARCHAR(255) NOT NULL,
--     registrationDate VARCHAR(255) NOT NULL,
--     profileInfo VARCHAR(255) DEFAULT '',
--     avatarName VARCHAR(255) DEFAULT '',
--     favoritsArray VARCHAR(255) DEFAULT '[]',
--     myRecipes VARCHAR(255) DEFAULT '[]'
-- );
