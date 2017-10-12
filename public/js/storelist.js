class StoreList {
  constructor(renderTo, storeMap, data) {
    renderTo.innerHTML = this.genereateHTML(data);
    renderTo.querySelectorAll('[data-behaviour="view-in-map"]').forEach(el => {
      el.addEventListener('click', function() {
        storeMap.viewMarkerByIndex(this.dataset.datumId);
      })
    })
  }

  genereateHTML(data) {
    return `<ul>
      ${
        data.map((datum, index) => `
          <li>
            <h3>${datum.name}</h3>
            <address>${datum.address}</address>
            <p>${datum.description}</p>
            <div class="clearfix">
              <a class="pull-left" href="tel:${datum.hrefPhone}">${datum.phone}</a>
              <a class="pull-right" data-behaviour="view-in-map" data-datum-id="${index}" href="javascript:void(0)">View in Map</a>
            </div>
          </li>
        `).join("")
      }
      <ul>`
  }

}
