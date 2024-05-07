Here's a formatted version of your README file:

---

# MicroCode README

This README file provides instructions on how to set up and run the MicroCode project on your local machine.

## Prerequisites

Before getting started, make sure you have the following software installed:

1. [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-8.0.204-macos-arm64-installer) (for Mac)
2. Entity Framework
```bash
dotnet tool install --global dotnet-ef --version 8.0.4
```
3. Docker
4. Docker Compose


##Installing Judge0

```bash
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
```

```bash
cd judge0-v1.13.1
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```
wait for 3 minutes



## Getting Started

1. Git clone this project
```bash
git clone https://github.com/your-username/MicroCode.git
```
2. Navigate to the MicroCode directory
```bash
cd MicroCode/MicroCode
```
3. Add an initial migration
```css
dotnet ef migrations add init
```
4. Navigate back to the root directory
```bash
cd ..
```
5. Build and run the project using Docker Compose
```
docker-compose up --build
```
Note: It may take a couple of minutes for Docker to pull the images and run the containers.

6. In another instance of the terminal, navigate to the MicroCode directory
```bash
cd MicroCode
```
7. Apply the database migration
```css
dotnet ef database update
```
8. Visit <http://localhost:5173> in your web browser to view the application.

---