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

   fromCountryCode, string_, Required
   fromPostalCode, string_, Required
   weight, decimal_, Required; Must be greater than zero (in g)
   dimension1, decimal_, Required; Must be greater than zero (in cm)
   dimension2, decimal_, Required; Must be greater than zero (in cm)
   dimension3, decimal_, Required; Must be greater than zero (in cm)
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

   serviceTypeCode, string_,
   serviceType, string_, Name of the service type
   fromCountry, string_
   toCountry, string_

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

.. _method-getAvailableShipmentServiceType:

GetAvailableShipmentServiceType
-------------------------------

Get service types for :ref:`method-CreateResend`.

This API is for getting **RESEND** service types only. For return service types please check :ref:`method-GetServiceType`.

There is a custom service type named ``others`` in the response payload. Customers who need special handling should contact our Customer Service before using this service type.

::

[GET] <userapi-endpoint>/Shipment/getAvailableShipmentServiceType

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   warehouseId, string_, Required

Response:

.. csv-table::
   :header: "Name", "Type"
   :widths: 15, 10

   data, List<:ref:`structure-availableShipmentServiceType`>

.. _structure-availableShipmentServiceType:

.. csv-table:: `availableShipmentServiceType`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   serviceTypeCode, string_,
   serviceType, string_,
   countryCodePairList, List<:ref:`structure-countryCodePair`>,

.. _structure-countryCodePair:

.. csv-table:: `countryCodePair`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   warehouseId, integer_,
   description, string_,
   fromCountryCode, string_,
   toPostalCode, string_,

Sample:

::

   {
   "data": [
      {
         "serviceTypeCode": "usps",
         "serviceType": "USPS GA-NJ",
         "countryCodePairList": [
         {
            "warehouseId": 2,
            "description": "2-United States - NJ (DEV)",
            "fromCountryCode": "usa",
            "toCountryCode": "usa"
         },
         {
            "warehouseId": 2,
            "description": "2-United States - NJ (DEV)",
            "fromCountryCode": "usa",
            "toCountryCode": "deu"
         }
         ]
      }
   ]
   }

----

Label
=====

.. _method-CreateLabel:

CreateLabel (Deprecating)
-------------------------

.. warning::
   We are combining :ref:`method-createreturnrequest` and :ref:`method-createlabel` into :ref:`method-createreturnshipment`

   All new integrations should use :ref:`method-createreturnshipment` instead of :ref:`method-createreturnrequest` and :ref:`method-createlabel`.

   Any existing integrations must migrate to :ref:`method-createreturnshipment` before 2024-12-31

Submits a create label request.

A success response only means the request is accepted. The requested label does not include in the response but instead it is sent via a notification once it is ready.

For more details please check :ref:`notification-label`

:ref:`notification-warehousemarkshipmentarrivedv2` is trigger when the shipment has been received in warehouse, followed by :ref:`notification-inventorycreated` when the inventory has been created.

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

Shipment
===========

.. _method-ListShipment:

ListShipment
---------------

::

[Get] <userapi-endpoint>/Shipment/list

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   createFrom, Datetime_, Required (Max 62 days can be set)
   createTo, Datetime_, Required (Max 62 days can be set)
   pageSize, integer_
   offset, integer_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Shipment/ListShipmentResponse.csv

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

This API method support :ref:`gettingstarted-customfield`

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
   orderNumber, string_, YES, Customized reference number. Duplicate value allowed. Could be order number or ERP system number or etc
   sellerReferenceNumber, string_, YES, Optional; system generated value will fill in if not provided
   shipment, :ref:`structure_ReturnShipmentPayload`, YES, Details see below

.. _structure_ReturnShipmentPayload:

.. csv-table:: ``ReturnShipmentPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   shipFrom, :ref:`structure-ShipFromPayload`, YES, Details see below
   shipToWarehouseId, integer_, YES,  Obtain from user api :ref:`method-getAllWarehouse` or :ref:`method-getWarehouseByFromCountry`
   boxType, string_, YES, Use ``cus`` or obtain from :ref:`method-GetAllBoxTypes`
   sellerReferenceNumber, string_, YES, Optional; system generated value will fill in if not provided
   parcel, :ref:`structure-ParcelPayload`, YES, Details see below
   customFieldMap, List<:ref:`gettingstarted-customfield`>,, Custom Field

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
   customFieldMap, List<:ref:`gettingstarted-customfield`>,, Custom Field
   sellerReferenceNumber, string_, YES, Optional; system generated value will fill in if not provided

