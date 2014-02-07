package main

// inspired by this blog post: http://dougblack.io/words/a-restful-micro-framework-in-go.html

import (
  "encoding/json"
  "net/http"
  "net/url"
  //"fmt"
)

type HelloResource struct {}

type Resource interface {
  Get(values url.Values) (int, interface{})
  Post(values url.Values) (int, interface{})
  Put(values url.Values) (int, interface{})
  Delete(values url.Values) (int, interface{})
}

func response(rw http.ResponseWriter, request *http.Request) {
  var handler func(url.Values) (int, interface{})

  resource := new(HelloResource)

  switch request.Method {
    case "GET":
      handler = resource.Get
  }

  if handler == nil {
    rw.WriteHeader(http.StatusMethodNotAllowed)
    return
  }

  code, data := handler(request.Form)

  content, err := json.Marshal(data)
  if err != nil {
    rw.WriteHeader(http.StatusInternalServerError)
    return
  }
  rw.WriteHeader(code)
  rw.Write(content)
}

func (HelloResource) Get(values url.Values) (int, interface{}) {
  data := map[string]string{"hello": "world"}
  return 200, data
}

func main() {
  http.HandleFunc("/test", response)
  http.ListenAndServe(":3000", nil)
}
