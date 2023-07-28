###############
Return User API
###############

General
=======

.. _method-GetApiBalance:

GetApiBalance
-------------------

::

[GET] <userapi-endpoint>/ApiBalance/GetApiBalance

Parameters:

.. csv-table::
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10,10, 30

   pageSize, integer_,Yes,max 50
   offset, integer_,Yes

|

Response:

.. _structure-ApiBalanceListResponse:

.. csv-table:: ``ApiBalanceListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiBalanceListResponse.csv

|

----

.. _method-GetAllWarehouse:

GetAllWarehouse
---------------

::

[Get] <userapi-endpoint>/warehouse/getAllWarehouse

Parameters: No Input

Response:

.. _structure-WarehouseListResponse:

.. csv-table:: ``WarehouseListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/WarehouseListResponse.csv

|

----

.. _method-GetWarehouseByFromCountry:

GetWarehouseByFromCountry
-------------------------

::

[Get] <userapi-endpoint>/warehouse/getWarehouseByFromCountry

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   countryCode, string_

Response:

.. csv-table:: ``WarehouseListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/WarehouseListResponse.csv

|

----

.. _method-GetWarehouse:

GetWarehouse
------------

::

[Get] <userapi-endpoint>/warehouse/getWarehouse

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   warehouseId, string_,Max Length 35

Response:

.. _structure-WarehouseResponse:

.. csv-table:: ``WarehouseResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/WarehouseResponse.csv

|

----

.. _method-SearchWarehouse:

SearchWarehouse
---------------

::

[POST] <userapi-endpoint>/warehouse/searchWarehouse

Parameters:

.. _structure-UserSearchWarehouseRequest:

.. csv-table:: ``UserSearchWarehouseRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UserSearchWarehouseRequest.csv

Response:

.. _structure-UserSearchWarehouseResponse:

