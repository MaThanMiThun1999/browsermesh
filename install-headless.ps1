[console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"

# Catch unexpected errors
trap {
    Write-Host ""
    Write-Host "❌ [ERROR] Oops! Something went wrong during the installation."
    Write-Host "    Details: $($_.Exception.Message)"
    Write-Host "    Please check your internet connection or contact support."
    Write-Host "================================================="
    exit 1
}

# ==============================================================================
# CONFIGURATION
# ==============================================================================
$BACKEND_ZIP_URL = "https://github.com/MaThanMiThun1999/browsermesh/raw/refs/heads/main/backend-latest.tar.gz"
$FRONTEND_URL = "https://browsermesh.com"
$INSTALL_DIR = "$HOME\browsermesh-node"

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "       🚀 BrowserMesh Node Setup (Windows) 🚀" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Welcome! We are setting up your background node."
Write-Host "Sit back and relax. We'll handle everything automatically."
Write-Host "================================================="

# ==============================================================================
# 1. NODE.JS VALIDATION
# ==============================================================================
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ [ERROR] Node.js is not installed on this computer." -ForegroundColor Red
    Write-Host "    Please download and install it first from: https://nodejs.org/"
    Write-Host "    After installing, restart your terminal and run this script again."
    exit 1
} else {
    Write-Host "✅ [Step 1/5] Node.js engine is installed!" -ForegroundColor Green
}

# ==============================================================================
# 2. PM2 INSTALLATION
# ==============================================================================
if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
    Write-Host "🔄 [Step 2/5] Installing background process manager (PM2)..."
    npm install -g pm2 --silent
} else {
    Write-Host "✅ [Step 2/5] Background process manager is ready!" -ForegroundColor Green
}

# ==============================================================================
# 3. ENVIRONMENT SETUP & DOWNLOAD
# ==============================================================================
Write-Host "📥 [Step 3/5] Downloading the latest BrowserMesh Node software..."
New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null
Set-Location $INSTALL_DIR

Invoke-WebRequest -Uri $BACKEND_ZIP_URL -OutFile "backend.tar.gz"

# Windows 10/11 natively includes tar
tar -xzf backend.tar.gz
Remove-Item backend.tar.gz

# Create the .env configuration file with production defaults
Write-Host "🔧 [Step 4/5] Configuring your environment..."
@"
PORT=3001
HOST=127.0.0.1
CLOUD_API_URL=https://browsermesh-cloud.onrender.com/api/v1
SCRAPER_HOME=.\scraper_data
LOG_LEVEL=info
NODE_ENV=production
"@ | Out-File -FilePath ".env" -Encoding utf8

# ==============================================================================
# 4. DEPENDENCY INSTALLATION
# ==============================================================================
Write-Host "⚙️  [Step 5/5] Installing final system requirements (this may take a minute or two)..."
npm install --silent --omit=dev

# Hide Playwright's noisy installation warnings
npx playwright install --with-deps chromium 2>&1 | Out-Null

# ==============================================================================
# 5. START SERVICE
# ==============================================================================
Write-Host "🚀 Starting your BrowserMesh Node..."

# Clean up any existing older instances safely (ignoring PM2's welcome banner)
$pm2Output = pm2 list 2>&1
if ($pm2Output -match "browsermesh-backend") {
    pm2 delete "browsermesh-backend" | Out-Null
}

# Run the application directly with PM2
pm2 start dist/server.js --name "browsermesh-backend" --node-args="--env-file=.env" | Out-Null
pm2 save | Out-Null

# ==============================================================================
# 6. SETUP 'mesh' CLI COMMAND
# ==============================================================================
Write-Host "🪄  Configuring 'mesh' shortcut command..."

$MeshFunc = @"

# BrowserMesh CLI
function mesh {
    param(`$action)
    switch (`$action) {
        'start'   { pm2 start browsermesh-backend }
        'stop'    { pm2 stop browsermesh-backend }
        'restart' { pm2 restart browsermesh-backend }
        'logs'    { pm2 logs browsermesh-backend }
        'status'  { pm2 status browsermesh-backend }
        default   { Write-Host "Usage: mesh {start|stop|restart|logs|status}" }
    }
}
"@

# Inject into PowerShell Profile
if (-not (Test-Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force | Out-Null
}
$ProfileContent = Get-Content $PROFILE -ErrorAction SilentlyContinue | Out-String
if ($ProfileContent -notmatch "BrowserMesh CLI") {
    $MeshFunc | Out-File -FilePath $PROFILE -Append -Encoding utf8
}

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🎉 SUCCESS! Your BrowserMesh node is now running silently in the background!" -ForegroundColor Green
Write-Host ""
Write-Host "👉 Please return to your dashboard to see your connected device:"
Write-Host "   $FRONTEND_URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "🛠️  COMMAND LINE TOOLS (Open a new PowerShell window to use these):"
Write-Host "    mesh logs     -> View live scraping activity"
Write-Host "    mesh stop     -> Pause the node"
Write-Host "    mesh start    -> Resume the node"
Write-Host "    mesh status   -> Check if it's running"
Write-Host "=================================================" -ForegroundColor Cyan
