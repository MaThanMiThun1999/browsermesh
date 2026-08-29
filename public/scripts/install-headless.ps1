# Force TLS 1.2 and TLS 1.3 in PowerShell to prevent SSL connection aborts
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13

# Catch unexpected PowerShell exceptions
trap {
    Write-Host ""
    Write-Host "[ERROR] Oops! Something went wrong during the installation." -ForegroundColor Red
    Write-Host "    Details: $($_.Exception.Message)"
    Write-Host "    Please check your internet connection or contact support."
    Write-Host "================================================="
    exit 1
}

# ==============================================================================
# CONFIGURATION
# ==============================================================================
$FRONTEND_URL = "https://studio-browsermesh.vercel.app"
$PUBLIC_URL = "https://browsermesh-one.vercel.app"
$BACKEND_ZIP_URL = "$PUBLIC_URL/scripts/backend-latest.tar.gz"
$BACKEND_ZIP_FALLBACK = "https://raw.githubusercontent.com/MaThanMiThun1999/browsermesh/main/public/scripts/backend-latest.tar.gz"
$INSTALL_DIR = "$HOME\browsermesh-node"

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "       BrowserMesh Node Setup (Windows)          " -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Welcome! We are setting up your background node."
Write-Host "Sit back and relax. We'll handle everything automatically."
Write-Host "================================================="

# ==============================================================================
# 1. NODE.JS VALIDATION (Version >= 18)
# ==============================================================================
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not installed on this computer." -ForegroundColor Red
    Write-Host "    Please download and install Node.js v20+ from: https://nodejs.org/"
    Write-Host "    After installing, restart your terminal and run this script again."
    exit 1
} else {
    $nodeVerStr = (node -v) -replace 'v',''
    $majorVer = [int]($nodeVerStr.Split('.')[0])
    if ($majorVer -lt 18) {
        Write-Host "[ERROR] Installed Node.js version ($nodeVerStr) is out of date. Required: v18+ (v20+ recommended)." -ForegroundColor Red
        Write-Host "    Please upgrade Node.js from https://nodejs.org/"
        exit 1
    }
    Write-Host "[OK] Step 1/5: Node.js engine ($nodeVerStr) is installed!" -ForegroundColor Green
}

# ==============================================================================
# 2. PM2 INSTALLATION & PATH UPDATES
# ==============================================================================
$env:PATH += ";$env:APPDATA\npm"
if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
    Write-Host "[WAIT] Step 2/5: Installing background process manager (PM2)..."
    npm install -g pm2 --silent
} else {
    Write-Host "[OK] Step 2/5: Background process manager is ready!" -ForegroundColor Green
}

# ==============================================================================
# 3. ENVIRONMENT SETUP & DOWNLOAD
# ==============================================================================
Write-Host "[WAIT] Step 3/5: Downloading the latest BrowserMesh Node software..."
New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null
Set-Location $INSTALL_DIR

# Resilient download helper using curl.exe or Invoke-WebRequest with fallback
$downloadSuccess = $false

if (Get-Command curl.exe -ErrorAction SilentlyContinue) {
    & curl.exe -sL "$BACKEND_ZIP_URL" -o "backend.tar.gz"
    if ((Test-Path "backend.tar.gz") -and ((Get-Item "backend.tar.gz").Length -gt 1000)) {
        $downloadSuccess = $true
    } else {
        & curl.exe -sL "$BACKEND_ZIP_FALLBACK" -o "backend.tar.gz"
        if ((Test-Path "backend.tar.gz") -and ((Get-Item "backend.tar.gz").Length -gt 1000)) {
            $downloadSuccess = $true
        }
    }
}

if (-not $downloadSuccess) {
    try {
        Invoke-WebRequest -Uri $BACKEND_ZIP_URL -OutFile "backend.tar.gz" -UserAgent "Mozilla/5.0" -ErrorAction Stop
        $downloadSuccess = $true
    } catch {
        Invoke-WebRequest -Uri $BACKEND_ZIP_FALLBACK -OutFile "backend.tar.gz" -UserAgent "Mozilla/5.0" -ErrorAction Stop
        $downloadSuccess = $true
    }
}

# Extract using native Windows tar
tar -xzf backend.tar.gz
Remove-Item backend.tar.gz

# Create .env without UTF-8 BOM
Write-Host "[WAIT] Step 4/5: Configuring your environment..."
$envContent = @"
PORT=3001
HOST=127.0.0.1
CLOUD_API_URL=https://aelxyxu12qa0-production-5hawy35i.us-central1.suga.run/api/v1
SCRAPER_HOME=.\scraper_data
LOG_LEVEL=info
NODE_ENV=production
CLOAKBROWSER_AUTO_UPDATE=false
CLOAKBROWSER_CACHE_DIR=.\scraper_data\assets\cloakbrowser
"@
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $INSTALL_DIR ".env"), $envContent, $utf8NoBom)

# ==============================================================================
# 4. DEPENDENCY & CLOAKBROWSER INSTALLATION
# ==============================================================================
Write-Host "[WAIT] Step 5/5: Installing system dependencies & Stealth Browser..."
npm install --silent --omit=dev

# Install CloakBrowser binaries into local assets folder
cmd.exe /c "cross-env CLOAKBROWSER_CACHE_DIR=.\scraper_data\assets\cloakbrowser npx cloakbrowser install >nul 2>nul"

# ==============================================================================
# 5. START SERVICE
# ==============================================================================
Write-Host "[WAIT] Starting your BrowserMesh Node..."

$pm2Output = cmd.exe /c "pm2 list 2>&1"
if ($pm2Output -match "browsermesh-backend") {
    cmd.exe /c "pm2 delete browsermesh-backend" | Out-Null
}

# Launch via PM2 with explicit working directory
cmd.exe /c "pm2 start dist/server.js --name browsermesh-backend --cwd `"$INSTALL_DIR`" --node-args=`"--env-file=.env`"" | Out-Null
cmd.exe /c "pm2 save" | Out-Null

# ==============================================================================
# 6. SETUP 'mesh' CLI COMMAND
# ==============================================================================
Write-Host "[WAIT] Configuring 'mesh' shortcut command..."

$npmBinDir = (cmd.exe /c "npm config get prefix")
if ($npmBinDir) {
    $npmBinDir = $npmBinDir.Trim()
}
if (-not $npmBinDir -or -not (Test-Path $npmBinDir)) {
    $npmBinDir = "$env:APPDATA\npm"
}

New-Item -ItemType Directory -Force -Path $npmBinDir | Out-Null

# Write mesh.cmd for Windows CMD and PowerShell
$MeshCmdContent = @"
@echo off
if "%~1"=="" (
    cmd.exe /c pm2 status browsermesh-backend
    goto end
)
if "%~1"=="start" (
    cmd.exe /c pm2 start browsermesh-backend
    goto end
)
if "%~1"=="stop" (
    cmd.exe /c pm2 stop browsermesh-backend
    goto end
)
if "%~1"=="restart" (
    cmd.exe /c pm2 restart browsermesh-backend
    goto end
)
if "%~1"=="logs" (
    cmd.exe /c pm2 logs browsermesh-backend
    goto end
)
if "%~1"=="status" (
    cmd.exe /c pm2 status browsermesh-backend
    goto end
)

echo Usage: mesh {start|stop|restart|logs|status}
:end
"@

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $npmBinDir "mesh.cmd"), $MeshCmdContent, $utf8NoBom)

# Write mesh bash script for Git Bash / MINGW64 users on Windows
$MeshBashContent = @"
#!/bin/sh
case "`$1" in
  start)   pm2 start browsermesh-backend ;;
  stop)    pm2 stop browsermesh-backend ;;
  restart) pm2 restart browsermesh-backend ;;
  logs)    pm2 logs browsermesh-backend ;;
  status)  pm2 status browsermesh-backend ;;
  *)       pm2 status browsermesh-backend ;;
esac
"@
[System.IO.File]::WriteAllText((Join-Path $npmBinDir "mesh"), $MeshBashContent, $utf8NoBom)

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "[SUCCESS] Your BrowserMesh node is now running silently in the background!" -ForegroundColor Green
Write-Host ""
Write-Host "Please return to your dashboard to see your connected device:"
Write-Host "   $FRONTEND_URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "COMMAND LINE TOOLS (Ready to use in any terminal):"
Write-Host "    mesh logs     -> View live scraping activity"
Write-Host "    mesh stop     -> Pause the node"
Write-Host "    mesh start    -> Resume the node"
Write-Host "    mesh status   -> Check if it's running"
Write-Host "=================================================" -ForegroundColor Cyan
