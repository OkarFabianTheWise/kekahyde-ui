const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let rustProcess = null;
let nextProcess = null;
let mainWindow = null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    // Load the Next.js app (running on localhost:3001)
    mainWindow.loadURL('http://localhost:3001');

    // Open the DevTools in development
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function startRustRuntime() {
    // Path to the Rust binary
    const rustBinaryPath = path.join(__dirname, '..', 'rust', 'target', 'release', 'kekahyde');

    console.log('Starting Rust runtime:', rustBinaryPath);

    // Spawn the Rust process
    rustProcess = spawn(rustBinaryPath, [], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: path.dirname(rustBinaryPath),
    });

    // Handle stdout
    rustProcess.stdout.on('data', (data) => {
        console.log('Rust stdout:', data.toString());
    });

    // Handle stderr
    rustProcess.stderr.on('data', (data) => {
        console.error('Rust stderr:', data.toString());
    });

    // Handle process exit
    rustProcess.on('exit', (code, signal) => {
        console.log(`Rust process exited with code ${code} and signal ${signal}`);
        // Restart the process on crash
        if (code !== 0 && !app.isQuitting) {
            console.log('Restarting Rust runtime...');
            setTimeout(startRustRuntime, 1000); // Restart after 1 second
        }
    });

    // Handle process error
    rustProcess.on('error', (error) => {
        console.error('Failed to start Rust process:', error);
    });
}

function startNextJs() {
    console.log('Starting Next.js dev server on port 3001');

    // Spawn Next.js dev server
    nextProcess = spawn('pnpm', ['run', 'dev', '.', '--port', '3001'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: __dirname,
    });

    // Handle stdout
    nextProcess.stdout.on('data', (data) => {
        console.log('Next.js stdout:', data.toString());
    });

    // Handle stderr
    nextProcess.stderr.on('data', (data) => {
        console.error('Next.js stderr:', data.toString());
    });

    // Handle process exit
    nextProcess.on('exit', (code, signal) => {
        console.log(`Next.js process exited with code ${code} and signal ${signal}`);
    });

    // Handle process error
    nextProcess.on('error', (error) => {
        console.error('Failed to start Next.js process:', error);
    });
}

function checkHealth() {
    // Periodically check /status endpoint
    setInterval(async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/status');
            if (!response.ok) {
                throw new Error('Health check failed');
            }
            const data = await response.json();
            console.log('Health check passed:', data);
        } catch (error) {
            console.error('Health check failed:', error);
            // If health check fails, restart the process
            if (rustProcess) {
                rustProcess.kill();
            }
        }
    }, 30000); // Check every 30 seconds
}

async function waitForServer(url, timeout = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return true;
            }
        } catch (error) {
            // Server not ready yet
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return false;
}

app.whenReady().then(async () => {
    // Start the Next.js dev server
    startNextJs();

    // Wait for Next.js to be ready
    const nextReady = await waitForServer('http://localhost:3001');
    if (!nextReady) {
        console.error('Next.js server failed to start within timeout');
        app.quit();
        return;
    }

    // Start the Rust runtime
    startRustRuntime();

    // Start health monitoring
    checkHealth();

    // Create the main window
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    app.isQuitting = true;
    // Gracefully shut down the processes
    if (rustProcess) {
        rustProcess.kill('SIGTERM');
    }
    if (nextProcess) {
        nextProcess.kill('SIGTERM');
    }
});

// Ensure single instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        // Someone tried to run a second instance, focus the main window
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}