package main

import (
  "net"
  "strings"
  "fmt"
)

func handleConnection(conn net.Conn) {
  // try to read data from the connection
  data := make([]byte, 512)
  n, err := conn.Read(data)
  if err != nil { panic(err)  }
  s := string(data[:n])

  // print the request data
  fmt.Println(s)

  // send a response
  var resp = []string{"Hi", "there!"}
  var str = strings.Join(resp, " ")
  _, err = conn.Write([]byte(str))
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
