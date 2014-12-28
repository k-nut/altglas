import requests
import geojson
import os

def main():

    response = requests.get("http://www.berlin.de/ba-charlottenburg-wilmersdorf/verwaltung/aemter/umwelt-und-naturschutzamt/umweltschutz/altglascontainer/index.php/index/all.json?q&amp;q_geo&amp;q_radius=20000")

    locations = [create_geojson_feature(location) for location in response.json()["index"]]
       
    feature_collection = geojson.FeatureCollection(locations)

    path_to_file = os.path.join(os.path.dirname(__file__), "../data/all.geojson")
    with open(path_to_file, "w") as outfile:
        geojson.dump(feature_collection, outfile, indent=2)
    print("done!")
    
def create_geojson_feature(location):
    gps_location = geojson.Point((float(location["laengengrad"].replace(",", ".")),
                                  float(location["breitengrad"].replace(",", "."))
                                ))
    return geojson.Feature(geometry=gps_location, properties=location)
    
if __name__=="__main__":
    main()
