Node Boilerplate
================

This is a boilerplate intended to get you fast up to speed when developing node.js web applications.

Based on
--------

* node.js
* express
* mongoose
* passport
* react
* redux
* socket.io

Howto
-----

* Clone this repository: ``git clone git://github.com/strekmann/node-boilerplate.git``
* Change directory: ``cd node-boilerplate``
* Install dependencies: ``make install``
* Create a settings file, and remember to edit it: ``cp settings.example.js settings.js``
* See that everything works on your side: ``make test``
* Run: ``npm start``
* Open browser at localhost:3000

Developers howto
----------------

* Make everything: ``make``
* Compile sass on file changes: ``make watch``
* Restart cluster on file changes: ``nodemon cluster``

Bugs? Contributions?
--------------------

Please use the issues and pull requests at Github.

Copyright and license
---------------------
Copyright © 2013-2016 Jørgen Bergquist and Sigurd Gartmann, released under the
[MIT license](https://github.com/strekmann/node-boilerplate/blob/master/LICENSE).
