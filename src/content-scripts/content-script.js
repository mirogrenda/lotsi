function getLastPrice () {
  var possibleElements = [
    'span[class^="priceWrapper"]',
    'tv-symbol-price-quote__value'
  ]

  for (var i = 0; i < possibleElements.length; i++) {
    var element = document.querySelector(possibleElements[i])

    if (element !== null) {
      return parseFloat(element.innerText)
    }
  }

  return 0
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetchLastPrice') {
    sendResponse({ lastPrice: getLastPrice() })
  }
})
