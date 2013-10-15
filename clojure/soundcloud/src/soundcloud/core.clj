(ns soundcloud.core
  (:require [clj-http.client :as client]
            [cheshire.core :refer :all]
            [clojure.string :as str])
  (:import [com.soundcloud.api ApiWrapper Env Request Endpoints Params$Track Http]))


;; Helper function for getting an oauth token
(defn get-auth-token [settings]
  (defn parse-token [token]
    ;; shitty ass replace for the auth token "json" you get back.
    (str/replace (str/replace (str/replace token #"^[^\']*" "") "'" "") #",.*" ""))
  (assoc 
    settings
    :token
    (parse-token (.login 
            (ApiWrapper. (:client-id settings) (:client-secret settings) nil nil) 
            (:username settings) (:password settings) (into-array String [])))))


(defn soundcloud [route settings]
    (->
      (client/get (str "https://api.soundcloud.com" route ".json") {:query-params settings})
      (:body)
      (parse-string true)))
      
(defn tracks [settings] 
  (soundcloud "/tracks" {"client_id" (:client-id settings)} ))

(defn users 
  "stuff to interact with users"
  ([settings user-id subroute] 
     (soundcloud (str "/users/" user-id "/" subroute) {"client_id" (:client-id settings)} ))
  ([settings user-id]
     (soundcloud (str "/users/" user-id) {"client_id" (:client-id settings)} )))

(defn me [settings]
  (soundcloud "/me" {"oauth_token" (:token settings)} ))




(comment 
  (def settings 
    (get-auth-token (parse-string (slurp "resources/settings.json") true)))


  (me settings)
  (tracks settings)
  (auth settings)
  (users settings 3207)

  (users settings (:id (me settings)) "comments")

  (:title (first tracks))
  (doseq [track tracks]
    (println (:title track)))

  (def numbers [1 2 3 4])
  (doseq [n numbers]
    (println n)
    (inc n))

  (for [n numbers]
    (inc n))
  numbers


  (+ 1 2 3)

)
