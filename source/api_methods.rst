###########
API Methods
###########

Public Api
==========

.. _method-GetApiInfo:

GetApiInfo
----------

::

[GET] <publicapi-endpoint>/account/getApiInfo

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

[GET] <publicapi-endpoint>/apitype/getAllApiTypes

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

[GET] <publicapi-endpoint>/boxtype/getAllBoxTypes

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

[GET] <publicapi-endpoint>/country/getAllCountries

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

[GET] <publicapi-endpoint>/country/getAllFromCountries

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

[GET] <publicapi-endpoint>/currency/getAllCurrencies

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

[GET] <publicapi-endpoint>/dimensionuom/getAllDimensionUoms

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

[GET] <publicapi-endpoint>/file/getPublicReadUrl

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

[POST] <publicapi-endpoint>/file/uploadFile

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

[GET] <publicapi-endpoint>/file/getFile

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

[GET] <publicapi-endpoint>/file/getPreSignedUploadUrl

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

[GET] <publicapi-endpoint>/handling/getAllHandlings

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

[GET] <publicapi-endpoint>/handlingfeetype/getAllHandlingFeeTypes

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

[GET] <publicapi-endpoint>/handlingstatus/getAllHandlingStatus

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

[GET] <publicapi-endpoint>/labelstatus/getAllLabelStatus

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

[GET] <publicapi-endpoint>/martype/getAllMarType

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

[GET] <publicapi-endpoint>/recallStatus/getAllRecallInventoryStatus

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

[GET] <publicapi-endpoint>/recallStatus/getAllPickUpTypeStatus

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

[GET] <publicapi-endpoint>/recallStatus/getAllRecallServiceTypeStatus

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

[GET] <publicapi-endpoint>/refundstatus/getAllRefundStatus

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

[GET] <publicapi-endpoint>/resendstatus/getAllResendStatus

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

[GET] <publicapi-endpoint>/returnrequestsourcetype/getAllReturnRequestSourceTypes

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

[GET] <publicapi-endpoint>/returnrequeststatus/getAllReturnRequestStatus

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

[GET] <publicapi-endpoint>/servicetype/getAllServiceType

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

[GET] <publicapi-endpoint>/shipment/getAllShipmentStatus

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

[POST] <publicapi-endpoint>/shipment/calculateBuyerShipmentCost

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

[GET] <publicapi-endpoint>/shipment/getAllShipmentCostTypes

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

[GET] <publicapi-endpoint>/transactiontype/getAllTransactionType

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

[GET] <publicapi-endpoint>/unknownshipmentstatus/getAllUnknownShipmentStatus

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

[GET] <publicapi-endpoint>/vas/getAllVas

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

[GET] <publicapi-endpoint>/vasStatus/getAllVasStatus

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

[GET] <publicapi-endpoint>/weightuom/getAllWeightUom

Input: No Input

Output:

.. _structure-WeightUomListResponse:

.. csv-table:: ``WeightUomListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/WeightUomListResponse.csv

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

FBA
###

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

Input:

.. _structure-CreateFbaRemovalShipmentRequest:

.. csv-table:: ``CreateFbaRemovalShipmentRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateFbaRemovalShipmentRequest.csv

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 20, 30

   fbaRemovalOrderId, string_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. _structure-AssignFbaInventoryHandlingRequest:

.. csv-table:: ``AssignFbaInventoryHandlingRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/AssignFbaInventoryHandlingRequest.csv
|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRecallId, integer_

|


Output:

.. _structure-FbaInventoryRecallResponse:

.. csv-table:: ``FbaInventoryRecallResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryRecallResponse.csv

|

----

.. _method-searchFbaInventoryRecall:

SarchFbaInventoryRecall
---------------------------

::

[Get] <userapi-endpoint>/fbaInventory/searchFbaInventoryRecall

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaOthersId, long_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaDisposeId, long_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRelabelId, long_

|

Output:

.. _structure-FbaInventoryRelabelResponse:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   fbaRelabelId, long_
   newFnsku, string_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   pageSize, integer_
   offset, integer_

|

Output:

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

Input:

.. _structure-CreateFbaInventoryRelabelShipmentRequest:

.. csv-table:: ``CreateFbaInventoryRelabelShipmentRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateFbaInventoryRelabelShipmentRequest.csv


|

Output:

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

Input:

.. _structure-AddFbaInventoryRelabelAddressLabelRequest:

.. csv-table:: ``AddFbaInventoryRelabelAddressLabelRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/AddFbaInventoryRelabelAddressLabelRequest.csv


|

Output:

.. _structure-FbaInventoryRelabelShipmentResponse:

.. csv-table:: ``FbaInventoryRelabelShipmentResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/FbaInventoryRelabelShipmentResponse.csv

|

----

.. _method-CreateLabel:

CreateLabel
---------------------------

::

[POST] <userapi-endpoint>/Label/CreateLabel

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   shipmentId, long_

|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   labelId, long_

|

Output:

.. _structure-ApiResponse:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

|

----

.. _method-createRecall:

CreateRecall
---------------------------

::

[POST] <userapi-endpoint>/recall/createRecall

