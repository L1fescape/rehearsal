package buses

import (
  "encoding/xml"
  "fmt"
  "strconv"
  "math"
  "io/ioutil"
)

var v = Result{Name: "none"}
var coords = parseStops(v)

type Coords struct {
  ID      string `xml:"id,attr"`
  Long    string `xml:"LookAt>longitude"`
  Lat     string `xml:"LookAt>latitude"`
}

type Result struct {
  XMLName xml.Name `xml:"kml"`
  Name    string
  Coords  []Coords `xml:"Document>Placemark"`
}

func FindStops(lat string, long string, radius int) []Coords {
    matchCoord := make([]Coords, 0)

    for _, i := range coords {
      if calcDist(lat, long, i.Lat, i.Long) < float64(radius) {
        matchCoord = append(matchCoord, i)
      }
    }

    return matchCoord
}

func parseStops(v Result) []Coords {
    // read whole the file
    b, err := ioutil.ReadFile("buses/stops.kml")
    if err != nil { panic(err) }

    err = xml.Unmarshal([]byte(b), &v)
    if err != nil {
        fmt.Printf("error: %v", err)
        return make([]Coords, 0)
    }
    fmt.Printf("XMLName: %#v\n", v.XMLName)
    fmt.Printf("Coords: %v\n", len(v.Coords))
    return v.Coords
}

func calcDist(lat1 string, long1 string, lat2 string, long2 string) float64 {
    var lat1f, long1f, lat2f, long2f float64
    var err error
    lat1f, err = strconv.ParseFloat(lat1, 64)
    if err != nil {
        panic(err)
    }
    long1f, err = strconv.ParseFloat(long1, 64)
    lat2f, err = strconv.ParseFloat(lat2, 64)
    long2f, err = strconv.ParseFloat(long2, 64)
    //dist := math.Acos(math.Sin(lat1)*math.Sin(lat) + math.Cos(lat1)*math.Cos(lat)*math.Cos(long-long1)) / 180 * 3.14 * 3963.191
    return math.Sqrt(math.Pow(lat2f - lat1f, 2) + math.Pow(long2f - long1f, 2)) * 160.93
}
