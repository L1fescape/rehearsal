(ns foo.core
  (:require [clj-http.client :as client]))

(defn -main
  "Prints the first 50 characters of the HTML source of yelp.com."
  [& args]
  (println (apply str
                  (take 50
                        (:body (client/get "http://www.yelp.com"))))))
