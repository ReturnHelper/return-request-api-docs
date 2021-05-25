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

.. _method-GetServiceTypeByFromToCountry:

GetServiceTypeByFromToCountry
-----------------------------

::

[GET] <userapi-endpoint>/warehouse/getServiceTypeByFromToCountry

Parameters:


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fromCountry, string_

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

[GET] <userapi-endpoint>/warehouse/getServiceTypeByFromCountryAndWarehouse

Parameters:


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fromCountry, string_
   warehouseId, integer_

Response:

.. csv-table:: ``ServiceTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ServiceTypeListResponse.csv

|

----

.. _method-SearchShipment:

SearchShipment
---------------

::

[GET] <userapi-endpoint>/warehouse/searchShipment

Parameters:

.. _structure-SearchShipmentRequest:

.. csv-table:: ``SearchShipmentRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchShipmentRequest.csv

Response:

.. _structure-SearchShipmentResponse:

.. csv-table:: ``SearchShipmentResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchShipmentResponse.csv

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

   warehouseId, integer_

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

.. csv-table:: ``UserSearchWarehouseRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UserSearchWarehouseRequest.csv

Response:

.. _structure-UserSearchWarehouseResponse:

.. csv-table:: ``UserSearchWarehouseResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UserSearchWarehouseResponse.csv

|

----

Label
=====

.. _method-CreateLabel:

CreateLabel
---------------------------

::

[POST] <userapi-endpoint>/Label/CreateLabel

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   shipmentId, long_

|

Response:

.. _structure-ApiResponse:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

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

   labelId, long_

|

Response:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

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

   returnRequestLineItemNumber, string_, ,Alphanumeric hyphen and underscore (max length 50). (Must be unique)
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
   returnRequestFrom, string_, YES, Obtain from public api :ref:`method-getAllReturnRequestSourceTypes`
   returnRequestLineItems, List<:ref:`structure-ReturnRequestLineItemPayload`>,YES,Must contains **ONE** item only. Details see below

.. _structure-CreateNonRrLabelShipmentRequest:

Object ``CreateNonRrLabelShipmentRequest``:

.. csv-table::
  :header: "Name", "Type", "Required", "Remarks"
  :widths: 15, 10, 10, 30

  trackingNumber, string_, YES, Alphanumeric hyphen and underscore (max length 50).
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

   returnInventoryId, long_

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

.. csv-table:: ``SearchRmaRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/SearchRmaRequest.csv

|

Response:

.. csv-table:: ``ReturnInventoryResponse``
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

   lineItemId, long_

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

   returnInventoryId, long_

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

::

[POST]  <userapi-endpoint>/resend/createResend

Parameters:

.. _structure-CreateResendRequest:

.. csv-table:: ``CreateResendRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnInventoryIdList, List<long_>, YES, Obtain from user api :ref:`method-createReturnRequest` response
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
   shipmentServiceType, string_, YES, Obtain from: 1. user api :ref:`method-GetWarehouseByFromCountry` 2. user api :ref:`method-getServiceTypeByFromCountryAndWarehouse`
   shipmentCountryCode, string_, YES, Obtain from public api :ref:`method-getAllCountries`
   shipmentName, string_, YES, Max length 255
   shipmentPhone, string_
   shipmentFax, string_
   shipmentEmail, string_
   shipmentStreet1, string_, YES, Max length 255
   shipmentStreet2, string_
   shipmentStreet3, string_
   shipmentState, string_
   shipmentCity, string_, YES, Max length 50
   shipmentPostalCode, string_, YES, Max length 50

Sample:

::

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

   resendId, integer_

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

   resendId, long_

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

.. _method-createRecall:

CreateRecall
---------------------------

::

[POST] <userapi-endpoint>/recall/createRecall

Parameters:

.. _structure-CreateRecallRequest:

.. csv-table:: ``CreateRecallRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateRecallRequest.csv
Sample:

::

   {
      "returnInventoryIdList": [
         2073
      ]
   }

|

Response:

.. _structure-CreateRecallResponse:

.. csv-table:: ``CreateRecallResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateRecallResponse.csv

|

----

.. _method-cancelRecall:

CancelRecall
---------------------------

::

[POST] <userapi-endpoint>/recall/cancelRecall

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   recallId, long_

|

Response:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

|
----

.. _method-searchRecall:

SearchRecall
-------------

::

[Get] <userapi-endpoint>/recall/searchRecall

Parameters:

.. _structure-SearchRecallRequest:

.. csv-table::  ``SearchRecallRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30
   :file: models/General/SearchRecallRequest.csv


|

Response:

.. _structure-SearchRecallResponse:

.. csv-table:: ``SearchRecallResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchRecallResponse.csv

|

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

[POST] <userapi-endpoint>/fbaInventory/createFbaRemovalOrder

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   removalOrderId, string_

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

[POST] <userapi-endpoint>/fbaInventory/createFbaRemovalShipment

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

[Get] <userapi-endpoint>/fbaInventory/getFbaRemovalOrder

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   fbaRemovalOrderId, string_

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

[Get] <userapi-endpoint>/fbaInventory/searchFbaRemovalOrder

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

[Get] <userapi-endpoint>/fbaInventory/getFbaInventory

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

[Get] <userapi-endpoint>/fbaInventory/searchFbaInventory

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

[POST] <userapi-endpoint>/fbaInventory/assignFbaInventoryHandling

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

[Get] <userapi-endpoint>/fbaInventory/getFbaInventoryRecall

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRecallId, integer_

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

[Get] <userapi-endpoint>/fbaInventory/searchFbaInventoryRecall

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

[Get] <userapi-endpoint>/fbaInventory/getFbaInventoryOthers

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaOthersId, long_

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

[Get] <userapi-endpoint>/fbaInventory/searchFbaInventoryOthers

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

[Get] <userapi-endpoint>/fbaInventory/getFbaInventoryDispose

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaDisposeId, long_

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

[Get] <userapi-endpoint>/fbaInventory/searchFbaInventoryDispose

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

[Get] <userapi-endpoint>/fbaInventory/getFbaInventoryRelabel

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRelabelId, long_

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

[Get] <userapi-endpoint>/fbaInventory/searchFbaInventoryRelabel

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

[POST] <userapi-endpoint>/fbaInventory/assignFbaInventoryRelabelFnsku

Parameters:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRelabelId, long_
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

[Get] <userapi-endpoint>/fbaInventory/searchAvailableRelabelForShipment

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

[Get] <userapi-endpoint>/fbaInventory/createFbaInventoryRelabelShipment

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

[POST] <userapi-endpoint>/fbaInventory/addAddressLabel

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