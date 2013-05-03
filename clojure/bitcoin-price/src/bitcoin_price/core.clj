(ns bitcoin-price.core
  (:gen-class)
  (:require [clj-http.client :as client])
  (:require [cheshire.core :refer :all]))

(defn get-cookies
  [response] 
  (println (get response `:cookies)))

(defn get-current-price
  [response] 
  (println (get-in (parse-string (get response ':body)) ["return" "last" "display"])))

(defn -main
  [& args]
  (get-current-price (client/get "http://data.mtgox.com/api/1/BTCUSD/ticker")))

