import 'webextension-polyfill'
import { configStorage } from '@extension/storage'

chrome.tabs.onActivated.addListener(async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })

  const config = await configStorage.get()

  if (tab?.url) {
    const hostname = new URL(tab.url).hostname
    await configStorage.set({ ...config, currentTabHost: hostname })
  }
})
