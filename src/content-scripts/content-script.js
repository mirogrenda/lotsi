chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchLastPrice') {
    const lastPriceElement = document.querySelector('span[class^="priceWrapper"]')
    var lastPrice = lastPriceElement !== null ? parseFloat(lastPriceElement.innerText) : 0
    sendResponse({ lastPrice: lastPrice })
  }
})
