.. _notification:

#######
Webhook
#######

Introduction
-------------------------

Webhooks in the Return Helper API are used for sending notifications to clients when certain information is not immediately available during an API call. This section explains how webhooks and notifications function.

.. _notification_endpoint:

Notification Endpoint
*********************

**Purpose**

An endpoint for clients to receive notifications about data updates or request results.

Clients must provide a notification endpoint to the Return Helper team. Contact support@returnhelper.com for assistance.

Below is the email template:

::

  [Template Email Subject] Request webhook setup in Return Helper - <CLIENT CODE>

  [Template Email Recipients]
  to: support@returnhelper.com
  cc: paco@returnhelper.com, tingfung@returnhelper.com, roy@returnhelper.com

  [Template Email body]

  Dear Support Team,

  We would like to request webhook setup in Return Helper. Below are my notification endpoints, please help to set up in both sandbox and production environment.
  Sandbox notification endpoint:
  (sandbox-notification-endpoint)
  Production notification endpoint:
  (production-notification-endpoint)

For example:

::

  Email Subject: Request webhook setup in Return Helper - <RHHK001>

  Recipients:
  to: support@returnhelper.com
  cc: paco@returnhelper.com, tingfung@returnhelper.com, roy@returnhelper.com

  Body:
  Dear Support Team,

  We would like to request webhook setup in Return Helper. Below are my notification endpoints, please help to set up in both sandbox and production environment.
  Sandbox notification endpoint:
  https://sandboxcallback.free.beeceptor.com
  Production notification endpoint:
  https://productioncallback.free.beeceptor.com


Handling Webhook Events
*************************

**Event Delivery**

The events returned by the Event resource should not be considered to be realtime. Events might not be created until a few seconds after the action occurs. In rare cases it can take up to a few minutes for some events to appear

**Duplicate Events**

Webhook endpoints might receive the same event more than once. Implement idempotent event processing to avoid duplicates, such as logging processed events.

**Event Order**

The order of event delivery is not guaranteed. Design your endpoint to handle events in any order.
For example warehouse receive the parcel and upload images.

* :ref:`notification-warehouseMarkShipmentArrivedv2`
* :ref:`notification-inventorycreated`
* :ref:`notification-changeLineItemImage`

Your endpoint should not expect delivery of these events in this order and should handle it accordingly. You can also use the API to fetch any missing objects.

Each event also includes ``eventTime``

More reference documents on event ordering:

- https://docs.stripe.com/webhooks#event-ordering
- https://shopify.dev/docs/apps/build/webhooks#ordering-event-data
- https://developer.adobe.com/commerce/php/best-practices/extensions/observers/#do-not-rely-on-invocation-order


Signing Key
***********

**Usage**

Each client receives a unique signing key (see :ref:`index-authenication`) for verifying notifications (please check more details below).

**Security**

Store your key securely and do not disclose it. **The key is Base64 encoded.**

Retry Mechanism
***************

**Response Codes**

Respond to notifications with a ``2xx`` (``200`` - ``299``) status code. Non-2xx responses trigger retries.

**Failed Deliveries**

After 10 failed deliveries, notification to the endpoint is suspended for 24 hours.

Notification Header
*******************

It contains a timestamp and a signature.

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 40

   timestamp, string_ , ISO8601
   signature, string_ , See ``Signature`` section

Signature Verification
**********************

**Process**

Verify the signature for authenticity and integrity before processing payload data.

**Signature Verification: A Recommended Security Practice**

**Verifying the signature is a crucial step in ensuring the security and integrity of the data received through webhooks. While it may be optional, we strongly recommend always performing signature verification before processing the payload data to safeguard against potential security threats.**

**Handling the Raw Body**

**You must always use the raw body of the request for signature verification. If you are using a framework, ensure that it does not alter the raw body. Any manipulation of the raw body causes verification to fail.**


To understand how signature is generated, consider the example below:

::

   Header:
    {
      "content-type": "application/json; charset=utf-8",
      "returnhelper-signature": "gXJRba6qE2rCQqJc8WEou2i8cCl0STp2AjH+y/R6ltw=",
      "timestamp": "2024-01-12T09:23:08.4863561Z"
    }
   Body:
    {“label”:{“regions”:{“RHCN”:“https://label.returnhelperchina.com/label/202401/10595-S240112-0000001-pqk2pvydgxp.pdf”},“labelId”:31033,“shipmentId”:30385,“apiId”:33,“refKey”:“S240112-0000001”,“labelRequestId”:10595,“labelRequestStatusCode”:“success”,“serviceType”:“RETURN_ENDICIA_USPS_GROUND_ADVANTAGE_NJ”,“trackingNumber”:“9434611899562082901137",“labelUrl”:“https://label-service-dev-files.returnshelper.com/label/202401/10595-S240112-0000001-pqk2pvydgxp.pdf”,“error”:null,“qrcodeUrl”:null,“qrcodeError”:null,“correlationId”:null,“cancelCutoffTime”:“2024-02-11T09:21:24.0795",“meta”:null},“category”:“labelGenerated”,“action”:“labelGenerated”,“eventTime”:“2024-01-12T09:23:08.4862743Z”}


**Steps to Verify Signature**

1. | **Retrieve the signature from header, for comparing with the generated signature later**
2. | **Retrieve the timestamp from header, for generating signature**
3. | **Prepare string_to_sign**
   | Concatenate the following data as string in order:
   |  3-1. HTTP action (always to be POST)
   |  3-2. Your notification endpoint (e.g. https://s2024-01-12.free.beeceptor.com)
   |  3-3. The timestamp (extracted from header)
   |  3-4. The actual JSON payload (aka body)
   |     Example: ``POSThttps://s2024-01-12.free.beeceptor.com2024-01-12T09:23:08.4863561Z{“label”:{“regions”:{“RHCN”:“https://label.returnhelperchina.com/label/202401/10595-S240112-0000001-pqk2pvydgxp.pdf”},“labelId”:31033,“shipmentId”:30385,“apiId”:33,“refKey”:“S240112-0000001”,“labelRequestId”:10595,“labelRequestStatusCode”:“success”,“serviceType”:“RETURN_ENDICIA_USPS_GROUND_ADVANTAGE_NJ”,“trackingNumber”:“9434611899562082901137",“labelUrl”:“https://label-service-dev-files.returnshelper.com/label/202401/10595-S240112-0000001-pqk2pvydgxp.pdf”,“error”:null,“qrcodeUrl”:null,“qrcodeError”:null,“correlationId”:null,“cancelCutoffTime”:“2024-02-11T09:21:24.0795",“meta”:null},“category”:“labelGenerated”,“action”:“labelGenerated”,“eventTime”:“2024-01-12T09:23:08.4862743Z”}``
   | Then, convert the concantenated string to Base64. This is the string_to_sign.
   |     Example: ``UE9TVGh0dHBzOi8vczIwMjQtMDEtMTIuZnJlZS5iZWVjZXB0b3IuY29tMjAyNC0wMS0xMlQwOToyMzowOC40ODYzNTYxWnvigJxsYWJlbOKAnTp74oCccmVnaW9uc+KAnTp74oCcUkhDTuKAnTrigJxodHRwczovL2xhYmVsLnJldHVybmhlbHBlcmNoaW5hLmNvbS9sYWJlbC8yMDI0MDEvMTA1OTUtUzI0MDExMi0wMDAwMDAxLXBxazJwdnlkZ3hwLnBkZuKAnX0s4oCcbGFiZWxJZOKAnTozMTAzMyzigJxzaGlwbWVudElk4oCdOjMwMzg1LOKAnGFwaUlk4oCdOjMzLOKAnHJlZktleeKAnTrigJxTMjQwMTEyLTAwMDAwMDHigJ0s4oCcbGFiZWxSZXF1ZXN0SWTigJ06MTA1OTUs4oCcbGFiZWxSZXF1ZXN0U3RhdHVzQ29kZeKAnTrigJxzdWNjZXNz4oCdLOKAnHNlcnZpY2VUeXBl4oCdOuKAnFJFVFVSTl9FTkRJQ0lBX1VTUFNfR1JPVU5EX0FEVkFOVEFHRV9OSuKAnSzigJx0cmFja2luZ051bWJlcuKAnTrigJw5NDM0NjExODk5NTYyMDgyOTAxMTM3IizigJxsYWJlbFVybOKAnTrigJxodHRwczovL2xhYmVsLXNlcnZpY2UtZGV2LWZpbGVzLnJldHVybnNoZWxwZXIuY29tL2xhYmVsLzIwMjQwMS8xMDU5NS1TMjQwMTEyLTAwMDAwMDEtcHFrMnB2eWRneHAucGRm4oCdLOKAnGVycm9y4oCdOm51bGws4oCccXJjb2RlVXJs4oCdOm51bGws4oCccXJjb2RlRXJyb3LigJ06bnVsbCzigJxjb3JyZWxhdGlvbklk4oCdOm51bGws4oCcY2FuY2VsQ3V0b2ZmVGltZeKAnTrigJwyMDI0LTAyLTExVDA5OjIxOjI0LjA3OTUiLOKAnG1ldGHigJ06bnVsbH0s4oCcY2F0ZWdvcnnigJ064oCcbGFiZWxHZW5lcmF0ZWTigJ0s4oCcYWN0aW9u4oCdOuKAnGxhYmVsR2VuZXJhdGVk4oCdLOKAnGV2ZW50VGltZeKAnTrigJwyMDI0LTAxLTEyVDA5OjIzOjA4LjQ4NjI3NDNa4oCdfQ==``
4. | **Sign the string_to_sign**
   | Signing key used in ths example: ``PEnA0mzKb7fUlGfMgCGhXPjPmPGvW70UU8bkNKdG78WDrQRwzFa572e2JsFIE1e4PLaP9h/ZEvERSR0FBDYNlQ==``
   | Signature is computed by using HMAC with SHA256 hash function:
   |   4-1. Decode Base64 string_to_sign to byte array.
   |   4-2. Decode Base64 signing key to byte array.
   |   4-3. Generate signature (byte array) from 4-1 and 4-2.
   |   4-4. Encode signature (byte array) to Base64.
5. | **Compare the signatures**
   | Compare the signature generated from Step 4 with the signature retrieved in Step 1.
   | Use a constant-time string comparison to protect against timing attacks.

Additional Notes:
Do not process notifications if the eventTime is significantly different (more than 15 minutes) from your system's clock. This helps prevent replay attacks.

To protect against timing attacks,
use a constant-time string comparison to compare the expected signature.

Signature verification sample codes:

- :download:`Java <samples/Sha265Sign.java>`
- :download:`Node.js <samples/Sha265Sign.js>`
- :download:`Typescript <samples/Sha265Sign.ts>`
- :download:`Apex (For Salesforce Users) <samples/Sha265Sign.apex>`

Notification Body
*****************

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
   * - ``labelGenerated``
     - label gererated object. Check :ref:`method-CreateLabel` for more details
   * - ``rrliv``
     - ReturnRequestLineItemVas, returninventory, ReturnRequestLineItemImage
   * - ``lineItemVasReturnInventoryLineItem``
     - VAS object. Check :ref:`method-CreateVas` for more details
   * - ``transaction``
     - Transaction
   * - ``markFbaShipmentArrived``
     - Fba shipment arrived event
   * - ``fbaShipmentPutaway``
     - Putaway fba shipment event
   * - ``completeFbaInstructionDispose``
     - Complete fba instruction dispose event
   * - ``completeFbaInstructionOthers``
     - Complete fba instruction others event
   * - ``completeFbaInstructionRecall``
     - Complete fba instruction recall event
   * - ``fbaInstructionReplenishComplete``
     - Complete fba instruction replenish event
   * - ``completeRecalibrate``
     - Complete inventory recalibrate event
   * - ``newInventoryCreated``
     - New inventory created event

.. list-table::
   :widths: 15 25
   :header-rows: 1

   * - ``action`` code
     - event description
   * - ``markShipmentArrive``
     - Shipment arrive notification event
   * - ``assignUnknown``
     - Assign unknown shipment event. Triggers when warehouse assign a package to user that has not been registered.
   * - ``vasUpdated``
     - Update VAS event
   * - ``labelGenerated``
     - label gererated event. Check :ref:`method-CreateLabel` for more details
   * - ``changeLineItemImage``
     - Update line item image event
   * - ``completeInventoryHandling``
     - Complete handling event
   * - ``cancelInventoryHandling``
     - Cancel handling event
   * - ``recallUpdateStatus``
     - Update recall status event
   * - ``splitLineItem``
     - Split line item event result event
   * - ``markFbaShipmentArrived``
     - Fba shipment arrived event
   * - ``fbaShipmentPutaway``
     - Putaway fba shipment event
   * - ``completeFbaInstructionDispose``
     - Complete fba instruction dispose event
   * - ``completeFbaInstructionOthers``
     - Complete fba instruction others event
   * - ``completeFbaInstructionRecall``
     - Complete fba instruction recall event
   * - ``fbaInstructionReplenishComplete``
     - Complete fba instruction replenish event
   * - ``completeRecalibrate``
     - Complete inventory recalibrate event
   * - ``newInventoryCreated``
     - New inventory created event

List of supported notification
------------------------------

.. _notification-label:

Label result notification
*************************

This notification is sent to client once the label is ready.

**You should always use shipmentId to map your label with shipment in your integration. DO NOT use labelId.**

In some rare case of third parties system failure, we may not able to get a valid shipping label even if we successfully registered your label request.
This may result in a successful :ref:`method-CreateLabel` request followed by a failed :ref:`notification-label`.
In special cases like this, fail labels are re-sent to third parties once we detect their service resumed. However these new labels
have a new ``labelId`` (s) that can only matched with ``shipmentId``.  Otherwise, customers may need extra workloads to
re-create all their labels affected in third parties service downtime.

category: ``labelGenerated``

action: ``labelGenerated``

.. csv-table:: LabelResponse
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/LabelResponse.csv

Sample:

USPS

.. code-block:: json
  :emphasize-lines: 13,14,16

  {
    "label": {
      "correlationId": null,
      "meta": null,
      "labelId": 11345,
      "referenceNumber": "ystest07110001",
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

non-USPS

.. code-block:: json
  :emphasize-lines: 13,14

  {
  "label": {
      "correlationId": null,
      "meta": null,
      "labelId": 11345,
      "referenceNumber": "ystest07110001",
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

.. _notification-Resend:

Resend update status notification (Deprecating)
***********************************************

.. warning::
  We are updating the resend notification structure as we are adding more features to the resend module. Please subscribe to :ref:`notification-ResendV2` for the new resend notification structure.

  This notification will keep servicing in the mean time, it will be deprecated by the end of 2024.

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
.. _notification-ResendV2:

Resend update status notification (New)
***************************************

This notification is sent to client when the resend status has been update. For example, a tracking number update would trigger this notification.

category: ``resend``

action: ``updateResendStatus``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   resend, :ref:`structure-resendpayload`,
   resendShipmentList, List<:ref:`structure-resendshipmentpayload`>,
   returnInventoryList, List<:ref:`structure-returninventorypayload`>,

Sample A, resend status code 4 (failed) with error message:

.. code-block:: json
  :emphasize-lines: 6,44

  {
    "resend": {
      "resendId":3588,
      "apiId":21,
      "resendNumber":"RSD240430-0000055",
      "resendStatusCode":4,
      "description":"test",
      "remarks":"test",
      "warehouseRemarks":null,
      "modifyOn":"2024-05-02T02:59:17.6725416Z",
      "modifyBy":"21",
      "createOn":"2024-04-30T03:06:40.9068",
      "createBy":"21"
    },
    "resendShipmentList": [
      {
        "resendShipmentId": 3583,
        "apiId": 21,
        "resendId": 3588,
        "warehouseId": 2,
        "resendShipmentNumber": "RSDS240430-0000055",
        "shipmentServiceType": "SHIPMENT_USPS_GA_SIG_NJ",
        "shipmentCountryCode": "usa",
        "shipmentName": "test",
        "shipmentPhone": "123456789",
        "shipmentFax": null,
        "shipmentEmail": "test@eqdw.cas",
        "shipmentStreet1": "test1",
        "shipmentStreet2": "test2",
        "shipmentStreet3": "",
        "shipmentState": "NM",
        "shipmentCity": "tpe",
        "shipmentPostalCode": "123456",
        "trackingNumber": null,
        "modifyOn":"2024-05-02T02:59:17.6725416Z",
        "modifyBy":"21",
        "createOn":"2024-04-30T03:06:40.9068",
        "createBy":"21",
        "costCurrencyCode": "usd",
        "cost": 11.030,
        "chargeTypeCode": "actualWeight",
        "chargeableWeight": 500.000,
        "shipmentLabelId": "27f4c4a4-de2a-427e-9cde-615dcf55b53d",
        "error": "{\"message\":\"Invalid address.\"}"
      }
    ],
    "returnInventoryList": [
      {
        "returnInventoryId": 18148,
        "warehouseId": 2,
        "returnRequestLineItemId": 37912,
        "apiId": 21,
        "returnRequestId": 63708,
        "returnRequestLineItemNumber": "RL240321-0000007",
        "sellerReferenceNumber": "RL240321-0000007",
        "description": "20211006-001",
        "quantity": 1,
        "weight": 500.000,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 1.000,
        "handlingCode": 4,
        "handlingStatusCode": 0,
        "completeBy": null,
        "completeOn": null,
        "modifyOn":"2024-05-02T02:59:17.6725416Z",
        "modifyBy":"21",
        "createOn":"2024-04-30T03:06:40.9068",
        "createBy":"3",
        "warehouseRemarks": null,
        "handlingUpdatedOn": "2024-04-30T07:48:40.2356",
        "stopAgingOn": "2024-04-30T07:48:40.2356",
        "sku": null,
        "warehouseApiId": 3,
        "rma": "USE-1005-240523-D00001-25"
      }
    ],
    "category":"resend",
    "action":"updateResendStatus",
    "eventTime":"2024-05-02T02:59:27.8657445Z"
  }

Sample B, resend status code 3 (completed) with tracking number:

.. code-block:: json
  :emphasize-lines: 6,34

  {
    "resend": {
      "resendId":3588,
      "apiId":21,
      "resendNumber":"RSD240430-0000056",
      "resendStatusCode":3,
      "description":"test",
      "remarks":"test",
      "warehouseRemarks":null,
      "modifyOn":"2024-05-02T02:59:17.6725416Z",
      "modifyBy":"21",
      "createOn":"2024-04-30T03:06:40.9068",
      "createBy":"21"
    },
    "resendShipmentList": [
      {
        "resendShipmentId": 3583,
        "apiId": 21,
        "resendId": 3588,
        "warehouseId": 2,
        "resendShipmentNumber": "RSDS240430-0000056",
        "shipmentServiceType": "SHIPMENT_USPS_GA_SIG_NJ",
        "shipmentCountryCode": "usa",
        "shipmentName": "test",
        "shipmentPhone": "123456789",
        "shipmentFax": null,
        "shipmentEmail": "test@eqdw.cas",
        "shipmentStreet1": "test1",
        "shipmentStreet2": "test2",
        "shipmentStreet3": "",
        "shipmentState": "NM",
        "shipmentCity": "tpe",
        "shipmentPostalCode": "123456",
        "trackingNumber": "9405511899563826265813",
        "modifyOn":"2024-05-02T02:59:17.6725416Z",
        "modifyBy":"21",
        "createOn":"2024-04-30T03:06:40.9068",
        "createBy":"21",
        "costCurrencyCode": "usd",
        "cost": 11.030,
        "chargeTypeCode": "actualWeight",
        "chargeableWeight": 500.000,
        "shipmentLabelId": "27f4c4a4-de2a-427e-9cde-615dcf55b53d",
        "error": ""
      }
    ],
    "returnInventoryList": [
      {
        "returnInventoryId": 18148,
        "warehouseId": 2,
        "returnRequestLineItemId": 37912,
        "apiId": 21,
        "returnRequestId": 63708,
        "returnRequestLineItemNumber": "RL240321-0000007",
        "description": "20211006-001",
        "quantity": 1,
        "weight": 500.000,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 1.000,
        "handlingCode": 4,
        "handlingStatusCode": 0,
        "completeBy": null,
        "completeOn": null,
        "modifyOn":"2024-05-02T02:59:17.6725416Z",
        "modifyBy":"21",
        "createOn":"2024-04-30T03:06:40.9068",
        "createBy":"3",
        "warehouseRemarks": null,
        "handlingUpdatedOn": "2024-04-30T07:48:40.2356",
        "stopAgingOn": "2024-04-30T07:48:40.2356",
        "sku": null,
        "warehouseApiId": 3,
        "rma": "USE-1005-240523-D00001-25"
      }
    ],
    "category":"resend",
    "action":"updateResendStatus",
    "eventTime":"2024-05-02T02:59:27.8657445Z"
  }


----

.. _notification-Recall:

Recall update status notification
*********************************

This notification is sent to client once the recall has one of the following status update:


category: ``recall``

action: ``recallUpdateStatus``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    recall, :ref:`structure-Recall`
    recallUpdateTypeStatus, string_, see below table

.. _structure-Recall:

.. csv-table:: ``Recall``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    apiId, integer_, Api id
    recallId, integer_, Recall id
    recallNumber, string_, Recall number
    recallStatusCode, string_, Recall status code
    warehouseRemarks, string_, Warehouse remarks
    recallInventoryList, List<:ref:`structure-RecallInventory`>, List of recall inventory


.. _structure-RecallInventory:

.. csv-table:: ``RecallInventory``
  :header: "Name", "Type", "Remarks"
  :widths: 15, 10, 30

  recallInventoryId, integer_, Recall inventory id
  returnInventoryId, integer_, Return inventory id
  recallInventoryStatusCode, string_, Recall inventory status code
  pickUpCode, string_, Pick up code
  trackingNumber, string_, Tracking number
  listName, string_, List name
  weight, float_, Weight
  amount, float_, Amount
  pickUpOn, string_, Pick up on
  courierTrackingNumber, string_, Courier tracking number
  remarks, string_, Remarks
  recallServiceType, string_, Recall service type
  rma, string_, Warehouse assigned RMA value; see :ref:`gettingstarted-rma`


.. csv-table:: ``values of recallUpdateTypeStatus``
  :header: "Status code", "Recall Inventory status", "Description"
  :widths: 15, 15, 30

  ``updateTrackingNumber``, ``in-transit``, Tracking number update
  ``readyToPickUp``, ``ready-to-pick-up`` , Inventory is ready to pickup
  ``pickupBySelf``, ``picked-up`` , Inventory is picked up by customer
  ``pickupByCourier``, ``picked-up`` , Inventory is picked up by local courier (from recall destination to seller)
  ``pickupByOthers``, ``picked-up`` , Inventory is picked up by none of the above entities

Example 1 (updateTrackingNumber):

::

  {
    "recall": {
      "apiId": 103,
      "recallId": 938,
      "recallNumber": "RCL240423-0000001",
      "recallStatusCode": "in-progress",
      "warehouseRemarks": null,
      "recallInventoryList": [
        {
          "recallInventoryId": 1145,
          "returnInventoryId": 18600,
          "recallInventoryStatusCode": "in-transit",
          "pickUpCode": "pending",
          "trackingNumber": "S240423-0000018-AWB",
          "listName": null,
          "weight": null,
          "amount": null,
          "pickUpOn": null,
          "courierTrackingNumber": null,
          "remarks": null,
          "recallServiceType": "dhl",
          "rma": "USE-1005-240523-D00001-25"
        }
      ]
    },
    "recallUpdateTypeStatus": "updateTrackingNumber",
    "category": "recall",
    "action": "recallUpdateStatus",
    "eventTime": "2024-04-23T07:50:49.2479819Z"
  }


Example 2 (readyToPickUp):

::

  {
    "recall": {
      "apiId": 103,
      "recallId": 938,
      "recallNumber": "RCL240423-0000001",
      "recallStatusCode": "completed",
      "warehouseRemarks": null,
      "recallInventoryList": [
        {
          "recallInventoryId": 1145,
          "returnInventoryId": 18600,
          "recallInventoryStatusCode": "ready-to-pick-up",
          "pickUpCode": "pending",
          "trackingNumber": "S240423-0000018-AWB",
          "listName": "S240423-0000018-ListName",
          "weight": 100,
          "amount": 1,
          "pickUpOn": null,
          "courierTrackingNumber": null,
          "remarks": null,
          "recallServiceType": "dhl",
          "rma": "USE-1005-240523-D00001-25"
        }
      ]
    },
    "recallUpdateTypeStatus": "markReadyToPickUp",
    "category": "recall",
    "action": "recallUpdateStatus",
    "eventTime": "2024-04-23T09:01:30.2084882Z"
  }


Example 3 (pickUpToCourierPickUp):

::

  {
    "recall": {
      "apiId": 103,
      "recallId": 938,
      "recallNumber": "RCL240423-0000001",
      "recallStatusCode": "completed",
      "warehouseRemarks": null,
      "recallInventoryList": [
        {
          "recallInventoryId": 1145,
          "returnInventoryId": 18600,
          "recallInventoryStatusCode": "picked-up",
          "pickUpCode": "courier-pick-up",
          "trackingNumber": "S240423-0000018-AWB",
          "listName": "S240423-0000018-ListName",
          "weight": 100,
          "amount": 1,
          "pickUpOn": null,
          "courierTrackingNumber": "DHL S240423-0000018",
          "remarks": null,
          "recallServiceType": "dhl",
          "rma": "USE-1005-240523-D00001-25"
        }
      ]
    },
    "recallUpdateTypeStatus": "pickUpToCourierPickUp",
    "category": "recall",
    "action": "recallUpdateStatus",
    "eventTime": "2024-04-23T09:03:38.4028454Z"
  }

----


.. _notification-MarkReceived:

Warehouse mark shipment received notification (Deprecating)
***********************************************************

.. warning::
  This notification is deprecating on 31st December, 2024.

  For current customers: It is very important to understand that, this notification cannot handle multiple packages in one shipment. (see :ref:`gettingstarted-ReturnArrival`).
  Please make sure to migrate to the new notifications :ref:`notification-warehouseMarkShipmentArrivedv2` and :ref:`notification-inventoryCreated`.

  For more information please see :ref:`gettingstarted-ReturnArrival` and :ref:`index-deprecating`

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
    "returnInventoryList": [
      {
          "returnInventoryId": 19078,
          "warehouseId": 1005,
          "returnRequestLineItemId": 39555,
          "apiId": 103,
          "returnRequestId": 64945,
          "returnRequestLineItemNumber": "BRL240711-0000004",
          "sellerReferenceNumber": "BRL240711-0000004",
          "description": "TULIPLA/Clothing/Fit - Cups too small",
          "quantity": 1,
          "dimension1": 10.0,
          "dimension2": 10.0,
          "dimension3": 120.0,
          "dimensionUom": "cm",
          "canRecalibrate": true,
          "weight": 500.0,
          "weightUom": "g",
          "valueCurrencyCode": "usd",
          "value": 1.0,
          "handlingCode": 0,
          "handlingStatusCode": 0,
          "completeBy": null,
          "completeOn": null,
          "warehouseRemarks": null,
          "handlingUpdatedOn": "2024-05-23T01:36:18.786231",
          "stopAgingOn": null,
          "sku": null,
          "rma": "USE-1005-240523-D00001-25",
          "warehouseApiId": 3,
          "modifyOn": "2024-05-23T01:36:18.80574",
          "modifyBy": "3",
          "createOn": "2024-05-23T01:36:18.778048",
          "createBy": "3"
      }
    ],
    "returnRequest": {
        "returnRequestId": 64945,
        "apiId": 103,
        "returnRequestNumber": "BR240711-0000004",
        "sellerReferenceNumber": "BR240711-0000004",
        "returnStatusCode": 0,
        "returnTitle": "test1rgzedrghrehethsdd",
        "totalValue": 1.0,
        "totalValueCurrency": "usd",
        "remarks": "test1rgzedrghrehethsdd",
        "isArchived": false,
        "returnRequestSourceType": 0,
        "modifyOn": "2024-05-23T01:36:18.8066177Z",
        "modifyBy": "103",
        "createOn": "2024-05-23T01:36:08.768181",
        "createBy": "103"
    },
    "shipment": {
        "shipmentId": 33838,
        "apiId": 103,
        "returnRequestId": 64945,
        "labelId": 34493,
        "apiTransactionId": 0,
        "warehouseId": 1005,
        "shipmentNumber": "BRS240711-0000004",
        "sellerReferenceNumber": "BRS240711-0000004",
        "shipmentStatusCode": 6,
        "shipmentServiceType": "nrhl",
        "shipmentCountryCode": "usa",
        "shipmentName": "John Wall",
        "shipmentPhone": "198864888",
        "shipmentFax": null,
        "shipmentEmail": "testShipment@aaa.com",
        "shipmentStreet1": "1",
        "shipmentStreet2": "1",
        "shipmentStreet3": null,
        "shipmentState": "Lancashire",
        "shipmentCity": "Manchester",
        "shipmentPostalCode": "11111",
        "costCurrencyCode": "usd",
        "cost": 0.0,
        "boxType": "cus",
        "weight": 500.0,
        "weightUom": "g",
        "dimension1": 10.0,
        "dimension2": 10.0,
        "dimension3": 10.0,
        "dimensionUom": "cm",
        "isRrLabel": false,
        "receiveDate": "2024-05-23T01:36:18.7431041Z",
        "referenceNumber": null,
        "chargeTypeCode": "noCharge",
        "chargeableWeight": 0.0,
        "modifyOn": "2024-05-23T01:36:18.8063156Z",
        "modifyBy": "103",
        "createOn": "2024-05-23T01:36:08.799949",
        "createBy": "103"
    },
    "label": {
        "labelId": 34493,
        "shipmentId": 33838,
        "apiId": 103,
        "refKey": "BRS240711-0000004",
        "labelRequestId": 0,
        "labelRequestStatusCode": 3,
        "serviceType": "nrhl",
        "trackingNumber": "T-20240523010504",
        "labelUrl": null,
        "error": null,
        "fromCountryCode": "usa",
        "fromName": "John Wall",
        "fromPhone": null,
        "fromFax": null,
        "fromEmail": null,
        "fromStreet1": "1",
        "fromStreet2": null,
        "fromStreet3": null,
        "fromState": null,
        "fromCity": null,
        "fromPostalCode": null,
        "toCountryCode": "usa",
        "toName": "John Wall",
        "toPhone": null,
        "toFax": null,
        "toEmail": null,
        "toStreet1": "1",
        "toStreet2": null,
        "toStreet3": null,
        "toState": null,
        "toCity": null,
        "toPostalCode": null,
        "toCompany": null,
        "fromCompany": null,
        "carrier": null,
        "referenceNumber": null,
        "qrcodeUrl": null,
        "qrcodeError": null,
        "cancelCutoffTime": "2024-05-23T01:36:08.718797",
        "modifyOn": "2024-05-23T01:36:08.883376",
        "modifyBy": "103",
        "createOn": "2024-05-23T01:36:08.870365",
        "createBy": "103"
    },
    "lineItems": [
        {
            "returnRequestLineItemId": 39555,
            "apiId": 103,
            "returnRequestId": 64945,
            "returnRequestLineItemNumber": "BRL240711-0000004",
            "sellerReferenceNumber": "BRL240711-0000004",
            "description": "TULIPLA/Clothing/Fit - Cups too small",
            "quantity": 1,
            "weight": 300.0,
            "weightUom": "g",
            "valueCurrencyCode": "usd",
            "value": 1.0,
            "handlingCode": 0,
            "isDeleted": false,
            "isFraudulent": false,
            "fraudReasonCode": null
        },
        {
            "returnRequestLineItemId": 39556,
            "apiId": 103,
            "returnRequestId": 64945,
            "returnRequestLineItemNumber": "BRL240711-0000005",
            "sellerReferenceNumber": "BRL240711-0000005",
            "description": "20240711-002",
            "quantity": 1,
            "weight": 200.0,
            "weightUom": "g",
            "valueCurrencyCode": "usd",
            "value": 1.0,
            "handlingCode": 0,
            "isDeleted": false,
            "isFraudulent": false,
            "fraudReasonCode": null
        }
    ],
    "category": "rsl",
    "action": "markShipmentArrive",
    "eventTime": "2024-05-23T01:36:29.6096847Z"
  }

|


----

.. _notification-warehouseMarkShipmentArrivedv2:

Warehouse mark shipment arrived notification (v2)
**************************************************

.. note::
  This is a new version of :ref:`notification-MarkReceived`.
  In this version, the original mark receive notification has been split into two distinct notifications: mark receive and :ref:`notification-inventoryCreated`.

category: ``rsl``

action: ``markShipmentArrive``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   shipment, see below table,
   category, string_, ``rsl``
   action, string_, ``markShipmentArrive``
   eventTime, string_, ISO8601 format
   version, string_, version of the notification


.. _structure-markreceived-shipment:

Shipment

.. csv-table::
  :header: "Name", "Type", "Remarks"
  :widths: 15, 10, 30

  shipmentId, string_, Unique (globally) identifier for the shipment
  sellerReferenceNumber, string_,
  returnRequestId, string_, Unique (globally) identifier for the return request
  trackingNumber, string_, Unique globally within 90 days
  referenceNumber, string_,
  serviceType, string_,
  customFieldMap, List<:ref:`gettingstarted-customfield`>,
  shipToWarehouseId, integer_, see :ref:`method-getallwarehouse`
  receiveDate, string_, ISO8601 format

Sample:

.. code-block:: json

  {
      "shipment": {
          "shipmentId": "35732",
          "sellerReferenceNumber": "R240725-0000003",
          "returnRequestId": "66848",
          "trackingNumber": "T-20240725085212",
          "referenceNumber": "R240725-0000003",
          "serviceType": "fedex",
          "customFieldMap": {
              "CSB02": "BBB",
              "CSA01": "AAA"
          },
          "shipToWarehouseId": 2,
          "receiveDate": "2024-07-25T08:53:05.7827073Z"
      },
      "category": "rsl",
      "action": "markShipmentArrive",
      "eventTime": "2024-07-29T05:48:21.381658Z",
      "version": "202407"
  }


.. _notification-inventoryCreated:

Inventory Created Notification
******************************

This notification is sent after

- :ref:`notification-markreceived`
- :ref:`notification-warehouseMarkShipmentArrivedv2`
- :ref:`notification-assignunknown`
- :ref:`method-createvas` when choosing to split the parcel into multiple inventories

to notify a new inventory has been created in the warehouse.
Customers can further call :ref:`method-updatereturninventoryhandling` to assign handling once the inventory has been created.

If multiple packages are sent with the same tracking number of label, multiple inventories will be created. (Multiple notifications will be sent). Each of them has their own inventory id, but they share the same shipment id and return request id.

See :ref:`gettingstarted-ReturnArrival` for more information.

category: ``newInventoryCreated``

action: ``newInventoryCreated``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnInventory, see below table,
   shipment, see below table,
   category, string_, ``newInventoryCreated``
   action, string_, ``newInventoryCreated``
   eventTime, string_, ISO8601 format
   version, string_, version of the notification

Return Inventory

.. csv-table::
  :header: "Name", "Type", "Remarks"
  :widths: 15, 10, 30

  returnInventoryId,string_, Unique (globally) identifier for the return inventory
  warehouseId,integer_, see :ref:`method-getallwarehouse`
  apiId,integer_, Unique (globally) identifier for the customer
  description,string_
  quantity,integer_
  dimension1,integer_
  dimension2,integer_
  dimension3,integer_
  dimensionUom,string_, ``cm``
  weight, integer_, in grams
  weightUom,string_, ``g``
  valueCurrencyCode,string_
  value, integer_,
  handlingCode,string_, see :ref:`method-GetAllHandlings`
  handlingStatusCode,string_, see :ref:`method-getallhandlingstatus`
  completeOn,string_, ISO8601 format
  warehouseRemarks,string_
  handlingUpdatedOn,string_, ISO8601 format
  sku,string_, default null; Customers assign their sku by :ref:`method-assignreturninventorysku`
  rma,string_, Warehouse assigned RMA value; see :ref:`gettingstarted-rma`
  modifyOn,string_, ISO8601 format
  createOn,string_, ISO8601 format
  imageList,List<:ref:`notification-inventoryCreated-Image`>, see below table
  returnInventoryMetaList,List<:ref:`notification-inventoryCreated-ReturnInventoryMeta`>, see below table

.. _notification-inventoryCreated-Image:

Image

.. csv-table::
  :header: "Name", "Type", "Remarks"
  :widths: 15, 10, 30

  imageUrl,string_, URL of the image
  imageKey,string_, Key of the image

.. _notification-inventoryCreated-ReturnInventoryMeta:

ReturnInventoryMeta

.. csv-table::
  :header: "Name", "Type", "Remarks"
  :widths: 15, 10, 30

  metaType,string_,
  metaMap,KeyValuePair,

Shipment

.. csv-table::
  :header: "Name", "Type", "Remarks"
  :widths: 15, 10, 30

  shipmentId, string_, Unique (globally) identifier for the shipment
  returnRequestId, string_, Unique (globally) identifier for the return request
  trackingNumber, string_, Unique globally within 90 days
  referenceNumber, string_,
  serviceType, string_,
  customFieldMap, List<KeyValuePair>,
  shipToWarehouse, integer_,
  receiveDate, string_, ISO8601 format

Sample:

.. code-block:: json

  {
      "returnInventory": {
          "returnInventoryId": "19973",
          "warehouseId": 2,
          "apiId": 21,
          "description": "un-line-item-001",
          "quantity": 1,
          "dimension1": 20,
          "dimension2": 20,
          "dimension3": 22,
          "dimensionUom": "cm",
          "weight": 300,
          "weightUom": "g",
          "valueCurrencyCode": "usd",
          "value": 10,
          "handlingCode": "tbc",
          "handlingStatusCode": "pending",
          "completeOn": null,
          "warehouseRemarks": null,
          "handlingUpdatedOn": "2024-07-15T03:29:53.889398",
          "sku": null,
          "rma": "USE-2-240715-D00003-30",
          "modifyOn": "2024-07-15T03:29:53.903982",
          "createOn": "2024-07-15T03:29:53.88968",
          "imageList": [
              {
                  "imageUrl": "https://rr-dev-files.returnshelper.com/images/returns/202407/USE-2-240715-D00003-30-bw5twko3.gzf.jpg",
                  "imageKey": "images/returns/202407/USE-2-240715-D00003-30-bw5twko3.gzf.jpg"
              },
              {
                  "imageUrl": "https://rr-dev-files.returnshelper.com/images/returns/202407/USE-2-240715-D00003-30-ynkgz5ei.fxm.JPG",
                  "imageKey": "images/returns/202407/USE-2-240715-D00003-30-ynkgz5ei.fxm.JPG"
              }
          ],
          "returnInventoryMetaList": [
              {
                  "metaType": "shipmentCustomField",
                  "metaMap": {
                      "CSA01": "AAA",
                      "CSB02": "BBB"
                  }
              }
          ]
      },
      "shipment": {
          "shipmentId": "9999",
          "returnRequestId": "1234",
          "trackingNumber": "{{trackingNumber}}",
          "referenceNumber": "",
          "serviceType": "fedex",
          "customFieldMap": {
              "CSA01": "AAA",
              "CSB02": "BBB"
          },
          "shipToWarehouseId": 2,
          "receiveDate": "2019-01-01T00:00:00.000000"
      },
      "category": "newInventoryCreated",
      "action": "newInventoryCreated",
      "eventTime": "2024-07-15T03:30:05.1984163Z",
      "version": "202207"
  }

.. _notification-warehouseUpdateRemarks:

Warehouse update remarks on return request notification
*******************************************************

This notification is sent when a warehouse updates remark details on a return request

----

category: ``warehouseUpdateWarehouseRemarks``

action: ``warehouseUpdateWarehouseRemarks``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationWarehouseUpdateRemarks.csv


Sample:

.. code-block:: json

  {
    "returnRequest": {
        "returnRequestId": 54521,
        "returnRequestNumber": "WUS220808-0000003",
        "sellerReferenceNumber": "WUS220808-0000003",
        "returnStatusCode": "0",
        "returnTitle": "TEST0902-317496",
        "totalValue": 96.0,
        "totalValueCurrency": "usd",
        "remarks": "Created by Warehouse",
        "isArchived": false,
        "returnRequestFrom": "return-helper",
        "modifyOn": "2022-08-09T08:36:58",
        "modifyBy": "3",
        "modifyOnStr": null,
        "createOn": "2022-08-09T08:36:58",
        "createBy": "3",
        "createOnStr": null
      },
    "shipment":{
        "shipmentId": 23549,
        "returnRequestId": 54521,
        "labelId": 24227,
        "warehouseId": 3,
        "shipmentNumber": "WUS220808-0000003",
        "sellerReferenceNumber": "WUS220808-0000003",
        "shipmentStatusCode": "6",
        "shipmentServiceType": "9",
        "shipmentCountryCode": "usa",
        "shipmentName": "name",
        "shipmentPhone": "phone",
        "shipmentFax": "",
        "shipmentEmail": "email",
        "shipmentStreet1": "street",
        "shipmentStreet2": "",
        "shipmentStreet3": "",
        "shipmentState": "state",
        "shipmentCity": "city",
        "shipmentPostalCode": "code",
        "costCurrencyCode": "usd",
        "cost": 0.0,
        "boxType": "cus",
        "weight": 74.0,
        "weightUom": "g",
        "dimension1": 17.5,
        "dimension2": 18.9,
        "dimension3": 11.6,
        "dimensionUom": "cm",
        "isRrLabel": false,
        "receiveDateStr": null,
        "referenceNumber": null,
        "modifyOn": "2022-08-09T08:36:58",
        "modifyBy": "3",
        "modifyOnStr": null,
        "createOn": "2022-08-09T08:36:58",
        "createBy": "3",
        "createOnStr": null
      },
    "returnInventory": {
        "returnInventoryId": 13790,
        "warehouseId": 3,
        "returnRequestLineItemId": 27320,
        "returnRequestId": 54521,
        "returnRequestLineItemNumber": "WUSL220808-0000003",
        "sellerReferenceNumber": "WUSL220808-0000003",
        "description": "TEST0902-317496",
        "weight": 74.000,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 96.000,
        "handlingCode": "rtn",
        "handlingStatusCode": "completed",
        "warehouseRemarks": "cool",
        "handlingUpdatedOnStr": "2022-08-09 08:54:59.8219",
        "sku": null,
        "modifyOn": "0001-01-01T00:00:00",
        "modifyBy": null,
        "modifyOnStr": null,
        "createOn": "0001-01-01T00:00:00",
        "createBy": null,
        "createOnStr": null
      },
    "category": "warehouseUpdateWarehouseRemarks",
    "action": "warehouseUpdateWarehouseRemarks",
    "eventTime": "2022-10-14T10:10:24.866958Z"
  }

|

----

.. _notification-UserUpdateInventorySKU:

User update inventory SKU Notification
**************************************

This notification is sent when users (sellers) update SKU information of a Return Inventory

category: ``userUpdateReturnInventorySku``

action: ``userUpdateReturnInventorySku``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationUpdateInventorySku.csv

Sample:

.. code-block:: json

  {
    "returnRequest": {
        "returnRequestId": 54521,
        "returnRequestNumber": "WUS220808-0000003",
        "sellerReferenceNumber": "WUS220808-0000003",
        "returnStatusCode": "0",
        "returnTitle": "TEST0902-317496",
        "totalValue": 96.0,
        "totalValueCurrency": "usd",
        "remarks": "Created by Warehouse",
        "isArchived": false,
        "returnRequestFrom": "return-helper",
        "modifyOn": "2022-08-09T08:36:58",
        "modifyBy": "3",
        "modifyOnStr": null,
        "createOn": "2022-08-09T08:36:58",
        "createBy": "3",
        "createOnStr": null
    },
    "returnInventory": {
        "returnInventoryId": 13790,
        "warehouseId": 3,
        "returnRequestLineItemId": 27320,
        "returnRequestId": 54521,
        "returnRequestLineItemNumber": "WUSL220808-0000003",
        "sellerReferenceNumber": "WUSL220808-0000003",
        "description": "TEST0902-317496",
        "weight": 74.000,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 96.000,
        "handlingCode": "rtn",
        "handlingStatusCode": "completed",
        "warehouseRemarks": "cool",
        "handlingUpdatedOnStr": "2022-08-09 08:54:59.8219",
        "sku": "AAAA",
        "modifyOn": "0001-01-01T00:00:00",
        "modifyBy": null,
        "modifyOnStr": null,
        "createOn": "0001-01-01T00:00:00",
        "createBy": null,
        "createOnStr": null
    },
    "category": "userUpdateReturnInventorySku",
    "action": "userUpdateReturnInventorySku",
    "eventTime": "2022-10-14T10:18:57.213238Z"
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
         "sellerReferenceNumber":"RL210706-0000020",
         "description":"Nuevo Apple iPad Mini 5 256GB Wifi - Space Grey Gris espacial",
         "quantity":1,
         "weight":100.0,
         "weightUom":"g",
         "valueCurrencyCode":"usd",
         "value":463.0,
         "handlingCode":0,
         "isDeleted":false
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
   "returnRequest": {
      "returnRequestId": 9324,
      "apiId": 21,
      "returnRequestNumber": "UN210708-0000012",
      "sellerReferenceNumber": "UN210708-0000012",
      "returnStatusCode": 0,
      "returnTitle": "tf2021070801",
      "totalValue": 10,
      "totalValueCurrency": "usd",
      "remarks": "Created by Warehouse",
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
      "warehouseId": 8,
      "shipmentNumber": "UN210708-0000012",
      "sellerReferenceNumber": "UN210708-0000012",
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
   "returnInventoryList": [
      {
         "returnInventoryId": 3929,
         "warehouseId": 8,
         "returnRequestLineItemId": 10866,
         "apiId": 21,
         "returnRequestId": 9324,
         "returnRequestLineItemNumber": "UNL210708-0000017",
         "sellerReferenceNumber": "UNL210708-0000017",
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
         "rma": "USE-1005-240523-D00001-25",
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
         "sellerReferenceNumber": "UNL210708-0000017",
         "description": "tf2021070801",
         "quantity": 1,
         "weight": 10,
         "weightUom": "g",
         "valueCurrencyCode": "usd",
         "value": 10,
         "handlingCode": 0,
         "isDeleted": false
         }
      }
   ],
   "category": "rsl",
   "action": "assignUnknown",
   "eventTime": "2021-07-08T14:30:48.6330846Z"
   }

----

.. _notification-completeRecalibrate:

Complete inventory recalibrate notification
*******************************************

This notification is sent when a warehouse recalibrate inventory dimension and weight.

category: ``completeRecalibrate``

action: ``completeRecalibrate``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    recalibrateSupplement, :ref:`notification-recalibrateSupplement`

.. _notification-recalibrateSupplement:

.. csv-table:: `recalibrateSupplement`
    :header: "Name", "Type", "Remarks"
    :widths: 15, 10, 30

    warehouseId, integer_, see :ref:`method-getallwarehouse`
    returnInventoryId, integer_, Return inventory ID
    returnRequestLineItemId, integer_, Return request line item ID
    rma, string_, Warehouse assigned RMA value; see :ref:`gettingstarted-rma`
    dimension1, double_, Dimension 1
    dimension2, double_, Dimension 2
    dimension3, double_, Dimension 3
    weight, double_, Weight
    recalibratedOn, time,

Sample:

.. code-block:: json

   {
    "recalibrateSupplement": {
        "warehouseId": 8,
        "returnInventoryId": 18191,
        "returnRequestLineItemId": 38320,
        "rma": "USE-1005-240523-D00001-25",
        "dimension1": 20.0,
        "dimension2": 20.0,
        "dimension3": 20.0,
        "weight": 310.0,
        "recalibratedOn": "2024-04-04T00:42:11.1325135Z"
    },
    "category": "completeRecalibrate",
    "action": "completeRecalibrate",
    "eventTime": "2024-04-04T00:54:29.4337417Z"
  }


RMA Update Notification
***********************

This notification is sent when a warehouse updates the RMA value. For example, if a warehouse initially assigns an incorrect RMA value to a package and then re-assigns it to the correct one, this notification will be sent.

category: ``notifyUserRmaSwapped``

action: ``notifyUserRmaSwapped``

Sample:

.. code-block:: json
  :emphasize-lines: 5-7

  {
    "payload": {
      "userApiId": 21,
      "clientCode": "RH21",
      "returnInventoryId": "19029",
      "oldRma": "USE-2-240517-D00026-56",
      "newRma": "USE-2-240520-D00001-35"
    },
    "category": "notifyUserRmaSwapped",
    "action": "notifyUserRmaSwapped",
    "eventTime": "2024-05-23T06:26:43.4416977Z"
  }

Split line item notification
****************************

category: ``lineItemVasReturnInventoryLineItem``

action: ``splitLineItem``


.. code-block:: json

  {
  "returnRequestId": 64004,
  "returnRequestLineItemId": 38219,
  "returnRequestLineItemVasId": 2665,
  "vasStatusCode": "SUCCESSFUL",
  "splitLineItemAndReturnInventoryList": [
    {
      "returnRequestLineItem": {
        "returnRequestLineItemId": 38347,
        "apiId": 2,
        "returnRequestId": 64004,
        "returnRequestLineItemNumber": "RL240408-0000012",
        "sellerReferenceNumber": "RL240408-0000012",
        "description": "AA BB CC DD EE",
        "quantity": 1,
        "weight": 213.0,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 22.0,
        "handlingCode": 0,
        "isDeleted": false,
        "isFraudulent": false,
        "fraudReasonCode": null
      },
      "returnInventory": {
        "returnInventoryId": 18202,
        "warehouseId": 2,
        "returnRequestLineItemId": 38347,
        "apiId": 2,
        "returnRequestId": 64004,
        "returnRequestLineItemNumber": "RL240408-0000012",
        "sellerReferenceNumber": "RL240408-0000012",
        "description": "AA BB CC DD EE",
        "quantity": 1,
        "weight": 213.0,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 22.0,
        "handlingCode": 0,
        "handlingStatusCode": 0,
        "completeBy": null,
        "completeOn": null,
        "warehouseRemarks": null,
        "handlingUpdatedOn": null,
        "stopAgingOn": null,
        "sku": null,
        "warehouseApiId": 3,
        "modifyOn": "2024-04-08T07:39:09.2665552Z",
        "modifyBy": "3",
        "createOn": "2024-04-08T07:39:09.262473Z",
        "createBy": "3"
      },
      "returnRequestLineItemSupplement": {
        "returnRequestLineItemSupplementId": 24080,
        "returnRequestLineItemId": 38347,
        "weight": 213.0,
        "weightUom": "g",
        "dimension1": 23.0,
        "dimension2": 21.0,
        "dimension3": 11.0,
        "dimensionUom": "cm",
        "createOn": "2024-04-08T07:39:09.2648212Z",
        "createBy": "3",
        "modifyOn": "2024-04-08T07:39:09.2665658Z",
        "modifyBy": "3",
        "canRecalibrate": true
      }
    },
    {
      "returnRequestLineItem": {
        "returnRequestLineItemId": 38348,
        "apiId": 2,
        "returnRequestId": 64004,
        "returnRequestLineItemNumber": "RL240408-0000013",
        "sellerReferenceNumber": "RL240408-0000013",
        "description": "AA BB CC DD EE",
        "quantity": 1,
        "weight": 123.0,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 22.0,
        "handlingCode": 0,
        "isDeleted": false,
        "isFraudulent": false,
        "fraudReasonCode": null
      },
      "returnInventory": {
        "returnInventoryId": 18203,
        "warehouseId": 2,
        "returnRequestLineItemId": 38348,
        "apiId": 2,
        "returnRequestId": 64004,
        "returnRequestLineItemNumber": "RL240408-0000013",
        "sellerReferenceNumber": "RL240408-0000013",
        "description": "AA BB CC DD EE",
        "quantity": 1,
        "weight": 123.0,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 22.0,
        "handlingCode": 0,
        "handlingStatusCode": 0,
        "completeBy": null,
        "completeOn": null,
        "warehouseRemarks": null,
        "handlingUpdatedOn": null,
        "stopAgingOn": null,
        "sku": null,
        "warehouseApiId": 3,
        "modifyOn": "2024-04-08T07:39:09.2665379Z",
        "modifyBy": "3",
        "createOn": "2024-04-08T07:39:09.2625719Z",
        "createBy": "3"
      },
      "returnRequestLineItemSupplement": {
        "returnRequestLineItemSupplementId": 24081,
        "returnRequestLineItemId": 38348,
        "weight": 123.0,
        "weightUom": "g",
        "dimension1": 23.0,
        "dimension2": 21.0,
        "dimension3": 11.0,
        "dimensionUom": "cm",
        "createOn": "2024-04-08T07:39:09.264853Z",
        "createBy": "3",
        "modifyOn": "2024-04-08T07:39:09.266575Z",
        "modifyBy": "3",
        "canRecalibrate": true
      }
    }
  ],
  "category": "lineItemVasReturnInventoryLineItem",
  "action": "splitLineItem",
  "eventTime": "2024-04-08T07:39:19.8839667Z"
  }

Complete Inventory Handling Notification
****************************************

category: ``rinv``

action: ``completeInventoryHandling``


.. code-block:: json

  {
    "returnInventory": {
        "returnInventoryId": 18203,
        "warehouseId": 2,
        "returnRequestLineItemId": 38348,
        "apiId": 2,
        "returnRequestId": 64004,
        "returnRequestLineItemNumber": "RL240408-0000013",
        "sellerReferenceNumber": "RL240408-0000013",
        "description": "AA BB CC DD EE",
        "quantity": 1,
        "weight": 123.0,
        "weightUom": "g",
        "valueCurrencyCode": "usd",
        "value": 22.0,
        "handlingCode": 2,
        "handlingStatusCode": 2,
        "completeBy": "3",
        "completeOn": "2024-04-08T07:43:55.0619393Z",
        "warehouseRemarks": null,
        "handlingUpdatedOn": "2024-04-08T07:43:55.0623048Z",
        "stopAgingOn": null,
        "sku": null,
        "warehouseApiId": 3,
        "modifyOn": "2024-04-08T07:43:55.0652602Z",
        "modifyBy": "2",
        "createOn": "2024-04-08T07:39:09.2626",
        "createBy": "3"
    },
    "category": "rinv",
    "action": "completeInventoryHandling",
    "eventTime": "2024-04-08T07:44:05.68514Z"
  }

Remark:

.. csv-table:: `handlingCode`
    :header: "ID", "Code", "Description"
    :widths: 10,10,20

    0, tbc, To Be Confirmed
    1, rtn, Recall
    2, dis, Disposal
    3, rsd, Resend
    4, ohd, On Hold
    5, oth, Others

.. csv-table:: `handlingStatusCode`
    :header: "ID", "Code", "Description"
    :widths: 10,10,20

    0, pending, Pending
    1, inProgress, In Progress
    2, completed, Completed

----

.. _notification-updateReturnInventoryMeta:

Update Return Inventory Meta Notification
*****************************************

This notification is sent when a warehouse adds or updates meta information of a return inventory.

category: ``updateReturnInventoryMeta``

action: ``updateReturnInventoryMeta``

.. code-block:: json
  :emphasize-lines: 35-51

  {
    "returnInventory":{
      "returnInventoryId":19769,
      "warehouseId":2,
      "returnRequestLineItemId":41033,
      "apiId":2,
      "returnRequestId":66231,
      "returnRequestLineItemNumber":"UNL240704-0000002",
      "sellerReferenceNumber":"UNL240704-0000002",
      "description":"un-line-item-001",
      "quantity":1,
      "dimension1":20,
      "dimension2":20,
      "dimension3":22,
      "dimensionUom":"cm",
      "canRecalibrate":true,
      "weight":300,
      "weightUom":"g",
      "valueCurrencyCode":"usd",
      "value":30,
      "handlingCode":0,
      "handlingStatusCode":0,
      "completeBy":null,
      "completeOn":null,
      "warehouseRemarks":null,
      "handlingUpdatedOn":"2024-07-04T06:04:50.320813",
      "stopAgingOn":null,
      "sku":null,
      "rma":"USE-2-240704-D00003-12",
      "warehouseApiId":3,
      "modifyOn":"2024-07-04T06:04:50.321891",
      "modifyBy":"3",
      "createOn":"2024-07-04T06:04:50.320886",
      "createBy":"3"
    },
    "returnInventoryMetaList":[
      {
        "returnInventoryId":19769,
        "metaType":"whs",
        "metaMap":{
          "EAN":"987456789876",
          "IMEI":"IMEI956789876567898765453456"
        }
      },
      {
        "returnInventoryId":19769,
        "metaType":"usr",
        "metaMap":{
          "LPN":"LPN6001978"
        }
      }
    ],
    "category":"updateReturnInventoryMeta",
    "action":"updateReturnInventoryMeta",
    "eventTime":"2024-07-11T08:39:59.42014Z"
  }

Remark:

.. csv-table:: `meta`
    :header: "Name", "Description"
    :widths: 10,20

    returnInventoryId, Return inventory id
    metaType, ``usr`` (User) or ``whs`` (Warehouse)
    metaMap, KeyValuePair


----

Consolidate Shipping cost updated notification
**********************************************

This notification is sent when the shipping cost of a consolidated shipping order is updated.

category: ``consolidateShippingOrderShippingFeeUpdated``

action: ``consolidateShippingOrderShippingFeeUpdated``

.. csv-table:: `ConsolidateShippingOrder`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    warehouseApiId, integer_, Warehouse ID
    consolidateShippingOrderId, string_, Unique id for the consolidate shipping order
    consolidateShippingOrderNumber, string_, Human readable order number
    outboundWarehouseId, integer_, Warehouse id of the outbound warehouse; see :ref:`method-getallwarehouse`
    shippingMethod, string_, Shipping method
    consolidateShippingOrderStatus, string_, ``CANCELED`` or ``CONFIRMED`` or ``CREATED`` or ``PARTIALLY_SHIPPED`` or ``READY_TO_SHIP`` or ``SHIPPED``
    shippingFee, double_, Shipping fee
    currencyCode, string_, Currency code
    shipToContactName, string_, Ship to contact name
    shipToPhone, string_, Ship to phone
    shipToFax, string_, Ship to fax
    shipToEmail, string_, Ship to email
    shipToCompanyName, string_, Ship to company name
    shipToStreet1, string_, Ship to street 1
    shipToStreet2, string_, Ship to street 2
    shipToStreet3, string_, Ship to street 3
    shipToCity, string_, Ship to city
    shipToState, string_, Ship to state
    shipToPostalCode, string_, Ship to postal code
    shipToCountry, string_, Ship to country
    deliveryInstructions, string_, Delivery instructions

Sample:

.. code-block:: json

  {
      "order": {
          "apiId": 2,
          "warehouseApiId": 3,
          "consolidateShippingOrderId": "01J9B1T17QMENHXVWBS8P5JW3R",
          "consolidateShippingOrderNumber": "CNS241004-0000002",
          "outboundWarehouseId": 2,
          "shippingMethod": "AIR_FREIGHT",
          "consolidateShippingOrderStatus": "CONFIRMED",
          "shippingFee": 81.0,
          "currencyCode": "USD",
          "shipToContactName": "John Doe",
          "shipToPhone": "+1-555-1234",
          "shipToFax": "+1-555-5678",
          "shipToEmail": "john.doe@example.com",
          "shipToCompanyName": "Doe Industries",
          "shipToStreet1": "123 Elm St",
          "shipToStreet2": "Suite 456",
          "shipToStreet3": "",
          "shipToCity": "Springfield",
          "shipToState": "IL",
          "shipToPostalCode": "62704",
          "shipToCountry": "usa",
          "deliveryInstructions": "Test For UpdateShippingCost"
      },
      "category": "consolidateShippingOrderShippingFeeUpdated",
      "action": "consolidateShippingOrderShippingFeeUpdated",
      "eventTime": "2024-10-04T06:09:46.344665Z",
      "version": "202409",
      "notificationId": "01J9B2C2B8HNR1DRGA74BJQQB5"
  }


----

Consolidate Shipping Order All Inventories Packed notification
**************************************************************

This notification is sent when a warehouse packs all inventories into boxes for a consolidated shipping order.

category: ``consolidateShippingOrderInventoryAllPacked``

action: ``consolidateShippingOrderInventoryAllPacked``

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    consolidateShippingOrderId, string_, Unique id for the consolidate shipping order
    consolidateShippingOrderNumber, string_, Human readable order number
    consolidateShippingOrderStatus, string_, ``CANCELED`` or ``CONFIRMED`` or ``CREATED`` or ``PARTIALLY_SHIPPED`` or ``READY_TO_SHIP`` or ``SHIPPED``
    outboundWarehouseId, integer_, Warehouse id of the outbound warehouse; see :ref:`method-getallwarehouse`
    shippingFee, double_, Shipping fee
    currencyCode, string_, Currency code
    shippingMethod, string_, Shipping method
    customFieldMap, List<:ref:`gettingstarted-customfield`>, Custom Field
    deliveryInstructions, string_, Delivery instructions
    shipmentList, see below, List of shipments in the order

.. csv-table:: `consolidateShippingShipmentList`
    :header: "Name", "Type", "Remarks"
    :widths: 15, 10, 30

    consolidateShippingShipmentId, string_, Unique id for the consolidate shipping shipment
    consolidateShippingShipmentNumber, string_, Human readable shipment number
    consolidateShippingShipmentStatus, string_, ``CREATED`` or ``SHIPPED``
    boxList, :ref:`notification-consolidateShipping-boxList`, List of boxes in the shipment

Sample:

.. code-block:: json

  {
      "order": {
          "consolidateShippingOrderId": "01J9B72DKS8XAFRAWBXT18E143",
          "consolidateShippingOrderNumber": "CNS241004-0000006",
          "consolidateShippingOrderStatus": "CONFIRMED",
          "outboundWarehouseId": 2,
          "shippingFee": 11.0,
          "currencyCode": "usd",
          "shippingMethod": "AIR_FREIGHT",
          "customFieldMap": {},
          "deliveryInstructions": "Test For Confirm order quote",
          "shipmentList": [
              {
                  "consolidateShippingShipmentId": "01J9B754HJQ4F9GX3QJRW05TSV",
                  "consolidateShippingShipmentNumber": "CNSS241004-0000006",
                  "consolidateShippingShipmentStatus": "CREATED",
                  "boxList": [
                      {
                          "consolidateShippingShipmentBoxId": "01J9B75NCC5NV1VRWQ324ZCYQY",
                          "boxNumber": "1",
                          "consolidateShippingShipmentBoxStatus": "IN_PROGRESS",
                          "consolidateShippingInventoryList": [
                              {
                                  "consolidateShippingInventoryId": "01J9B73218NPT5S4XAHG2WA9NH",
                                  "returnInventoryId": 20530,
                                  "rma": "USE-2-240903-D00001-19",
                                  "consolidateShippingInventoryStatus": "PACKED"
                              }
                          ]
                      }
                  ]
              },
              {
                  "consolidateShippingShipmentId": "01J9B73H47Z7R3YAP8WV3N7960",
                  "consolidateShippingShipmentNumber": "CNSS241004-0000005",
                  "consolidateShippingShipmentStatus": "CREATED",
                  "boxList": [
                      {
                          "consolidateShippingShipmentBoxId": "01J9B74V2TGFR5PGCNV4T77BRK",
                          "boxNumber": "1",
                          "consolidateShippingShipmentBoxStatus": "IN_PROGRESS",
                          "consolidateShippingInventoryList": [
                              {
                                  "consolidateShippingInventoryId": "01J9B73218RB618PFPR4VEDRR8",
                                  "returnInventoryId": 20606,
                                  "rma": "USE-2-240906-D00013-0",
                                  "consolidateShippingInventoryStatus": "PACKED"
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      "category": "consolidateShippingOrderInventoryAllPacked",
      "action": "consolidateShippingOrderInventoryAllPacked",
      "eventTime": "2024-10-04T07:36:51.0883217Z",
      "version": "202410",
      "notificationId": "01J9B7BGMG2J0S3DTGH2MX515X"
  }

Consolidate Shipping shipment sent notification
***********************************************

This notification is sent when a warehouse sends a consolidated shipment to a carrier.

category: ``consolidateShippingShipmentSent``

action: ``consolidateShippingShipmentSent``

.. csv-table:: `shipment`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   consolidateShippingOrderId,string_, Unique id for the consolidate shipping order
   consolidateShippingOrderNumber,string_, Human readable order number
   consolidateShippingOrderStatus,string_, ``CANCELED`` or ``CONFIRMED`` or ``CREATED`` or ``PARTIALLY_SHIPPED`` or ``READY_TO_SHIP`` or ``SHIPPED``
   consolidateShippingShipmentId,string_, Unique id for the consolidate shipping shipment
   consolidateShippingShipmentNumber,string_, Human readable shipment number
   consolidateShippingShipmentStatus,string_, ``CREATED`` or ``SHIPPED``
   outboundWarehouseId,integer_, Warehouse id of the outbound warehouse; see :ref:`method-getallwarehouse`
   awb,string_, Air Waybill number
   serviceProvider,string_, name of the service provider
   shipDate,string_, Date of shipment
   customFieldMap, List<:ref:`gettingstarted-customfield`>, Custom Field
   boxList, see below, List of boxes in the shipment

.. _notification-consolidateShipping-boxList:

.. csv-table:: `consolidateShippingBoxList`
    :header: "Name", "Type", "Remarks"
    :widths: 15, 10, 30

    consolidateShippingShipmentBoxId,string_, Unique id for the consolidate shipping box
    boxNumber, string_, Box number
    consolidateShippingShipmentBoxStatus,string_, ``IN_PROGRESS`` or ``SHIPPED``
    consolidateShippingInventoryList, see below, List of inventory in the box

.. csv-table:: `consolidateShippingInventoryList`
    :header: "Name", "Type", "Remarks"
    :widths: 15, 10, 30

    consolidateShippingInventoryId,string_, Unique id for the consolidate shipping inventory
    returnInventoryId, long_, Return inventory id
    rma, string_, RMA
    consolidateShippingInventoryStatus, string_, ``IN_PROGRESS`` or ``PACKED`` or ``PENDING`` or ``SHIPPED``

Sample:

.. code-block:: json

  {
      "shipment": {
          "consolidateShippingOrderId": "01J6BHQXW156FJRN4YYW7BSW9P",
          "consolidateShippingOrderNumber": "CNS240828-0000003",
          "consolidateShippingOrderStatus": "PARTIALLY_SHIPPED",
          "consolidateShippingShipmentId": "01J6BHTRWK2AZGK4VEH5JN4GQ3",
          "consolidateShippingShipmentNumber": "CNSS240828-0000004",
          "consolidateShippingShipmentStatus": "SHIPPED",
          "outboundWarehouseId": 2,
          "awb": "YS2024082800003",
          "serviceProvider": "ups",
          "shipDate": "2024-08-28T03:54:39.851475Z",
          "customFieldMap": {
              "CSB02": "BBB",
              "CSA01": "AAA"
          },
          "boxList": [
              {
                  "consolidateShippingShipmentBoxId": "01J6BHV1EVPWR844DM30AKX0FP",
                  "boxNumber": "box1",
                  "consolidateShippingShipmentBoxStatus": "SHIPPED",
                  "consolidateShippingInventoryList": [
                      {
                          "consolidateShippingInventoryId": "01J6BHR5YKYY884Q6BAR4K9ASP",
                          "returnInventoryId": 20390,
                          "rma": "USE-2-240827-D00016-30",
                          "consolidateShippingInventoryStatus": "SHIPPED"
                      }
                  ]
              }
          ]
      },
      "category": "consolidateShippingShipmentSent",
      "action": "consolidateShippingShipmentSent",
      "eventTime": "2024-08-28T05:49:51.857563Z",
      "version": "202207"
  }

----

Consolidate Shipping AWB updated notification
*********************************************

This notification is sent when the Air Waybill number of a consolidated shipment is updated.

category: ``consolidateShippingShipmentShipped``

action: ``consolidateShippingShipmentShipped``

.. csv-table:: `ConsolidateShippingShipment`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    consolidateShippingOrderId,string_, Unique id for the consolidate shipping order
    consolidateShippingOrderNumber,string_, Human readable order number
    consolidateShippingOrderStatus,string_, ``CANCELED`` or ``CONFIRMED`` or ``CREATED`` or ``PARTIALLY_SHIPPED`` or ``READY_TO_SHIP`` or ``SHIPPED``
    outboundWarehouseId,integer_, Warehouse id of the outbound warehouse; see :ref:`method-getallwarehouse`
    customFieldMap, List<:ref:`gettingstarted-customfield`>, Custom Field
    consolidateShippingShipmentId,string_, Unique id for the consolidate shipping shipment
    consolidateShippingShipmentNumber,string_, Human readable shipment number
    consolidateShippingShipmentStatus,string_, ``CREATED`` or ``SHIPPED``
    awb,string_, Air Waybill number
    serviceProvider,string_, name of the service provider
    shipDate,string_, Date of shipment
    boxList, :ref:`notification-consolidateShipping-boxList`, List of boxes in the shipment

Sample:

.. code-block:: json

  {
      "shipment": {
          "consolidateShippingOrderId": "01J9B4V8WS48SB75Z4T9Q3ZDVX",
          "consolidateShippingOrderNumber": "CNS241004-0000004",
          "consolidateShippingOrderStatus": "PARTIALLY_SHIPPED",
          "outboundWarehouseId": 2,
          "customFieldMap": {},
          "consolidateShippingShipmentId": "01J9B4W52J04Z9W4APY7J25MGR",
          "consolidateShippingShipmentNumber": "CNSS241004-0000004",
          "consolidateShippingShipmentStatus": "SHIPPED",
          "awb": "T202410040655",
          "serviceProvider": "ups",
          "shipDate": "2024-10-04T06:55:23.6587111Z",
          "boxList": [
              {
                  "consolidateShippingShipmentBoxId": "01J9B4WJMVGE46FSE9W15YK262",
                  "boxNumber": "1",
                  "consolidateShippingShipmentBoxStatus": "SHIPPED",
                  "consolidateShippingInventoryList": [
                      {
                          "consolidateShippingInventoryId": "01J9B4VJTF2J9HHXA4T2PCE7PW",
                          "returnInventoryId": 20719,
                          "rma": "USE-2-240916-D00014-15",
                          "consolidateShippingInventoryStatus": "SHIPPED"
                      }
                  ]
              }
          ]
      },
      "category": "consolidateShippingShipmentShipped",
      "action": "consolidateShippingShipmentShipped",
      "eventTime": "2024-10-04T07:01:50.5283889Z",
      "version": "202408",
      "notificationId": "01J9B5BDA0YVGZPTXKCKEMNMG1"
  }

----

Consolidate Shipping order completed notification
*************************************************

This notification is sent when a warehouse completes a consolidate shipping order.

category: ``consolidateShippingOrderCompleted``

action: ``consolidateShippingOrderCompleted``

.. csv-table:: `order`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    consolidateShippingOrderId, string_, Unique id for the consolidate shipping order
    consolidateShippingOrderNumber,string_, Human readable order number
    consolidateShippingOrderStatus,string_, ``CANCELED`` or ``CONFIRMED`` or ``CREATED`` or ``PARTIALLY_SHIPPED`` or ``READY_TO_SHIP`` or ``SHIPPED``
    outboundWarehouseId,integer_, Warehouse id of the outbound warehouse, see :ref:`method-getallwarehouse`
    shippingFee, decimal_, Shipping fee
    currencyCode,string_, Currency code
    shippingMethod,string_, Shipping method
    customFieldMap, List<:ref:`gettingstarted-customfield`>, Custom Field
    deliveryInstructions,string_, Delivery instructions
    shipmentList, see below, List of shipments in the order

.. csv-table:: `shipmentList`
    :header: "Name", "Type", "Remarks"
    :widths: 15, 10, 30

    consolidateShippingShipmentId,string_, Unique id for the consolidate shipping shipment
    consolidateShippingShipmentNumber,string_, Human readable shipment number
    consolidateShippingShipmentStatus,string_, ``CREATED`` or ``SHIPPED``
    awb,string_, Air Waybill number
    serviceProvider,string_, name of the service provider
    shipDate,string_, Date of shipment
    boxList, :ref:`notification-consolidateShipping-boxList`, List of boxes in the shipment

Sample:

.. code-block:: json

  {
      "order": {
          "consolidateShippingOrderId": "01J6C41GDYQ8GM8F3SZCGVNWXF",
          "consolidateShippingOrderNumber": "CNS240828-0000005",
          "consolidateShippingOrderStatus": "SHIPPED",
          "outboundWarehouseId": 2,
          "shippingFee": 59.0,
          "currencyCode": "usd",
          "shippingMethod": "AIR_FREIGHT",
          "customFieldMap": {},
          "deliveryInstructions": "Test For Confirm order quote",
          "shipmentList": [
              {
                  "consolidateShippingShipmentId": "01J6C43G5114F09S2VB257C4ZM",
                  "consolidateShippingShipmentNumber": "CNSS240828-0000007",
                  "consolidateShippingShipmentStatus": "SHIPPED",
                  "awb": "YS2024082800008",
                  "serviceProvider": "dhl",
                  "shipDate": "2024-08-28T09:16:32.554938Z",
                  "boxList": [
                      {
                          "consolidateShippingShipmentBoxId": "01J6C443KFJE6V2BVKBPTP70BW",
                          "boxNumber": "1",
                          "consolidateShippingShipmentBoxStatus": "SHIPPED",
                          "consolidateShippingInventoryList": [
                              {
                                  "consolidateShippingInventoryId": "01J6C41WDJ47KDNRDNECC4K8ZR",
                                  "returnInventoryId": 19787,
                                  "rma": "USE-2-240704-D00020-22",
                                  "consolidateShippingInventoryStatus": "SHIPPED"
                              }
                          ]
                      }
                  ]
              },
              {
                  "consolidateShippingShipmentId": "01J6C44CEWV62PV05WWSHXD1QX",
                  "consolidateShippingShipmentNumber": "CNSS240828-0000008",
                  "consolidateShippingShipmentStatus": "SHIPPED",
                  "awb": "YS2024082800007",
                  "serviceProvider": "ups",
                  "shipDate": "2024-08-28T09:14:03.956307",
                  "boxList": [
                      {
                          "consolidateShippingShipmentBoxId": "01J6C44MAA9A2NM2N5KFSBTTSB",
                          "boxNumber": "1",
                          "consolidateShippingShipmentBoxStatus": "SHIPPED",
                          "consolidateShippingInventoryList": [
                              {
                                  "consolidateShippingInventoryId": "01J6C41WDJVQJ9GFHPY8D88EK7",
                                  "returnInventoryId": 19784,
                                  "rma": "USE-2-240704-D00017-39",
                                  "consolidateShippingInventoryStatus": "SHIPPED"
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      "category": "consolidateShippingOrderCompleted",
      "action": "consolidateShippingOrderCompleted",
      "eventTime": "2024-08-28T09:32:29.087401Z",
      "version": "202408"
  }

----

Consolidate Shipping Order Cancelled Notification
*************************************************

This notification is sent when a warehouse force cancels a consolidate shipping order.

category: ``consolidateShippingOrderCancelled``

action: ``consolidateShippingOrderCancelled``

.. csv-table:: `ConsolidateShippingOrder`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    consolidateShippingOrderId, string_, Unique id for the consolidate shipping order
    consolidateShippingOrderNumber,string_, Human readable order number
    outboundWarehouseId,integer_, Warehouse id of the outbound warehouse; see :ref:`method-getallwarehouse`
    shippingMethod,string_, Shipping method
    shippingFee, decimal_, Shipping fee
    deliveryInstructions,string_, Delivery instructions
    consolidateShippingOrderStatus,string_, ``CANCELED`` or ``CONFIRMED`` or ``CREATED`` or ``PARTIALLY_SHIPPED`` or ``READY_TO_SHIP`` or ``SHIPPED``
    customFieldMap, List<:ref:`gettingstarted-customfield`>, Custom Field

Sample:

.. code-block:: json

  {
      "order": {
          "consolidateShippingOrderId": "01J9B68R054VARA55P0C7G2W6D",
          "consolidateShippingOrderNumber": "CNS241004-0000005",
          "outboundWarehouseId": 2,
          "shippingMethod": "AIR_FREIGHT",
          "shippingFee": 0.0,
          "deliveryInstructions": "Test For cancel order",
          "consolidateShippingOrderStatus": "CANCELED",
          "customFieldMap": {}
      },
      "category": "consolidateShippingOrderCancelled",
      "action": "consolidateShippingOrderCancelled",
      "eventTime": "2024-10-04T07:25:22.7765288Z",
      "version": "202410",
      "notificationId": "01J9B6PGESZ1BJVT70TGV1TWM0"
  }

----

.. _notification-buyerReturnLabelGenerated:

Buyer return label generated notificaiton
*****************************************

This notification is only used for customers that have integrated with our Branded return service.

When a buyer creates a return request in the branded return portal, a return label is generated and this notification is triggered.

category: ``buyerReturnRrLabel``
action: ``buyerReturnLabelGenerated``

.. csv-table:: `BuyerReturn`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

    buyerReturnId, string_, Unique id for the buyer return
    apiId, integer_, API ID
    referenceNumber, string_, Reference number
    returnRequestId, integer_, Return request id
    shipmentId, integer_, Shipment id
    returnRequestNumber, string_, Return request number
    shipmentNumber, string_, Shipment number
    totalValue, decimal_, Total value
    totalValueCurrency, string_, Currency code
    remarks, string_, Remarks
    labelId, string_, Label id
    labelRequestStatusCode, string_, Label request status code
    trackingNumber, string_, Tracking number
    labelFile, :ref:`notification-buyerReturn-labelFile`, Label file
    error, string_, Error
    warehouseId, integer_, Warehouse id; see :ref:`method-getallwarehouse`
    shipmentServiceType, string_, Shipment service type
    shipmentCountryCode, string_, Shipment country code
    shipmentName, string_, Shipment name
    shipmentPhone, string_, Shipment phone
    shipmentFax, string_, Shipment fax
    shipmentEmail, string_, Shipment email
    shipmentStreet1, string_, Shipment street 1
    shipmentStreet2, string_, Shipment street 2
    shipmentStreet3, string_, Shipment street 3
    shipmentState, string_, Shipment state
    shipmentCity, string_, Shipment city
    shipmentPostalCode, string_, Shipment postal code
    costCurrencyCode, string_, Cost currency code
    cost, decimal_, Cost
    boxType, string_, Box type
    weight, decimal_, Weight
    weightUom, string_, Weight unit of measure
    dimension1, decimal_, Dimension 1
    dimension2, decimal_, Dimension 2
    dimension3, decimal_, Dimension 3
    dimensionUom, string_, Dimension unit of measure
    sellerCostCurrencyCode, string_, Seller cost currency code
    sellerCost, decimal_, Seller cost
    buyerCostCurrencyCode, string_, Buyer cost currency code
    buyerCost, decimal_, Buyer cost
    createdAt, string_, Created at
    updatedAt, string_, Updated at
    customFieldMap, List<:ref:`gettingstarted-customfield`>, Custom Field
    buyerReturnLine, List<:ref:`notification-buyerReturn-lineItem`>, Buyer return line item


.. _notification-buyerReturn-labelFile:

.. csv-table:: `labelFile`
    :header: "Name", "Type", "Remarks"
    :widths: 15, 10, 30

    labelUrl, string_, Label URL
    labelKey, string_, Label key


.. _notification-buyerReturn-lineItem:

.. csv-table:: `buyerReturnLineItem`
    :header: "Name", "Type", "Remarks"
    :widths: 15, 10, 30

    buyerReturnLineItemId, string_, Unique id for the buyer return line item
    referenceNumber, string_, Reference number
    description, string_, Description
    quantity, integer_, Quantity
    weight, decimal_, Weight
    weightUom, string_, Weight unit of measure
    value, decimal_, Value
    valueCurrencyCode, string_, Value currency code
    returnReasonCode, string_, Return reason code
    returnReason, string_, Return reason

Sample of a success label generation:

.. code-block:: json
  :emphasize-lines: 16-19

  {
      "buyerReturn": {
          "buyerReturnId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "apiId": 123,
          "referenceNumber": "LBID000050550",
          "returnRequestId": 456,
          "shipmentId": 789,
          "returnRequestNumber": "RRN-001",
          "shipmentNumber": "SHP-001",
          "totalValue": 99.99,
          "totalValueCurrency": "USD",
          "remarks": "Sample remarks",
          "labelId": "1234",
          "labelRequestStatusCode": "success",
          "trackingNumber": "TRK123456789",
          "labelFile": {
              "labelUrl": "https://example.com/label.pdf",
              "labelKey": "label.pdf"
          },
          "error": null,
          "warehouseId": 10,
          "shipmentServiceType": "Standard",
          "shipmentCountryCode": "usa",
          "shipmentName": "John Doe",
          "shipmentPhone": "+1234567890",
          "shipmentFax": "+1987654321",
          "shipmentEmail": "sally.wong+lbtestorder@lovebonito.com",
          "shipmentStreet1": "123 Main St",
          "shipmentStreet2": "Apt 4B",
          "shipmentStreet3": null,
          "shipmentState": "CA",
          "shipmentCity": "Los Angeles",
          "shipmentPostalCode": "90001",
          "costCurrencyCode": "USD",
          "cost": 15.5,
          "boxType": "Medium Box",
          "weight": 2.5,
          "weightUom": "kg",
          "dimension1": 30,
          "dimension2": 20,
          "dimension3": 10,
          "dimensionUom": "cm",
          "sellerCostCurrencyCode": "USD",
          "sellerCost": 10.0,
          "buyerCostCurrencyCode": "USD",
          "buyerCost": 5.5,
          "createdAt": "2023-05-15T10:30:00Z",
          "updatedAt": "2023-05-15T11:45:00Z",
          "customFieldMap": {
              "buyerReturnOrderId": "LBID000050550",
              "buyerReturnEmail": "sally.wong+lbtestorder@lovebonito.com"
          },
          "buyerReturnLineItemList": [
              {
                  "buyerReturnLineItemId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
                  "referenceNumber": "REF123456",
                  "description": "Sample item description",
                  "quantity": 2,
                  "weight": 1.5,
                  "weightUom": "kg",
                  "value": 75.0,
                  "valueCurrencyCode": "USD",
                  "returnReasonCode": "RR123",
                  "returnReason": "Damaged item"
              }
          ]
      },
      "category": "buyerReturnRrLabel",
      "action": "buyerReturnLabelGenerated",
      "eventTime": "2021-09-04T17:03:15.8888073Z",
      "version": "202408"
  }

Sample of a fail label generation:

.. code-block:: json
  :emphasize-lines: 16-17

  {
      "buyerReturn": {
          "buyerReturnId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "apiId": 123,
          "referenceNumber": "REF-001",
          "returnRequestId": 456,
          "shipmentId": 789,
          "returnRequestNumber": "RRN-001",
          "shipmentNumber": "SHP-001",
          "totalValue": 99.99,
          "totalValueCurrency": "USD",
          "remarks": "Sample remarks",
          "labelId": "1234",
          "labelRequestStatusCode": "fail",
          "trackingNumber": null,
          "labelFile": null,
          "error": "Invalid phone number",
          "warehouseId": 10,
          "shipmentServiceType": "Standard",
          "shipmentCountryCode": "usa",
          "shipmentName": "John Doe",
          "shipmentPhone": "+1234567890",
          "shipmentFax": "+1987654321",
          "shipmentEmail": "john.doe@example.com",
          "shipmentStreet1": "123 Main St",
          "shipmentStreet2": "Apt 4B",
          "shipmentStreet3": null,
          "shipmentState": "CA",
          "shipmentCity": "Los Angeles",
          "shipmentPostalCode": "90001",
          "costCurrencyCode": "USD",
          "cost": 15.5,
          "boxType": "Medium Box",
          "weight": 2.5,
          "weightUom": "kg",
          "dimension1": 30,
          "dimension2": 20,
          "dimension3": 10,
          "dimensionUom": "cm",
          "sellerCostCurrencyCode": "USD",
          "sellerCost": 10.0,
          "buyerCostCurrencyCode": "USD",
          "buyerCost": 5.5,
          "createdAt": "2023-05-15T10:30:00Z",
          "updatedAt": "2023-05-15T11:45:00Z",
          "customFieldMap": {
              "buyerReturnOrderId": "LBID000050550",
              "buyerReturnEmail": "sally.wong+lbtestorder@lovebonito.com"
          },
          "buyerReturnLineItemList": [
              {
                  "buyerReturnLineItemId": "d290f1ee-6c54-4b01-90e6-d701748f0851",
                  "referenceNumber": "REF123456",
                  "description": "Sample item description",
                  "quantity": 2,
                  "weight": 1.5,
                  "weightUom": "kg",
                  "value": 75.0,
                  "valueCurrencyCode": "USD",
                  "returnReasonCode": "RR123",
                  "returnReason": "Damaged item"
              }
          ]
      },
      "category": "buyerReturnRrLabel",
      "action": "buyerReturnLabelGenerated",
      "eventTime": "2021-09-04T17:03:15.8888073Z",
      "version": "202408"
  }


.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool
