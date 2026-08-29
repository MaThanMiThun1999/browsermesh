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
FRONTEND_URL="https://studio-browsermesh.vercel.app"
PUBLIC_URL="https://browsermesh-one.vercel.app"
BACKEND_ZIP_URL="$PUBLIC_URL/scripts/backend-latest.tar.gz"
BACKEND_ZIP_FALLBACK="https://raw.githubusercontent.com/MaThanMiThun1999/browsermesh/main/public/scripts/backend-latest.tar.gz"
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
    CURRENT_NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [ "$CURRENT_NODE_VERSION" -lt "18" ]; then
        echo "📦 [Step 1/5] Upgrading your Node.js engine..."
        install_node
    else
        echo "✅ [Step 1/5] Node.js engine is already installed!"
    fi
fi

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
if ! curl -sL "$BACKEND_ZIP_URL" -o backend.tar.gz || [ ! -s backend.tar.gz ]; then
    echo "⚠️  Primary download server busy. Trying fallback mirror..."
    curl -sL "$BACKEND_ZIP_FALLBACK" -o backend.tar.gz
fi

if [ ! -s backend.tar.gz ]; then
    echo "❌ [ERROR] Couldn't download required backend release archive."
    exit 1
fi

tar -xzf backend.tar.gz || { echo "❌ [ERROR] Failed to extract archive."; exit 1; }
rm backend.tar.gz

echo "🔧 [Step 4/5] Configuring your environment..."
cat << 'EOF' > .env
PORT=3001
HOST=127.0.0.1
CLOUD_API_URL=https://aelxyxu12qa0-production-5hawy35i.us-central1.suga.run/api/v1
SCRAPER_HOME=./scraper_data
LOG_LEVEL=info
NODE_ENV=production
CLOAKBROWSER_AUTO_UPDATE=false
EOF

# ==============================================================================
# 4. DEPENDENCY & CLOAKBROWSER INSTALLATION
# ==============================================================================
echo "⚙️  [Step 5/5] Installing dependencies & Stealth Browser..."
npm install --silent --omit=dev > /dev/null 2>&1

# Install CloakBrowser stealth binaries
if ! npx cloakbrowser install > /dev/null 2>&1; then
     echo "⚠️  [WARNING] Minor issue installing stealth browser binaries. The node will still attempt to start!"
fi

# ==============================================================================
# 5. START SERVICE
# ==============================================================================
echo "🚀 Starting your BrowserMesh Node..."

if pm2 list | grep -q "browsermesh-backend"; then
    pm2 delete "browsermesh-backend" > /dev/null 2>&1
fi

pm2 start dist/server.js --name "browsermesh-backend" --cwd "$INSTALL_DIR" --node-args="--env-file=.env" > /dev/null 2>&1
pm2 save > /dev/null 2>&1

# ==============================================================================
# 6. SETUP 'mesh' CLI COMMAND
# ==============================================================================
echo "🪄  Configuring 'mesh' shortcut command..."

NPM_PREFIX=$(npm config get prefix 2>/dev/null || echo "$HOME/.nvm/versions/node/v20.0.0")
NPM_BIN_DIR="$NPM_PREFIX/bin"
if [ ! -d "$NPM_BIN_DIR" ]; then
    NPM_BIN_DIR="$NPM_PREFIX"
fi
mkdir -p "$NPM_BIN_DIR" 2>/dev/null || true

cat << 'EOF' > "$NPM_BIN_DIR/mesh"
#!/bin/sh
case "$1" in
  start)   pm2 start browsermesh-backend ;;
  stop)    pm2 stop browsermesh-backend ;;
  restart) pm2 restart browsermesh-backend ;;
  logs)    pm2 logs browsermesh-backend ;;
  status)  pm2 status browsermesh-backend ;;
  *)       pm2 status browsermesh-backend ;;
esac
EOF
chmod +x "$NPM_BIN_DIR/mesh" 2>/dev/null || true

MESH_FUNC="
# BrowserMesh CLI
mesh() {
  case \"\$1\" in
    start)   pm2 start browsermesh-backend ;;
    stop)    pm2 stop browsermesh-backend ;;
    restart) pm2 restart browsermesh-backend ;;
    logs)    pm2 logs browsermesh-backend ;;
    status)  pm2 status browsermesh-backend ;;
    *)       pm2 status browsermesh-backend ;;
  esac
}
"

touch "$HOME/.bashrc" "$HOME/.zshrc" "$HOME/.bash_profile" "$HOME/.profile" 2>/dev/null || true
for rcfile in "$HOME/.bashrc" "$HOME/.zshrc" "$HOME/.bash_profile" "$HOME/.profile"; do
    if [ -f "$rcfile" ] && ! grep -q "BrowserMesh CLI" "$rcfile" 2>/dev/null; then
        echo "$MESH_FUNC" >> "$rcfile"
    fi
done

echo "================================================="
echo "🎉 SUCCESS! Your BrowserMesh node is now running silently in the background!"
echo ""
echo "👉 Please return to your dashboard to see your connected device:"
echo "   $FRONTEND_URL"
echo ""
echo "🛠️  COMMAND LINE TOOLS (Ready to use in any terminal):"
echo "    mesh logs     -> View live scraping activity"
echo "    mesh stop     -> Pause the node"
echo "    mesh start    -> Resume the node"
echo "    mesh status   -> Check if it's running"
echo "================================================="
