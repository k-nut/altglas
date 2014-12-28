/*global $, L, _ */
/*jslint browser:true */

var map;
$(document).ready(function() {
  "use strict";

  // create a map in the "map" div, set the view to a given place and zoom
  map = L.map('map').setView([52.516667, 13.383333], 12);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var containers;
  $.getJSON("data/all.geojson", function(data) {
    containers = data;
  })
  .done(function(){
    addContainers(containers);
  });


  var districts;
  $.getJSON("data/berlin-districts.geojson", function(data) {
    districts = data;
  })
  .done(function(){
    L.geoJson(districts, { style: {
      fillColor: "hotPink",
      color: "#2E85CB"
    }}).addTo(map);
  });


  var filterBySupplier = function(container){
    var filterSupplier = $("#supplier").val();
    if (filterSupplier === ""){
      return true;
    }
    return container.properties.aufsteller === filterSupplier;
  }

  function filterPoints(){
    var filterBrown = $("#brown").prop("checked");
    var filterWhite = $("#white").prop("checked");
    var filterGreen = $("#green").prop("checked");
    var filterColored = $("#colored").prop("checked");
    var colorFilters = {
      "braun": filterBrown,
      "weiss": filterWhite,
      "gruen": filterGreen,
      "bunt": filterColored
    };
    var filterPlz = $("#plz").val();


    var filteredContainers = [];
    filteredContainers = _.filter(containers.features, function(container){
      return (filterPlz === "-1" || container.properties.plz === filterPlz);
    });

    $.each(filteredContainers, function(index, container) {
      if (container !== undefined){
        for (var color in colorFilters){
          if (colorFilters[color] && container.properties[color] === ""){
            filteredContainers.splice(index, 1);
          }
        }
      }
    });
    filteredContainers = filteredContainers.filter(filterBySupplier);
    addContainers(filteredContainers);
  }

  var allContainers = [];
  function addContainers(data){
    map.removeLayer(allContainers);
    allContainers = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(data2html(feature));
      }

    }).addTo(map);
  }

  var data2html = function(item){
    // flatten the json
    var content = _.extend(item.properties,item.properties.data);
    delete content.data;

    var template = _.template($("#tooltip_tmpl").html());
    return template(content);
  };

  $("input").change(filterPoints);
  $("select").on("change", filterPoints);

});
