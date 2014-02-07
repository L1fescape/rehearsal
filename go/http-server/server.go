package main

import (
  "net"
  "fmt"
  "strings"
  "bytes"
  "encoding/json"
)

type Person struct {
  Id int `json:",string"`
  Name string
}

func parseResponse(request []byte) []string {
  req := bytes.Split(request, []byte("\n"))
  reqInfo := strings.Split(string(req[0]), " ")

  fmt.Println(string(request))
  method := reqInfo[0]
  //url := reqInfo[1]
  var body []byte = req[len(req) - 1]

  resp := []string{"HTTP/1.1 200 OK\r\n\r\n"}

  switch method {
    case "GET":
      resp = append(resp, "Hi there!")
    case "POST":
      var person Person
      err := json.Unmarshal(body, &person)
      if err != nil { panic(err) }
      resp = append(resp, "Hi there ", person.Name, "!")
  }
  return resp
}

func handleConnection(conn net.Conn) {
  // try to read data from the connection
  data := make([]byte, 512)
  n, err := conn.Read(data)
  if err != nil { panic(err)  }
  cdata := data[:n]
  //s := string(data[:n])
  //fmt.Println(s)
  resp := parseResponse(cdata)

  // send a response
  var x = []byte{}
  // convert string array to byte array so it can
  // be written to the connection
  for i:=0; i<len(resp); i++{
    b := []byte(resp[i])
    for j:=0; j<len(b); j++{
      x = append(x,b[j])
    }
  }
  // write the data to the connection
  _, err = conn.Write(x)
  if err != nil { panic(err) }
  // close the connection
  conn.Close()
}

func main() {
  ln, err := net.Listen("tcp", ":8081")
  if err != nil {
    // handle error
  }
  for {
    conn, err := ln.Accept()
    if err != nil {
      // handle error
      continue
    }
    go handleConnection(conn)
  }
}
