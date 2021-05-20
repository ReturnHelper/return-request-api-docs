.. Return Request API documentation master file, created by
   sphinx-quickstart on Tue May  5 23:54:44 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Return Request API
==================

About this documentation
------------------------

This documentation listed the functions of Return Request API.

Each function is provided with input and output object definition (if exist).

Some objects may have an inherit class that you can use the parameters from it.

Authenication
-------------

Put authenication keys in your request header:

::

    x-rr-apikey: (your key)
    x-rr-apitoken: (your token)
    Content-Type: "application/json"

---

.. toctree::
   :maxdepth: 3
   :caption: Contents:

   API Methods <api_methods>
   Data Structure <data_structure>