Sample:

::

   {
    "serviceTypeCode": "endicia",
    "orderTitle": "Return Label Title",
    "remarks": "Sendle label test remarks",
    "totalValue": 300.99,
    "totalValueCurrency": "usd",
    "orderNumber": "ORDERNUMBER20230711",
    "sellerReferenceNumber": "rr_ref",
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
        "sellerReferenceNumber": "shipment_ref",
        "customFieldMap":{
            "KEY1":"value1",
            "KEY2":"value2"
        },
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
                     "valueCurrencyCode": "usd",
                     "sellerReferenceNumber": "line_item_ref",
                     "customFieldMap": {
                           "KEY3":"value3",
                           "KEY4":"value4"
                     }
                }
            ]
        },
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

CreateReturnRequest (Deprecating)
---------------------------------

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
  boxType, string_, YES, Use ``cus`` or obtain from :ref:`method-GetAllBoxTypes`
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

.. _method-EditReturnRequest:

EditReturnRequest (Deprecating)
-------------------------------

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

.. _section-ReturnInventory:

Return Inventory
================

.. _method-ListReturnInventory:

ListReturnInventory
------------------------

::

[Get] <userapi-endpoint>/ReturnInventory/list

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   createFrom, Datetime_
   createTo, Datetime_
   pageSize, integer_
   offset, integer_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/ListReturnInventoryResponse.csv

|

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

.. _method-CreateVas:

CreateVas
---------

Submits a Vas request. Required inventory handling to be ``ohd`` (On-hold), see :ref:`method-UpdateReturnInventoryHandling`

Success reponse means that the request is accept and the line item is pending for Vas action.

Once there was a Vas status update, information is send by :ref:`notification-UpdateVas`

::

[POST]  <userapi-endpoint>/returnrequest/createVas

Parameters:

.. _structure-CreateVasRequest:

.. csv-table:: ``CreateVasRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   createVasPayloadList, List<:ref:`link-createVasPayloadList`>, YES

.. _link-createVasPayloadList:

.. csv-table:: ``createVasPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestLineItemId, string_, Required, Line Item must be ``On-hold`` in order to create Vas
   createVasDetailList, List<:ref:`link-createVasDetailList`>, YES; You can assign multiple VAS to a line item

.. _link-createVasDetailList:

.. csv-table:: ``createVasDetail``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   vasCode, string_, Required, ``mobi-fmt`` (Format Mobile phone) ``mobi-imei`` (Check Mobile Phone IMEI) ``mobi-lock`` (Check Mobile Phone Lock status) ``prd-inspec`` (Product inspection) ``repack`` (Repack) ``req-pic`` (Take pictures) ``split-parcel`` (Split Parcel)
   metaQuantity, integer_, Conditional, Only Required for `vasCode`: ``split-parcel`` (1-50) ``req-pic`` (grater than 0)
   notes, string_

Sample:

