###########
API Methods
###########

Public Api
==========

.. _method-GetApiInfo:

GetApiInfo
----------

::

[GET] /account/getApiInfo

Input: No Input

Output:

.. _structure-ApiInfoResponse:

.. csv-table:: ``ApiInfoResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiInfoResponse.csv

|

----

.. _method-getAllApiTypes:

GetAllApiTypes
--------------

::

[GET] /apitype/getAllApiTypes

Input: No Input

Output:

.. _structure-ApiTypeListResponse:

.. csv-table:: ``ApiTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiTypeListResponse.csv

|

----

.. _method-GetAllBoxTypes:

GetAllBoxTypes
--------------

::

[GET] /boxtype/getAllBoxTypes

Input: No Input

Output:

.. _structure-BoxTypeListResponse:

.. csv-table:: ``BoxTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/BoxTypeListResponse.csv

|

----

.. _method-GetAllCountries:

GetAllCountries
---------------

::

[GET] /country/getAllCountries

Input: No Input

Output:

.. _structure-CountryListResponse:

.. csv-table:: ``CountryListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CountryListResponse.csv

|

----

.. _method-GetAllFromCountries:

GetAllFromCountries
-------------------

::

[GET] /country/getAllFromCountries

Input: No Input

Output:


.. csv-table:: ``CountryListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CountryListResponse.csv

|

----

.. _method-GetAllCurrencies:

GetAllCurrencies
----------------

::

[GET] /currency/getAllCurrencies

Input: No Input

Output:

.. _structure-CurrencyListResponse:

.. csv-table:: ``CurrencyListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CurrencyListResponse.csv

|

----

.. _method-GetAllDimensionUoms:

GetAllDimensionUoms
-------------------

::

[GET] /dimensionuom/getAllDimensionUoms

Input: No Input

Output:

.. _structure-DimensionUomListResponse:

.. csv-table:: ``DimensionUomListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/DimensionUomListResponse.csv

|

----

.. _method-GetPublicReadUrl:

GetPublicReadUrl
----------------

::

[GET] /file/getPublicReadUrl

Input:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   fileKey, string_

|

Output:

.. _structure-ApiResponse:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   correlationId, string_
   meta, :ref:`structure-ApiResponseMeta`

|

----

.. _method-UploadFile:

UploadFile
----------

::

[POST] /file/uploadFile

Input:

.. _structure-UploadFileRequest:

.. csv-table:: ``UploadFileRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   filename, string_
   file, File

|

Output:

.. _structure-UploadFileResponse:

.. csv-table:: ``UploadFileResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UploadFileResponse.csv

|

----

.. _method-GetFile:

GetFile
-------

::

[GET] /file/getFile

Input:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   apiFileId, long_

|

Output:


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   file, File

|

----

.. _method-GetPreSignedUploadUrl:

GetPreSignedUploadUrl
---------------------

::

[GET] /file/getPreSignedUploadUrl

Input:

.. _structure-GetPreSignedUrlRequest:

.. csv-table:: ``GetPreSignedUrlRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/General/GetPreSignedUrlRequest.csv

|

Output:

.. _structure-GetPreSignedUrlResponse:

.. csv-table:: ``GetPreSignedUrlResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetPreSignedUrlResponse.csv

|

----

.. _method-GetAllHandlings:

GetAllHandlings
---------------

::

[GET] /handling/getAllHandlings

Input: No Input

Output:

.. _structure-HandlingListResponse:

.. csv-table:: ``HandlingListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/HandlingListResponse.csv

|

----

.. _method-GetAllHandlingFeeTypes:

GetAllHandlingFeeTypes
----------------------

::

[GET] /handlingfeetype/getAllHandlingFeeTypes

Input: No Input

Output:

.. _structure-HandlingFeeTypeListResponse:

.. csv-table:: ``HandlingFeeTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/HandlingFeeTypeListResponse.csv

|

----

.. _method-GetAllHandlingStatus:

GetAllHandlingStatus
--------------------

::

[GET] /handlingstatus/getAllHandlingStatus

Input: No Input

Output:

.. _structure-HandlingStatusListResponse:

.. csv-table:: ``HandlingStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/HandlingStatusListResponse.csv

|

----

.. _method-GetAllLabelStatus:

GetAllLabelStatus
-----------------

::

[GET] /labelstatus/getAllLabelStatus

