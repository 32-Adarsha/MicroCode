Micro Code

* Please Make New Branch To Work on the Code ( git checkout -b Branch_Name )

( Swagger is a tool to interact with api endpoint )

// Updated


Install
1) Install .net 8 sdk form the following link.
- [.net 8.0.1 Sdk](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
2) Type command below in console.
  - dotnet tool install --global dotnet-ef --version 8.0.2
3) Go the folder where you want to put the file and type
  - git clone https://github.com/32-Adarsha/MicroCode.git
4) Download Docker
5) Type:
   - docker compose up
6) open a new terminal and navigate to the microcode file
7) Type:
   - dotnet build
   - dotnet ef database update
 8) Now you can play with the Test.Rest file.
 9) Test.Rest file will show all the existing endpoint supported.
 10) To run swagger :
     - http://localhost:8080/swagger/index.html
 11) To connect to vite:
     - http://localhost:5173/
  

    
