(ns soundcloud-test.core
  (:require [soundcloud.core :refer :all]))

(def settings {:client-id "3fbadbabb8f6669618990f481659e311" :client-secret "9f2e81791e1910dd31c63d3a9fc0e8d9"})

(get-user-id settings "L1fescape")
