echo inicia docker desktop
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 5

echo remueve el container angularapp
docker stop angularapp
docker rm angularapp

docker build -t angularapp:v1 .

docker run ^
--name angularapp ^
--network-alias angularapp ^
-p 4100:80 ^
-d angularapp:v1