// AccesToken
mapboxgl.accessToken = 'pk.eyJ1IjoibWNyZiIsImEiOiJjbGVwaXNpemowOHlmM3JtanlnMHl6dmY2In0.AOODBherJ7hYuLVtRl5zqg';

// Configuration de la carte
var map = new mapboxgl.Map({container: 'map',
style: 'mapbox://styles/mcrf/clepiw57600ad01o9hqrqwb2o', // fond de carte
center: [-1.68, 48.12], // lat/long
zoom: 14, // zoom de départ
pitch: 0, // Inclinaison
bearing: 0, // Rotation
customAttribution : '<a href= "https://esigat.wordpress.com/"> Master SIGAT </a>'// Attribution personnalisée
});

// Ajout des données sur la carte
// On charge les données sur la carte avec map.on
map.on('load', function () { 

   // Appel WMS PLUI Rennes 
  map.addSource('PLURM', {
'type': 'raster',

'tiles': [
'https://public.sig.rennesmetropole.fr/geoserver/ows?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.3.0&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&raster-opacity=0.5&layers=urba_docs:plu_synthese_2018'
],
'tileSize': 256
});
  
map.addLayer(
{'id': 'PLU',
'type': 'raster',
'source': 'PLURM',
'layout': {'visibility': 'none'},
'paint': {'raster-opacity':0.6,}}
);

//Ajout du site qui possède la données
map.addSource('mapbox-streets-v8', {
type: 'vector',
url: 'mapbox://mapbox.mapbox-streets-v8'}); // Ajout de la source des données

// Ajout des données
// Routes
map.addLayer({
"id": "Routes",//Nom de la données dans NOTRE carte
"type": "line",//Type de la données
"source": "mapbox-streets-v8",//Nom dans le addsource
"layout": {'visibility': 'visible'},//Couche visible sur la carte
"source-layer": "road",//nom de la données dans le site qui l'heberge
"filter": ['==', 'class', 'trunk'],//Filtre sur le type de route, ici rocade
"paint": {"line-color": "#e31b1b", "line-width": 1.5}//Couleur de la couche et la largeur
}); // Ajout de la couche voulu depuis la source, une source peut avoir plusieurs couches

// Landuse
map.addLayer({
"id": "Landuse",//Id dans le code attention ne pas nommer la couche du mêmeidentique que la source de la couche car pb 
"type": "fill",//Type de la data
"source": "mapbox-streets-v8",//Source des données défini dans le addsource
"layout": {'visibility': 'visible'},//Si la couche est visible ou non
"source-layer": "landuse",//La source dans le site qui possède les données
"filter":['==', 'class', 'wood'],//Filtre sur les bois
"paint": {"fill-color": "#409353"}//Couleur de la couche et opacité de la couche
});
  
// Hydro
map.addLayer({
"id": "Hydro",//Id dans le code attention ne pas nommer la couche du mêmeidentique que la source de la couche car pb 
"type": "line",//Type de la data
"source": "mapbox-streets-v8",//Source des données défini dans le addsource
"layout": {'visibility': 'visible'},//Si la couche est visible ou non
"source-layer": "waterway",//La source dans le site qui possède les données
"paint": {"line-color": "#1ce0ff"}//Couleur de la couche
});
// AJOUT DONNEES INSEE CAROYEES - Définition de la source de données n°9
  map.addSource('Carreau_source', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/Martiflux/coursmapbox/main/carreaux-insee-rennesmetropole.geojson' });
  
  // Ajout de la couche de données de l'insee (en polygone)
  map.addLayer({
    'id': 'Carreau_fill',
    'type': 'fill',
    'source': 'Carreau_source',
    'layout': {'visibility': 'none'},
    'paint': {'fill-color': 
                  {'property': 'pop_carr',
                  'stops': [[1, '#1a9850'],
                            [10, '#91cf60'],
                            [20, '#d9ef8b'],
                            [50, '#ffffbf'],
                            [100, '#fee08b'],
                            [150, '#fc8d59'],
                            [200, '#d73027']]},
              'fill-opacity': 0.6}
  });
   // Ajout de la couche de données de l'insee (en ligne)
  map.addLayer({
    'id': 'Carreau_line',
    'type': 'line',
    'source': 'Carreau_source',
    'layout': {'visibility': 'none'},
    'paint': {'line-color': '#FFFFFF',
              'line-width': 1.5,
              'line-opacity': 0.7}
  });
  // Ajout de la couche de données de l'insee (en 3d)
  map.addLayer({
    'id': 'Carreau_3d',
    'type': 'fill-extrusion',
    'source': 'Carreau_source',
    'layout': {'visibility': 'none'},
    'paint': {'fill-extrusion-color': 
                  {'property': 'pop_carr',
                  'stops': [[1, '#1a9850'],
                            [10, '#91cf60'],
                            [20, '#d9ef8b'],
                            [50, '#ffffbf'],
                            [100, '#fee08b'],
                            [150, '#fc8d59'],
                            [200, '#d73027']]},
              'fill-extrusion-height': {
                  'property': 'pop_carr',
                  'stops': [[1, 0],
                  [10, 100],
                  [700, 7000]]},
                  'fill-extrusion-opacity': 0.95,
                  'fill-extrusion-base': 0 }
                    });
// Mes datas mapbox
//Bien nommer sa couche source pour éviter les erreurs
map.addSource('bussource', {
type: 'vector',
url: 'mapbox://mcrf.3uia5c6y'});//Ajout de mon url
//Ajout des bus
map.addLayer({
"id": 'Bus',
"type": 'circle',
"source": "bussource",
"source-layer": 'bus-6voj4c',
"layout": {'visibility': 'none'},
"paint": {'circle-radius': {'base': 1.5,'stops': [[13, 2], [22, 60]]}, 
          'circle-stroke-color':'#e5ec09',
          'circle-stroke-width':2,
          'circle-color': '#0528b8',}, minzoom:10 
});
  
//Ajout des organismes
map.addSource('orgasource', {
type: 'vector',
url: 'mapbox://mcrf.c9lyipor'});//Ajout de mon url

map.addLayer({
"id": 'Orga',
"type": 'circle',
"source": "orgasource",
"source-layer": 'base-orga-var-1hwj44',
"layout": {'visibility': 'none'},
"paint": {'circle-radius': {'base': 1.2,'stops': [[13, 2], [22, 60]]}, 'circle-color': '#b06d76',}, minzoom:10 
});

//BATIMENTS 
map.addSource('Batiments', {
type: 'vector',
url: 'mapbox://mastersigat.a4h4ovrl'
});
map.addLayer({
'id': 'Batiments',
'type': 'fill-extrusion',//Permet d'extruder les batiments
'source': 'Batiments',
'source-layer': 'batiIGN-8zf03o',
'layout': {'visibility': 'none'},
'paint': 
{'fill-extrusion-color': '#f96e01', //Couleur des batiments
'fill-extrusion-height':{'type': 'identity','property': 
'HAUTEUR'},//Champs de l'extrusion
'fill-extrusion-opacity': 0.90,//Opacité des batiments
'fill-extrusion-base': 0}//Accrochage des batiments au sol 
});

//Ajout du cadastre
//Appel d'un flux de tuiles vectorielles
map.addSource('Cadastre', {
type: 'vector',
url: 'https://openmaptiles.geo.data.gouv.fr/data/cadastre.json'});
//Choix des parcelles depuis la source cadastre
map.addLayer({
'id': 'Cadastre',
'type': 'fill',
'source': 'Cadastre',
'source-layer': 'parcelles',
'layout': {'visibility': 'none'},
'filter':['>=', 'contenance', 1000],//Filtre sur les surfaces supérieures à 1000 m²
'paint': {'fill-color': '#f90101', 'fill-opacity': 0.3, 'fill-outline-color': '#ffffff' },
'minzoom':16, 'maxzoom':19 });//Limite l'affichage de la couche

map.addLayer({
'id': 'Parcelle',
'type': 'line',
'source': 'Cadastre',
'source-layer': 'parcelles',
'layout': {'visibility': 'none'},
'filter':['>=', 'contenance', 1000],//Filtre sur les surfaces supérieures à 1000 m²
'paint': {'line-color': '#ffffff', 'line-width': 2},
'minzoom':16, 'maxzoom':19 });//Limite l'affichage de la couche
  
// Ajout lignes de metros
map.addSource('lignes', {
type: 'geojson',
data: 'https://raw.githubusercontent.com/mastersigat/data/main/metro-du-reseau-star-traces-de-laxe-des-lignes.geojson'});

map.addLayer({
'id': 'Lignes',
'type': 'line',
'source': 'lignes',
'layout': {'visibility': 'none'},
'paint': {'line-opacity': 0.7, 'line-width': 3.5,'line-color': 'red'}});

// Ajout stations de metros
//Depuis Github
map.addSource('Stations', {
type: 'geojson',
data: 'https://raw.githubusercontent.com/mastersigat/data/main/metro-du-reseau-star-localisation-des-stations.geojson'});

map.addLayer({
'id': 'StationsMetro',
'type': 'circle',
'source': 'Stations',
'layout': {'visibility': 'none'},
'paint': {'circle-color': 'blue' , 'circle-stroke-color': 'white' , 'circle-stroke-width': 2 , 'circle-radius' : 4}}); 
  
});
// Fermeture du map.on qui permet de charger toutes les couches voulues. On ajoute toutes les couches voulues à l'intérieur du map.on

//Interactivité HOVER (survol)
var popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false,
className: "Mypopup" // appel du css avec le nom dans le CSS
});
map.on('mousemove', function(e) {
var features = map.queryRenderedFeatures(e.point, { layers: ['StationsMetro'] });//La couche sur laquelle on ajoute les popup
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
if (!features.length) {
popup.remove();
return; }
var feature = features[0];
popup.setLngLat(feature.geometry.coordinates)
.setHTML(feature.properties.nom + "<hr>" + "<img src='https://img.lemde.fr/2022/09/21/0/0/6595/4396/664/0/75/0/f7aff80_1663739627478-choix.jpg' style='width:40%'>" + "<br> Ligne : " + feature.properties.ligne)//Défini l'affichage du champs dans la popup avec une image dans la popup
.addTo(map);
});

