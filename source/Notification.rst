##################
Notification
##################

Introduction
-------------------------

For information that are not instantly available during an api call, notification callbacks are sent back to our clients once the information are ready.
This page explains how notification works.

Endpoint
********

Clients need to provide an endpoint as the notification destination when you setup an account. If you need help please contact us.

Signing Key
***********

Each client has a unique signing key which we provide on account setup. This key is used to sign the notification and generate a signature (Details please check below).
Please store your key securely and never share to others.

Retry
*****

Only notification that are sent and response with a ``HTTP 200`` are considered as completed. Otherwise the notification is consider failed and it would be retied up to 10 times.

Header
******

Notification header contains a timestamp and a signature.

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 40

   timestamp, string_ , UTC now (ISO8601)
   signature, string_ , See ``Signature`` section

Signature
*********

This section explains how signature are generated so clients can verify the authenticity and integrity of our notification message.
**Clients should always verify the signature before processing the payload data.**

To understand how signature are generated, consider the notification example below:

.. code-block:: html

  Action: POST
  Endpoint: https://www.google.com
  Timestamp: 2021-06-16T15:26:27Z
  Payload: {"a": "b"}

Signature are generate as:

1. | **Concat a string for sign as: *Action+Notification endpoint+Timestamp+Payload*.**
   | Example: ``POSThttps://www.google.com2021-06-16T15:26:27Z{"a":"b"}``
2. | **Getbytes by UTF-8 encoding, then convert to a Base64 string.**
   | Example: ``UE9TVGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20yMDIxLTA2LTE2VDE1OjI2OjI3WiJ7XCJhXCI6XCJiXCJ9Ig==``
3. | **Getbytes by UTF-8 encoding with the above result string.**
4. | **Decode signing key as a Base64 string, which gives a byte array**
5. | **Sign the byte array in step 3 with the byte array in step 4 as signing key.**
6. | **Convert the result byte to Base64 string with UTF-8 encoding, which gives the signature string**
   | Example: ``CKdaJK2mYpZgchBzBZ4U+j9qKfhhGS+r5JeO13jx/z8=``

A complete java sample is available `HERE <https://gist.github.com/neo-cheung/f8a147307616230fb60e402f0fc8211b>`_

Body
****

``category`` and ``action`` are two common properties in every notification body.
These are enums that used to identify the notification type which clients can make use of when processing the message.

Below listed our supported notification types, data structure and samples.

.. _notification-label:

Label Result Notification
-------------------------

This notification is sent to client once the label is ready after user called :ref:`method-CreateLabel`.

category: ``labelGenerated``

action: ``labelGenerated``

.. csv-table:: Label Result Notification
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationGenLabel.csv

Sample:

