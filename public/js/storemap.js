class StoreMap {
	constructor(renderTo, data) {
		const mapOptions = {
			zoom: 12,
     	center: new google.maps.LatLng(40.748441, -73.985664),
     	mapTypeId: google.maps.MapTypeId.ROADMAP,//TERRAIN
			disableDefaultUI: true
		};
		this.markers = [];
		this.map = new google.maps.Map(renderTo, mapOptions);
	  const trafficLayer = new google.maps.TrafficLayer();
	  trafficLayer.setMap(this.map);
		this.data = data;
		this.generateMarkers(this.data);
	}

	clearMarkers() {
	   this.markers.forEach(marker => marker.setMap(null));
	   this.markers = [];
	};

	generateMarkers(data) {
  	this.clearMarkers();
		data.forEach(datum => this.createMarker(datum));
	};

	createMarker(datum) {
		const { latitude, longitude, name } = datum;
		if(latitude && longitude) {
      var marker = new google.maps.Marker({
				map: this.map,
				position: new google.maps.LatLng(latitude, longitude),
				title: name
      });
      this.markers.push(marker);
			this.bindInfoWindow(marker, datum);
		}
	};

	getInfoWindowContent(datum) {
		return `
			<div class="info-window">
				<h3>${datum.name}</h3>
				<address>${datum.address}</address>
				<p>${datum.description}</p>
				<p><a href="tel:${datum.hrefPhone}">${datum.phone}</a></p>
				<a href="${datum.directionUrl}" target="_blank">Directions</a>
			</div>
		`
	};

	bindInfoWindow(marker, datum) {
		marker.infowindow = new google.maps.InfoWindow({
      content: this.getInfoWindowContent(datum)
    });
		marker.addListener('click', () => {
			this.hideAllInfoWindow();
			marker.infowindow.open(this.map, marker);
	 });

	 google.maps.event.addListener(marker, 'map_changed', () => {
		 if (this.map) {
			 marker.infowindow.open(this.getMap(), this);
		 } else {
			 marker.infowindow.close()
		 }
	 });
 };

 hideAllInfoWindow() {
	 this.markers.forEach(marker => {
		 marker.infowindow.close();
	 });
 }

 viewMarkerByIndex(index) {
	 const marker = this.markers[index];
	 if(marker) {
		 this.map.setCenter(marker.getPosition())
		 this.map.setZoom(18);
		 google.maps.event.trigger(marker, 'click');
	 }
 }

}
