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
$BACKEND_ZIP_URL = "https://browsermesh-one.vercel.app/scripts/backend-latest.tar.gz"
$FRONTEND_URL = "https://studio-browsermesh.vercel.app"
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

Invoke-WebRequest -Uri $BACKEND_ZIP_URL -OutFile "backend.tar.gz" -ErrorAction Stop

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
"@
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $INSTALL_DIR ".env"), $envContent, $utf8NoBom)

# ==============================================================================
# 4. DEPENDENCY & CLOAKBROWSER INSTALLATION
# ==============================================================================
Write-Host "[WAIT] Step 5/5: Installing system dependencies & Stealth Browser..."
npm install --silent --omit=dev

# Install CloakBrowser binaries natively
cmd.exe /c "npx cloakbrowser install >nul 2>nul"

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

$MeshFunc = @"

# BrowserMesh CLI
function mesh {
    param(`$action)
    switch (`$action) {
        'start'   { cmd.exe /c "pm2 start browsermesh-backend" }
        'stop'    { cmd.exe /c "pm2 stop browsermesh-backend" }
        'restart' { cmd.exe /c "pm2 restart browsermesh-backend" }
        'logs'    { cmd.exe /c "pm2 logs browsermesh-backend" }
        'status'  { cmd.exe /c "pm2 status browsermesh-backend" }
        default   { Write-Host "Usage: mesh {start|stop|restart|logs|status}" }
    }
}
"@

if (-not (Test-Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}
$ProfileContent = Get-Content $PROFILE -ErrorAction SilentlyContinue | Out-String
if ($ProfileContent -notmatch "BrowserMesh CLI") {
    $MeshFunc | Out-File -FilePath $PROFILE -Append -Encoding utf8
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "[SUCCESS] Your BrowserMesh node is now running silently in the background!" -ForegroundColor Green
Write-Host ""
Write-Host "Please return to your dashboard to see your connected device:"
Write-Host "   $FRONTEND_URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "COMMAND LINE TOOLS (Open a new PowerShell window to use these):"
Write-Host "    mesh logs     -> View live scraping activity"
Write-Host "    mesh stop     -> Pause the node"
Write-Host "    mesh start    -> Resume the node"
Write-Host "    mesh status   -> Check if it's running"
Write-Host "=================================================" -ForegroundColor Cyan
