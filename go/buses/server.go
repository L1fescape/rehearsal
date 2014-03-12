package main

import (
  "net/url"
  "./sleepy"
  "./buses"
)

type Coord struct { }

func (coord Coord) Get(values url.Values) (int, interface{}) {
    var radius int
    radius = 1
    results := buses.FindStops(values.Get("lat"), values.Get("long"), radius)
    data := map[string]interface{}{"result_count": len(results), "results": results}
    return 200, data
}

func main() {
    coord := new(Coord)

    var api = sleepy.NewAPI()
    api.AddResource(coord, "/coord/:lat/:long")
    api.Start(8000)
}
