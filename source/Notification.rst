##################
Notification Api
##################


This notification respone code is 200, the notification will send out.

You need to provided apiEnd port to us setup notification.





Http Notification
=================

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
         "fromEmail":"Bach@Yahoo.com",
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
         "toEmail":"roy@techinthebasket.com",
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
         "shipmentEmail":"Bach@Yahoo.com",
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
            "fromEmail":"Bach@Yahoo.com",
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
            "toEmail":"roy@techinthebasket.com",
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



Return Request
==============

.. _method-createReturnRequest:

CreateReturnRequest
-------------------

::

[POST]  <userapi-endpoint>/returnrequest/createReturnRequest

Parameters:

.. _structure-CreateReturnRequestRequest:

.. csv-table:: ``CreateReturnRequestRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   shipment, :ref:`structure-ShipmentPayload`, YES, Details see below
   returnRequestNumber, string_,,Alphanumeric hyphen and underscore (max length 50). Auto generated if not submitted. (Must be unique)
   returnTitle, string_, YES
   totalValue, decimal_, YES, Must be greater than zero
   totalValueCurrency, string_, YES, must be ``usd`` (case-sensitive)
   remarks, string_
   returnRequestFrom, string_, YES, Must be ``return-helper``
   returnRequestLineItems, List<:ref:`structure-ReturnRequestLineItemPayload`>,YES,Must contains **ONE** item only. Details see below

Object ``ShipmentPayload``:

.. csv-table::
  :header: "Name", "Type", "Required", "Remarks"
  :widths: 15, 10, 10, 30

  warehouseId, integer_ , YES, Obtain from user api :ref:`method-getAllWarehouse` or :ref:`method-getWarehouseByFromCountry`
  shipmentNumber, string_,, Alphanumeric hyphen and underscore (max length 50). Auto generated if not submitted. (Must be unique)
  shipmentServiceType, string_ , YES, Obtain from user api :ref:`method-getServiceTypeByFromToCountry` or :ref:`method-getServiceTypeByFromCountryAndWarehouse`
  shipmentCountryCode, string_ , YES, Obtain from public api :ref:`method-getAllFromCountries`
  shipmentName, string_, YES
  shipmentPhone, string_
  shipmentFax, string_
  shipmentEmail, string_
  shipmentStreet1, string_, YES
  shipmentStreet2, string_
  shipmentStreet3, string_
  shipmentState, string_
  shipmentCity, string_
  shipmentPostalCode, string_
  costCurrencyCode, string_
  cost, decimal_
  boxType, string_, YES, Obtain from public api :ref:`method-getAllBoxTypes`
  weight, decimal_ , YES
  weightUom, string_,YES, Must be ``g``
  dimension1, decimal_, YES, Greater than 0
  dimension2, decimal_, YES, Greater than 0
  dimension3, decimal_, YES, Greater than 0
  dimensionUom, string_, YES, Must be ``cm``

Object ``ReturnRequestLineItemPayload``:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestLineItemNumber, string_, ,Alphanumeric hyphen and underscore (max length 50). Auto generated if not submitted. (Must be unique)
   description, string_, YES
   weight, decimal_, YES
   weightUom, string_,YES, Must be ``g``
   valueCurrencyCode, string_, YES, must be ``usd`` (case-sensitive)
   value, decimal_, YES

Sample:

::

  {
      "shipment":{
         "warehouseId":2,
         "shipmentServiceType":"ups",
         "shipmentCountryCode":"usa",
         "shipmentName":"shipment_test",
         "shipmentPhone":"1234567891",
         "shipmentEmail":"abc@abc.com",
         "shipmentStreet1":"Street1",
         "shipmentStreet2":"Street2",
         "shipmentStreet3":"Street3",
         "shipmentState":"NY",
         "shipmentCity":"New York",
         "shipmentPostalCode":"10001",
         "boxType":"cus",
         "weight":10.0,
         "weightUom":"g",
         "dimension1":1.0,
         "dimension2":1.0,
         "dimension3":1.0,
         "dimensionUom":"cm"
      },
      "returnRequestLineItems":[
         {
            "description":"test",
            "weight":12.0,
            "weightUom":"g",
            "valueCurrencyCode":"usd",
            "value":11.0
         }
      ],
      "returnRequestNumber":"test202105241810",
      "returnTitle":"112e",
      "totalValue":11.0,
      "totalValueCurrency":"usd",
      "remarks":"12312313123",
      "returnRequestFrom":"return-helper"

  }
|



Response:

.. _structure-CreateReturnRequestResponse:

.. csv-table:: ``CreateReturnRequestResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/CreateReturnRequestResponse.csv

|


----

.. _method-createNonRrLabelReturnRequest:

CreateNonRrLabelReturnRequest
-----------------------------

::

[POST]  <userapi-endpoint>/returnrequest/createNonRrLabelReturnRequest

Parameters:

.. _structure-CreateNonRrLabelReturnRequest:

.. csv-table:: ``CreateNonRrLabelReturnRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   shipment, :ref:`structure-CreateNonRrLabelShipmentRequest`, YES, Details see below
   returnRequestNumber, string_,,Alphanumeric hyphen and underscore (max length 50). Auto generated if not submitted. (Must be unique)
   returnTitle, string_, YES
   totalValue, decimal_, YES, Must be greater than zero
   totalValueCurrency, string_, YES, must be ``usd`` (case-sensitive)
   remarks, string_
   returnRequestFrom, string_, YES, Must be ``return-helper``
   returnRequestLineItems, List<:ref:`structure-ReturnRequestLineItemPayload`>,YES,Must contains **ONE** item only. Details see below

.. _structure-CreateNonRrLabelShipmentRequest:

Object ``CreateNonRrLabelShipmentRequest``:

.. csv-table::
  :header: "Name", "Type", "Required", "Remarks"
  :widths: 15, 10, 10, 30

  trackingNumber, string_, YES, Alphanumeric hyphen and underscore (max length 50). Cannot reuse within 92 days.
  carrier, string_, , Max length 225
  warehouseId, integer_ , YES, Obtain from user api :ref:`method-getAllWarehouse` or :ref:`method-getWarehouseByFromCountry`
  shipmentNumber, string_,, Alphanumeric hyphen and underscore (max length 50). Auto generated if not submitted. (Must be unique)
  shipmentServiceType, string_ , YES, Obtain from user api :ref:`method-getServiceTypeByFromToCountry` or :ref:`method-getServiceTypeByFromCountryAndWarehouse`
  shipmentCountryCode, string_ , YES, Obtain from public api :ref:`method-getAllFromCountries`
  shipmentName, string_, YES
  shipmentPhone, string_
  shipmentFax, string_
  shipmentEmail, string_
  shipmentStreet1, string_, YES
  shipmentStreet2, string_
  shipmentStreet3, string_
  shipmentState, string_
  shipmentCity, string_
  shipmentPostalCode, string_
  costCurrencyCode, string_
  cost, decimal_
  boxType, string_, YES, Obtain from public api :ref:`method-getAllBoxTypes`
  weight, decimal_ , YES
  weightUom, string_,YES, Must be ``g``
  dimension1, decimal_, YES, Greater than 0
  dimension2, decimal_, YES, Greater than 0
  dimension3, decimal_, YES, Greater than 0
  dimensionUom, string_, YES, Must be ``cm``


Object ``ReturnRequestLineItemPayload``:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestLineItemNumber, string_, ,Alphanumeric hyphen and underscore (max length 50). (Must be unique)
   description, string_, YES
   weight, decimal_, YES
   weightUom, string_,YES, Must be ``g``
   valueCurrencyCode, string_, YES, must be ``usd`` (case-sensitive)
   value, decimal_, YES


Sample:

::

     {
         "shipment": {
            "boxType": "cus",
            "shipmentCity": "city",
            "shipmentCountryCode": "esp",
            "shipmentServiceType": "nrhl",
            "shipmentEmail": "email@email.com",
            "shipmentName": "Shipment_sample02",
            "shipmentPhone": "1234567890",
            "shipmentStreet1": "street 1",
            "shipmentStreet2": "street 2",
            "shipmentStreet3": "street 3",
            "shipmentPostalCode": "123",
            "shipmentState": "M50 UE",
            "dimension1": 20,
            "dimension2": 20,
            "dimension3": 22,
            "dimensionUom": "cm",
            "warehouseId": 3,
            "weight": 150,
            "weightUom": "g",
            "trackingNumber": "20200319-005"
         },
         "returnRequestLineItems":[
            {
               "description": "item1",
               "quantity": 1,
               "refId": "",
               "value": 10,
               "valueCurrencyCode": "usd",
               "weight": 10,
               "weightUom": "g"
            }
         ],
         "returnTitle":"201800521-004",
         "totalValue":11.0,
         "totalValueCurrency":"usd",
         "remarks":"testing03",
         "returnRequestFrom":"return-helper"

     }