// Interactivité hover pour les arrets de bus
var popup2 = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false,
className: "Mypopup" // appel du css avec le nom dans le CSS
});
map.on('mousemove', function(e) {
var features = map.queryRenderedFeatures(e.point, { layers:['Bus'] });
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
if (!features.length) {
popup2.remove();
return; }
var feature = features[0];
popup2.setLngLat(feature.geometry.coordinates)
.setHTML(feature.properties.nom
)
.addTo(map);
});

//Interactivité au CLICK pour le cadastre
map.on('click', function (e) {
var features = map.queryRenderedFeatures(e.point, { layers: ['Cadastre'] });
if (!features.length) {
return;
}
var feature = features[0];
var popup3 = new mapboxgl.Popup({ className: "Mypopup2", offset: [0, -15] })
.setLngLat(e.lngLat)
.setHTML("Id : " + feature.properties.id + "<br/>" + "Numéro : "+feature.properties.numero + "<br/>"+ feature.properties.contenance + " m²")
.addTo(map);
});
map.on('mousemove', function (e) {
var features = map.queryRenderedFeatures(e.point, { layers: ['Cadastre'] });
map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

//Gestion du menu
switchlayer = function (lname) {
            if (document.getElementById(lname + "CB").checked) {
                map.setLayoutProperty(lname, 'visibility', 'visible');
            } else {
                map.setLayoutProperty(lname, 'visibility', 'none');
           }
        }


// Boutons de navigation 
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// Ajout Echelle cartographique
map.addControl(new mapboxgl.ScaleControl({
maxWidth: 120,
unit: 'metric'}));

// Bouton de géolocalisation
map.addControl(new mapboxgl.GeolocateControl
({positionOptions: {enableHighAccuracy: true},
trackUserLocation: true,
showUserHeading: true}));

// Configuration onglets geographiques
document.getElementById('Debut').addEventListener('click', function () 
{ map.flyTo({zoom: 14,
center: [-1.68, 48.12],
pitch: 50,
bearing: 0 });
});

// Configuration onglets geographiques
document.getElementById('Gare').addEventListener('click', function () //Choix de la zone ici Gare renvoie au html
{ map.flyTo({zoom: 16, // Niveau de zoom
center: [-1.672, 48.1043], // Coordonnées de la vue
pitch: 145,
bearing: -197.6 });// Paramètre basique
});

// Configuration onglets geographiques
document.getElementById('Rennes1').addEventListener('click', function () 
{ map.flyTo({zoom: 16,
center: [-1.6396, 48.1186],
pitch: 50,
bearing: -15 });
});


// Configuration onglets geographiques
document.getElementById('Rennes2').addEventListener('click', function () //Choix de la zone ici Gare renvoie au html
{ map.flyTo({zoom: 16, // Niveau de zoom
center: [-1.7023, 48.1194], // Coordonnées de la vue
pitch: 50,
bearing: -15 });// Paramètre basique
});

 // Config affichage boutons carto thematique

document.getElementById('carreaux2D').addEventListener('click', function () 
{  map.setLayoutProperty('Carreau_fill', 'visibility', 'visible');
   map.setLayoutProperty('Carreau_3d', 'visibility', 'none');
});

document.getElementById('carreaux3D').addEventListener('click', function () 
{  map.setLayoutProperty('Carreau_fill', 'visibility', 'none');
   map.setLayoutProperty('Carreau_3d', 'visibility', 'visible');
});

document.getElementById('nopop').addEventListener('click', function () 
{  map.setLayoutProperty('Carreau_fill', 'visibility', 'none');
   map.setLayoutProperty('Carreau_3d', 'visibility', 'none');
});