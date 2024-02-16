.. Return Helper API documentation master file, created by
   sphinx-quickstart on Tue May  5 23:54:44 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Return Helper API
==================

About this documentation
------------------------

This documentation listed the functions of Return Helper API.

Each function is provided with request and response object definition (if exist).
Some objects may have an inherit class that you can use the parameters from it.

**Our API is only designed for Server to Server integration.**

Changelog
========

.. list-table::
   :widths: 25 75
   :header-rows: 1

   * - Version
     - Description
   * - 2023-03
     - Add description about ``label_id`` in :ref:`notification-label`
   * - 2023-06
     - Add API endpoint for China user
   * - 2023-07
     - Release new API :ref:`method-createreturnshipment`, replacing :ref:`method-createreturnrequest` and :ref:`method-createlabel`
   * - 2024-02
     - Remove ``x-api-key`` from request header, this value is no longer required for API access

.. _index-Authenication:

Authenication
-------------

Put authenication keys in your request header:

::

    x-rr-apikey: (your key)
    x-rr-apitoken: (your token)
    Content-Type: "application/json"

``API TOKEN`` is private and should never be shared to others.

Clients must submit a API access request in order to be able to use Return Helper API.

Below is a email template for requesting API access:

::

  [Template Email Subject] Request access on Return Helper API - <CLIENT CODE>

  [Template Email Recipients]
  to: support@returnhelper.com
  cc: paco@returnhelper.com, manuel@returnhelper.com, roy@returnhelper.com

  [Template Email body]

  Dear Support Team,

  We would like to request access on Return Helper API. Please help to provide the following information in both sandbox and production environment:
  x-rr-apikey
  x-rr-apitoken

For example:

::

  Email Subject: Request access on Return Helper API - <RHHK001>

  Recipients:
  to: support@returnhelper.com
  cc: paco@returnhelper.com, manuel@returnhelper.com, roy@returnhelper.com

  Body:
  Dear Support Team,
  We would like to request access on Return Helper API. Please help to provide the following information in both sandbox and production environment:
  x-rr-apikey
  x-rr-apitoken

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

+-------------------------------+--------------------------------------------------+
|rh-api-user-endpoint           | https://api.returnhelpercentre.com/v1/user/api   |
+-------------------------------+--------------------------------------------------+
|rh-api-user-endpoint for China | https://api.returnhelperchina.com/user/          |
+-------------------------------+--------------------------------------------------+
|rh-api-public-endpoint         | https://api.returnhelpercentre.com/v1/public/api |
+-------------------------------+--------------------------------------------------+
| User Web Portal URL           | http://user.returnhelpercentre.com/              |
+-------------------------------+--------------------------------------------------+


General Remarks
---------------

- Parameter ``dateTime`` must be ``ISO8601`` format, otherwise API won't be able to parse it.
- Date string parameter e.g. ``createToStr``/ ``createFromStr`` must be ISO8601 and time part is omitted by API.
- All time return is UTC.

----

.. toctree::
   :maxdepth: 4
   :caption: Contents:

   Getting Started <getting_start>
   Base Models <base_model>
   Data Structure <data_structure>
   Return Public Api <return_public_api>
   Return User Api <return_user_api>
   Webhook <Webhook>
   Label Service Limitation <label_service_limitation>