::

  {
   "createVasPayloadList": [
      {
         "returnRequestLineItemId": "{{returnRequestLineItemId}}",
         "createVasDetailList": [
         {
            "vasCode": "split-parcel",
            "notes": "Please split into 3 parcels",
            "metaQuantity": 3
         }
         ]
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

Optional steps on creating Split Parcel VAS
-------------------------------------------

When creating split parcel VAS, customers can perform addition steps to provide precise split instructions. This instruction file could be a text file or an image file.

To provide additional instructions for split parcel VAS:

1. Request a signed URL for the instruction file
2. Upload the instruction file to the signed URL
3. Provide the file name and key in the split parcel VAS request


Request a signed URL
********************

Note that the file name and type must be exactly the same as the file uploaded in the next step.

::

[GET] <api-public-endpoint>/file/GetPreSignedUploadUrl

Parameters:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   filename, string_, YES, File name with extension
   mimeType, string_, YES, File type e.g. ``text/plain`` ``image/jpeg`` ``image/png``

|

Example:

.. code-block::

   GET {{api-public-endpoint}}/file/GetPreSignedUploadUrl?mimeType=image%2Fpng&filename=test.png HTTP/1.1

Response:

.. csv-table:: ``PreSignedUploadUrlResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   preSignedUrl, string_, The signed URL for uploading the file
   filename, string_, filename of the file
   fileKey, string_, fileKey of the file
   expires, string_, The expiration time of the signed URL


Upload the instruction file to the signed URL
*********************************************

Put the instruction file to the signed URL returned from last step.

A ``http 200`` response means the file is uploaded successfully.

::

[PUT] <preSignedUrl>

Create a split parcel VAS with the file name and file key
*********************************************************

When creating the split parcel VAS as describe in :ref:`method-CreateVas` , provide the file namd and file key in the split parcel VAS request.

Example:

.. code-block::
   :emphasize-lines: 10-14

   {
      "createVasPayloadList": [
      {
         "returnRequestLineItemId": {{returnRequestLineItemId}},
         "createVasDetailList": [
            {
               "vasCode": "split-parcel",
               "notes": "test split",
               "metaQuantity": 2,
               "vasFileList":[  // new property
                  {
                  "filename": "{{filename}}",
                  "fileKey": "{{fileKey}}"
                  }
               ]
            }
         ]
         }
      ]
   }



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


.. method_getShippingFeeListByToShippingOption

GetShippingFeeListByToShippingOption
------------------------------------

This API is for getting **RESEND** shipping fee only.

::

[GET] <userapi-endpoint>/Resend/getShippingFeeListByToShippingOption

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnInventoryIdList , List<integer_>, Required
   toCountryCode, string_, ISO3 country code; Required
   toPostalCode, string_, Required

Response:

.. csv-table::
   :header: "Name", "Type"
   :widths: 15, 10

   shippingFeeDetailList, List<:ref:`structure-shippingFeeDetail`>

.. _structure-shippingFeeDetail:

.. csv-table:: `shippingFeeDetail`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   serviceTypeCode, string_,
   serviceTypeName, string_,
   countryCode, string_,
   postalCodePair, :ref:`structure-postalCodePair`,
   currencyCode, string_,
   fee, decimal_,
   chargeableWeight, decimal_,


.. _structure-postalCodePair:

.. csv-table:: `countryCodePair`
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   from, string_,
   to, string_,

Sample:

::

   {
   "data": {
   "shippingFeeDetailList": [
      {
         "serviceTypeCode": "SHIPMENT_USPS_PM_NJ",
         "serviceTypeName": "USPS PM-NJ",
         "countryCode": "usa",
         "postalCodePair": {
         "from": "088",
         "to": "139"
         },
         "currencyCode": "usd",
         "fee": 7.75,
         "chargeableWeight": 50.0
      }
   ]
   }

----

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

   returnInventoryIdList, List<string_>, YES, Obtain from :ref:`notification-inventorycreated` - see :ref:`gettingstarted-ReturnArrival` for more detail
   description, string_,
   remarks, string_,
   resendShipment, :ref:`link-ResendShipmentPayload`, YES, See below

Object ``ResendShipmentPayload``

.. _link-ResendShipmentPayload:

.. csv-table:: ``ResendShipmentPayload``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

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

.. _method-CreateRecall:

CreateRecall
------------

Create recalls with at least one return inventory (max 100 inventories).

::

[POST] <userapi-endpoint>/Recall/createRecall


Parameters:

.. csv-table:: ``CreateRecall``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnInventoryIdList,List<integer_>, Max 100 inventory ids for each call

|

Sample:

::

   {
    "returnInventoryIdList":[1001,1002]
   }

Response:

.. csv-table:: ``CreateRecallResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   recallId, integer_, Recall ID
   recallNumber, string_, Recall number


Sample:

.. code-block:: json

   {
      "correlationId": "0HN2TOLBJVHRG:00000001",
      "meta": {
         "status": 200,
         "data": {},
         "errorCode": null,
         "error": {}
      },
      "recallId": 927,
      "recallNumber": "RCL240416-0000001"
   }

----

.. _method-ConsolidateShipping:

Consolidate Shipping
====================

.. note::

   Consolidate Shipping enables customers to send multiple inventories in one shipment.

   To use this feature, customers must first create a consolidate shipping order using the :ref:`method-createconsolidateshippingorder` method. They can then manage inventories by adding or removing them from the consolidate shipping order using the :ref:`method-addinventorytoconsolidateshippingorder` and :ref:`method-removeinventoryfromconsolidateshippingorder` methods respectively.

   Once the shipment is ready to be sent, customers can confirm the consolidate shipping order using the :ref:`method-confirmconsolidateshippingorder` method. Our customer service team will then contact the customer to confirm the shipping cost before the shipment is sent.

.. _method-CreateConsolidateShippingOrder:

Create Order
------------

Initiate a consolidate shipping order by providing the outbound warehouse id, shipping method, delivery instructions, ship to address, and custom fields.

::

[POST] <userapi-endpoint>/outbound/ConsolidateShipping/order/create

Parameters:

.. csv-table:: ``CreateConsolidateShippingOrderRequest``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   outboundWarehouseId, integer_, YES, Warehouse id of the outbound warehouse
   shippingMethod, string_, YES, ``AIR_FREIGHT`` or ``COURIER_SERVICE`` or ``LAND_FREIGHT`` or ``SEA_FREIGHT``
   deliveryInstructions, string_,, Delivery instructions
   shipTo, :ref:`structure-ShipTo`, YES, Ship to address (see below)
   customFieldMap, KeyValuePair, ,Custom fields for the order

.. _structure-ShipTo:

.. csv-table:: ``ShipTo``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   shipToCountry, string_, YES, ISO3 small letters
   shipToContactName, string_, YES,
   shipToPhone, string_, YES,
   shipToFax, string_,,
   shipToEmail, string_, YES,
   shipToCompanyName, string_, YES,
   shipToStreet1, string_, YES,
   shipToStreet2, string_,,
   shipToStreet3, string_,,
   shipToCity, string_, YES,
   shipToState, string_, YES,
   shipToPostalCode, string_, YES,
   shipToType, string_, YES,

Sample:

.. code-block:: json

   {
      "outboundWarehouseId": 2,
      "shippingMethod": "AIR_FREIGHT",
      "deliveryInstructions": "Don't leave package on porch {{$datetime iso8601}}",
      "shipTo": {
         "shipToCountry": "usa",
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
         "shipToType": "Business"
      },
      "customFieldMap": {
         "PRIORITY_LEVEL": "High",
         "KEY_NO_9": "117"
      }
   }



Response:

.. _structure-CreateConsolidateShippingOrderResponse:

.. csv-table:: ``CreateConsolidateShippingOrderResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   consolidateShippingOrderId, string_, Unique id for the consolidate shipping order
   consolidateShippingOrderNumber, string_, Human readable order number
   outboundWarehouseId, integer_, Warehouse id of the outbound warehouse
   shippingMethod, string_, Selected shipping method of the order
   deliveryInstructions, string_, Delivery instructions
   consolidateShippingOrderStatus, string_, ``CANCELED`` or ``CONFIRMED`` or ``CREATED`` or ``PARTIALLY_SHIPPED`` or ``READY_TO_SHIP`` or ``SHIPPED``
   shipTo, :ref:`structure-ShipTo`, Ship to address
   customFieldMap, KeyValuePair, Custom fields for the order
   createOn, Datetime_
   modifyOn, Datetime_

Sample:

.. code-block:: json

   {
      "data": {
         "consolidateShippingOrderId": "01J54T64ZZ1R7MMVS4SRA1XK7R",
         "consolidateShippingOrderNumber": "CNS240813-0000001",
         "outboundWarehouseId": 2,
         "shippingMethod": "AIR_FREIGHT",
         "deliveryInstructions": "Don't leave package on porch 2024-08-13T02:48:25.873Z",
         "consolidateShippingOrderStatus": "CREATED",
         "shipTo": {
            "shipToCountry": "usa",
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
            "shipToType": "Business"
         },
         "customFieldMap": {
            "PRIORITY_LEVEL": "High",
            "KEY_NO_9": "117"
         },
         "createOn": "2024-08-13T02:48:29.950468Z",
         "modifyOn": "2024-08-13T02:48:29.992877Z"
      },
      "correlationId": "0HN5R89JOAUBR:00000001",
      "meta": {
         "status": 200,
         "data": {},
         "errorCode": null,
         "error": {}
      }
   }

----

.. _method-AddInventoryToConsolidateShippingOrder:

Add Inventory
-------------

Add inventory to a consolidate shipping order. An inventory must be in the same warehouse of the consolidate shipping order.

The maximum number of inventories that can be added is 500 per request.

::

[POST] <userapi-endpoint>/outbound/consolidateShipping/inventory/add

Parameters:

.. csv-table:: ``AddInventoryToConsolidateShippingOrderRequest``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   consolidateShippingOrderId, string_, YES, Unique id included in the response of :ref:`method-CreateConsolidateShippingOrder`
   returnInventoryIdList, List<long_>, YES, Inventory id list to be added to the consolidate shipping order

Sample:

.. code-block:: json

   {
      "consolidateShippingOrderId": "01J4RE1T4ZJVHFY7A5CXYTCZJH",
      "returnInventoryIdList": [
         20278,
         20251
    ]
}

Response:

.. csv-table:: ``AddInventoryToConsolidateShippingOrderResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   consolidateShippingInventoryId, string_, Unique id for the consolidate shipping inventory
   consolidateShippingOrderId, string_,
   returnInventoryId, long_,
   consolidateShippingInventoryStatus, string_, ``IN_PROGRESS`` or ``PACKED`` or ``PENDING`` or ``SHIPPED``

Sample:

.. code-block:: json

   {
      "data": [
      {
         "consolidateShippingInventoryId": "01J583N2JTQG0X6E64QTPHKSKQ",
         "consolidateShippingOrderId": "01J583MXHNXSPT64S7GTW0VN49",
         "returnInventoryId": 20278,
         "consolidateShippingInventoryStatus": "PENDING"
      },
      {
         "consolidateShippingInventoryId": "01J583N2K9FCYVQN3QXNZWN7EG",
         "consolidateShippingOrderId": "01J583MXHNXSPT64S7GTW0VN49",
         "returnInventoryId": 20251,
         "consolidateShippingInventoryStatus": "PENDING"
      }
      ],
      "correlationId": "0HN5R89JOAUBR:00000001",
      "meta": {
         "status": 200,
         "data": {},
         "errorCode": null,
         "error": {}
      }
   }

.. note::

      The response only returns the list of inventories that are included in the request. For example, if you add 2 inventories, the response will only include those 2 inventories, even if you have previously added another 10 inventories in a separate API call.

----

.. _method-RemoveInventoryFromConsolidateShippingOrder:

Remove Inventory
----------------

::

[POST] <userapi-endpoint>/outbound/consolidateShipping/inventory/remove

Parameters:

.. csv-table:: ``RemoveInventoryFromConsolidateShippingOrderRequest``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   consolidateShippingOrderId, string_, YES, Unique id included in the response of :ref:`method-CreateConsolidateShippingOrder`
   returnInventoryIdList, List<long_>, YES, Inventory id list to be removed from the consolidate shipping order

Sample:

.. code-block:: json

   {
      "consolidateShippingOrderId": "01J4RE1T4ZJVHFY7A5CXYTCZJH",
      "returnInventoryIdList": [
         20278,
         20251
      ]
   }

Response:

.. csv-table:: ``RemoveInventoryFromConsolidateShippingOrderResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnInventoryId, long_, The return inventory id of the remvoed inventory
   handlingCode, string_, The handling code will be reset to ``ohd`` (On-hold)
   handlingStatusCode, string_, The handling status code will be reset to ``pending``


Sample:

.. code-block:: json

   {
      "data": [
      {
         "returnInventoryId": 20278,
         "handlingCode": "ohd",
         "handlingStatusCode": "pending"
      },
      {
         "returnInventoryId": 20251,
         "handlingCode": "ohd",
         "handlingStatusCode": "pending"
      }
      ],
      "correlationId": "0HN5R89JOAUBR:00000001",
      "meta": {
         "status": 200,
         "data": {},
         "errorCode": null,
         "error": {}
      }
   }

----

.. _method-UpdateConsolidateShippingOrderShippingMethod:

Update Shipping Method
----------------------

::

[POST] <userapi-endpoint>/outbound/ConsolidateShipping/order/updateShippingMethod

Parameters:

.. csv-table:: ``UpdateConsolidateShippingOrderShippingMethodRequest``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   consolidateShippingOrderId, string_, YES, Unique id included in the response of :ref:`method-CreateConsolidateShippingOrder`
   shippingMethod, string_, YES, ``AIR_FREIGHT`` or ``COURIER_SERVICE`` or ``LAND_FREIGHT`` or ``SEA_FREIGHT``

Sample:

.. code-block:: json

   {
      "consolidateShippingOrderId": "01J54T64ZZ1R7MMVS4SRA1XK7R",
      "shippingMethod": "AIR_FREIGHT"
   }

Response: Same as :ref:`structure-CreateConsolidateShippingOrderResponse`

----

.. _method-UpdateConsolidateShippingOrderShipTo:

Update Shipping Information
----------------------------

::

[POST] <userapi-endpoint>/outbound/ConsolidateShipping/order/updateShipToInformation

Parameters:

.. csv-table:: ``UpdateConsolidateShippingOrderShipToRequest``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   consolidateShippingOrderId, string_, YES, Unique id included in the response of :ref:`method-CreateConsolidateShippingOrder`
   shipTo, :ref:`structure-ShipTo`, YES, Ship to address (see below)

Sample:

.. code-block:: json

   {
      "consolidateShippingOrderId": "01J54T64ZZ1R7MMVS4SRA1XK7R",
      "shipTo": {
         "shipToCountry": "usa",
         "shipToContactName": "This name has been updated",
         "shipToPhone": "+1-555-1234",
         "shipToFax": "+1-555-5678",
         "shipToEmail": "john.doe@example.com",
         "shipToCompanyName": "This company name has been updated",
         "shipToStreet1": "This address has been updated",
         "shipToStreet2": "Suite 456",
         "shipToStreet3": "",
         "shipToCity": "Springfield",
         "shipToState": "IL",
         "shipToPostalCode": "62704",
         "shipToType": "Updated type"
      }
   }

Response: Same as :ref:`structure-CreateConsolidateShippingOrderResponse`

----

.. _method-ConfirmConsolidateShippingOrder:

Confirm Order
-------------

::

[POST] <userapi-endpoint>/outbound/consolidateShipping/order/confirm

Parameters:

.. csv-table:: ``ConfirmConsolidateShippingOrderRequest``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   consolidateShippingOrderId, string_, YES, Unique id included in the response of :ref:`method-CreateConsolidateShippingOrder`

Sample:

.. code-block:: json

   {
      "consolidateShippingOrderId": "01J54T64ZZ1R7MMVS4SRA1XK7R"
   }

Response: Same as :ref:`structure-CreateConsolidateShippingOrderResponse`

----

.. _method-CancelConsolidateShippingOrder:

Cancel Order
------------

::

[POST] <userapi-endpoint>/outbound/consolidateShipping/order/cancel

Parameters:

.. csv-table:: ``CancelConsolidateShippingOrderRequest``
   :header: "Name", "Type","Required", "Remarks"
   :widths: 15, 10, 10, 30

   consolidateShippingOrderId, string_, YES, Unique id included in the response of :ref:`method-CreateConsolidateShippingOrder`


Sample:

.. code-block:: json

   {
      "consolidateShippingOrderId": "01J54T64ZZ1R7MMVS4SRA1XK7R"
   }

Response: Same as :ref:`structure-CreateConsolidateShippingOrderResponse`

----

FBA
===

.. _method-createFbaShipment:

CreateFbaShipment
---------------------------

::

[POST] <userapi-endpoint>/Fba/FbaShipment/create

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   createFbaShipmentPayloadList, List<:ref:`structure-CreateFbaShipmentPayload`>

|

Response:

.. _structure-CreateFbaShipmentResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/CreateFbaShipmentResponse.csv

|

.. csv-table:: ``CreateFbaShipmentReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/CreateFbaShipmentReply.csv

|

----

.. _method-getFbaShipment:

GetFbaShipment
---------------------------

::

[POST] <userapi-endpoint>/Fba/FbaShipment/get

Parameters:

.. _structure-GetFbaShipmentRequest:

.. csv-table::
   :header: "Name", "Type","Remarks"
   :widths: 15, 10, 30

   fbaShipmentId, Guid

|

Response:

.. _structure-GetFbaShipmentResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaShipmentResponse.csv

|

.. csv-table:: ``GetFbaShipmentReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/CreateFbaShipmentReply.csv

|

----

.. _method-ListFbaShipment:

ListFbaShipment
--------------------

::

[Get] <userapi-endpoint>/Fba/FbaShipment/list

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   createFrom, Datetime_
   createTo, Datetime_
   pageSize, integer_
   offset, integer_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/ListFbaShipmentResponse.csv

|

----

.. _method-GetFbaShipmentItemList:

GetFbaShipmentItemList
-----------------------------

::

[Get] <userapi-endpoint>/Fba/FbaShipmentItem/getFbaShipmentItemList

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fbaShipmentId, guid_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaShipmentItemResponse.csv

|

----

.. _method-assignFbaInventoryReferenceNumber:

AssignFbaInventoryReferenceNumber
-----------------------------------

::

[Get] <userapi-endpoint>/Fba/FbaWarehouseInventory/assignReferenceNumber

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   warehouseId, integer_
   fnsku, string_
   referenceNumber, string_

|

Response:

.. _structure-AssignFbaInventoryReferenceNumberResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/AssignFbaInventoryReferenceNumberResponse.csv

|

.. csv-table:: ``AssignFbaInventoryReferenceNumberReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/AssignFbaInventoryReferenceNumberReply.csv

|

----

.. _method-updateFbaInventoryRemark:

UpdateFbaInventoryRemark
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaWarehouseInventory/updateRemark

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   warehouseId, integer_
   fnsku, string_
   remark, string_

|

Response:

.. _structure-UpdateFbaInventoryRemarkResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/UpdateFbaInventoryRemarkResponse.csv

|

.. csv-table:: ``UpdateFbaInventoryRemarkReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/UpdateFbaInventoryRemarkReply.csv

|

----

.. _method-GetFbaWarehouseInventoryList:

GetFbaWarehouseInventoryList
-----------------------------

::

[Get] <userapi-endpoint>/Fba/FbaWarehouseInventory/getFbaWarehouseInventoryList

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fnsku, string_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaWarehouseInventoryResponse.csv

|

----

.. _method-createFbaInstruction:

CreateFbaInstruction
---------------------------

::

[POST] <userapi-endpoint>/Fba/FbaInstruction/create

Parameters:

.. _structure-CreateFbaInstructionRequest:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/CreateFbaInstructionRequest.csv

|

.. list-table::
   :widths: 15 25
   :header-rows: 1

   * - ``fbaInstrictionHandlingCode`` code
     - Description
   * - ``RSK``
     - Restock
   * - ``RCL``
     - Recall
   * - ``RPS``
     - Replenish
   * - ``OTH``
     - Others
   * - ``DIS``
     - Dispose


Response:

.. _structure-CreateFbaInstructionResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/CreateFbaInstructionResponse.csv

|

.. csv-table:: ``CreateFbaInstructionReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/CreateFbaInstructionReply.csv

|

----

.. _method-ListFbaInstruction:

ListFbaInstruction
--------------------

::

[Get] <userapi-endpoint>/Fba/FbaInstruction/list

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   createFrom, Datetime_
   createTo, Datetime_
   pageSize, integer_
   offset, integer_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/ListFbaInstructionResponse.csv

|

----

.. _method-GetFbaInstructionItemList:

GetFbaInstructionItemList
-----------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInstructionItem/getFbaInstructionItemList

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fbaInstructionId, guid_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionItemResponse.csv

|

----

.. _method-getFbaInstructionDispose:

GetFbaInstructionDispose
-------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInstructionDispose/get

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fbaInstructionId, guid_

|


Response:

.. _structure-GetFbaInstructionDisposeResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionDisposeResponse.csv

|

.. csv-table:: ``GetFbaInstructionDisposeReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionDisposeReply.csv

|

----

.. _method-getFbaInstructionOthers:

GetFbaInstructionOthers
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInstructionOthers/get

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fbaInstructionId, guid_

|

Response:

.. _structure-GetFbaInstructionOthersResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionOthersResponse.csv

|

.. csv-table:: ``GetFbaInstructionOthersReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionOthersReply.csv

|

----

.. _method-getFbaInstructionRecall:

GetFbaInstructionRecall
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInstructionRecall/get

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fbaInstructionId, guid_

|

Response:

.. _structure-GetFbaInstructionRecallResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionRecallResponse.csv

|

.. csv-table:: ``GetFbaInstructionRecallReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionRecallReply.csv

|

----

.. _method-getFbaInstructionReplenish:

GetFbaInstructionReplenish
---------------------------

::

[Get] <userapi-endpoint>/Fba/FbaInstructionReplenish/get

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaInstructionId, guid_

|

Response:

.. _structure-GetFbaInstructionReplenishResponse:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionReplenishResponse.csv

|

.. csv-table:: ``GetFbaInstructionReplenishReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionReplenishReply.csv

|

----

..
   .. _method-assignFbaInstructionReplenishNewFnsku:

   AssignFbaInstructionReplenishNewFnsku
   --------------------------------------

   ::

   [POST] <userapi-endpoint>/Fba/FbaInstructionReplenish/assignNewFnsku

   Parameters:

   .. csv-table::
      :header: "Name", "Type", "Remarks"
      :widths: 20, 20, 30

      fbaInstructionId, guid_
      assignNewFnskuPayloadList, List<:ref:`structure-AssignNewFnskuPayload`>

   |

   Response:

   .. _structure-FbaInventoryRelabelResponse:

   .. csv-table::
      :header: "Name", "Type", "Remarks"
      :widths: 15, 10, 30
      :file: models/Fba/AssignFbaInstructionReplenishNewFnskuResponse.csv

   |

   .. csv-table:: ``AssignNewFnskuReply``
      :header: "Name", "Type", "Remarks"
      :widths: 15, 10, 30
      :file: models/Fba/AssignNewFnskuReply.csv

   |

   ----

   .. _method-updateFbaInstructionReplenishShippingInfo:

   UpdateFbaInstructionReplenishShippingInfo
   ------------------------------------------

   ::

   [Get] <userapi-endpoint>/Fba/FbaInstructionReplenish/updateShippingInfo

   Parameters:

   .. _structure-UpdateFbaInstructionReplenishShippingInfoRequest:

   .. csv-table::
      :header: "Name", "Type", "Remarks"
      :widths: 15, 10, 30
      :file: models/Fba/UpdateFbaInstructionReplenishShippingInfoRequest.csv

   Sample (with label):

   .. code-block:: json

      {
         "fbaInstructionId": "92e5d29c-c0b0-4f49-a0f6-913fbf99ed78",
         "provideLabel": true,
         "newShipmentFbaName": "Example Name",
         "newShipmentStreet1": "Example Street 1",
         "newShipmentStreet2": "Example Street 2",
         "newShipmentStreet3": "Example Street 3",
         "newShipmentState": "Example State",
         "newShipmentCity": "Example City",
         "newShipmentPostalCode": "900100",
         "newShipmentCountryCode": "usa",
         "newShipmentReferenceId": "REF-S0000000001",
         "filename": "T2300001487.pdf",
         "fileKey": "rr/api/files/2023/21/038758fc-0446-4be1-9b1b-4adb04d96305/T2300001487.pdf"
      }

   Sample (without label):

   .. code-block:: json

      {
         "fbaInstructionId": "5c779604-b317-4cc8-8f3f-7470982c4965",
         "provideLabel": false,
         "newShipmentFbaName": "Example Name",
         "newShipmentStreet1": "Example Street 1",
         "newShipmentStreet2": "Example Street 2",
         "newShipmentStreet3": "Example Street 3",
         "newShipmentState": "Example State",
         "newShipmentCity": "Example City",
         "newShipmentPostalCode": "900100",
         "newShipmentCountryCode": "usa",
         "newShipmentReferenceId": "REF-S0000000002"
      }

   |

   Response:

   .. _structure-UpdateFbaInstructionReplenishShippingInfoResponse:

   .. csv-table::
      :header: "Name", "Type", "Remarks"
      :widths: 15, 10, 30
      :file: models/Fba/UpdateFbaInstructionReplenishShippingInfoResponse.csv

   |

   .. csv-table:: ``UpdateShippingInfoReply``
      :header: "Name", "Type", "Remarks"
      :widths: 15, 10, 30
      :file: models/Fba/UpdateShippingInfoReply.csv

   |

----

.. _method-getFbaInstructionRestock:

GetFbaInstructionRestock
---------------------------

::

[POST] <userapi-endpoint>/Fba/FbaInstructionRestock/get

Parameters:

.. _structure-GetFbaInstructionRestockRequest:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fbaInstructionId, guid_

|

Response:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionRestockResponse.csv

|

.. csv-table:: ``GetFbaInstructionRestockReply``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Fba/GetFbaInstructionRestockReply.csv

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
.. _guid: https://learn.microsoft.com/en-us/dotnet/api/system.guid?view=netcore-3.1
