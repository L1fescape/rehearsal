package main

import (
  "net"
  "fmt"
)

func handleConnection(conn net.Conn) {
  // try to read data from the connection
  data := make([]byte, 512)
  n, err := conn.Read(data)
  if err != nil { panic(err)  }
  s := string(data[:n])
  fmt.Println(s)

  // send a response
  var str = []string{"HTTP/1.1 200 OK\r\n\r\n"}
  var x = []byte{}
  // convert string array to byte array so it can
  // be written to the connection
  for i:=0; i<len(str); i++{
    b := []byte(str[i])
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
