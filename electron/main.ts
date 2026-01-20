import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'

process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    width: 480,
    height: 380,
    minWidth: 380,
    minHeight: 280,
    backgroundColor: '#050508',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 15, y: 15 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST!, 'index.html'))
  }
}

const API_KEY = '1oIvIu2Cf4VZGpK8ZWXbEyoVLdMoLBAN'

async function fetchSingleStock(symbol: string) {
  const url = `https://financialmodelingprep.com/stable/quote?symbol=${symbol}&apikey=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  if (Array.isArray(data) && data.length > 0) {
    return data[0]
  }
  return null
}

ipcMain.handle('fetch-stocks', async (_, symbols: string[]) => {
  try {
    const results = await Promise.all(symbols.map(fetchSingleStock))
    const data = results
      .filter((q): q is NonNullable<typeof q> => q !== null)
      .map((q) => ({
        symbol: q.symbol,
        name: q.name,
        price: q.price,
        changesPercentage: q.changePercentage,
        change: q.change,
        previousClose: q.previousClose,
      }))

    return { success: true, data }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
