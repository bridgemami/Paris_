window.onload = init;

function init() {
    const map= new ol.Map({
        view: new ol.View({
            center:[260782.93982152033, 6250550.270338864],
            zoom: 13
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        target: 'js-map'
    })
    map.on('click', function(e) {
        console.log(e.coordinate);
    })
    //vector
    const fillStyle = new ol.style.Fill({
        color: [0, 0, 255, 1]
    });

    const strokeStyle= new ol.style.Stroke({
        color: [0, 0, 255, 1],
        width: 1
    });
    const circleStyle= new ol.style.Circle({
        fill: new ol.style.Fill({
        color: [0, 0, 255, 1]
        }),
        radius: 7,
        stroke: strokeStyle
    });

    const parisJson= new ol.layer.VectorImage(
        {source: new ol.source.Vector({
            url: './map.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title: 'Map',
        style: new ol.style.Style ({
            fill: fillStyle,
            stroke: strokeStyle,
            image: circleStyle
        })
        }
    )
    map.addLayer(parisJson);
    //Vector Popups
    const overlayContainerElement = document.querySelector('.overlay-container');
    const overlayLayer = new ol.Overlay({
        element: overlayContainerElement
    })
    map.addOverlay(overlayLayer);
    const overlayFeatureMuseums = document.getElementById('feature-museums');
    
    map.on('click', function(f){
        overlayLayer.setPosition(undefined);
       map.forEachFeatureAtPixel(f.pixel, function(feature, layer){
           console.log(feature);
           let clickCoordinate = f.coordinate;
           let clickedFeatureMuseum = feature.get('Museums');
           overlayLayer.setPosition(clickCoordinate)
           console.log(clickedFeatureMuseum);
           overlayFeatureMuseums.innerHTML = clickedFeatureMuseum;
       },
       {
           layerFilter: function(layerCandidate){
               return layerCandidate.get('title')=== 'Map'
           }
       }) 
       })
}