.. csv-table:: ``UserSearchWarehouseResponse`` (inherit :ref:`structure-PaginationResponse`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UserSearchWarehouseResponse.csv

|

----

Service Type
============

.. _method-GetServiceType:

GetShippingFeeListByFromShippingOption
---------------------------------------

This API is for getting **RETURN** service types only. For resend service types please check :ref:`method-getAvailableShipmentServiceType`.

Get service type fee list by fromCountry and fromPostalCode. Responses are sorted by shipping fee in ascending order.
To get the lowest fee service type, please set ``limit=1``.

::

[GET] <userapi-endpoint>/Shipment/getShippingFeeListByFromShippingOption

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fromCountry, string_, Required
   fromPostalCode, string_, Required
   weight, decimal_, Required
   limit, integer_, Optional. Number of service types to be responsed. Default value is 0 (Return all usable service types).

Response:

.. _structure-ShippingFeeSummaryReply:

.. csv-table:: ``ShippingFeeSummaryReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   correlationId, string_
   meta, :ref:`structure-ApiResponseMeta`
   shippingFeeDetailList, List<:ref:`structure-ShippingFeeDetailReply`>

.. _structure-ShippingFeeDetailReply:

.. csv-table:: ``ShippingFeeDetailReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   serviceTypeCode, string_
   countryCode , string_
   postalCodePair, :ref:`structure-ShippingFeeSummaryPostalCodePairReply`
   currencyCode, string_
   fee, decimal_
   warehouseList, List<WarehouseReply>

.. _structure-ShippingFeeSummaryPostalCodePairReply:

.. csv-table:: ``ShippingFeeSummaryPostalCodePairReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   from, string_
   to, string_

.. _structure-WarehouseReply:

.. csv-table:: ``WarehouseReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   warehouseId, integer_, Assign this value to shipment ``warehouseId`` when calling :ref:`method-createReturnRequest`
   countryCode, string_
   contactName, string_
   companyName, string_
   phone, string_
   email, string_
   fax, string_
   street1, string_
   street2, string_
   street3, string_
   state, string_
   city, string_
   postalCode, string_
   addressType, string_
   description, string_

Sample:

::

[GET] {{rh-api-user-endpoint}}/Shipment/getShippingFeeListByFromShippingOption?fromCountryCode=usa&fromPostalCode=08810&weight=500&limit=3

.. code-block:: json

   {
   "data": {
      "shippingFeeDetailList": [
         {
         "serviceTypeCode": "RETURN_DHL_PARCEL_GROUND_WA",
         "countryCode": "usa",
         "postalCodePair": {
            "from": "08810",
            "to": "98188"
         },
         "currencyCode": "usd",
         "fee": 5.76,
         "warehouseList": [
            {
               "warehouseId": 1034,
               "countryCode": "usa",
               "contactName": "Return Helper Service",
               "companyName": "Return Helper",
               "phone": "8554377467",
               "email": "usa-warehouse@test-mail.com",
               "fax": "7327187923",
               "street1": "1007 Industry Drive Building33",
               "street2": null,
               "street3": null,
               "state": "WA",
               "city": "Tukwila",
               "postalCode": "98188",
               "addressType": "business",
               "description": "1034-United States-WA"
            }
         ]
         },
         {
         "serviceTypeCode": "RETURN_USPS_BROKER_NJ",
         "countryCode": "usa",
         "postalCodePair": {
            "from": "08810",
            "to": "08817"
         },
         "currencyCode": "usd",
         "fee": 6.64,
         "warehouseList": [
            {
               "warehouseId": 2,
               "countryCode": "usa",
               "contactName": "Return Helper Service",
               "companyName": "Return Helper",
               "phone": "8554377467",
               "email": "usa-warehouse@test-mail.com",
               "fax": "7327187923",
               "street1": "18 Distribution Blvd",
               "street2": null,
               "street3": null,
               "state": "NJ",
               "city": "Edison",
               "postalCode": "08817",
               "addressType": "business",
               "description": "2-United States - NJ (DEV)"
            }
         ]
         },
         {
         "serviceTypeCode": "usps",
         "countryCode": "usa",
         "postalCodePair": {
            "from": "08810",
            "to": "08817"
         },
         "currencyCode": "usd",
         "fee": 6.64,
         "warehouseList": [
            {
               "warehouseId": 2,
               "countryCode": "usa",
               "contactName": "Return Helper Service",
               "companyName": "Return Helper",
               "phone": "8554377467",
               "email": "usa-warehouse@test-mail.com",
               "fax": "7327187923",
               "street1": "18 Distribution Blvd",
               "street2": null,
               "street3": null,
               "state": "NJ",
               "city": "Edison",
               "postalCode": "08817",
               "addressType": "business",
               "description": "2-United States - NJ (DEV)"
            }
         ]
         }
      ]
   },
   "correlationId": "0HMR01Q6CJNHL:00000001",
   "meta": {
      "status": 200,
      "data": {},
      "errorCode": null,
      "error": {}
   }
   }




----

.. _method-GetAllReturnServiceType:

GetAllReturnServiceType
-----------------------

Get all return service type.

::

[GET] <userapi-endpoint>/ServiceType/getAllReturnServiceType

Response:

.. csv-table::
   :header: "Name", "Type"
   :widths: 15, 10

   availableReturnServiceTypeList, List<:ref:`structure-availableReturnServiceType`>

.. _structure-availableReturnServiceType:

.. csv-table:: `availableReturnServiceType`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   serviceTypeCode, _string,
   serviceType, _string, Name of the service type

----

.. _method-GetServiceTypeByFromToCountry:

GetServiceTypeByFromToCountry
-----------------------------

::

[GET] <userapi-endpoint>/servicetype/getServiceTypeByFromToCountry

Parameters:


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fromCountry, string_
   toCountry, string_

Response:

.. csv-table:: ``ServiceTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ServiceTypeListResponse.csv

|

----

.. _method-GetServiceTypeByFromCountryAndWarehouse:

GetServiceTypeByFromCountryAndWarehouse
----------------------------------------

::

[GET] <userapi-endpoint>/servicetype/getServiceTypeByFromCountryAndWarehouse

Parameters:


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fromCountry, string_
   warehouseId, string_,Max Length 35

Response:

.. csv-table:: ``ServiceTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ServiceTypeListResponse.csv

|

----

Label
=====

.. _method-CreateLabel:

CreateLabel
---------------------------

.. warning::
   We are combining :ref:`method-createreturnrequest` and :ref:`method-createlabel` into :ref:`method-createreturnshipment`

   All new integrations should use :ref:`method-createreturnshipment` instead of :ref:`method-createreturnrequest` and :ref:`method-createlabel`.

   Any existing integrations must migrate to :ref:`method-createreturnshipment` before 2024-12-31

Submits a create label request.

A success response only means the request is accepted. The requested label does not include in the response but instead it is sent via a notification once it is ready.

For more details please check :ref:`notification-label`

:ref:`notification-MarkReceived` is trigger when the shipment has been received in warehouse.

::

[POST] <userapi-endpoint>/Label/CreateLabel

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   shipmentId, string_,Max Length 35

|

Response:

.. _structure-LabelResponse:

.. csv-table:: ``LabelResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   correlationId, string_
   meta, :ref:`structure-ApiResponseMeta`
   labelId, long_
   shipmentId, long_
   apiId, integer_
   refKey, string_
   labelRequestId, long_
   labelRequestStatusCode, string_, Enum: ``canceled`` ``queue`` ``fail`` ``started`` ``success``
   serviceType, string_
   error, string_


|

----

.. _method-CancelLabel:

CancelLabel
---------------------------

::

[POST] <userapi-endpoint>/Label/CancelLabel

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   labelId, string_,Max Length 35

|

Response:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

|

----

.. _section-ReturnRequest:

Return Request
==============

.. _method-CreateReturnShipment:

CreateReturnShipment
--------------------

.. note::
   This new API will be replacing :ref:`method-createreturnrequest` and :ref:`method-createlabel`.
   All new integrations should use this API for getting return labels.

   We are deprecating :ref:`method-createreturnrequest` and :ref:`method-createlabel` on 2024-12-31.

Create a return shipment and queue a return label request. The return label will be sent via a notification once it is ready. Please check :ref:`notification-label` for more details.

Note that a return shipment is not editable once it is created. If you need to change the return shipment, you can cancel the label and create a new one. To cancel a label please check :ref:`method-CancelLabel`.

::

[POST] <userapi-endpoint>/ReturnShipment/createReturnShipment

.. csv-table:: ``CreateReturnShipmentRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   serviceTypeCode, string_, YES, Service type code. You can get the service type code from :ref:`method-getallreturnservicetype`
   orderTitle, string_, YES
   remarks, string_,
   totalValue, decimal_, YES, Must be greater than zero and equals to the sum of all items' value
   totalValueCurrency, string_, YES, only accepts ``usd``
   orderNumber, string_, YES,
   shipment, :ref:`structure_ReturnShipmentPayload`, YES, Details see below

.. _structure_ReturnShipmentPayload:

.. csv-table:: ``ReturnShipmentPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   shipFrom, :ref:`structure-ShipFromPayload`, YES, Details see below
   shipToWarehouseId, integer_, YES,  Obtain from user api :ref:`method-getAllWarehouse` or :ref:`method-getWarehouseByFromCountry`
   boxType, string_, YES, see :ref:`method-getallboxtype`
   parcel, :ref:`structure-ParcelPayload`, YES, Details see below

.. _structure-ShipFromPayload:

.. csv-table:: ``ShipFromPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   country, string_, YES, ISO3 country code. Obtain from public api :ref:`method-getAllFromCountries`
   contactName, string_, YES,
   phone, string_, YES,
   email, string_, YES,
   fax, string_,
   street1, string_, YES,
   street2, string_, YES
   street3, string_,
   state, string_, YES,
   city, string_, YES,
   postalCode, string_, YES,

.. _structure-ParcelPayload:

.. csv-table:: ``ParcelPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   weight, decimal_, YES, Must equal to the sum of all items' weight
   weightUnit, string_, YES, only accepts ``g``
   length, decimal_, YES, Must be greater than zero
   width, decimal_, YES, Must be greater than zero
   height, decimal_, YES, Must be greater than zero
   dimensionUnit, string_, YES, only accepts ``cm``
   items, List<:ref:`structure-ItemPayload`>,YES, Only the first item will be convert to Return Inventory when warehouse receive the parcel

.. _structure-ItemPayload:

.. csv-table:: ``ItemPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   description, string_, YES,
   weight, decimal_, YES, Must be greater than zero
   value, decimal_, YES, Must be greater than zero
   weightUom, string_, YES, only accepts ``g``
   valueCurrencyCode, string_, YES, only accepts ``usd``

Sample:

::

   {
    "serviceTypeCode": "endicia",
    "orderTitle": "Return Label Title",
    "remarks": "Sendle label test remarks",
    "totalValue": 300.99,
    "totalValueCurrency": "usd",
    "orderNumber": "ORDERNUMBER20230711",
    "shipment":{
        "shipFrom":{
            "country": "usa",
            "contactName": "Not real Saprai",
            "phone": 5306172015,
            "email": "manveer@rh.com",
            "fax": "5306172016",
            "street1": "88 Waratah St Line 1",
            "street2": "88 Waratah St Line 2",
            "state": "NY",
            "city": "New York",
            "postalCode": "10002"
        },
        "shipToWarehouseId": 1009,
        "boxType": "cus",
        "parcel":{
            "weight": 150,
            "weightUnit": "g",
            "length": 10,
            "width": 10,
            "height": 10,
            "dimensionUnit": "cm",
            "items":[
                {
                    "description": "abc",
                    "weight": 150,
                    "value": 300.99,
                    "weightUom": "g",
                    "valueCurrencyCode": "usd"
                }
            ]
        }
      }
   }

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnRequestId, integer_, Return request ID
   returnRequestNumber, string_, Return request number
   shipmentId, integer_, Shipment ID
   referenceNumber, string_, Reference number
   labelId, integer_, Label ID
   labelRequestId, integer_, Label request ID
   labelRequestStatusCode, string_, Label request status code
   cost, decimal_, Cost
   costCurrencyCode, string_, Cost currency code

Sample:

::

   {
      "data": {
         "apiId": 202,
         "returnRequestId": 59398,
         "returnRequestNumber": "R230711-0000015",
         "shipmentId": 28407,
         "referenceNumber": "ORDERNUMBER2307111539",
         "labelId": 29020,
         "labelRequestId": 9170,
         "labelRequestStatusCode": "queued",
         "refKey": "S230711-0000028",
         "cost": 4.6,
         "costCurrencyCode": "usd"
      },
      "correlationId": "0HMS24AUSFN6I:00000001",
      "meta": {
         "status": 200,
         "data": {},
         "errorCode": null,
         "error": {}
      }
   }

----

.. _method-createReturnRequest:

CreateReturnRequest
-------------------

.. warning::
   We are combining :ref:`method-createreturnrequest` and :ref:`method-createlabel` into :ref:`method-createreturnshipment`

   All new integrations should use :ref:`method-createreturnshipment` instead of :ref:`method-createreturnrequest` and :ref:`method-createlabel`.

   Any existing integrations must migrate to :ref:`method-createreturnshipment` before 2024-12-31

::

[POST]  <userapi-endpoint>/returnrequest/createReturnRequest

**IMPORTANT NOTE**: returnRequestLineItems can contains one item only

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

.. _structure-CreateReturnRequestRequestShipmentPayload:

Object ``ShipmentPayload``:

.. csv-table::
  :header: "Name", "Type", "Required", "Remarks"
  :widths: 15, 10, 10, 30

  warehouseId, string_ , YES, Obtain from user api :ref:`method-getAllWarehouse` or :ref:`method-getWarehouseByFromCountry`
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
  costCurrencyCode, string_, YES
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

:ref:`notification-MarkReceived` is trigger when the shipment has been received in warehouse.

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
  warehouseId, string_ , YES, Obtain from user api :ref:`method-getAllWarehouse` or :ref:`method-getWarehouseByFromCountry`
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
  costCurrencyCode, string_, YES
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

.. code-block:: json

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

Only allow when shipment status equals to ``no-label`` ``lb-failed``.

Return Shipments created by :ref:`method-createreturnshipment` cannot be edited.

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

Get return request information.

Clients can also receives :ref:`notification-changeLineItemImage` when we update any images of a line item.

::

[GET]  <userapi-endpoint>/returnrequest/getReturnRequest

Parameters:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestId, string_,,Max Length 35

|

Response:

.. _structure-ReturnRequestResponse:

.. csv-table:: ``ReturnRequestResponse`` (inherit :ref:`structure-ReturnRequestPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ReturnRequestResponse.csv

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

   returnRequestId, string_,,Max Length 35
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

Submits a Vas request.

Success reponse means that the request is accept and the line item is pending for Vas action.

Once there was a Vas status update, information is send by :ref:`notification-UpdateVas`

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

   returnRequestLineItemId, string_, Required, Line Item must be ``On-hold`` in order to create Vas
   vasCode, string_, Required, ``mobi-fmt`` (Format Mobile phone) ``mobi-imei`` (Check Mobile Phone IMEI) ``mobi-lock`` (Check Mobile Phone Lock status) ``prd-inspec`` (Product inspection) ``repack`` (Repack) ``req-pic`` (Take pictures) ``split-parcel`` (Split Parcel)
   metaQuantity, integer_, Conditional, Only Required for `vasCode`: ``split-parcel`` (1-50) ``req-pic`` (grater than 0)
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

.. _method-SearchShipment:

SearchShipment
---------------

::

[GET] <userapi-endpoint>/shipment/searchShipment

Parameters:

.. _structure-SearchShipmentRequest:

.. csv-table:: ``SearchShipmentRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchShipmentRequest.csv

Response:

.. _structure-SearchShipmentResponse:

.. csv-table:: ``SearchShipmentResponse`` (inherit :ref:`structure-PaginationResponse`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchShipmentResponse.csv

|


Request samples:
****************

Getting the latest shipments:

``[GET] <userapi-endpoint>/shipment/SearchShipment?offset=0&pagesize=50``

Getting the next 50 latest shipments:

``[GET] <userapi-endpoint>/shipment/SearchShipment?offset=50&pagesize=50``

Getting shipments from ``2021-01-01`` to ``2021-01-30``:

``[GET] <userapi-endpoint>/shipment/SearchShipment?offset=0&pagesize=50&createFromStr=2021-01-01&createToStr=2021-01-30``

Getting shipment with a specific shipment number:

``[GET] <userapi-endpoint>/shipment/SearchShipment?offset=0&pagesize=50&shipmentNumber=<insert shipment number>``



----

.. _section-ReturnInventory:

Return Inventory
================

.. _method-SearchReturnInventory:

SearchReturnInventory
---------------------

Search for Return Inventory

::

    [GET]  <userapi-endpoint>/returninventory/searchReturnInventory

Parameters: ``SearchReturnInventoryRequest``

.. csv-table:: ``SearchReturnInventoryRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/SearchReturnInventoryRequest.csv

|

Response: ``SearchReturnInventoryResponse``

.. csv-table:: ``SearchReturnInventoryResponse`` (inherit :ref:`structure-PaginationResponse`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/SearchReturnInventoryResponse.csv

|

.. _structure-SearchReturnInventoryResultPayload:

.. csv-table:: ``SearchReturnInventoryResultPayload``
     (inherit :ref:`structure-ReturnInventoryPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/SearchReturnInventoryResultPayload.csv

|

----

.. _method-GetReturnInventory:

GetReturnInventory
------------------

Get Return Inventory

::

    [GET]  <userapi-endpoint>/returninventory/getReturnInventory

Parameters:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnInventoryId, string_,,Max Length 35

|

Response:

.. _structure-ReturnInventoryResponse:

.. csv-table:: ``ReturnInventoryResponse`` (inherit :ref:`structure-ReturnInventoryPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/ReturnInventoryResponse.csv

|

----

.. _method-SearchRma:

SearchRma
-----------

::

    [GET] <userapi-endpoint>/returninventory/SearchRma

Parameters:

.. _structure-SearchRmaRequest:

.. csv-table:: ``SearchRmaRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/SearchRmaRequest.csv

|

Response:

.. csv-table:: ``ReturnInventoryResponse`` (inherit :ref:`structure-PaginationResponse`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/SearchRmaResponse.csv

|

----

.. _method-GetReturnInventoryByLineItemId:

GetReturnInventoryByLineItemId
------------------------------

::

[GET]  <userapi-endpoint>/returninventory/getReturnInventoryByLineItemId

Parameters:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   lineItemId, string_,,Max Length 35

|

Response:

.. csv-table:: ``ReturnInventoryResponse`` (inherit :ref:`structure-ReturnInventoryPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/ReturnInventoryResponse.csv

|

----

.. _method-UpdateReturnInventoryHandling:

UpdateReturnInventoryHandling
-----------------------------

::

[POST]  <userapi-endpoint>/returninventory/updateReturnInventoryHandling

Parameters:

.. _structure-UpdateReturnInventoryHandlingRequest:

.. csv-table:: ``UpdateReturnInventoryHandlingRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/UpdateReturnInventoryHandlingRequest.csv

|

Response:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/ApiResponse.csv

|

----

.. _method-CancelReturnInventoryHandling:

CancelReturnInventoryHandling
-----------------------------

::

[POST]  <userapi-endpoint>/returninventory/cancelReturnInventoryHandling

Parameters:

.. _structure-CancelReturnInventoryHandlingRequest:

.. csv-table:: ``CancelReturnInventoryHandlingRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnInventoryId, string_,,Max Length 35

|

Response:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/ApiResponse.csv

|

----


.. _method-AssignReturnInventorySku:

AssignReturnInventorySku
------------------------

::

[POST]  <userapi-endpoint>/returninventory/assignReturnInventorySku

Parameters:

.. _structure-AssignReturnInventorySkuRequest:

.. csv-table:: ``AssignReturnInventorySkuRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/AssignReturnInventorySkuRequest.csv

|

Response:

.. csv-table:: ``ReturnInventoryResponse`` (inherit :ref:`structure-ReturnInventoryPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/ReturnInventoryResponse.csv

|

----

Resend
======

.. _method-CreateResend:

CreateResend
------------

This api creates a resend request. Successful request means that the inventory is pending for resend procedure.
Further updates of the resend shipment(such as tracking number update) are sent via notification callback.

Details please check :ref:`notification-Resend`.

For Resend service type please check :ref:`method-getAvailableShipmentServiceType`.

::

[POST]  <userapi-endpoint>/resend/createResend

Parameters:

.. _structure-CreateResendRequest:

.. csv-table:: ``CreateResendRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnInventoryIdList, List<string_>, YES, Obtain from :ref:`notification-MarkReceived` and :ref:`notification-assignUnknown` - see :ref:`gettingstarted-ReturnArrival` for more detail
   resendNumber, string_,,Auto generated if not submitted.
   description, string_,
   remarks, string_,
   resendShipment, :ref:`link-ResendShipmentPayload`, YES, See below

Object ``ResendShipmentPayload``

.. _link-ResendShipmentPayload:

.. csv-table:: ``ResendShipmentPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   resendShipmentNumber, string_,,Auto generated if not submitted.
   shipmentServiceType, string_, YES, Obtain from :ref:`method-getservicetypebyfromcountryandwarehouse`
   shipmentCountryCode, string_, YES, Obtain from public api :ref:`method-getAllCountries`
   shipmentName, string_, YES, Max length 255
   shipmentPhone, string_, YES
   shipmentFax, string_, YES
   shipmentEmail, string_, YES
   shipmentStreet1, string_, YES, Max length 255
   shipmentStreet2, string_, YES
   shipmentStreet3, string_
   shipmentState, string_, YES
   shipmentCity, string_, YES, Max length 50
   shipmentPostalCode, string_, YES, Max length 50

Sample:

.. code-block:: json

   {
       "description": "OC56562326565",
       "remarks": "remark",
       "returnInventoryIdList": [
           3474
       ],
       "resendShipment": {
           "shipmentServiceType": "ups",
           "shipmentCountryCode": "usa",
           "shipmentState": "Hamburg",
           "shipmentCity": "Uhlenhorst",
           "shipmentStreet1": "Schrotteringksweg 16",
           "shipmentStreet2": "",
           "shipmentName": "Bach",
           "shipmentPhone": "01768790672",
           "shipmentEmail": "tes@returnhelper.com",
           "shipmentPostalCode": "01"
       }
    }

|

Response:

.. _structure-CreateResendResponse:

.. csv-table:: ``CreateResendResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Resend/CreateResendResponse.csv

|

----

.. _method-GetResend:

GetResend
---------

::

[GET]  <userapi-endpoint>/resend/getResend

Parameters:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   resendId, string_,,Max Length 35

|

Response:

.. _structure-ResendResponse:

.. csv-table:: ``ResendResponse`` (inherit :ref:`structure-ResendPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Resend/ResendResponse.csv

|

----

.. _method-SearchResend:

SearchResend
------------

::

[GET]  <userapi-endpoint>/resend/searchResend

Parameters:

.. _structure-GetResendListRequest:

.. csv-table:: ``GetResendListRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/Resend/GetResendListRequest.csv

|

Response:

.. _structure-SearchResendListResponse:

.. csv-table:: ``SearchResendListResponse`` (inherit :ref:`structure-PaginationResponse`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   searchResendPayloadList, List<:ref:`structure-SearchResendPayload`>

|

----

.. _method-CancelResend:

CancelResend
------------

::

[POST]  <userapi-endpoint>/resend/cancelResend

Parameters:

.. _structure-CancelResendRequest:

.. csv-table:: ``CancelResendRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   resendId, string_,,Max Length 35

|

Response:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/ApiResponse.csv

|

----

Recall
======

.. _method-CreateRecallByReturnInventoryId:

CreateRecallByReturnInventoryId
-------------------------------

Create recalls with at least one return inventory (max 100 inventories).

::

[POST] <userapi-endpoint>/Recall/createRecallByReturnInventoryId


Parameters:

.. csv-table:: ``CreateRecallByReturnInventoryIdRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnInventoryIdList,List<string_>, Max 100 ids for each call

|

Sample:

::

   {
    "returnInventoryIdList":[1001,1002]
   }

Response:

.. csv-table:: ``CreateRecallByReturnInventoryIdResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   recallList,List<:ref:`structure-Recall`>

.. _structure-Recall:

.. csv-table:: ``Recall``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Recall/Recall.csv

.. _structure-RecallInventory:

.. csv-table:: ``RecallInventory``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Recall/RecallInventory.csv


Sample:

.. code-block:: json

   {
      "correlationId": "0HMJ3U7AU3UVP:00000002",
      "meta": {
         "status": 200,
         "data": {},
         "errorCode": null,
         "error": {}
      },
      "recallList": [
         {
            "recallId": 1001,
            "recallNumber": "RT1001",
            "recallStatusCode": "in-progress",
            "warehosueRemarks": ""
            "recallInventoryList": [
               {
                  "recallInventoryId": 1001,
                  "returnInventoryId": 2001,
                  "recallInventoryStatusCode": "in-transit",
                  "pickUpCode": "",
                  "trackingNumber": "123456789",
                  "listName": "sample",
                  "weight": 10,
                  "amount": 10,
                  "pickUpOn": "",
                  "courierTrackingNumber": "",
                  "recallServiceType": "dhl"
               }
            ]
         },
         {
            "recallId": 1002,
            "recallNumber": "RT1002",
            "recallStatusCode": "in-progress",
            "warehosueRemarks": ""
            "recallInventoryList": [
               {
                  "recallInventoryId": 1002,
                  "returnInventoryId": 2002,
                  "recallInventoryStatusCode": "in-transit",
                  "pickUpCode": "",
                  "trackingNumber": "223456789",
                  "listName": "sample",
                  "weight": 20,
                  "amount": 20,
                  "pickUpOn": "",
                  "courierTrackingNumber": "",
                  "recallServiceType": "dhl"
               }
            ]
         }
      ]
   }

----

Refund
======

.. _method-searchRefund:

SearchRefund
---------------------------

::

[Get] <userapi-endpoint>/Refund/searchRefund

Parameters:

.. _structure-GetRefundListRequest:

.. csv-table:: ``GetRefundListRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetRefundListRequest.csv


|

Response:

.. _structure-RefundListResponse:

.. csv-table:: ``RefundListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/RefundListResponse.csv

|

----

FBA
===

.. _method-createFbaRemovalOrder:

CreateFbaRemovalOrder
---------------------------

::

[POST] <userapi-endpoint>/Fba/fbaInventory/createFbaRemovalOrder

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   removalOrderId, string_,Max Length 35

|

Response:

.. _structure-CreateFbaRemovalOrderResponse:

.. csv-table:: ``CreateFbaRemovalOrderResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateFbaRemovalOrder.csv

|

----

.. _method-createFbaRemovalShipment:

CreateFbaRemovalShipment
---------------------------

::

[POST] <userapi-endpoint>/Fba/fbaInventory/createFbaRemovalShipment

Parameters:

.. _structure-CreateFbaRemovalShipmentRequest:

.. csv-table:: ``CreateFbaRemovalShipmentRequest``
   :header: "Name", "Type", "Required","Remarks"
   :widths: 15, 10,10, 30
   :file: models/General/CreateFbaRemovalShipmentRequest.csv

|

Response:

.. _structure-CreateFbaRemovalShipmentResponse:

.. csv-table:: ``CreateFbaRemovalShipmentResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateFbaRemovalShipment.csv

|

----

.. _method-getFbaRemovalOrder:

GetFbaRemovalOrder
---------------------------

::

[Get] <userapi-endpoint>/Fba/fbaInventory/getFbaRemovalOrder

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   fbaRemovalOrderId, string_,Max Length 35

|

Response:

.. _structure-FbaRemovalOrderResponse:

.. csv-table:: ``FbaRemovalOrderResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetFbaRemovalOrderListResponse.csv

|

----

.. _method-searchFbaRemovalOrder:

SearchFbaRemovalOrder
---------------------------

::

[Get] <userapi-endpoint>/Fba/fbaInventory/searchFbaRemovalOrder

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Response:

.. _structure-GetFbaRemovalOrderListResponse:

.. csv-table:: ``GetFbaRemovalOrderListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchFbaRemovalOrderListResponse.csv

|

----

.. _method-getFbaInventory:

GetFbaInventory
---------------------------

::

[Get] <userapi-endpoint>/Fba/fbaInventory/getFbaInventory

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Response:

.. _structure-FbaInventoryResponse:

.. csv-table:: ``FbaInventoryResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetFbaInventoryListResponse.csv

|

----

.. _method-searchFbaInventory:

SearchFbaInventory
---------------------------

::

[Get] <userapi-endpoint>/Fba/fbaInventory/searchFbaInventory

Parameters:

.. csv-table:: ``GetFbaInventoryListRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30
   :file: models/General/GetFbaInventoryListRequest.csv

|

Response:

.. _structure-GetFbaInventoryListResponse:

.. csv-table:: ``GetFbaInventoryListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchFbaInventoryListResponse.csv

|

----

.. _method-assignFbaInventoryHandling:

AssignFbaInventoryHandling
---------------------------

::

[POST] <userapi-endpoint>/Fba/fbaInventory/assignFbaInventoryHandling

Parameters:

.. _structure-AssignFbaInventoryHandlingRequest:

.. csv-table:: ``AssignFbaInventoryHandlingRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/AssignFbaInventoryHandlingRequest.csv
|

Response:

.. _structure-AssignFbaInventoryHandlingResponse:

.. csv-table:: ``AssignFbaInventoryHandlingResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/AssignFbaInventoryHandlingResponse.csv

|

----

.. _method-getFbaInventoryRecall:

GetFbaInventoryRecall
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryRecall/getFbaInventoryRecall

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRecallId, string_,Max Length 35

|


Response:

.. _structure-FbaInventoryRecallResponse:

.. csv-table:: ``FbaInventoryRecallResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryRecallResponse.csv

|

----

.. _method-searchFbaInventoryRecall:

SearchFbaInventoryRecall
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryRecall/searchFbaInventoryRecall

Parameters:

.. csv-table::  ``GetFbaInventoryHandlingListRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30
   :file: models/General/GetFbaInventoryHandlingListRequest.csv

|

Response:

.. _structure-GetFbaInventoryRecallListResponse:

.. csv-table:: ``GetFbaInventoryRecallListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetFbaInventoryRecallListResponse.csv

|

----

.. _method-getFbaInventoryOthers:

GetFbaInventoryOthers
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryOthers/getFbaInventoryOthers

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaOthersId, string_,Max Length 35

|

Response:

.. _structure-FbaInventoryOthersResponse:

.. csv-table:: ``FbaInventoryOthersResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryOthersResponse.csv

|

----

.. _method-searchFbaInventoryOthers:

SearchFbaInventoryOthers
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryOthers/searchFbaInventoryOthers

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Response:

.. _structure-GetFbaInventoryOthersListResponse:

.. csv-table:: ``GetFbaInventoryOthersListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetFbaInventoryOthersListResponse.csv

|

----

.. _method-getFbaInventoryDispose:

GetFbaInventoryDispose
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryDispose/getFbaInventoryDispose

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaDisposeId, string_,Max Length 35

|

Response:

.. _structure-FbaInventoryDisposeResponse:

.. csv-table:: ``FbaInventoryDisposeResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryDisposeResponse.csv

|

----

.. _method-searchFbaInventoryDispose:

SearchFbaInventoryDispose
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryDispose/searchFbaInventoryDispose

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Response:

.. _structure-GetFbaInventoryDisposeListResponse:

.. csv-table:: ``GetFbaInventoryDisposeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetFbaInventoryDisposeListResponse.csv

|

----

.. _method-getFbaInventoryRelabel:

GetFbaInventoryRelabel
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryRelabel/getFbaInventoryRelabel

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRelabelId, string_,Max Length 35

|

Response:

.. csv-table:: ``FbaInventoryRelabelResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryRelabelResponse.csv

|

----

.. _method-searchFbaInventoryRelabel:

SearchFbaInventoryRelabel
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryRelabel/searchFbaInventoryRelabel

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Response:

.. _structure-GetFbaInventoryRelabelListResponse:

.. csv-table:: ``GetFbaInventoryRelabelListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetFbaInventoryRelabelListResponse.csv

|

----

.. _method-assignFbaInventoryRelabelFnsku:

AssignFbaInventoryRelabelFnsku
---------------------------

::

[POST] <userapi-endpoint>/Fba/FbaInventoryRelabel/assignFbaInventoryRelabelFnsku

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRelabelId, string_,Max Length 35
   newFnsku, string_

|

Response:

.. _structure-FbaInventoryRelabelResponse:

.. csv-table:: ``FbaInventoryRelabelResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryRelabelResponse.csv

|

----

.. _method-searchAvailableRelabelForShipment:

SearchAvailableRelabelForShipment
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryRelabel/searchAvailableRelabelForShipment

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Response:

.. _structure-SearchAvailableRelabelForShipmentResponse:

.. csv-table:: ``SearchAvailableRelabelForShipmentResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchAvailableRelabelForShipmentResultPayloadList.csv

|

----

.. _method-createFbaInventoryRelabelShipment:

CreateFbaInventoryRelabelShipment
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInventoryRelabel/createFbaInventoryRelabelShipment

Parameters:

.. _structure-CreateFbaInventoryRelabelShipmentRequest:

.. csv-table:: ``CreateFbaInventoryRelabelShipmentRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateFbaInventoryRelabelShipmentRequest.csv


|

Response:

.. _structure-FbaInventoryRelabelShipmentResponse:

.. csv-table:: ``FbaInventoryRelabelShipmentResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryRelabelShipmentResponse.csv

|

----

.. _method-addAddressLabel:

AddAddressLabel
---------------------------

::

[POST] <userapi-endpoint>/Fba/FbaInventoryRelabel/addAddressLabel

Parameters:

.. _structure-AddFbaInventoryRelabelAddressLabelRequest:

.. csv-table:: ``AddFbaInventoryRelabelAddressLabelRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/AddFbaInventoryRelabelAddressLabelRequest.csv


|

Response:

.. csv-table:: ``FbaInventoryRelabelShipmentResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryRelabelShipmentResponse.csv

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