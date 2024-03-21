###########
Partner API
###########

Introduction
-------------

The Partner API is a restricted API that is only available for partners. It provides additional functionality and features specifically designed for partners.

Please note that access to the Partner API requires extra registration as a Return Helper's partner. Unauthorized access to this API is strictly prohibited.

Configure Notification Endpoints for Partners' Customers
--------------------------------------------------------

Customer keys
*************

To configure notification endpoints for a partners' customers, partners need to ensure they use the customers' API keys and tokens instead of the partner's key and token. This ensures that the notifications are properly associated with the respective customer accounts.

.. _method-AddHttpNotification:

AddHttpNotification
-------------------

Add an notification endpoint associated with a user account (by using the user's API key and token).

Validation
**********
Before setting the endpoint, a JSON object will be sent via a POST request to the endpoint to verify its ability to receive HTTP POST requests. If the endpoint rejects the request, the API will not add the specified endpoint.

::

[POST]  <userapi-endpoint>/PartnerNotification/addHttpNotification

Parameters:

.. _structure-ApiNotificationRequest:

.. csv-table:: ``ApiNotificationRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   endpoint, string_, YES

.. method_GetAllHttpNotification

Response:

.. csv-table::
   :header: "Name", "Type"
   :widths: 15, 10

   apiName, string_
   signingKey, key

GetAllHttpNotification
----------------------

Get all notification endpoints under user account (by using the user's API key and token).

::

[GET]  <userapi-endpoint>/PartnerNotification/getAllHttpNotification

Response:

.. csv-table:: ``GetAllHttpNotificationResponse``
   :header: "Name", "Type"
   :widths: 15, 10

   httpNotifications, List<:ref:`structure-httpNotifications`>

.. _structure-httpNotifications:

.. csv-table:: ``httpNotifications``
   :header: "Name", "Type"
   :widths: 15, 10

   httpNotificationId, integer_
   endpoint, string_
   isActive, bool_

DeleteHttpNotification
----------------------

Delete notification endpoints under a user account (by using the user's API key and token).

::

  [POST]  <userapi-endpoint>/PartnerNotification/DeleteHttpNotification

.. csv-table:: ``DeleteHttpNotificationRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

    httpNotificationIdList, List<integer_>, YES

.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool
.. _guid: https://learn.microsoft.com/en-us/dotnet/api/system.guid?view=netcore-3.1