Input: No Input

Output:

.. _structure-LabelStatusListResponse:

.. csv-table:: ``LabelStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/LabelStatusListResponse.csv

|

----

.. _method-GetAllMarType:

GetAllMarType
-------------

::

[GET] /martype/getAllMarType

Input: No Input

Output:

.. _structure-MarTypeListResponse:

.. csv-table:: ``MarTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/MarTypeListResponse.csv

|

----

.. _method-GetAllRecallInventoryStatus:

GetAllRecallInventoryStatus
---------------------------

::

[GET] /recallStatus/getAllRecallInventoryStatus

Input: No Input

Output:

.. _structure-RecallInventoryStatusListResponse:

.. csv-table:: ``RecallInventoryStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/RecallInventoryStatusListResponse.csv

|

----

.. _method-GetAllPickUpTypeStatus:

GetAllPickUpTypeStatus
---------------------------

::

[GET] /recallStatus/getAllPickUpTypeStatus

Input: No Input

Output:

.. _structure-PickUpTypeStatusListResponse:

.. csv-table:: ``PickUpTypeStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/PickUpTypeStatusListResponse.csv

|

----

.. _method-GetAllRecallServiceTypeStatus:

GetAllRecallServiceTypeStatus
-----------------------------

::

[GET] /recallStatus/getAllRecallServiceTypeStatus

Input: No Input

Output:

.. _structure-RecallServiceTypeResponse:

.. csv-table:: ``RecallServiceTypeResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/RecallServiceTypeResponse.csv

|

----

.. _method-GetAllRefundStatus:

GetAllRefundStatus
------------------

::

[GET] /refundstatus/getAllRefundStatus

Input: No Input

Output:

.. _structure-RefundStatusListResponse:

.. csv-table:: ``RefundStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/RefundStatusListResponse.csv

|

----

.. _method-GetAllResendStatus:

GetAllResendStatus
------------------

::

[GET] /resendstatus/getAllResendStatus

Input: No Input

Output:

.. _structure-ResendStatusListResponse:

.. csv-table:: ``ResendStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ResendStatusListResponse.csv

|

----

.. _method-GetAllReturnRequestSourceTypes:

GetAllReturnRequestSourceTypes
------------------------------

::

[GET] /returnrequestsourcetype/getAllReturnRequestSourceTypes

Input: No Input

Output:

.. _structure-ReturnRequestSourceTypeListResponse:

.. csv-table:: ``ReturnRequestSourceTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ReturnRequestSourceTypeListResponse.csv

|

----

.. _method-GetAllReturnRequestStatus:

GetAllReturnRequestStatus
-------------------------

::

[GET] /returnrequeststatus/getAllReturnRequestStatus

Input: No Input

Output:

.. _structure-ReturnRequestStatusListResponse:

.. csv-table:: ``ReturnRequestStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ReturnRequestStatusListResponse.csv

|

----

.. _method-GetAllServiceType:

GetAllServiceType
-----------------

::

[GET] /servicetype/getAllServiceType

Input: No Input

Output:

.. _structure-ServiceTypeListResponse:

.. csv-table:: ``ServiceTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ServiceTypeListResponse.csv

|

----

.. _method-GetAllShipmentStatus:

GetAllShipmentStatus
--------------------

::

[GET] /shipment/getAllShipmentStatus

Input: No Input

Output:

.. _structure-ShipmentStatusListResponse:

.. csv-table:: ``ShipmentStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ShipmentStatusListResponse.csv

|

----

.. _method-CalculateBuyerShipmentCost:

CalculateBuyerShipmentCost
--------------------------

::

[POST] /shipment/calculateBuyerShipmentCost

Input:

.. _structure-ShipmentPayload:

