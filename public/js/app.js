fetch('/json/stores.json')
.then(res => res.json())
.then(data => {
  const storeMap = new StoreMap(document.getElementById('storeMap'), data);
  const storeList = new StoreList(document.getElementById('storeList'), storeMap, data);
})
