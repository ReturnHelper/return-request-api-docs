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

Label result notification
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
            "labelId":9677,
            "shipmentId":9167,
            "apiId":21,
            "refKey":"S210706-0000010",
            "labelRequestId":3493,
            "labelRequestStatusCode":2,
            "serviceType":"rm",
            "trackingNumber":null,
            "labelUrl":null,
            "error":null,
            "fromCountryCode":"gbr",
            "fromName":"United Kingdom",
            "fromPhone":"7775556531",
            "fromFax":null,
            "fromEmail":"test@returnhelper.com",
            "fromStreet1":"501 Metroplex Business Park",
            "fromStreet2":"1",
            "fromStreet3":"12",
            "fromState":"22",
            "fromCity":"gbr",
            "fromPostalCode":"M8 8HF",
            "toCountryCode":"gbr",
            "toName":"RH21",
            "toPhone":"7775556531",
            "toFax":"7775556531",
            "toEmail":null,
            "toStreet1":"Unit 8C Commerce House",
            "toStreet2":"54 Derby Street",
            "toStreet3":null,
            "toState":"Lancashire",
            "toCity":"Manchester",
            "toPostalCode":"M8 8HF",
            "toCompany":"OC Return Center",
            "fromCompany":"OC Return Center",
            "carrier":null,
            "referenceNumber":null
         },
         "shipment":{
            "shipmentId":9167,
            "apiId":21,
            "returnRequestId":9226,
            "labelId":9677,
            "apiTransactionId":0,
            "warehouseId":1002,
            "shipmentNumber":"S210706-0000010",
            "shipmentStatusCode":4,
            "shipmentServiceType":3,
            "shipmentCountryCode":"gbr",
            "shipmentName":"United Kingdom",
            "shipmentPhone":"7775556531",
            "shipmentFax":null,
            "shipmentEmail":"test@returnhelper.com",
            "shipmentStreet1":"501 Metroplex Business Park",
            "shipmentStreet2":"1",
            "shipmentStreet3":"12",
            "shipmentState":"22",
            "shipmentCity":"gbr",
            "shipmentPostalCode":"M8 8HF",
            "costCurrencyCode":"usd",
            "cost":6.25,
            "boxType":"cus",
            "weight":1.0,
            "weightUom":"g",
            "dimension1":1.0,
            "dimension2":1.0,
            "dimension3":1.0,
            "dimensionUom":"cm",
            "isRrLabel":true,
            "receiveDate":null,
            "referenceNumber":null,
            "modifyOn":"2021-07-06T10:42:50.0441261Z",
            "modifyBy":"21",
            "createOn":"2021-07-06T10:42:49",
            "createBy":"21"
         },
         "returnRequest":{
            "returnRequestId":9226,
            "apiId":21,
            "returnRequestNumber":"test20210706",
            "returnStatusCode":4,
            "returnTitle":"test20210706",
            "totalValue":1.0,
            "totalValueCurrency":"usd",
            "remarks":"test20210706",
            "warehouseRma":null,
            "isArchived":false,
            "returnRequestSourceType":0,
            "modifyOn":"2021-07-06T10:42:49",
            "modifyBy":"21",
            "createOn":"2021-07-06T10:42:49",
            "createBy":"21"
         },
         "updateLabelResult":{
            "Item1":true,
            "Item2":{
               "labelId":9677,
               "shipmentId":9167,
               "apiId":21,
               "refKey":"S210706-0000010",
               "labelRequestId":3493,
               "labelRequestStatusCode":1,
               "serviceType":"rm",
               "trackingNumber":null,
               "labelUrl":null,
               "error":null,
               "fromCountryCode":"gbr",
               "fromName":"United Kingdom",
               "fromPhone":"7775556531",
               "fromFax":null,
               "fromEmail":"test@returnhelper.com",
               "fromStreet1":"501 Metroplex Business Park",
               "fromStreet2":"1",
               "fromStreet3":"12",
               "fromState":"22",
               "fromCity":"gbr",
               "fromPostalCode":"M8 8HF",
               "toCountryCode":"gbr",
               "toName":"RH21",
               "toPhone":"7775556531",
               "toFax":"7775556531",
               "toEmail":null,
               "toStreet1":"Unit 8C Commerce House",
               "toStreet2":"54 Derby Street",
               "toStreet3":null,
               "toState":"Lancashire",
               "toCity":"Manchester",
               "toPostalCode":"M8 8HF",
               "toCompany":"OC Return Center",
               "fromCompany":"OC Return Center",
               "carrier":null,
               "referenceNumber":null
            },
            "Item3":{
               "labelId":9677,
               "shipmentId":9167,
               "apiId":21,
               "refKey":"S210706-0000010",
               "labelRequestId":3493,
               "labelRequestStatusCode":2,
               "serviceType":"rm",
               "trackingNumber":null,
               "labelUrl":null,
               "error":null,
               "fromCountryCode":"gbr",
               "fromName":"United Kingdom",
               "fromPhone":"7775556531",
               "fromFax":null,
               "fromEmail":"test@returnhelper.com",
               "fromStreet1":"501 Metroplex Business Park",
               "fromStreet2":"1",
               "fromStreet3":"12",
               "fromState":"22",
               "fromCity":"gbr",
               "fromPostalCode":"M8 8HF",
               "toCountryCode":"gbr",
               "toName":"RH21",
               "toPhone":"7775556531",
               "toFax":"7775556531",
               "toEmail":null,
               "toStreet1":"Unit 8C Commerce House",
               "toStreet2":"54 Derby Street",
               "toStreet3":null,
               "toState":"Lancashire",
               "toCity":"Manchester",
               "toPostalCode":"M8 8HF",
               "toCompany":"OC Return Center",
               "fromCompany":"OC Return Center",
               "carrier":null,
               "referenceNumber":null
            }
         },
         "updateShipmentResult":{
            "Item1":true,
            "Item2":{
               "shipmentId":9167,
               "apiId":21,
               "returnRequestId":9226,
               "labelId":9677,
               "apiTransactionId":0,
               "warehouseId":1002,
               "shipmentNumber":"S210706-0000010",
               "shipmentStatusCode":3,
               "shipmentServiceType":3,
               "shipmentCountryCode":"gbr",
               "shipmentName":"United Kingdom",
               "shipmentPhone":"7775556531",
               "shipmentFax":null,
               "shipmentEmail":"test@returnhelper.com",
               "shipmentStreet1":"501 Metroplex Business Park",
               "shipmentStreet2":"1",
               "shipmentStreet3":"12",
               "shipmentState":"22",
               "shipmentCity":"gbr",
               "shipmentPostalCode":"M8 8HF",
               "costCurrencyCode":"usd",
               "cost":6.25,
               "boxType":"cus",
               "weight":1.0,
               "weightUom":"g",
               "dimension1":1.0,
               "dimension2":1.0,
               "dimension3":1.0,
               "dimensionUom":"cm",
               "isRrLabel":true,
               "receiveDate":null,
               "referenceNumber":null,
               "modifyOn":"2021-07-06T10:42:50",
               "modifyBy":"21",
               "createOn":"2021-07-06T10:42:49",
               "createBy":"21"
            },
            "Item3":{
               "shipmentId":9167,
               "apiId":21,
               "returnRequestId":9226,
               "labelId":9677,
               "apiTransactionId":0,
               "warehouseId":1002,
               "shipmentNumber":"S210706-0000010",
               "shipmentStatusCode":4,
               "shipmentServiceType":3,
               "shipmentCountryCode":"gbr",
               "shipmentName":"United Kingdom",
               "shipmentPhone":"7775556531",
               "shipmentFax":null,
               "shipmentEmail":"test@returnhelper.com",
               "shipmentStreet1":"501 Metroplex Business Park",
               "shipmentStreet2":"1",
               "shipmentStreet3":"12",
               "shipmentState":"22",
               "shipmentCity":"gbr",
               "shipmentPostalCode":"M8 8HF",
               "costCurrencyCode":"usd",
               "cost":6.25,
               "boxType":"cus",
               "weight":1.0,
               "weightUom":"g",
               "dimension1":1.0,
               "dimension2":1.0,
               "dimension3":1.0,
               "dimensionUom":"cm",
               "isRrLabel":true,
               "receiveDate":null,
               "referenceNumber":null,
               "modifyOn":"2021-07-06T10:42:50.0441261Z",
               "modifyBy":"21",
               "createOn":"2021-07-06T10:42:49",
               "createBy":"21"
            }
         },
         "updateReturnRequestResult":{
            "Item1":false,
            "Item2":{
               "returnRequestId":9226,
               "apiId":21,
               "returnRequestNumber":"test20210706",
               "returnStatusCode":4,
               "returnTitle":"test20210706",
               "totalValue":1.0,
               "totalValueCurrency":"usd",
               "remarks":"test20210706",
               "warehouseRma":null,
               "isArchived":false,
               "returnRequestSourceType":0,
               "modifyOn":"2021-07-06T10:42:49",
               "modifyBy":"21",
               "createOn":"2021-07-06T10:42:49",
               "createBy":"21"
            },
            "Item3":null
         }
      },
      "category":"labelGenerated",
      "action":"labelGenerated",
      "eventTime":"2021-07-06T10:42:50.2103062Z"
   }


