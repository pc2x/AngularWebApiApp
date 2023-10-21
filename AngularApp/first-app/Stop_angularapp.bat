echo inicia docker desktop
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 5

echo remueve el container angularapp
docker stop angularapp
docker rm angularapp