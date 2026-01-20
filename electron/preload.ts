import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  fetchStocks: (symbols: string[]) => ipcRenderer.invoke('fetch-stocks', symbols),
})