|

----

.. _notification-Recall:

Recall update status notification
-----------------------------------------

This notification is sent to client when the recall status has been updated. For example, tracking number (AWB) update would trigger this notification.

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
      "recall":{
         "recallId":338,
         "apiId":21,
         "warehouseId":1,
         "recallNumber":"RCL210706-0000005",
         "recallStatusCode":1,
         "warehouseRemarks":null,
         "modifyOn":"2021-07-06T11:38:11.2299216Z",
         "modifyBy":"3",
         "createOn":"2021-07-06T11:38:06",
         "createBy":"21"
      },
      "trackingNumber":"cb56c221-6cfd-4977-8b29-a0705748fa1c",
      "recallUpdateTypeStatus":0,
      "category":"recall",
      "action":"recallUpdateStatus",
      "eventTime":"2021-07-06T11:38:11.4138518Z"
   }

|


----

.. _notification-Resend:

Resend update status notification
-----------------------------------

This notification is sent to client when the resend status has been update. For example, a tracking number update would trigger this notification.

category: ``resend``

action: ``updateResendTrackingNumber``


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationResend.csv

Sample:

.. code-block:: json

   {
      "resend":{
         "resendId":327,
         "apiId":21,
         "resendNumber":"RSD210706-0000005",
         "resendStatusCode":3,
         "description":"rest-client-test-api-flow",
         "remarks":"rest-client-test-api-flow",
         "warehouseRemarks":null,
         "modifyOn":"2021-07-06T11:22:04",
         "modifyBy":"3",
         "createOn":"2021-07-06T11:21:53",
         "createBy":"21"
      },
      "trackingNumber":"test-2021-07-06",
      "failureReason":null,
      "category":"resend",
      "action":"updateResendTrackingNumber",
      "eventTime":"2021-07-06T11:22:16.7014287Z"
   }

