##################
Notification
##################


when notification respone code is 200, the notification will send out.

You need to provided api Endport to us setup notification.





Http Notification
=================

.. _notification-label:

Label Notification
-------------------

::

Parameters: No Input

Response:

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/LabelNotificationResponse.csv

|

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationGenLabelResponse.csv



Sample:

::
  
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


Recall tracking number Notification
-------------------

::

Parameters: No Input

Response:

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/LabelNotificationResponse.csv

|


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationRecallResponse.csv

|

Sample:

::
  
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

Resend tracking number  Notification
-------------------

::

Parameters: No Input

Response:

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/LabelNotificationResponse.csv

|


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/NotificationResendResponse.csv

Sample:

::
      
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


.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool