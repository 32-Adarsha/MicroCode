# Use the official .NET Core SDK as a parent image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy the project file and restore any dependencies (use .csproj for the project name)
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Publish the application
RUN dotnet publish -c Release -o out

# Add a new stage for migrations
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS migration
WORKDIR /app
COPY --from=build-env /app/out ./
RUN dotnet ef migrations add InitialCreate -c ApplicationDbContext --output-dir Migrations --context-dir Data
RUN dotnet ef database update -c ApplicationDbContext

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build-env /app/out ./

# Expose the port your application will run on
EXPOSE 80

# Start the application
ENTRYPOINT ["dotnet", "MicroCode.dll"]
