.. Return Request API documentation master file, created by
   sphinx-quickstart on Tue May  5 23:54:44 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Return Request API
==================

About this documentation
------------------------

This documentation listed the functions of Return Request API.

Each function is provided with request and response object definition (if exist).
Some objects may have an inherit class that you can use the parameters from it.

**Our API is only designed for Server to Server integration.**

Authenication
-------------

Put authenication keys in your request header:

::

    x-rr-apikey: (your key)
    x-rr-apitoken: (your token)
    Content-Type: "application/json"

``API TOKEN`` is private and should never be shared to others.

API Endpoints
-------------

- Sandbox

+----------------------+----------------------------------------------+
|rh-api-user-endpoint  | https://api.returnshelper.com/uat/user/api   |
+----------------------+----------------------------------------------+
|rh-api-public-endpoint| https://api.returnshelper.com/uat/public/api |
+----------------------+----------------------------------------------+
| User Web Portal URL  | https://devusr.returnshelper.com/            |
+----------------------+----------------------------------------------+


- Production

+----------------------+--------------------------------------------------+
|rh-api-user-endpoint  | https://api.returnhelpercentre.com/v1/user/api   |
+----------------------+--------------------------------------------------+
|rh-api-public-endpoint| https://api.returnhelpercentre.com/v1/public/api |
+----------------------+--------------------------------------------------+
| User Web Portal URL  | http://user.returnhelpercentre.com/              |
+----------------------+--------------------------------------------------+


General Remarks
---------------

- Parameter ``dateTime`` must be ``ISO8601`` format, otherwise API won't be able to parse it.
- Date string parameter e.g. ``createToStr``/ ``createFromStr`` (in search API) must be ISO8601 and time part is omitted by API.
- All time return is UTC.

Pagination
----------

All search functions support pagination.

Please use the :ref:`structure-PaginationRequest` parameters in your request to enable it.

|

----

.. toctree::
   :maxdepth: 4
   :caption: Contents:

   Getting Started <getting_start>
   Base Models <base_model>
   Data Structure <data_structure>
   Return Public Api <return_public_api>
   Return User Api <return_user_api>
   Notification Api <Notification>
