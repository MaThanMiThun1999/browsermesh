#!/bin/bash

# Stop on errors
set -e

# Catch unexpected errors and show a friendly message
cleanup_on_error() {
    echo ""
    echo "❌ [ERROR] Oops! Something went wrong during the installation."
    echo "    Please check your internet connection or contact support if the issue persists."
    echo "================================================="
    exit 1
}
trap 'cleanup_on_error' ERR

# ==============================================================================
# CONFIGURATION
# ==============================================================================
# The official download link for the latest BrowserMesh backend release
BACKEND_ZIP_URL="https://raw.githubusercontent.com/MaThanMiThun1999/browsermesh/refs/heads/main/install-headless.ps1"
INSTALL_DIR="$HOME/browsermesh-node"
NODE_VERSION="20"

echo "================================================="
echo "       🚀 BrowserMesh Node Setup 🚀              "
echo "================================================="
echo "Welcome! We are setting up your background node."
echo "Sit back and relax. We'll handle everything automatically."
echo "================================================="


# ==============================================================================
# 1. NODE.JS INSTALLATION & VALIDATION
# ==============================================================================
install_node() {
    echo "📦 [Step 1/5] Installing Node.js engine..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh -s | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install $NODE_VERSION > /dev/null 2>&1
    nvm use $NODE_VERSION > /dev/null 2>&1
    nvm alias default $NODE_VERSION > /dev/null 2>&1
}

if ! command -v node &> /dev/null; then
    install_node
else
    # Check if node version is >= 18
    CURRENT_NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [ "$CURRENT_NODE_VERSION" -lt "18" ]; then
        echo "📦 [Step 1/5] Upgrading your Node.js engine..."
        install_node
    else
        echo "✅ [Step 1/5] Node.js engine is already installed!"
    fi
fi

# Ensure npm is available before proceeding
if ! command -v npm &> /dev/null; then
    echo "❌ [ERROR] NPM failed to install correctly. Please try again."
    exit 1
fi

# ==============================================================================
# 2. PM2 INSTALLATION
# ==============================================================================
if ! command -v pm2 &> /dev/null; then
    echo "🔄 [Step 2/5] Installing background process manager (PM2)..."
    npm install -g pm2 --silent > /dev/null 2>&1
else
    echo "✅ [Step 2/5] Background process manager is ready!"
fi

# ==============================================================================
# 3. ENVIRONMENT SETUP & DOWNLOAD
# ==============================================================================
mkdir -p "$INSTALL_DIR"
cd "$INSTALL_DIR"

echo "📥 [Step 3/5] Downloading the latest BrowserMesh Node software..."
if ! curl -sL "$BACKEND_ZIP_URL" -o backend.tar.gz; then
    echo "❌ [ERROR] Oops! We couldn't download the required files."
    echo "    Please check your internet connection or try again later."
    exit 1
fi

# Extract and clean up
tar -xzf backend.tar.gz || { echo "❌ [ERROR] Failed to extract the downloaded files. Archive might be corrupted."; exit 1; }
rm backend.tar.gz

# Create the .env configuration file with production defaults
echo "🔧 [Step 4/5] Configuring your environment..."
cat << 'EOF' > .env
PORT=3001
HOST=127.0.0.1
CLOUD_API_URL=https://browsermesh-cloud.onrender.com/api/v1
SCRAPER_HOME=./scraper_data
LOG_LEVEL=info
NODE_ENV=production
EOF

# ==============================================================================
# 4. DEPENDENCY INSTALLATION
# ==============================================================================
echo "⚙️  [Step 5/5] Installing final system requirements (this may take a minute or two)..."
npm install --silent --omit=dev > /dev/null 2>&1

# Install Playwright safely
if ! npx playwright install --with-deps chromium > /dev/null 2>&1; then
     echo "⚠️  [WARNING] Minor issue installing some browser dependencies. The node will still try to start!"
fi

# ==============================================================================
# 5. START SERVICE
# ==============================================================================
echo "🚀 Starting your BrowserMesh Node..."

# Clean up any existing older instances to prevent duplication errors
if pm2 list | grep -q "browsermesh-backend"; then
    pm2 delete "browsermesh-backend" > /dev/null 2>&1
fi

# Run the application directly with PM2 (bypassing npm/cross-env to avoid missing devDependencies)
pm2 start dist/server.js --name "browsermesh-backend" --node-args="--env-file=.env" > /dev/null 2>&1
pm2 save > /dev/null 2>&1

# ==============================================================================
# 6. SETUP 'mesh' CLI COMMAND
# ==============================================================================
echo "🪄  Configuring 'mesh' shortcut command..."

MESH_FUNC="
# BrowserMesh CLI
mesh() {
  case \"\$1\" in
    start)   pm2 start browsermesh-backend ;;
    stop)    pm2 stop browsermesh-backend ;;
    restart) pm2 restart browsermesh-backend ;;
    logs)    pm2 logs browsermesh-backend ;;
    status)  pm2 status browsermesh-backend ;;
    *)       echo \"Usage: mesh {start|stop|restart|logs|status}\" ;;
  esac
}
"

# Inject into bashrc if not already there
if [ -f "$HOME/.bashrc" ] && ! grep -q "BrowserMesh CLI" "$HOME/.bashrc"; then
    echo "$MESH_FUNC" >> "$HOME/.bashrc"
fi
# Inject into zshrc if not already there (for macOS / modern linux)
if [ -f "$HOME/.zshrc" ] && ! grep -q "BrowserMesh CLI" "$HOME/.zshrc"; then
    echo "$MESH_FUNC" >> "$HOME/.zshrc"
fi

echo "================================================="
echo "🎉 SUCCESS! Your BrowserMesh node is now running silently in the background!"
echo ""
echo "👉 Please refresh your web dashboard to see your connected device!"
echo ""
echo "🛠️  COMMAND LINE TOOLS (Open a new terminal to use these):"
echo "    mesh logs     -> View live scraping activity"
echo "    mesh stop     -> Pause the node"
echo "    mesh start    -> Resume the node"
echo "    mesh status   -> Check if it's running"
echo "================================================="

