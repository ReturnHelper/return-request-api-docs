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

   timestamp, string_ , UTC now (ISO8601)
   signature, string_ , See ``Signature`` section

Signature
*********

This section explains how signature are generated so clients can verify the authenticity and integrity of our notification message.
**Clients should always verify the signature before processing the payload data.**

To understand how signature are generated, consider the notification example below:

.. code-block:: html

  Header
  Signature: xxxxx
  Timestamp: 2021-06-16T15:26:27Z 
  
  Body
  `{"a": "b"}`


Verifying signatures:

1. | **Extracting the Timestamp and Signature from the header**
2. | **Preparing the string_to_sign**
   | The string_to_sign string is created by concatenating: 
   |  - HTTP action (which always be POST)
   |  - Notification endpoint
   |  - The timestamp (as a string)
   |  - The actual JSON payload (aka the request body)
   | Example: ``POSThttps://www.google.com2021-06-16T15:26:27Z{"a":"b"}``
   |
   | Encode the UTF8 string to Base64
   | Example: ``UE9TVGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20yMDIxLTA2LTE2VDE1OjI2OjI3WiJ7XCJhXCI6XCJiXCJ9Ig==``
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

.. csv-table:: Label Result Notification
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationGenLabel.csv

Sample:

.. code-block:: json

      {
         "statusDto":{
            "label":{
               "labelId":9714,
               "shipmentId":9204,
               "apiId":21,
               "refKey":"S210707-0000017",
               "labelRequestId":3501,
               "labelRequestStatusCode":3,
               "serviceType":"ucss",
               "trackingNumber":"6A21511647263",
               "labelUrl":"https://label-service-dev-files.returnshelper.com/label/202107/3501-S210707-0000017-iy35wrnxkyk.pdf",
               "error":null,
               "fromCountryCode":"fra",
               "fromName":"Test",
               "fromPhone":"1234567890",
               "fromFax":null,
               "fromEmail":"test@returnhelper.com",
               "fromStreet1":"Paris",
               "fromStreet2":"Paris",
               "fromStreet3":"Paris",
               "fromState":"Paris",
               "fromCity":"Paris",
               "fromPostalCode":"75000",
               "toCountryCode":"fra",
               "toName":"RH21",
               "toPhone":"0171563428",
               "toFax":"0188321897",
               "toEmail":"roy@techinthebasket.com",
               "toStreet1":"80 Quai du Parc",
               "toStreet2":null,
               "toStreet3":null,
               "toState":"Saint Maur",
               "toCity":"Saint Maur",
               "toPostalCode":"94100",
               "toCompany":"BLEUCIEL FRANCE LOGISTIC",
               "fromCompany":"Return Helper Service",
               "carrier":null,
               "referenceNumber":null
            },
            "shipment":{
               "shipmentId":9204,
               "apiId":21,
               "returnRequestId":9263,
               "labelId":9714,
               "apiTransactionId":0,
               "warehouseId":8,
               "shipmentNumber":"S210707-0000017",
               "shipmentStatusCode":2,
               "shipmentServiceType":5,
               "shipmentCountryCode":"fra",
               "shipmentName":"Stanley",
               "shipmentPhone":"1234567890",
               "shipmentFax":null,
               "shipmentEmail":"test@returnhelper.com",
               "shipmentStreet1":"Paris",
               "shipmentStreet2":"Paris",
               "shipmentStreet3":"Paris",
               "shipmentState":"Paris",
               "shipmentCity":"Paris",
               "shipmentPostalCode":"75000",
               "costCurrencyCode":"usd",
               "cost":19.38,
               "boxType":"cus",
               "weight":4000.0,
               "weightUom":"g",
               "dimension1":15.0,
               "dimension2":15.0,
               "dimension3":15.0,
               "dimensionUom":"cm",
               "isRrLabel":true,
               "receiveDate":null,
               "referenceNumber":null,
               "modifyOn":"2021-07-07T05:53:28.6347145Z",
               "modifyBy":"21",
               "createOn":"2021-07-07T05:53:10",
               "createBy":"21"
            },
            "returnRequest":{
               "returnRequestId":9263,
               "apiId":21,
               "returnRequestNumber":"e0bca915-413a-4f92-b5d9-a1734195f206",
               "returnStatusCode":3,
               "returnTitle":"Test2021070701",
               "totalValue":100.0,
               "totalValueCurrency":"usd",
               "remarks":"Test2021070701",
               "warehouseRma":null,
               "isArchived":false,
               "returnRequestSourceType":0,
               "modifyOn":"2021-07-07T05:53:28.6347547Z",
               "modifyBy":"21",
               "createOn":"2021-07-07T05:53:10",
               "createBy":"21"
            },
            "updateLabelResult":{
               "Item1":true,
               "Item2":{
                  "labelId":9714,
                  "shipmentId":9204,
                  "apiId":21,
                  "refKey":"S210707-0000017",
                  "labelRequestId":3501,
                  "labelRequestStatusCode":1,
                  "serviceType":"ucss",
                  "trackingNumber":null,
                  "labelUrl":null,
                  "error":null,
                  "fromCountryCode":"fra",
                  "fromName":"Stanley",
                  "fromPhone":"1234567890",
                  "fromFax":null,
                  "fromEmail":"test@returnhelper.com",
                  "fromStreet1":"Paris",
                  "fromStreet2":"Paris",
                  "fromStreet3":"Paris",
                  "fromState":"Paris",
                  "fromCity":"Paris",
                  "fromPostalCode":"75000",
                  "toCountryCode":"fra",
                  "toName":"RH21",
                  "toPhone":"0171563428",
                  "toFax":"0188321897",
                  "toEmail":"roy@techinthebasket.com",
                  "toStreet1":"80 Quai du Parc",
                  "toStreet2":null,
                  "toStreet3":null,
                  "toState":"Saint Maur",
                  "toCity":"Saint Maur",
                  "toPostalCode":"94100",
                  "toCompany":"BLEUCIEL FRANCE LOGISTIC",
                  "fromCompany":"Return Helper Service",
                  "carrier":null,
                  "referenceNumber":null
               },
               "Item3":{
                  "labelId":9714,
                  "shipmentId":9204,
                  "apiId":21,
                  "refKey":"S210707-0000017",
                  "labelRequestId":3501,
                  "labelRequestStatusCode":3,
                  "serviceType":"ucss",
                  "trackingNumber":"6A21511647263",
                  "labelUrl":"https://label-service-dev-files.returnshelper.com/label/202107/3501-S210707-0000017-iy35wrnxkyk.pdf",
                  "error":null,
                  "fromCountryCode":"fra",
                  "fromName":"Stanley",
                  "fromPhone":"1234567890",
                  "fromFax":null,
                  "fromEmail":"test@returnhelper.com",
                  "fromStreet1":"Paris",
                  "fromStreet2":"Paris",
                  "fromStreet3":"Paris",
                  "fromState":"Paris",
                  "fromCity":"Paris",
                  "fromPostalCode":"75000",
                  "toCountryCode":"fra",
                  "toName":"RH21",
                  "toPhone":"0171563428",
                  "toFax":"0188321897",
                  "toEmail":"roy@techinthebasket.com",
                  "toStreet1":"80 Quai du Parc",
                  "toStreet2":null,
                  "toStreet3":null,
                  "toState":"Saint Maur",
                  "toCity":"Saint Maur",
                  "toPostalCode":"94100",
                  "toCompany":"BLEUCIEL FRANCE LOGISTIC",
                  "fromCompany":"Return Helper Service",
                  "carrier":null,
                  "referenceNumber":null
               }
            },
            "updateShipmentResult":{
               "Item1":true,
               "Item2":{
                  "shipmentId":9204,
                  "apiId":21,
                  "returnRequestId":9263,
                  "labelId":9714,
                  "apiTransactionId":0,
                  "warehouseId":8,
                  "shipmentNumber":"S210707-0000017",
                  "shipmentStatusCode":3,
                  "shipmentServiceType":5,
                  "shipmentCountryCode":"fra",
                  "shipmentName":"Stanley",
                  "shipmentPhone":"1234567890",
                  "shipmentFax":null,
                  "shipmentEmail":"test@returnhelper.com",
                  "shipmentStreet1":"Paris",
                  "shipmentStreet2":"Paris",
                  "shipmentStreet3":"Paris",
                  "shipmentState":"Paris",
                  "shipmentCity":"Paris",
                  "shipmentPostalCode":"75000",
                  "costCurrencyCode":"usd",
                  "cost":19.38,
                  "boxType":"cus",
                  "weight":4000.0,
                  "weightUom":"g",
                  "dimension1":15.0,
                  "dimension2":15.0,
                  "dimension3":15.0,
                  "dimensionUom":"cm",
                  "isRrLabel":true,
                  "receiveDate":null,
                  "referenceNumber":null,
                  "modifyOn":"2021-07-07T05:53:22",
                  "modifyBy":"21",
                  "createOn":"2021-07-07T05:53:10",
                  "createBy":"21"
               },
               "Item3":{
                  "shipmentId":9204,
                  "apiId":21,
                  "returnRequestId":9263,
                  "labelId":9714,
                  "apiTransactionId":0,
                  "warehouseId":8,
                  "shipmentNumber":"S210707-0000017",
                  "shipmentStatusCode":2,
                  "shipmentServiceType":5,
                  "shipmentCountryCode":"fra",
                  "shipmentName":"Stanley",
                  "shipmentPhone":"1234567890",
                  "shipmentFax":null,
                  "shipmentEmail":"test@returnhelper.com",
                  "shipmentStreet1":"Paris",
                  "shipmentStreet2":"Paris",
                  "shipmentStreet3":"Paris",
                  "shipmentState":"Paris",
                  "shipmentCity":"Paris",
                  "shipmentPostalCode":"75000",
                  "costCurrencyCode":"usd",
                  "cost":19.38,
                  "boxType":"cus",
                  "weight":4000.0,
                  "weightUom":"g",
                  "dimension1":15.0,
                  "dimension2":15.0,
                  "dimension3":15.0,
                  "dimensionUom":"cm",
                  "isRrLabel":true,
                  "receiveDate":null,
                  "referenceNumber":null,
                  "modifyOn":"2021-07-07T05:53:28.6347145Z",
                  "modifyBy":"21",
                  "createOn":"2021-07-07T05:53:10",
                  "createBy":"21"
               }
            },
            "updateReturnRequestResult":{
               "Item1":true,
               "Item2":{
                  "returnRequestId":9263,
                  "apiId":21,
                  "returnRequestNumber":"e0bca915-413a-4f92-b5d9-a1734195f206",
                  "returnStatusCode":4,
                  "returnTitle":"Test2021070701",
                  "totalValue":100.0,
                  "totalValueCurrency":"usd",
                  "remarks":"Test2021070701",
                  "warehouseRma":null,
                  "isArchived":false,
                  "returnRequestSourceType":0,
                  "modifyOn":"2021-07-07T05:53:10",
                  "modifyBy":"21",
                  "createOn":"2021-07-07T05:53:10",
                  "createBy":"21"
               },
               "Item3":{
                  "returnRequestId":9263,
                  "apiId":21,
                  "returnRequestNumber":"e0bca915-413a-4f92-b5d9-a1734195f206",
                  "returnStatusCode":3,
                  "returnTitle":"Test2021070701",
                  "totalValue":100.0,
                  "totalValueCurrency":"usd",
                  "remarks":"Test2021070701",
                  "warehouseRma":null,
                  "isArchived":false,
                  "returnRequestSourceType":0,
                  "modifyOn":"2021-07-07T05:53:28.6347547Z",
                  "modifyBy":"21",
                  "createOn":"2021-07-07T05:53:10",
                  "createBy":"21"
               }
            }
         },
         "category":"labelGenerated",
         "action":"labelGenerated",
         "eventTime":"2021-07-07T05:53:28.8015698Z"
      }

|

This is a label create fail example, please check the highlight area:

.. code-block:: json
   :emphasize-lines: 12-16

      {
         "statusDto": {
         "label": {
            "labelId": 9690,
            "shipmentId": 9180,
            "apiId": 2,
            "refKey": "S210706-0000022",
            "labelRequestId": 3497,
            "labelRequestStatusCode": 0,
            "serviceType": "usps",
            "trackingNumber": null,
            "labelUrl": null,
            "error": {
               "path":"data.shipment.ship_to.state",
               "info":"data.shipment.ship_to.state should be one of [Alaska,Alabama,Arkansas,American Samoa,Arizona,California,Colorado,Connecticut,District of Columbia,Delaware,Florida,Georgia,Guam,Hawaii,Iowa,Idaho,Illinois,Indiana,Kansas,Commonwealth of Kentucky,Kentucky,Louisiana,Commonwealth of Massachusetts,Massachusetts,Maryland,Maine,Michigan,Minnesota,Missouri,CNMI,Commonwealth of the Northern Mariana Islands,Northern Mariana Islands,Mississippi,Montana,North Carolina,North Dakota,Nebraska,New Hampshire,New Jersey,New Mexico,Nevada,New York,Ohio,Oklahoma,Oregon,Commonwealth of Pennsylvania,Pennsylvania,Commonwealth of Puerto Rico,Puerto Rico,Rhode Island,State of Rhode Island and Providence Plantations,South Carolina,South Dakota,Tennessee,Texas,United States Minor Outlying Islands,Utah,Commonwealth of Virginia,Virginia,American Virgin Islands,U.S. Virgin Islands,United States Virgin Islands,USVI,Virgin Islands,Virgin Islands of the United States,Virgin Islands, U.S.,Vermont,District of Columbia,the District,Washington,Washington, D.C.,Wisconsin,West Virginia,Wyoming] or its 2-letter code."
            },
            "fromCountryCode": "usa",
            "fromName": "Thomas R Stanton",
            "fromPhone": "2164851626",
            "fromFax": null,
            "fromEmail": "8gftuk2r4jb@temporary-mail.net",
            "fromStreet1": "2638  Peaceful Lane",
            "fromStreet2": null,
            "fromStreet3": null,
            "fromState": "OH",
            "fromCity": "Cleveland",
            "fromPostalCode": "44109",
            "toCountryCode": "usa",
            "toName": "RH2",
            "toPhone": "8554377467",
            "toFax": "7327187923",
            "toEmail": null,
            "toStreet1": "2A Corn Road",
            "toStreet2": null,
            "toStreet3": null,
            "toState": "NJ",
            "toCity": "Dayton",
            "toPostalCode": "08810",
            "toCompany": "IDS Online Corp",
            "fromCompany": "Return Helper Service",
            "carrier": null,
            "referenceNumber": null
         },
         "shipment": {
            "shipmentId": 9180,
            "apiId": 2,
            "returnRequestId": 9239,
            "labelId": 9690,
            "apiTransactionId": 0,
            "warehouseId": 2,
            "shipmentNumber": "S210706-0000022",
            "shipmentStatusCode": 1,
            "shipmentServiceType": 2,
            "shipmentCountryCode": "usa",
            "shipmentName": "Thomas R Stanton",
            "shipmentPhone": "2164851626",
            "shipmentFax": null,
            "shipmentEmail": "8gftuk2r4jb@temporary-mail.net",
            "shipmentStreet1": "2638  Peaceful Lane",
            "shipmentStreet2": null,
            "shipmentStreet3": null,
            "shipmentState": "OH",
            "shipmentCity": "Cleveland",
            "shipmentPostalCode": "44109",
            "costCurrencyCode": "usd",
            "cost": 12.89,
            "boxType": "cus",
            "weight": 1234,
            "weightUom": "g",
            "dimension1": 10,
            "dimension2": 10,
            "dimension3": 10,
            "dimensionUom": "cm",
            "isRrLabel": true,
            "receiveDate": null,
            "referenceNumber": null,
            "modifyOn": "2021-07-06T15:09:18.0323391Z",
            "modifyBy": "2",
            "createOn": "2021-07-06T15:09:08",
            "createBy": "2"
         },
         "returnRequest": {
            "returnRequestId": 9239,
            "apiId": 2,
            "returnRequestNumber": "R210706-0000011",
            "returnStatusCode": 4,
            "returnTitle": "lkjsdfsdf",
            "totalValue": 122,
            "totalValueCurrency": "usd",
            "remarks": null,
            "warehouseRma": null,
            "isArchived": false,
            "returnRequestSourceType": 0,
            "modifyOn": "2021-07-06T15:09:08",
            "modifyBy": "2",
            "createOn": "2021-07-06T15:09:08",
            "createBy": "2"
         },
         "updateLabelResult": {
            "Item1": true,
            "Item2": {
               "labelId": 9690,
               "shipmentId": 9180,
               "apiId": 2,
               "refKey": "S210706-0000022",
               "labelRequestId": 3497,
               "labelRequestStatusCode": 1,
               "serviceType": "usps",
               "trackingNumber": null,
               "labelUrl": null,
               "error": null,
               "fromCountryCode": "usa",
               "fromName": "Thomas R Stanton",
               "fromPhone": "2164851626",
               "fromFax": null,
               "fromEmail": "8gftuk2r4jb@temporary-mail.net",
               "fromStreet1": "2638  Peaceful Lane",
               "fromStreet2": null,
               "fromStreet3": null,
               "fromState": "OH",
               "fromCity": "Cleveland",
               "fromPostalCode": "44109",
               "toCountryCode": "usa",
               "toName": "RH2",
               "toPhone": "8554377467",
               "toFax": "7327187923",
               "toEmail": null,
               "toStreet1": "2A Corn Road",
               "toStreet2": null,
               "toStreet3": null,
               "toState": "NJ",
               "toCity": "Dayton",
               "toPostalCode": "08810",
               "toCompany": "IDS Online Corp",
               "fromCompany": "Return Helper Service",
               "carrier": null,
               "referenceNumber": null
            },
            "Item3": {
               "labelId": 9690,
               "shipmentId": 9180,
               "apiId": 2,
               "refKey": "S210706-0000022",
               "labelRequestId": 3497,
               "labelRequestStatusCode": 0,
               "serviceType": "usps",
               "trackingNumber": null,
               "labelUrl": null,
               "error": "[]",
               "fromCountryCode": "usa",
               "fromName": "Thomas R Stanton",
               "fromPhone": "2164851626",
               "fromFax": null,
               "fromEmail": "8gftuk2r4jb@temporary-mail.net",
               "fromStreet1": "2638  Peaceful Lane",
               "fromStreet2": null,
               "fromStreet3": null,
               "fromState": "OH",
               "fromCity": "Cleveland",
               "fromPostalCode": "44109",
               "toCountryCode": "usa",
               "toName": "RH2",
               "toPhone": "8554377467",
               "toFax": "7327187923",
               "toEmail": null,
               "toStreet1": "2A Corn Road",
               "toStreet2": null,
               "toStreet3": null,
               "toState": "NJ",
               "toCity": "Dayton",
               "toPostalCode": "08810",
               "toCompany": "IDS Online Corp",
               "fromCompany": "Return Helper Service",
               "carrier": null,
               "referenceNumber": null
            }
         },
         "updateShipmentResult": {
            "Item1": true,
            "Item2": {
               "shipmentId": 9180,
               "apiId": 2,
               "returnRequestId": 9239,
               "labelId": 9690,
               "apiTransactionId": 0,
               "warehouseId": 2,
               "shipmentNumber": "S210706-0000022",
               "shipmentStatusCode": 3,
               "shipmentServiceType": 2,
               "shipmentCountryCode": "usa",
               "shipmentName": "Thomas R Stanton",
               "shipmentPhone": "2164851626",
               "shipmentFax": null,
               "shipmentEmail": "8gftuk2r4jb@temporary-mail.net",
               "shipmentStreet1": "2638  Peaceful Lane",
               "shipmentStreet2": null,
               "shipmentStreet3": null,
               "shipmentState": "OH",
               "shipmentCity": "Cleveland",
               "shipmentPostalCode": "44109",
               "costCurrencyCode": "usd",
               "cost": 12.89,
               "boxType": "cus",
               "weight": 1234,
               "weightUom": "g",
               "dimension1": 10,
               "dimension2": 10,
               "dimension3": 10,
               "dimensionUom": "cm",
               "isRrLabel": true,
               "receiveDate": null,
               "referenceNumber": null,
               "modifyOn": "2021-07-06T15:09:17",
               "modifyBy": "2",
               "createOn": "2021-07-06T15:09:08",
               "createBy": "2"
            },
            "Item3": {
               "shipmentId": 9180,
               "apiId": 2,
               "returnRequestId": 9239,
               "labelId": 9690,
               "apiTransactionId": 0,
               "warehouseId": 2,
               "shipmentNumber": "S210706-0000022",
               "shipmentStatusCode": 1,
               "shipmentServiceType": 2,
               "shipmentCountryCode": "usa",
               "shipmentName": "Thomas R Stanton",
               "shipmentPhone": "2164851626",
               "shipmentFax": null,
               "shipmentEmail": "8gftuk2r4jb@temporary-mail.net",
               "shipmentStreet1": "2638  Peaceful Lane",
               "shipmentStreet2": null,
               "shipmentStreet3": null,
               "shipmentState": "OH",
               "shipmentCity": "Cleveland",
               "shipmentPostalCode": "44109",
               "costCurrencyCode": "usd",
               "cost": 12.89,
               "boxType": "cus",
               "weight": 1234,
               "weightUom": "g",
               "dimension1": 10,
               "dimension2": 10,
               "dimension3": 10,
               "dimensionUom": "cm",
               "isRrLabel": true,
               "receiveDate": null,
               "referenceNumber": null,
               "modifyOn": "2021-07-06T15:09:18.0323391Z",
               "modifyBy": "2",
               "createOn": "2021-07-06T15:09:08",
               "createBy": "2"
            }
         },
         "updateReturnRequestResult": {
            "Item1": false,
            "Item2": {
               "returnRequestId": 9239,
               "apiId": 2,
               "returnRequestNumber": "R210706-0000011",
               "returnStatusCode": 4,
               "returnTitle": "lkjsdfsdf",
               "totalValue": 122,
               "totalValueCurrency": "usd",
               "remarks": null,
               "warehouseRma": null,
               "isArchived": false,
               "returnRequestSourceType": 0,
               "modifyOn": "2021-07-06T15:09:08",
               "modifyBy": "2",
               "createOn": "2021-07-06T15:09:08",
               "createBy": "2"
            },
            "Item3": null
         }
         },
         "category": "labelGenerated",
         "action": "labelGenerated",
         "eventTime": "2021-07-06T15:09:18.2081063Z"
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


.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool