$( document ).ready(function() {

  // create a map in the "map" div, set the view to a given place and zoom
  var map = L.map('map').setView([52.505, 13.25], 12);

  // add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  var containers;
  $.getJSON("/all.gjson", function(data) {
      containers = data;
  })
  .done(function(){
      add_containers(containers);
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
    var colorFilters = {"braun": filterBrown, "weiss": filterWhite, "gruen": filterGreen};
    var filterPlz = $("#plz").val();


    var filteredContainers = [];
    $.each(containers.features, function(index, container) {
        if (filterPlz === "-1" || container.properties.plz === filterPlz){
            filteredContainers.push(container)
        }
    });

    $.each(filteredContainers, function(index, container) {
        if (container !== undefined){
            for (color in colorFilters){
                if (colorFilters[color] && container.properties[color] === ""){
                    filteredContainers.splice(index, 1);
                }
            }
        }
    });
    filteredContainers = filteredContainers.filter(filterBySupplier);
    add_containers(filteredContainers);
  }

  var allContainers = [];
  function add_containers(data){
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
  }
});