|


----


.. _notification-MarkReceived:

Warehouse mark shipment received notification
---------------------------------------------

This notification is sent when warehouse receive a shipment.

category: ``rsl``

action: ``markShipmentArrive``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationMarkReceived.csv


Sample:

.. code-block:: json

   {
      "shipmentSupplement":{
         "shipmentSupplementId":3263,
         "shipmentId":9178,
         "actualWeight":500.0,
         "actualWeightUom":"g",
         "actualDimension1":10.0,
         "actualDimension2":20.0,
         "actualDimension3":30.0,
         "actualDimensionUom":"cm",
         "modifyOn":"2021-07-06T12:43:36",
         "modifyBy":"3",
         "createOn":"2021-07-06T12:43:36",
         "createBy":"3"
      },
      "returnInventoryList":[
         {
            "returnInventoryId":3880,
            "warehouseId":1,
            "returnRequestLineItemId":10759,
            "apiId":21,
            "returnRequestId":9237,
            "returnRequestLineItemNumber":"RL210706-0000020",
            "description":"Nuevo Apple iPad Mini 5 256GB Wifi - Space Grey Gris espacial",
            "quantity":1,
            "weight":100.0,
            "weightUom":"g",
            "valueCurrencyCode":"usd",
            "value":463.0,
            "handlingCode":0,
            "handlingStatusCode":0,
            "completeBy":null,
            "completeOn":null,
            "warehouseRemarks":null,
            "handlingUpdatedOn":"2021-07-06T12:43:36",
            "stopAgingOn":null,
            "sku":null,
            "itemRma":"068343c0-1d42-40fc-8890-6fcb381121db",
            "modifyOn":"2021-07-06T12:43:36",
            "modifyBy":"3",
            "createOn":"2021-07-06T12:43:36",
            "createBy":"3"
         }
      ],
      "returnRequest":{
         "returnRequestId":9237,
         "apiId":21,
         "returnRequestNumber":"R210706-0000010",
         "returnStatusCode":0,
         "returnTitle":"1840427529019",
         "totalValue":100.0,
         "totalValueCurrency":"usd",
         "remarks":null,
         "warehouseRma":"068343c0-1d42-40fc-8890-6fcb381121db",
         "isArchived":false,
         "returnRequestSourceType":1,
         "modifyOn":"2021-07-06T12:43:36.4195363Z",
         "modifyBy":"21",
         "createOn":"2021-07-06T12:43:32",
         "createBy":"21"
      },
      "shipment":{
         "shipmentId":9178,
         "apiId":21,
         "returnRequestId":9237,
         "labelId":9688,
         "apiTransactionId":0,
         "warehouseId":1,
         "shipmentNumber":"S210706-0000020",
         "shipmentStatusCode":6,
         "shipmentServiceType":10,
         "shipmentCountryCode":"esp",
         "shipmentName":"Francisco Jose Rodriguez Elias",
         "shipmentPhone":"656834261",
         "shipmentFax":null,
         "shipmentEmail":"pacopepe-1983@hotmail.com",
         "shipmentStreet1":"AV/ Doctor Sanchez Malo  Bloque3",
         "shipmentStreet2":"2planta derecha",
         "shipmentStreet3":null,
         "shipmentState":"Andalucía",
         "shipmentCity":"Ecija",
         "shipmentPostalCode":"41400",
         "costCurrencyCode":"usd",
         "cost":0.0,
         "boxType":"cus",
         "weight":700.0,
         "weightUom":"g",
         "dimension1":22.0,
         "dimension2":15.0,
         "dimension3":5.0,
         "dimensionUom":"cm",
         "isRrLabel":false,
         "receiveDate":"2021-07-06T12:43:36.4196378Z",
         "referenceNumber":null,
         "modifyOn":"2021-07-06T12:43:36.4196819Z",
         "modifyBy":"21",
         "createOn":"2021-07-06T12:43:32",
         "createBy":"21"
      },
      "label":{
         "labelId":9688,
         "shipmentId":9178,
         "apiId":21,
         "refKey":"1f0eba25-a1ba-4a68-af27-f040f085e854",
         "labelRequestId":0,
         "labelRequestStatusCode":3,
         "serviceType":"nrhl",
         "trackingNumber":"TEST2021070621",
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
         "carrier":"",
         "referenceNumber":null
      },
      "lineItems":[
         {
            "returnRequestLineItemId":10759,
            "apiId":21,
            "returnRequestId":9237,
            "returnRequestLineItemNumber":"RL210706-0000020",
            "description":"Nuevo Apple iPad Mini 5 256GB Wifi - Space Grey Gris espacial",
            "quantity":1,
            "weight":100.0,
            "weightUom":"g",
            "valueCurrencyCode":"usd",
            "value":463.0,
            "handlingCode":0,
            "isDeleted":false,
            "itemRma":"068343c0-1d42-40fc-8890-6fcb381121db"
         }
      ],
      "sequenceNumber":0,
      "category":"rsl",
      "action":"markShipmentArrive",
      "eventTime":"2021-07-06T12:43:36.6803393Z"
      }