Input:

.. _structure-CreateRecallRequest:

.. csv-table:: ``CreateRecallRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CreateRecallRequest.csv


|

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   recallId, long_

|

Output:

.. _structure-ApiResponse:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

|
----

.. _method-createRecallByReturnInventoryId:

CreateRecallByReturnInventoryId
---------------------------

::

[POST] <userapi-endpoint>/recall/createRecallByReturnInventoryId

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   returnInventoryId, long_

|

Output:

.. _structure-ApiResponse:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

|

----

.. _method-cancelRecallByReturnInventoryId:

CancelRecallByReturnInventoryId
---------------------------

::

[POST] <userapi-endpoint>/recall/cancelRecallByReturnInventoryId

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 20, 20, 30

   returnInventoryId, long_

|

Output:

.. _structure-ApiResponse:

.. csv-table:: ``ApiResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiResponse.csv

|

----

.. _method-searchRecall:

SearchRecall
---------------------------

::

[Get] <userapi-endpoint>/recall/searchRecall

Input:

.. _structure-SearchRecallRequest:

.. csv-table:: ``SearchRecallRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchRecallRequest.csv


|

Output:

.. _structure-SearchRecallResponse:

.. csv-table:: ``SearchRecallResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchRecallResponse.csv

|

----

.. _method-searchRefund:

SearchRefund
---------------------------

::

[Get] <userapi-endpoint>/Refund/searchRefund

Input:

.. _structure-GetRefundListRequest:

.. csv-table:: ``GetRefundListRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/GetRefundListRequest.csv


|

Output:

.. _structure-RefundListResponse:

.. csv-table:: ``RefundListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/RefundListResponse.csv

|

----


.. _method-GetServiceTypeByFromToCountry:

GetServiceTypeByFromToCountry
---------------

::

[GET] <userapi-endpoint>/warehouse/getServiceTypeByFromToCountry

Input:


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fromCountry, string_

Output:

.. csv-table:: ``ServiceTypeListResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ServiceTypeListResponse.csv

|

----

.. _method-GetServiceTypeByFromCountryAndWarehouse:

GetServiceTypeByFromCountryAndWarehouse
---------------

::

[GET] <userapi-endpoint>/warehouse/getServiceTypeByFromCountryAndWarehouse

Input:


.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   fromCountry, string_
   warehouseId, integer_

Output:

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

Input:

.. _structure-SearchShipmentRequest:

.. csv-table:: ``SearchShipmentRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SearchShipmentRequest.csv

Output:

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

Input: No Input

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   countryCode, string_

Output:

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

Input:

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   warehouseId, integer_

Output:

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

Input:

.. _structure-UserSearchWarehouseRequest:

.. csv-table:: ``UserSearchWarehouseRequest``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UserSearchWarehouseRequest.csv

Output:

.. _structure-UserSearchWarehouseResponse:

.. csv-table:: ``UserSearchWarehouseResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UserSearchWarehouseResponse.csv

|

----

.. _method-createReturnRequest:

CreateReturnRequest
-------------------

::

[POST]  <userapi-endpoint>/returnrequest/createReturnRequest

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

[POST]  <userapi-endpoint>/returnrequest/createNonRrLabelReturnRequest

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

[POST]  <userapi-endpoint>/returnrequest/editReturnRequest

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

[GET]  <userapi-endpoint>/returnrequest/getReturnRequest

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

[GET]  <userapi-endpoint>/returnrequest/searchReturnRequest

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

[POST]  <userapi-endpoint>/returnrequest/updateReturnRequestHandling

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

[POST]  <userapi-endpoint>/returnrequest/createVas

Input:

.. _structure-CreateVasRequest:

.. csv-table:: ``CreateVasRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30

   createLineItemVasRequestList, List<:ref:`structure-ReturnRequestLineItemVasPayload`>

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

[POST]  <userapi-endpoint>/returnrequest/updateRemark

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

.. _method-SearchReturnInventory:

SearchReturnInventory
---------------------

Search for Return Inventory

::

    [GET]  <userapi-endpoint>/returninventory/searchReturnInventory

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

    [GET]  <userapi-endpoint>/returninventory/getReturnInventory

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

.. _method-SearchRma:

SearchRma
-----------

::

    [GET] <userapi-endpoint>/returninventory/SearchRma

Input:

.. _structure-SearchRmaRequest:

.. csv-table:: ``SearchRmaRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/ReturnInventory/SearchRmaRequest.csv

|

Output:

.. _structure-ReturnInventoryResponse:

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

[POST]  <userapi-endpoint>/returninventory/updateReturnInventoryHandling

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

[POST]  <userapi-endpoint>/returninventory/cancelReturnInventoryHandling

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

[POST]  <userapi-endpoint>/returninventory/assignReturnInventorySku

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

.. _method-CreateResend:

CreateResend
------------

::

[POST]  <userapi-endpoint>/resend/createResend

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

[GET]  <userapi-endpoint>/resend/getResend

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

[GET]  <userapi-endpoint>/resend/searchResend

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

[POST]  <userapi-endpoint>/resend/cancelResend

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