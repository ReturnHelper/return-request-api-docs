##################
Notification
##################

Introduction
-------------------------

For information that are not instantly available during an api call, notification callbacks are sent to our clients once the information are ready.
This page explains how notification works.

.. _notification_endpoint:

Notification Endpoint
*********************

It is an endpoint as the notification destination. Return Helper API notify client's system about data update or result of request. It must be setup by Return Helper team. Please contact support@returnhelper.com for support.

Webhooks handling session
*************************

**Handle duplicate events**

Webhook endpoints might occasionally receive the same event more than once.
We advise you to guard against duplicated event receipts by making your event processing idempotent.
One way of doing this is logging the events you’ve processed, and then not processing already-logged events.

**Order of events**

RH does not guarantee delivery of events in the order in which they are generated
For example warehouse receive the parcel and upload images

* :ref:`notification-MarkReceived`
* :ref:`notification-changeLineItemImage`

Your endpoint should not expect delivery of these events in this order and should handle this accordingly. You can also use the API to fetch any missing objects.


Each event also includes ``eventTime``

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

   timestamp, string_ , ISO8601
   signature, string_ , See ``Signature`` section

Signature
*********

This section explains how signature are generated so clients can verify the authenticity and integrity of our notification message.
**Clients should always verify the signature before processing the payload data.**

To understand how signature are generated, consider the notification example below:

::

   Header
   Signature: xxxxx
   Timestamp: 2021-06-16T15:26:27Z

   Body
   HTTP/1.1 200 OK
   Date: Tue, 20 Jul 2021 05:22:11 GMT
   Content-Type: application/json; charset=utf-8
   Transfer-Encoding: chunked
   Connection: close
   timestamp: 2021-07-21T13:58:40.2794872Z
   x-amzn-RequestId: e2f86064-48f0-45ea-af8e-4f3d2882588c
   x-amzn-Remapped-Connection: keep-alive
   x-amz-apigw-id: CwOMeFdvSQ0FRcw=
   x-amzn-Remapped-Server: nginx/1.18.0
   x-amzn-Remapped-Date: Tue, 20 Jul 2021 05:22:11 GMT
   X-Cache: Miss from cloudfront
   Via: 1.1 02d36a84a910749e0e01cf16e7e1a02b.cloudfront.net (CloudFront)
   X-Amz-Cf-Pop: SIN5-C1
   X-Amz-Cf-Id: 7N1ksOia5K-EC4m9VrU3FwK849piH0HKouajMwdHqt0wSOwfLLIbcg==
   signature: ZgQ6fX4p0WL8UhCiueSadjD1Ye1Hw5clL3pekiMir34=
   CF-Cache-Status: DYNAMIC
   Server: cloudflare
   CF-RAY: 6719c0106c5e561a-SIN
   content-length: 468
   alt-svc: h3-27=":443"; ma=86400, h3-28=":443"; ma=86400, h3-29=":443"; ma=86400, h3=":443"; ma=86400

   {"resend":{"resendId":295,"apiId":2,"resendNumber":"RSD210106-0000001","resendStatusCode":1,"description":"rest-client-test-api-flow","remarks":"rest-client-test-api-flow","warehouseRemarks":"stanley-test-12-17","modifyOn":"2021-01-06T03:28:15.3004082Z","modifyBy":"2","createOn":"2021-01-06T03:24:08","createBy":"2"},"trackingNumber":null,"failureReason":"stanley-test-12-17","category":"resend","action":"forceCancelResend","eventTime":"2021-07-21T13:58:40.279329Z"}


Verifying signatures:

1. | **Extracting the Timestamp and Signature from the header**
2. | **Preparing the string_to_sign**
   | The string_to_sign string is created by concatenating:
   |  1. HTTP action (which always be POST)
   |  2. Notification endpoint
   |  3. The timestamp (as a string)
   |  4. The actual JSON payload (aka the request body)
   |     Example: ``POSThttps://callback.free.beeceptor.com2021-07-21T13:58:40.2794872Z{"resend":{"resendId":295,"apiId":2,"resendNumber":"RSD210106-0000001","resendStatusCode":1,"description":"rest-client-test-api-flow","remarks":"rest-client-test-api-flow","warehouseRemarks":"stanley-test-12-17","modifyOn":"2021-01-06T03:28:15.3004082Z","modifyBy":"2","createOn":"2021-01-06T03:24:08","createBy":"2"},"trackingNumber":null,"failureReason":"stanley-test-12-17","category":"resend","action":"forceCancelResend","eventTime":"2021-07-21T13:58:40.279329Z"}``
   |
   |  5. Encode the UTF8 string to Base64
   |     Example: ``UE9TVGh0dHBzOi8vY2FsbGJhY2suZnJlZS5iZWVjZXB0b3IuY29tMjAyMS0wNy0yMVQxMzo1ODo0MC4yNzk0ODcyWnsicmVzZW5kIjp7InJlc2VuZElkIjoyOTUsImFwaUlkIjoyLCJyZXNlbmROdW1iZXIiOiJSU0QyMTAxMDYtMDAwMDAwMSIsInJlc2VuZFN0YXR1c0NvZGUiOjEsImRlc2NyaXB0aW9uIjoicmVzdC1jbGllbnQtdGVzdC1hcGktZmxvdyIsInJlbWFya3MiOiJyZXN0LWNsaWVudC10ZXN0LWFwaS1mbG93Iiwid2FyZWhvdXNlUmVtYXJrcyI6InN0YW5sZXktdGVzdC0xMi0xNyIsIm1vZGlmeU9uIjoiMjAyMS0wMS0wNlQwMzoyODoxNS4zMDA0MDgyWiIsIm1vZGlmeUJ5IjoiMiIsImNyZWF0ZU9uIjoiMjAyMS0wMS0wNlQwMzoyNDowOCIsImNyZWF0ZUJ5IjoiMiJ9LCJ0cmFja2luZ051bWJlciI6bnVsbCwiZmFpbHVyZVJlYXNvbiI6InN0YW5sZXktdGVzdC0xMi0xNyIsImNhdGVnb3J5IjoicmVzZW5kIiwiYWN0aW9uIjoiZm9yY2VDYW5jZWxSZXNlbmQiLCJldmVudFRpbWUiOiIyMDIxLTA3LTIxVDEzOjU4OjQwLjI3OTMyOVoifQ==``
3. | **Computing HMAC with SHA256 hash function**
   |   1. Decode UTF8 string_to_sign to byte array
   |   2. Decode base64 signing key to byte array
   |   3. Generating signature from 1 and 2
   |   4. Convert Signature to Base64
4. | **Compare the signatures**
   | Compare the signature generated from Step 3 with Step 1

A complete java sample is available `HERE <https://gist.github.com/neo-cheung/f8a147307616230fb60e402f0fc8211b>`_

PS:
You should not process a notification with eventTime significantly different (15 minutes)
that the receiving machie’s clock to help prevent replay attacks.

To protect against timing attacks,
use a constant-time string comparison to compare the expected signature.

Body
****

``eventTime`` is in ISO8601 format.

``category`` and ``action`` are two common properties in every notification body.
These are enums that used to identify the notification type which clients can make use of when processing the message.

| List of ``categories``:
| ``rsl`` - returnrequest, shipment, label
| ``lr`` - labelrefund
| ``rrli`` - returnrequestlineitem
| ``rinv`` - returninventory including complete and cancel handling
| ``resend``
| ``sr`` - special request
| ``fbaro`` - fba removal order and shipment
| ``fbai`` - fba inventory
| ``labelGenerated``
| ``rrliv`` - ReturnRequestLineItemVas, returninventory, ReturnRequestLineItemImage
| ``recall``
| ``lineItemVasReturnInventoryLineItem``
| ``transaction``

| List of ``action``:
| ``markShipmentArrive`` ``assignUnknown`` ``userCancelLabel`` ``userAddVas`` ``userChangeHandling`` ``userCreateResend``
| ``completeInventoryHandling`` ``cancelInventoryHandling`` ``createSpecialRequest`` ``markFbaDeliver`` ``receiveFbaInventory``
| ``completeFbaRecall`` ``completeFbaOthers`` ``completeFbaDispose`` ``completeFbaRelabel`` ``assignFbaRelabelFnsku`` ``createFbaRelabelShipment``
| ``completeFbaRelabelRepack`` ``addAddressOnly`` ``addAddressAndLabel`` ``markFbaRelabelShipmentShip`` ``labelGenerated`` ``changeLineItemImage``
| ``vasUpdated`` ``updateResendTrackingNumber`` ``recallUpdateStatus`` ``splitLineItem`` ``forceCancelResend`` ``addTransaction``
List of supported notification
------------------------------