|


----



.. _notification-UpdateVas:

VAS update notification
-----------------------

This notification is sent when VAS has an update (such as VAS complete).

category: ``rrliv``

action: ``vasUpdated``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationVASUpdate.csv


Sample:

.. code-block:: json

   {
   "updateVasList":[
      {
         "returnRequestLineItemVasId":1468,
         "vasResult":"apiTestResult1",
         "weight":500.0,
         "weightUom":"g",
         "dimension1":10.0,
         "dimension2":20.0,
         "dimension3":30.0,
         "dimensionUom":"cm",
         "vasStatusCode":1,
         "imageUrlList":null
      }
   ],
   "category":"rrliv",
   "action":"vasUpdated",
   "eventTime":"2021-07-06T12:15:55.9038524Z"
   }

|



.. _notification-changeLineItemImage:

Change Line Item Image Notification
-----------------------------------

This notification is sent when there is an image update on a line item. Adding, modifying and deleting any images are all considered as an update and would trigger this notification.

category: ``rrli``

action: ``changeLineItemImage``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationChangeLineItemImage.csv

Sample:

.. code-block:: json

      {
      "imageUrlList":[
         "https://rr-dev-files.returnshelper.com/images/returns/202107/3_Screenshot_60_yiuzghxg.hgb.png"
      ],
      "returnRequestLineItem":{
         "returnRequestLineItemId":10759,
         "apiId":21,
         "returnRequestId":9237,
         "returnRequestLineItemNumber":"RL210706-0000020",
         "description":"Nuevo Apple iPad Mini 5 256GB Wifi - Space Grey Gris espacial",
         "quantity":1,
         "weight":100.0,
         "weightUom":"g",
         "valueCurrencyCode":"usd",
         "value":463.0,
         "handlingCode":0,
         "isDeleted":false,
         "itemRma":"068343c0-1d42-40fc-8890-6fcb381121db"
      },
      "category":"rrli",
      "action":"changeLineItemImage",
      "eventTime":"2021-07-06T13:02:24.5575164Z"
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