.. csv-table:: ``ShipmentPayload`` (inherit :ref:`structure-EditablePayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ShipmentPayload.csv

|

Output:

.. _structure-ShipmentCostResponse:

.. csv-table:: ``ShipmentCostResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ShipmentCostResponse.csv

|

----

.. _method-GetAllShipmentCostTypes:

GetAllShipmentCostTypes
-----------------------

::

[GET] /shipment/getAllShipmentCostTypes

Input: No Input

Output:

.. _structure-ShipmentCostTypeResponse:

.. csv-table:: ``ShipmentCostTypeResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ShipmentCostTypeResponse.csv

|

----

.. _method-GetAllTransactionType:

GetAllTransactionType
---------------------

::

[GET] /transactiontype/getAllTransactionType

Input: No Input

Output:

.. _structure-TransactionTypeListResponse:

.. csv-table:: ``TransactionTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/TransactionTypeListResponse.csv

|

----

.. _method-GetAllUnknownShipmentStatus:

GetAllUnknownShipmentStatus
---------------------------

::

[GET] /unknownshipmentstatus/getAllUnknownShipmentStatus

Input: No Input

Output:

.. _structure-UnknownShipmentStatusListResponse:

.. csv-table:: ``UnknownShipmentStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UnknownShipmentStatusListResponse.csv

|

----

.. _method-GetAllVas:

GetAllVas
---------

::

[GET] /vas/getAllVas

Input: No Input

Output:

.. _structure-VasListResponse:

.. csv-table:: ``VasListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/VasListResponse.csv

|

----

.. _method-GetAllVasStatus:

GetAllVasStatus
---------------

::

[GET] /vasStatus/getAllVasStatus

Input: No Input

Output:

.. _structure-VasStatusListResponse:

.. csv-table:: ``VasStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/VasStatusListResponse.csv

|

----

.. _method-GetAllWeightUom:

GetAllWeightUom
---------------

::

[GET] /weightuom/getAllWeightUom

Input: No Input

Output:

.. _structure-WeightUomListResponse:

.. csv-table:: ``WeightUomListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/WeightUomListResponse.csv

|

----

General
=======

.. _method-GetAllSpecialRequest:

GetAllSpecialRequest
--------------------

::

[GET] /specialrequest/getAllSpecialRequest

Input: No Input

Output:

.. _structure-SpecialRequestListResponse:

.. csv-table:: ``SpecialRequestListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SpecialRequestListResponse.csv

|

----

.. _method-GetEbayReturnReason:

GetEbayReturnReason
-------------------

::

[GET] /ebay/getEbayReturnReason

Input: No Input

Output:

.. _structure-EbayReturnReasonListResponse:

.. csv-table:: ``EbayReturnReasonListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/EbayReturnReasonListResponse.csv

|

----

.. _method-GetEbayReturnStatus:

GetEbayReturnStatus
-------------------

::

[GET] /ebay/getEbayReturnStatus

Input: No Input

Output:

.. _structure-EbayReturnStatusListResponse:

.. csv-table:: ``EbayReturnStatusListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/EbayReturnStatusListResponse.csv

|

----

.. _method-GetAllEbayCountries:

GetAllEbayCountries
-------------------

::

[GET] /ebay/getAllEbayCountries

Input: No Input

Output:

.. _structure-EbayCountryListResponse:

.. csv-table:: ``EbayCountryListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   correlationId, string_
   meta, :ref:`structure-ApiResponseMeta`
   ebayCountryListResponse, List<:ref:`structure-EbayCountryResponse`>

|

----

Return User API
================

.. _method-GetApiBalance:

GetApiBalance
-------------------

::

[GET] <userapi-endpoint>/ApiBalance/GetApiBalance

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

.. _structure-ApiBalanceListResponse:

.. csv-table:: ``ApiBalanceListResponse`` 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiBalanceListResponse.csv
      
|

----

.. _method-createFbaRemovalOrder:

CreateFbaRemovalOrder
---------------------------

::

[POST] <userapi-endpoint>/fbaInventory/createFbaRemovalOrder

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   removalOrderId, string_

|

Output:

.. _structure-createFbaRemovalOrder:

.. csv-table:: ``createFbaRemovalOrder`` 
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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   fbaRemovalOrderId, string_
   trackingNumber, string_
   warehouseId, integer_

|

Output:

.. _structure-CreateFbaRemovalShipment:

.. csv-table:: ``CreateFbaRemovalShipment`` 
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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   fbaRemovalOrderId, string_
   
|

Output:

.. _structure-GetFbaRemovalOrder:

.. csv-table:: ``GetFbaRemovalOrder`` 
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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   fbaRemovalOrderId, string_
   
|

Output:

.. _structure-SearchFbaRemovalOrder:

.. csv-table:: ``SearchFbaRemovalOrder`` 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetFbaRemovalOrderListResponse.csv
      
|

----

Return Request
================

.. _method-createReturnRequest:

CreateReturnRequest
-------------------

::

[POST] /returnrequest/createReturnRequest

Input:

.. _structure-CreateReturnRequestRequest:

.. csv-table:: ``CreateReturnRequestRequest`` (inherit :ref:`structure-ReturnRequestPayload`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   shipment, :ref:`structure-ShipmentPayload`
   returnRequestLineItems, List<:ref:`structure-ReturnRequestLineItemPayload`>

|

Output:

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

[POST] /returnrequest/createNonRrLabelReturnRequest

Input:

.. _structure-CreateNonRrLabelReturnRequest:

.. csv-table:: ``CreateNonRrLabelReturnRequest`` (inherit :ref:`structure-ReturnRequestPayload`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   shipment, :ref:`structure-CreateNonRrLabelShipmentRequest`
   returnRequestLineItems, List<:ref:`structure-ReturnRequestLineItemPayload`>

|

Output:

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

[POST] /returnrequest/editReturnRequest

Input:

.. _structure-EditReturnRequestRequest:

.. csv-table:: ``EditReturnRequestRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnRequest/EditReturnRequestRequest.csv


|

Output:

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

[GET] /returnrequest/getReturnRequest

Input:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestId, integer_

|

Output:

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

[GET] /returnrequest/searchReturnRequest

Input:

.. _structure-GetReturnRequestListRequest:

.. csv-table:: ``GetReturnRequestListRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnRequest/GetReturnRequestListRequest.csv

|

Output:

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

[POST] /returnrequest/updateReturnRequestHandling

Input:

.. _structure-UpdateReturnRequestHandlingRequest:

.. csv-table:: ``UpdateReturnRequestHandlingRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnRequestId, integer_
   returnRequestLineItemHandling, List<:ref:`structure-UpdateReturnRequestLineItemHandlingRequest`>

|

Output:

.. _structure-ApiResponse:

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

[POST] /returnrequest/createVas

Input:

.. _structure-CreateVasRequest:

.. csv-table:: ``CreateVasRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   createLineItemVasRequestList, List<:ref:`structure-ReturnRequestLineItemVasPayload`>

|

Output:

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

[POST] /returnrequest/updateRemark

Input:

.. _structure-UpdateRemarkRequest:

.. csv-table:: ``UpdateRemarkRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnRequest/UpdateRemarkRequest.csv

|

Output:

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

    [GET] /returninventory/searchReturnInventory

Input: ``SearchReturnInventoryRequest``

.. csv-table:: ``SearchReturnInventoryRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/SearchReturnInventoryRequest.csv

|

Output: ``SearchReturnInventoryResponse``

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

    [GET] /returninventory/getReturnInventory

Input:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnInventoryId, long_

|

Output:

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

[GET] /returninventory/getReturnInventoryByLineItemId

Input:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   lineItemId, long_

|

Output:

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

[POST] /returninventory/updateReturnInventoryHandling

Input:

.. _structure-UpdateReturnInventoryHandlingRequest:

.. csv-table:: ``UpdateReturnInventoryHandlingRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/UpdateReturnInventoryHandlingRequest.csv

|

Output:

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

[POST] /returninventory/cancelReturnInventoryHandling

Input:

.. _structure-CancelReturnInventoryHandlingRequest:

.. csv-table:: ``CancelReturnInventoryHandlingRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   returnInventoryId, long_

|

Output:

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

[POST] /returninventory/assignReturnInventorySku

Input:

.. _structure-AssignReturnInventorySkuRequest:

.. csv-table:: ``AssignReturnInventorySkuRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/AssignReturnInventorySkuRequest.csv

|

Output:

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

[POST] /resend/createResend

Input:

.. _structure-CreateResendRequest:

.. csv-table:: ``CreateResendRequest`` (inherit :ref:`structure-ResendPayload`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   resendShipment, :ref:`structure-ResendShipmentPayload`

|

Output:

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

[GET] /resend/getResend

Input:

.. csv-table::
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   resendId, integer_

|

Output:

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

[GET] /resend/searchResend

Input:

.. _structure-GetResendListRequest:

.. csv-table:: ``GetResendListRequest`` (inherit :ref:`structure-PaginationRequest`)
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/Resend/GetResendListRequest.csv

|

Output:

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

[POST] /resend/cancelResend

Input:

.. _structure-CancelResendRequest:

.. csv-table:: ``CancelResendRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   resendId, long_

|

Output:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/ApiResponse.csv

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