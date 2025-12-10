@echo off
echo Starting ZUS Backend and Frontend...

start "ZUS Backend" cmd /k "cd /d "%~dp0ZUS backend" && npm run dev"
start "ZUS Frontend" cmd /k "cd /d "%~dp0ZUS frontend" && npm run dev"

echo Both services are starting in separate windows.
echo Close the windows to stop the services.
pause

