-- create a custom type
CREATE TYPE "user_role_enum" AS ENUM ('user','admin','superadmin');

-- create a table
CREATE TABLE "users"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "role" user_role_enum NOT NULL DEFAULT('user')
);

-- create a table
CREATE TABLE "posts"(
    "id" BIGSERIAL PRIMARY KEY NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
);

-- create data
INSERT INTO "users" ("name","email","role")
VALUES('John Doe','john@example.com','admin'),
('Jill Doe','jill@example.com','admin'),
('Jack Doe','jack@example.com','user');

INSERT INTO "posts" ("title","body","user_id")
VALUES('Hello World','Prisma is an ORM that we are testing',1),
('NodeJS','NodeJS is a backend runtime that you can use with Prisma',2),
('ExpressJS','ExpressJS is the framework that is used with NodeJS',1);

-- drop schema
DROP TABLE "users";
DROP TABLE "posts";
DROP TYPE "user_role_enum";