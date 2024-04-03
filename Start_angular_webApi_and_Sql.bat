echo inicia docker desktop
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 5

echo remueve el container angularapp
docker stop angularapp
docker rm angularapp

echo remueve el container webApicore
docker stop webApicore
docker rm webApicore

echo remueve el container sqlserver22
docker stop sqlserver22
docker rm sqlserver22

echo remueve la red webapinetwork
docker network rm webapinetwork

docker-compose down --remove-orphans
docker-compose build
docker-compose -f docker-compose.yaml up -d

pause