.. code-block:: json

  {
   "statusDto":{
      "label":{
         "labelId":3989,
         "shipmentId":3409,
         "apiId":103,
         "refKey":"S200820-0000005",
         "labelRequestId":1928,
         "labelRequestStatusCode":3,
         "serviceType":"sdhl",
         "trackingNumber":"00340434295132842028",
         "labelUrl":"https://label-service-dev-files.returnshelper.com/label/202008/1928-S200820-0000005-42vh2m0hqhr.pdf",
         "error":null,
         "fromCountryCode":"deu",
         "fromName":"Bach",
         "fromPhone":"01768790672",
         "fromFax":null,
         "fromEmail":"test@test.com",
         "fromStreet1":"Schrotteringksweg 16",
         "fromStreet2":"ST2",
         "fromStreet3":null,
         "fromState":"Hamburg",
         "fromCity":"Uhlenhorst",
         "fromPostalCode":"80331",
         "toCountryCode":"deu",
         "toName":"OC",
         "toPhone":"015219209991",
         "toFax":null,
         "toEmail":"test@test.com",
         "toStreet1":"Voltmerstr.",
         "toStreet2":"73C",
         "toStreet3":null,
         "toState":"Hannover",
         "toCity":"Hannover",
         "toPostalCode":"30165",
         "toCompany":"EBS GmbH returned",
         "fromCompany":"Return Helper Service",
         "carrier":null
      },
      "shipment":{
         "shipmentId":3409,
         "apiId":103,
         "returnRequestId":3350,
         "labelId":3989,
         "apiTransactionId":0,
         "warehouseId":1,
         "shipmentNumber":"S200820-0000005",
         "shipmentStatusCode":2,
         "shipmentServiceType":8,
         "shipmentCountryCode":"deu",
         "shipmentName":"Bach",
         "shipmentPhone":"01768790672",
         "shipmentFax":null,
         "shipmentEmail":"test@test.com",
         "shipmentStreet1":"Schrotteringksweg 16",
         "shipmentStreet2":"ST2",
         "shipmentStreet3":null,
         "shipmentState":"Hamburg",
         "shipmentCity":"Uhlenhorst",
         "shipmentPostalCode":"80331",
         "costCurrencyCode":"usd",
         "cost":7.090,
         "boxType":"cus",
         "weight":129.900,
         "weightUom":"g",
         "dimension1":19.400,
         "dimension2":20.000,
         "dimension3":17.900,
         "dimensionUom":"cm",
         "isRrLabel":true,
         "receiveDate":null,
         "modifyOn":"2020-08-20T16:15:22",
         "modifyBy":"103",
         "createOn":"2020-08-20T16:15:10",
         "createBy":"103"
      },
      "returnRequest":{
         "returnRequestId":3350,
         "apiId":103,
         "returnRequestNumber":"R200820-0000001",
         "returnStatusCode":3,
         "returnTitle":"parcel description",
         "totalValue":90.190,
         "totalValueCurrency":"usd",
         "remarks":"",
         "warehouseRma":null,
         "isArchived":false,
         "returnRequestSourceType":0,
         "modifyOn":"2020-08-20T16:15:22",
         "modifyBy":"103",
         "createOn":"2020-08-20T16:15:10",
         "createBy":"103"
      },
      "updateLabelResult":{
         "Item1":false,
         "Item2":{
            "labelId":3989,
            "shipmentId":3409,
            "apiId":103,
            "refKey":"S200820-0000005",
            "labelRequestId":1928,
            "labelRequestStatusCode":3,
            "serviceType":"sdhl",
            "trackingNumber":"00340434295132842028",
            "labelUrl":"https://label-service-dev-files.returnshelper.com/label/202008/1928-S200820-0000005-42vh2m0hqhr.pdf",
            "error":null,
            "fromCountryCode":"deu",
            "fromName":"Bach",
            "fromPhone":"01768790672",
            "fromFax":null,
            "fromEmail":"test@test.com",
            "fromStreet1":"Schrotteringksweg 16",
            "fromStreet2":"ST2",
            "fromStreet3":null,
            "fromState":"Hamburg",
            "fromCity":"Uhlenhorst",
            "fromPostalCode":"80331",
            "toCountryCode":"deu",
            "toName":"OC",
            "toPhone":"015219209991",
            "toFax":null,
            "toEmail":"test@test.com",
            "toStreet1":"Voltmerstr.",
            "toStreet2":"73C",
            "toStreet3":null,
            "toState":"Hannover",
            "toCity":"Hannover",
            "toPostalCode":"30165",
            "toCompany":"EBS GmbH returned",
            "fromCompany":"Return Helper Service",
            "carrier":null
         },
         "Item3":null
      },
      "updateShipmentResult":{
         "Item1":false,
         "Item2":null,
         "Item3":null
      },
      "updateReturnRequestResult":{
         "Item1":false,
         "Item2":null,
         "Item3":null
      }
   },
   "category":"labelGenerated",
   "action":"labelGenerated",
   "eventTime":"2021-01-06T05:46:00.4884171Z"
   }

|

----

.. _notification-Recall:

Recall tracking number (AWB) Notification
-----------------------------------------

This notification is sent to client when the recall tracking AWB has been updated.

category: ``recall``

action: ``recallUpdateStatus``


.. csv-table:: Recall tracking number (AWB) Notification
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationRecall.csv

|

Sample:

.. code-block:: json

   {
      "recallList":[
         {
            "recallId":244,
            "apiId":2,
            "warehouseId":1,
            "recallNumber":"RCL210106-0000001",
            "recallStatusCode":1,
            "warehouseRemarks":null,
            "modifyOn":"2021-01-06T05:53:50.7694318Z",
            "modifyBy":"3",
            "createOn":"2021-01-06T05:53:45",
            "createBy":"2"
         }
      ],
      "rma":"72c9c00d-7bab-46b0-8220-c0a544bdb5db",
      "awb":"903b4999-4f65-4ac9-8b8f-e3419f3dfc51",
      "pickUpDate":null,
      "courierTrackingNumber":"",
      "remarks":"",
      "weight":0.0,
      "amount":0.0,
      "listName":"",
      "recallUpdateTypeStatus":0,
      "serviceType":"dhl",
      "category":"recall",
      "action":"recallUpdateStatus",
      "eventTime":"2021-01-06T05:53:51.6256487Z"
   }

|


----

.. _notification-Resend:

Resend Tracking Number Notification
-----------------------------------

This notification is sent to client when the resend tracking number has been update.

category: ``resend``

action": ``updateResendTrackingNumber``


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationResend.csv

Sample:

.. code-block:: json

   {
      "resend":{
         "resendId":296,
         "apiId":2,
         "resendNumber":"RSD210106-0000002",
         "resendStatusCode":3,
         "description":"rest-client-test-api-flow",
         "remarks":"rest-client-test-api-flow",
         "warehouseRemarks":null,
         "modifyOn":"2021-01-06T03:34:57",
         "modifyBy":"3",
         "createOn":"2021-01-06T03:34:50",
         "createBy":"2"
      },
      "returnInventoryList":null,
      "resendShipmentList":[
         {
            "resendShipmentId":292,
            "apiId":2,
            "resendId":296,
            "warehouseId":1,
            "resendShipmentNumber":"RSDS210106-0000002",
            "shipmentServiceType":8,
            "shipmentCountryCode":"deu",
            "shipmentName":"Stanley",
            "shipmentPhone":"1234567890",
            "shipmentFax":null,
            "shipmentEmail":"test@test.com",
            "shipmentStreet1":"Paris",
            "shipmentStreet2":"Paris",
            "shipmentStreet3":"Paris",
            "shipmentState":"Paris",
            "shipmentCity":"Paris",
            "shipmentPostalCode":"99999",
            "trackingNumber":"test-test-2021-01-04",
            "modifyOn":"2021-01-06T03:34:51",
            "modifyBy":"2",
            "createOn":"2021-01-06T03:34:51",
            "createBy":"2"
         }
      ],
      "category":"resend",
      "action":"updateResendTrackingNumber",
      "eventTime":"2021-01-06T03:35:02.6958984Z"
   }


|


----


.. _notification-MarkReceived:

Warehouse Mark Shipment Received Notification
---------------------------------------------

This notification is sent when warehouse receive a shipment.

category: ``rsl``

action: ``markShipmentArrive``


Sample:

.. code-block:: json

   {
   "returnRequest":{
      "returnRequestId":5514,
      "apiId":2,
      "returnRequestNumber":"R210106-0000008",
      "returnStatusCode":0,
      "returnTitle":"1840427529019",
      "totalValue":100.000,
      "totalValueCurrency":"usd",
      "remarks":null,
      "warehouseRma":"26c49bcf-e9f8-4974-a340-c54cf8ed74d0",
      "isArchived":false,
      "returnRequestSourceType":1,
      "modifyOn":"2021-01-06T06:11:20.595572Z",
      "modifyBy":"2",
      "createOn":"2021-01-06T06:11:10",
      "createBy":"2"
   },
   "shipment":{
      "shipmentId":5572,
      "apiId":2,
      "returnRequestId":5514,
      "labelId":6099,
      "apiTransactionId":0,
      "warehouseId":1,
      "shipmentNumber":"S210106-0000018",
      "shipmentStatusCode":6,
      "shipmentServiceType":10,
      "shipmentCountryCode":"esp",
      "shipmentName":"Francisco Jose Rodriguez Elias",
      "shipmentPhone":"656834261",
      "shipmentFax":null,
      "shipmentEmail":"test@test.com",
      "shipmentStreet1":"AV/ Doctor Sanchez Malo  Bloque3",
      "shipmentStreet2":"2planta derecha",
      "shipmentStreet3":null,
      "shipmentState":"Andalucía",
      "shipmentCity":"Ecija",
      "shipmentPostalCode":"41400",
      "costCurrencyCode":"usd",
      "cost":0.000,
      "boxType":"cus",
      "weight":700.000,
      "weightUom":"g",
      "dimension1":22.000,
      "dimension2":15.000,
      "dimension3":5.000,
      "dimensionUom":"cm",
      "isRrLabel":false,
      "receiveDate":"2021-01-06T06:11:20.5965368Z",
      "modifyOn":"2021-01-06T06:11:20.5965521Z",
      "modifyBy":"2",
      "createOn":"2021-01-06T06:11:11",
      "createBy":"2"
   },
   "label":{
      "labelId":6099,
      "shipmentId":5572,
      "apiId":2,
      "refKey":"674282f9-3932-46f9-ac47-ee7ea84e539f",
      "labelRequestId":0,
      "labelRequestStatusCode":3,
      "serviceType":"nrhl",
      "trackingNumber":"A123",
      "labelUrl":null,
      "error":null,
      "fromCountryCode":"esp",
      "fromName":"Francisco Jose Rodriguez Elias",
      "fromPhone":null,
      "fromFax":null,
      "fromEmail":null,
      "fromStreet1":"AV/ Doctor Sanchez Malo  Bloque3",
      "fromStreet2":null,
      "fromStreet3":null,
      "fromState":null,
      "fromCity":null,
      "fromPostalCode":null,
      "toCountryCode":"esp",
      "toName":"Francisco Jose Rodriguez Elias",
      "toPhone":null,
      "toFax":null,
      "toEmail":null,
      "toStreet1":"AV/ Doctor Sanchez Malo  Bloque3",
      "toStreet2":null,
      "toStreet3":null,
      "toState":null,
      "toCity":null,
      "toPostalCode":null,
      "toCompany":null,
      "fromCompany":null,
      "carrier":""
   },
   "lineItems":[
      {
         "returnRequestLineItemId":6914,
         "apiId":2,
         "returnRequestId":5514,
         "returnRequestLineItemNumber":"RL210106-0000020",
         "description":"Nuevo Apple iPad Mini 5 256GB Wifi - Space Grey Gris espacial",
         "quantity":1,
         "weight":100.000,
         "weightUom":"g",
         "valueCurrencyCode":"usd",
         "value":463.000,
         "handlingCode":0,
         "isDeleted":false,
         "itemRma":"26c49bcf-e9f8-4974-a340-c54cf8ed74d0"
      }
   ],
   "sequenceNumber":0,
   "category":"rsl",
   "action":"markShipmentArrive",
   "eventTime":"2021-01-06T06:11:23.21237Z"
   }


|


----



.. _notification-UpdateVas:

VAS Update Notification
-----------------------

This notification is sent when VAS has an update (such as complete).

category: ``rrliv``

action: ``vasUpdated``


Sample:

.. code-block:: json

   {
      "returnRequestLineItemId":6909,
      "returnRequestLineItemVasList":[
         {
            "returnRequestLineItemVasId":1400,
            "apiId":2,
            "returnRequestLineItemId":6909,
            "vasCode":3,
            "metaQuantity":0,
            "vasResult":"apiTestResult1",
            "notes":"product inspection",
            "vasStatusCode":1,
            "modifyOn":"2021-01-06T05:45:08",
            "modifyBy":"3",
            "createOn":"2021-01-06T05:45:08",
            "createBy":"2"
         }
      ],
      "updateLineItemVasRequestList":[
         {
            "returnRequestLineItemVasId":1400,
            "vasResult":"apiTestResult1",
            "returnRequestLineItemImageIdList":null,
            "vasStatusCode":"successful"
         }
      ],
      "category":"rrliv",
      "action":"vasUpdated",
      "eventTime":"2021-01-06T05:46:00.4884171Z"
   }

|


----


.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool