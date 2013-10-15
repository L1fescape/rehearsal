# SoundCloud

A Clojure library for interacting with the [SoundCloud API](http://developers.soundcloud.com/docs/api/reference).

## Usage

Create a file called `resources/settings.json` (you can copy from `resources/settings.json.sample`).

```clojure
(def settings
  (get-auth-token (parse-string (slurp "resources/settings.json") true)))

(me settings)
;;=> {:country "United States", :plan "Free", :kind "user", ... }
```

## License

Copyright © 2013 Andrew Kennedy

Distributed under the Eclipse Public License, the same as Clojure.
