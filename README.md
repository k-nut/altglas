# Altglas

The map shows glass recycling containers spread across the city of Berlin.

![Altglas Containers Map](/screenshot.png "Altglas Containers Map")


This project was started at the [Open Data Day 2014 in Berlin][opendataday-2014-berlin].


## How to run the thing?

Please run a webserver to launch the website such as ...

```
$ python -m SimpleHTTPServer
```

Then open your browser and open ..

```
http://localhost:8000
```

If you want to get the newest data just run the `download.sh` script.
```
cd altglas
sh download.sh
```
This will automatically update the `all.geojson` file in the `data` directory.

## Authors & Contributors

* [Christian Pape](https://github.com/cpape)
* [Lucas Jacob](https://github.com/LucasJ)
* [Lukas Schulze](https://github.com/lspcity)
* [Knud Möller](http://datalysator.com)
* [Knut Hühne](https://github.com/k-nut)
* [Tobias Preuss](https://github.com/johnjohndoe)



## References

* [Open Data Berlin: Standorte von Altglascontainern auf öffentlichem Straßenland in Charlottenburg-Wilmersdorf][glass-container-cw]
* [Districts of Berlin, preprocessed by Felix Ebert][felixs-berlin-bezirke]



[opendataday-2014-berlin]: http://de.opendataday.org/berlin/
[glass-container-cw]: http://daten.berlin.de/datensaetze/standorte-von-altglascontainern-auf-%C3%B6ffentlichem-stra%C3%9Fenland-charlottenburg-1
[felixs-berlin-bezirke]: http://felixebert.de/energyhackday/data/Berlin-Bezirke.geojson
