Node Boilerplate
================

This is a boilerplate intended to get you fast up to speed when developing node.js web applications.

Based on
--------

* node
* express
* mongoose
* passport
* jade
* react
* alt (flux pattern)
* iso (isomorphic react)
* i18n-abide
* mocha

Howto
-----

* Clone this repository: ``git clone git://github.com/strekmann/node-boilerplate.git``
* Change directory: ``cd node-boilerplate``
* Install dependencies: ``make install``
* Create a settings file, and remember to edit it: ``cp server/settings.example.js server/settings.js``
* See that everything works on your side: ``make test``
* Run: ``node index``
* Open browser at localhost:3000

Developers howto
----------------

* Make everything: ``make``
* Make translation files: ``make locales``
* Compile sass and react components on file changes: ``make watch``
* Restart cluster on file changes: ``nodemon cluster``

Bugs? Contributions?
--------------------

Please use the issues and pull requests at Github.

Copyright and license
---------------------
Copyright © 2013-2015 Jørgen Bergquist and Sigurd Gartmann, released under the
[MIT license](https://github.com/strekmann/node-boilerplate/blob/master/LICENSE).
