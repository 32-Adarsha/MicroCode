Micro Code

* Please Make New Branch To Work on the Code ( git checkout -b Branch_Name )

( Swagger is a tool to interact with api endpoint )

Step to running the application : 
- Install Docker and DBeaver ( To interact with postgres Data)
- Clone the github repo in you local machine
- Open console and navigate to the code folder

#
- Type : docker build . -t microcode
- Type : docker compose up
-*Open a new terminal along side that
-* Type : dotnet build
-* Type : dotnet ef migrations add <anyName>
-* Type : dotnet ef database update
- Open the DBeaver
-* Make new connection
-* Put HOST  = localhost , Port = 5433 , Database postgresql , username = postgres , password = microcode 
-* click Test Connection  If successful Click ok
- Check the table
- You can navigate to http://localhost:8080/swagger/index.html to test api
- When you are finished with testing api 
- Type :  Control C and Type : docker compose down
- docker image rm microcode
- every change you make to the code repeated the process from 12 except the one marked by *


 
Feature Added 
   -    Added JWT Authentication  
   -    Signup post method

-----------------------------------------------
-------------------------------------------------
Views in react

cd /views/microcode-views
npm install
npm run dev
    
