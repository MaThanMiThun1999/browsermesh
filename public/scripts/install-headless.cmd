@echo off
REM BrowserMesh Headless Node Installer for Windows CMD & Double-Click

if exist "%~dp0install-headless.ps1" (
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-headless.ps1"
) else (
    powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13; iwr -useb https://browsermesh-one.vercel.app/scripts/install-headless.ps1 | iex"
)

echo.
echo =================================================
echo Installation process finished.
echo Press any key to exit this window...
echo =================================================
pause >nul
