###########
API Methods
###########

Return Request
================

.. _method-createReturnRequest:

createReturnRequest
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

createNonRrLabelReturnRequest
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


.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool