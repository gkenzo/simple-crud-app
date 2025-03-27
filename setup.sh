#!/bin/bash

echo "Setting up backend"
cd ./backend

cp -n .env .env.example
echo ".env.example file created successfully."

echo "Installing dependencies..."
npm install

npx prisma migrate deploy

npx prisma db seed

npm run build

echo "Backend setup completed..."

echo "Setting up frontend"
cd ../frontend

cp -n .env .env.example
echo ".env.example file created successfully."

echo "Installing dependencies..."
npm install

npm run build

echo "Frontend setup completed..."
