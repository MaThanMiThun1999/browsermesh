@echo off
REM BrowserMesh Headless Node Installer for Windows CMD
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-headless.ps1"

echo.
echo =================================================
echo Installation process finished.
echo Press any key to exit this window...
echo =================================================
pause >nul
