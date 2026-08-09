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

npx playwright install --with-deps chromium

# ==============================================================================
# 5. START SERVICE
# ==============================================================================
Write-Host "🚀 Starting your BrowserMesh Node..."

# Clean up any existing older instances
$existing = pm2 jlist | ConvertFrom-Json
if ($existing.name -contains "browsermesh-backend") {
    pm2 delete "browsermesh-backend" | Out-Null
}

# Run the application directly with PM2
pm2 start dist/server.js --name "browsermesh-backend" --node-args="--env-file=.env" | Out-Null
pm2 save | Out-Null

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🎉 SUCCESS! Your BrowserMesh node is now running silently in the background!" -ForegroundColor Green
Write-Host ""
Write-Host "👉 Please refresh your web dashboard to see your connected device!"
Write-Host ""
Write-Host "🛠️  COMMAND LINE TOOLS:"
Write-Host "    pm2 logs browsermesh-backend     -> View live scraping activity"
Write-Host "    pm2 stop browsermesh-backend     -> Pause the node"
Write-Host "    pm2 restart browsermesh-backend  -> Resume the node"
Write-Host "=================================================" -ForegroundColor Cyan