|


Response:

.. csv-table:: ``CreateReturnRequestResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/CreateReturnRequestResponse.csv

|

----

.. _method-EditReturnRequest:

EditReturnRequest
-----------------

::

[POST]  <userapi-endpoint>/returnrequest/editReturnRequest

Only allow when shipment status equals to ``no-label`` ``lb-failed``

Parameters:

.. _structure-EditReturnRequestRequest:

.. csv-table:: ``EditReturnRequestRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnRequest/EditReturnRequestRequest.csv


|

Response:

.. csv-table:: ``CreateReturnRequestResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/CreateReturnRequestResponse.csv

|

----

.. _method-GetReturnRequest:

GetReturnRequest
----------------

::

[GET]  <userapi-endpoint>/returnrequest/getReturnRequest

Parameters:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestId, integer_

|

Response:

.. _structure-ReturnRequestResponse:

.. csv-table:: ``ReturnRequestResponse`` (inherit :ref:`structure-ReturnRequestPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ReturnRequestResponse.csv

|

----

.. _method-searchReturnRequest:

searchReturnRequest
-------------------

::

[GET]  <userapi-endpoint>/returnrequest/searchReturnRequest

Parameters:

.. _structure-GetReturnRequestListRequest:

.. csv-table:: ``GetReturnRequestListRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnRequest/GetReturnRequestListRequest.csv

|

Response:

.. _structure-ReturnRequestListResponse:

.. csv-table:: ``ReturnRequestListResponse`` (inherit :ref:`structure-PaginationResponse`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnRequests, List<:ref:`structure-ReturnRequestPayload`>

|

----

.. _method-UpdateReturnRequestHandling:

UpdateReturnRequestHandling
---------------------------

::

[POST]  <userapi-endpoint>/returnrequest/updateReturnRequestHandling

Parameters:

.. _structure-UpdateReturnRequestHandlingRequest:

.. csv-table:: ``UpdateReturnRequestHandlingRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestId, integer_
   returnRequestLineItemHandling, List<:ref:`structure-UpdateReturnRequestLineItemHandlingRequest`>

|

Response:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   correlationId, string_
   meta, :ref:`structure-ApiResponseMeta`

|

----

.. _method-CreateVas:

CreateVas
---------

::

[POST]  <userapi-endpoint>/returnrequest/createVas

Parameters:

.. _structure-CreateVasRequest:

.. csv-table:: ``CreateVasRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   createLineItemVasRequestList, List<:ref:`link-CreateReturnRequestLineItemVasRequest`>, YES

Object ``CreateReturnRequestLineItemVasRequest``

.. _link-CreateReturnRequestLineItemVasRequest:

.. csv-table:: ``CreateReturnRequestLineItemVasRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestLineItemId, long_, Required, Line Item must be ``On-hold`` in order to create Vas
   vasCode, string_, Required, ``mobi-fmt``(Format Mobile phone) ``mobi-imei``(Check Mobile Phone IMEI) ``mobi-lock``(Check Mobile Phone Lock status) ``prd-inspec``(Product inspection) ``repack``(Repack) ``req-pic``(Take pictures) ``split-parcel``(Split Parcel)
   metaQuantity, integer_, Conditional, Only Required for `vasCode`: ``split-parcel``(1-50) ``req-pic``(grater than 0)
   notes, string_

Sample:

::

  {
      "createLineItemVasRequestList": [
         {
         "returnRequestLineItemId": {{returnRequestLineItemId}},
         "notes": "Split parcel into 3",
         "vasCode": "split-parcel",
         "metaQuantity": 3
         }
    ]
  }

|

Response:

.. _structure-CreateVasResponse:

.. csv-table:: ``CreateVasResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/CreateVasResponse.csv

|

----

.. _method-updateRemark:

UpdateRemark
------------

::

[POST]  <userapi-endpoint>/returnrequest/updateRemark

Parameters:

.. _structure-UpdateRemarkRequest:

.. csv-table:: ``UpdateRemarkRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnRequest/UpdateRemarkRequest.csv

|

Response:

.. csv-table:: ``ReturnRequestResponse`` (inherit :ref:`structure-ReturnRequestPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ReturnRequestResponse.csv

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