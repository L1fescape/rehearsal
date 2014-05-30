(ns bitcoin-price.core
  (:gen-class)
  (:require [clj-http.client :as client])
  (:require [cheshire.core :refer :all]))

(defn get-cookies
  [response] 
  (println (get response `:cookies)))

(defn get-current-price
  "Gets the current price from a response"
  [response] 
  (println (get (parse-string (get response :body)) "last")))

(defn -main
  [& args]
  (get-current-price (client/get "https://www.bitstamp.net/api/ticker/")))