.. _notification-label:

Label result notification
*************************

This notification is sent to client once the label is ready after user called :ref:`method-CreateLabel`.

category: ``labelGenerated``

action: ``labelGenerated``

.. csv-table:: LabelResponse
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/LabelResponse.csv

Sample:

.. code-block:: json
   :emphasize-lines: 12,13

   {
    "label": {
        "correlationId": null,
        "meta": null,
        "labelId": 11345,
        "shipmentId": 10825,
        "apiId": 21,
        "refKey": "S210904-0000202",
        "labelRequestId": 3778,
        "labelRequestStatusCode": "success",
        "serviceType": "usps",
        "trackingNumber": "9201994884299101400710",
        "labelUrl": "https://label-service-dev-files.returnshelper.com/label/202109/3778-S210904-0000202-zn5uhgdezop.pdf",
        "error": null
    },
    "category": "labelGenerated",
    "action": "labelGenerated",
    "eventTime": "2021-09-04T17:03:15.8888073Z"
}

|

This is a label create fail example, please check the highlight area:

.. code-block:: json
   :emphasize-lines: 12-14

   {
    "label": {
        "correlationId": null,
        "meta": null,
        "labelId": 11352,
        "shipmentId": 10833,
        "apiId": 103,
        "refKey": "S210906-0000085",
        "labelRequestId": 3782,
        "labelRequestStatusCode": "fail",
        "serviceType": "ap",
        "trackingNumber": null,
        "labelUrl": null,
        "error": "\"{\\\"errors\\\":[{\\\"code\\\":\\\"400\\\",\\\"name\\\":\\\"Bad Request\\\",\\\"message\\\":\\\"Your combination of suburb, state & postcode doesn't match. Please review and try again.\\\",\\\"field\\\":\\\"shipments[0].from.origin\\\"}]}\""
    },
    "category": "labelGenerated",
    "action": "labelGenerated",
    "eventTime": "2021-09-06T08:16:33.4674332Z"
   }

|

----

.. _notification-Recall:

Recall update status notification
**********************************

This notification is sent to client when the recall status has been updated. For example, tracking number (AWB) update would trigger this notification.

category: ``recall``

action: ``recallUpdateStatus``


.. csv-table:: Recall tracking number (AWB) Notification
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationRecall.csv

List of ``recallUpdateTypeStatus`` values

.. csv-table::
   :header: "Value", "Remarks"
   :widths: 30, 30

   0, recallUpdateTrackingNumber
   1, recallMarkReadyToPickUp
   2, recallPickUpToSelfPickUp
   3, recallPickUpToCourierPickUp
   4, recallPickUpToOthers

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
*********************************

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
*********************************************

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
***********************

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

Change line item image notification
***********************************

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

.. _notification-assignUnknown:

Assign unknown shipment notification
************************************

This notification is sent when a warehouse recognize a shipment (which has no return request record) ownership, and assign to that client.


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationAssignShipment.csv

Sample:

.. code-block:: json

   {
   "ocSequenceNumber": 9,
   "returnRequest": {
      "returnRequestId": 9324,
      "apiId": 21,
      "returnRequestNumber": "UN210708-0000012",
      "returnStatusCode": 0,
      "returnTitle": "tf2021070801",
      "totalValue": 10,
      "totalValueCurrency": "usd",
      "remarks": "Created by Warehouse",
      "warehouseRma": "tf2021070801",
      "isArchived": false,
      "returnRequestSourceType": 0,
      "modifyOn": "2021-07-08T14:30:48",
      "modifyBy": "3",
      "createOn": "2021-07-08T14:30:48",
      "createBy": "3"
   },
   "shipment": {
      "shipmentId": 9265,
      "apiId": 21,
      "returnRequestId": 9324,
      "labelId": 9768,
      "apiTransactionId": 0,
      "warehouseId": 8,
      "shipmentNumber": "UN210708-0000012",
      "shipmentStatusCode": 6,
      "shipmentServiceType": 9,
      "shipmentCountryCode": "fra",
      "shipmentName": "name",
      "shipmentPhone": "phone",
      "shipmentFax": null,
      "shipmentEmail": "email",
      "shipmentStreet1": "street",
      "shipmentStreet2": null,
      "shipmentStreet3": null,
      "shipmentState": "state",
      "shipmentCity": "city",
      "shipmentPostalCode": "code",
      "costCurrencyCode": "usd",
      "cost": 0,
      "boxType": "cus",
      "weight": 10,
      "weightUom": "g",
      "dimension1": 10,
      "dimension2": 10,
      "dimension3": 10,
      "dimensionUom": "cm",
      "isRrLabel": false,
      "receiveDate": "2021-07-08T14:30:48",
      "referenceNumber": null,
      "modifyOn": "2021-07-08T14:30:48",
      "modifyBy": "3",
      "createOn": "2021-07-08T14:30:48",
      "createBy": "3"
   },
   "label": {
      "labelId": 9768,
      "shipmentId": 9265,
      "apiId": 21,
      "refKey": "UN210708-0000012",
      "labelRequestId": 0,
      "labelRequestStatusCode": 3,
      "serviceType": "unkwn",
      "trackingNumber": "tf2021070801",
      "labelUrl": "N/A",
      "error": null,
      "fromCountryCode": "fra",
      "fromName": "name",
      "fromPhone": "phone",
      "fromFax": null,
      "fromEmail": "email",
      "fromStreet1": "street",
      "fromStreet2": null,
      "fromStreet3": null,
      "fromState": "state",
      "fromCity": "city",
      "fromPostalCode": "code",
      "toCountryCode": "fra",
      "toName": "name",
      "toPhone": "phone",
      "toFax": null,
      "toEmail": "email",
      "toStreet1": "street",
      "toStreet2": null,
      "toStreet3": null,
      "toState": "state",
      "toCity": "city",
      "toPostalCode": "code",
      "toCompany": null,
      "fromCompany": null,
      "carrier": null,
      "referenceNumber": null
   },
   "shipmentSupplement": {
      "shipmentSupplementId": 3294,
      "shipmentId": 9265,
      "actualWeight": 10,
      "actualWeightUom": "g",
      "actualDimension1": 10,
      "actualDimension2": 10,
      "actualDimension3": 10,
      "actualDimensionUom": "cm",
      "modifyOn": "2021-07-08T14:30:48",
      "modifyBy": "3",
      "createOn": "2021-07-08T14:30:48",
      "createBy": "3"
   },
   "returnInventoryList": [
      {
         "returnInventoryId": 3929,
         "warehouseId": 8,
         "returnRequestLineItemId": 10866,
         "apiId": 21,
         "returnRequestId": 9324,
         "returnRequestLineItemNumber": "UNL210708-0000017",
         "description": "tf2021070801",
         "quantity": 1,
         "weight": 10,
         "weightUom": "g",
         "valueCurrencyCode": "usd",
         "value": 10,
         "handlingCode": 0,
         "handlingStatusCode": 0,
         "completeBy": null,
         "completeOn": null,
         "warehouseRemarks": null,
         "handlingUpdatedOn": null,
         "stopAgingOn": null,
         "sku": null,
         "itemRma": "tf2021070801",
         "modifyOn": "2021-07-08T14:30:48",
         "modifyBy": "3",
         "createOn": "2021-07-08T14:30:48",
         "createBy": "3"
      }
   ],
   "returnRequestLineItemIncludeImageList": [
      {
         "imageUrlList": [],
         "returnRequestLineItem": {
         "returnRequestLineItemId": 10866,
         "apiId": 21,
         "returnRequestId": 9324,
         "returnRequestLineItemNumber": "UNL210708-0000017",
         "description": "tf2021070801",
         "quantity": 1,
         "weight": 10,
         "weightUom": "g",
         "valueCurrencyCode": "usd",
         "value": 10,
         "handlingCode": 0,
         "isDeleted": false,
         "itemRma": "tf2021070801"
         }
      }
   ],
   "category": "rsl",
   "action": "assignUnknown",
   "eventTime": "2021-07-08T14:30:48.6330846Z"
   }

.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool