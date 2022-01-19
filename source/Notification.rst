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

It is an endpoint as the notification destination. Return Helper API notifies client's system about data update or result of request. It must be setup by Return Helper team. Please contact support@returnhelper.com for support.

Webhooks handling session
*************************

**Handle duplicate events**

Webhook endpoints might occasionally receive the same event more than once.
We advise you to guard against duplicated event receipts by making your event processing idempotent.
One way of doing this is logging the events you’ve processed, and then not processing already-logged events.

**Order of events**

RH does not guarantee delivery of events in the order in which they are generated.
For example warehouse receive the parcel and upload images

* :ref:`notification-MarkReceived`
* :ref:`notification-changeLineItemImage`

Your endpoint should not expect delivery of these events in this order and should handle it accordingly. You can also use the API to fetch any missing objects.


Each event also includes ``eventTime``

Signing Key
***********

Each client has an unique signing key provided by Return Helper during account setup. This key is used to sign the notification and generate a signature (please check more details below).
Please store your key securely and never disclose. **The signing key is Base64 encoded.**

Retry
*****

Only response with a ``HTTP 200`` for every sent notification is considered as completed. Otherwise the notification is considered as failed. It will retry up to 10 times.

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

This section explains how a signature is generated so clients can verify the authenticity and integrity of our notification message.
**Clients should always verify the signature before processing the payload data.**

To understand how signature is generated, consider the example below:

::

   Header:
   Content-Type: application/json; charset=utf-8
   timestamp: 2021-07-21T13:58:40.2794872Z
   signature: ZgQ6fX4p0WL8UhCiueSadjD1Ye1Hw5clL3pekiMir34=

   Body:
   {"resend":{"resendId":295,"apiId":2,"resendNumber":"RSD210106-0000001","resendStatusCode":1,"description":"rest-client-test-api-flow","remarks":"rest-client-test-api-flow","warehouseRemarks":"stanley-test-12-17","modifyOn":"2021-01-06T03:28:15.3004082Z","modifyBy":"2","createOn":"2021-01-06T03:24:08","createBy":"2"},"trackingNumber":null,"failureReason":"stanley-test-12-17","category":"resend","action":"forceCancelResend","eventTime":"2021-07-21T13:58:40.279329Z"}


How to verify signature:

1. | **Extract the signature from header, for comparing with the generated signature later**
2. | **Extract the timestamp from header, for generating signature**
3. | **Prepare string_to_sign**
   | Concatenate the following data as string in the following order:
   |  3-1. HTTP action (always to be POST)
   |  3-2. Your notification endpoint (e.g. https://callback.free.beeceptor.com)
   |  3-3. The timestamp (extracted from header)
   |  3-4. The actual JSON payload (aka body)
   |     Example: ``POSThttps://callback.free.beeceptor.com2021-07-21T13:58:40.2794872Z{"resend":{"resendId":295,"apiId":2,"resendNumber":"RSD210106-0000001","resendStatusCode":1,"description":"rest-client-test-api-flow","remarks":"rest-client-test-api-flow","warehouseRemarks":"stanley-test-12-17","modifyOn":"2021-01-06T03:28:15.3004082Z","modifyBy":"2","createOn":"2021-01-06T03:24:08","createBy":"2"},"trackingNumber":null,"failureReason":"stanley-test-12-17","category":"resend","action":"forceCancelResend","eventTime":"2021-07-21T13:58:40.279329Z"}``
   | Then, convert the concantenated string to Base64
   |     Example: ``UE9TVGh0dHBzOi8vY2FsbGJhY2suZnJlZS5iZWVjZXB0b3IuY29tMjAyMS0wNy0yMVQxMzo1ODo0MC4yNzk0ODcyWnsicmVzZW5kIjp7InJlc2VuZElkIjoyOTUsImFwaUlkIjoyLCJyZXNlbmROdW1iZXIiOiJSU0QyMTAxMDYtMDAwMDAwMSIsInJlc2VuZFN0YXR1c0NvZGUiOjEsImRlc2NyaXB0aW9uIjoicmVzdC1jbGllbnQtdGVzdC1hcGktZmxvdyIsInJlbWFya3MiOiJyZXN0LWNsaWVudC10ZXN0LWFwaS1mbG93Iiwid2FyZWhvdXNlUmVtYXJrcyI6InN0YW5sZXktdGVzdC0xMi0xNyIsIm1vZGlmeU9uIjoiMjAyMS0wMS0wNlQwMzoyODoxNS4zMDA0MDgyWiIsIm1vZGlmeUJ5IjoiMiIsImNyZWF0ZU9uIjoiMjAyMS0wMS0wNlQwMzoyNDowOCIsImNyZWF0ZUJ5IjoiMiJ9LCJ0cmFja2luZ051bWJlciI6bnVsbCwiZmFpbHVyZVJlYXNvbiI6InN0YW5sZXktdGVzdC0xMi0xNyIsImNhdGVnb3J5IjoicmVzZW5kIiwiYWN0aW9uIjoiZm9yY2VDYW5jZWxSZXNlbmQiLCJldmVudFRpbWUiOiIyMDIxLTA3LTIxVDEzOjU4OjQwLjI3OTMyOVoifQ==``
4. | **Sign the string_to_sign**
   | Signature is computed by using HMAC with SHA256 hash function:
   |   4-1. Decode Base64 string_to_sign to byte array
   |   4-2. Decode Base64 signing key to byte array
   |   4-3. Generate signature (byte array) from 4-1 and 4-2
   |   4-4. Encode signature (byte array) to Base64
5. | **Compare the signatures**
   | Compare the signature generated from Step 4 with the signature extracted from Step 1

A complete java sample is available `HERE <https://gist.github.com/neo-cheung/f8a147307616230fb60e402f0fc8211b>`_

PS:
You should not process a notification with eventTime significantly different (15 minutes)
that the receiving machine’s clock to help prevent replay attacks.

To protect against timing attacks,
use a constant-time string comparison to compare the expected signature.

Body
****

``eventTime`` is in ISO8601 format.

``category`` and ``action`` are two common properties in every notification body.
These are enums that used to identify the notification type which clients can make use of when processing the message.

.. list-table::
   :widths: 15 25
   :header-rows: 1

   * - ``category`` code
     - Data object
   * - ``rsl``
     - returnrequest, shipment, label
   * - ``lr``
     - labelrefund
   * - ``rrli``
     - returnrequestlineitem
   * - ``rinv``
     - returninventory (including complete and cancel handling)
   * - ``resend``
     - resend
   * - ``sr``
     - special request
   * - ``fbaro``
     - fba removal order and shipment
   * - ``fbai``
     - fba inventory
   * - ``labelGenerated``
     - label gererated object. Check :ref:`method-CreateLabel` for more details
   * - ``rrliv``
     - ReturnRequestLineItemVas, returninventory, ReturnRequestLineItemImage
   * - ``lineItemVasReturnInventoryLineItem``
     - VAS object. Check :ref:`method-CreateVas` for more details
   * - ``transaction``
     - Transaction

.. list-table::
   :widths: 15 25
   :header-rows: 1

   * - ``action`` code
     - event description
   * - ``markShipmentArrive``
     - Shipment arrive notification event
   * - ``assignUnknown``
     - Assign unknown shipment event. Triggers when warehouse assign a package to user that has not been registered.
   * - ``userCancelLabel``
     - User cancel label event
   * - ``userAddVas``
     - Add VAS event
   * - ``vasUpdated``
     - Update VAS event
   * - ``userChangeHandling``
     - User change handling event
   * - ``labelGenerated``
     - label gererated event. Check :ref:`method-CreateLabel` for more details
   * - ``changeLineItemImage``
     - Update line item image event
   * - ``userCreateResend``
     - User create resend event
   * - ``updateResendTrackingNumber``
     - Update resend tracking number event
   * - ``forceCancelResend``
     - Force cancel resend event
   * - ``completeInventoryHandling``
     - Complete handling event
   * - ``cancelInventoryHandling``
     - Cancel handling event
   * - ``markFbaDeliver``
     - Fba deliver event
   * - ``completeFbaRecall``
     - Fba complete recall event
   * - ``completeFbaOthers``
     - Fba others handling event
   * - ``completeFbaDispose``
     - Fba dispose complete event
   * - ``receiveFbaInventory``
     - Receive Fba inventory event
   * - ``createFbaRelabelShipment``
     - Create Fba relabel (replenish) shipment event
   * - ``completeFbaRelabelRepack``
     - Complete Fba relabel (replenish) repack event
   * - ``assignFbaRelabelFnsku``
     - Assign Fba Relabel (replenish) event
   * - ``markFbaRelabelShipmentShip``
     - Fba relabel (replenish) mark ship event
   * - ``completeFbaRelabel``
     - Complete Fba Relabel (replenish) event
   * - ``createSpecialRequest``
     - Create special request event
   * - ``addAddressOnly``
     - Add address event
   * - ``addAddressAndLabel``
     - Add address and label event
   * - ``recallUpdateStatus``
     - Update recall status event
   * - ``splitLineItem``
     - Split line item event result event
   * - ``addTransaction``
     - Add transaction event


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
   :emphasize-lines: 13,14,16,36,37

   (USPS)
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
        "trackingNumber": "9201994884299101443342",
        "labelUrl": "https://label-service-dev-files.returnshelper.com/label/202112/4495-S211229-0000037-attc2xihut0.pdf",
        "error": null,
        "qrcodeUrl": "https://label-service-dev-files.returnshelper.com/label/202112/4495-S211229-0000037-qrebtcjpxne.png",
        "qrcodeError": null
    },
    "category": "labelGenerated",
    "action": "labelGenerated",
    "eventTime": "2021-09-04T17:03:15.8888073Z"
   }

   (non-USPS)
   {
    "label": {
        "correlationId": null,
        "meta": null,
        "labelId": 11345,
        "shipmentId": 10825,
        "apiId": 21,
        "refKey": "S210904-0000202",
        "labelRequestId": 3779,
        "labelRequestStatusCode": "success",
        "serviceType": "sdhl",
        "trackingNumber": "222201040017141511",
        "labelUrl": "https://label-service-dev-files.returnshelper.com/label/202111/4084-BRS211122-0000018-r1o1xeci30x.pdf",
        "error": null,
        "qrcodeUrl": null,
        "qrcodeError": null
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
