echo inicia docker desktop
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 5

cd..
cd WebApiNetCore

docker-compose down --remove-orphans

echo remueve el container sqlserver22
docker stop sqlserver22
docker rm sqlserver22

echo remueve la red webapinetwork
docker network rm webapinetwork

echo crea la red webapinetwork
docker network create webapinetwork

echo crea la imagen e inicia el container sqlserver22
docker run --user root -v %cd%/../SqlServer/docker_db/sqlserver22:/var/opt/mssql/data ^
--name sqlserver22 ^
--network-alias sqlserver22 ^
--network webapinetwork ^
-e "ACCEPT_EULA=Y" ^
-e "MSSQL_SA_PASSWORD=Adminis09$" ^
-p 1433:1433 ^
-d mcr.microsoft.com/mssql/server:2022-latest

pause