.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool

Data Structure
==============

.. _structure-ApiTypeResponse:

ApiTypeResponse
---------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ApiTypeResponse.csv

.. _structure-BoxTypeResponse:

BoxTypeResponse
---------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/BoxTypeResponse.csv

.. _structure-CountryResponse:

CountryResponse
---------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CountryResponse.csv

.. _structure-CurrencyResponse:

CurrencyResponse
----------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/CurrencyResponse.csv

.. _structure-DimensionUomResponse:

DimensionUomResponse
--------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/DimensionUomResponse.csv

.. _structure-HandlingResponse:

HandlingResponse
----------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/HandlingResponse.csv

.. _structure-VasResponse:

VasResponse
-----------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/VasResponse.csv

.. _structure-LabelStatusResponse:

LabelStatusResponse
-------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/LabelStatusResponse.csv

.. _structure-RefundStatusResponse:

RefundStatusResponse
--------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/RefundStatusResponse.csv

.. _structure-ReturnRequestSourceTypeResponse:

ReturnRequestSourceTypeResponse
-------------------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ReturnRequestSourceTypeResponse.csv

.. _structure-ReturnRequestStatusResponse:

ReturnRequestStatusResponse
---------------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ReturnRequestStatusResponse.csv

.. _structure-ResendStatusResponse:

ResendStatusResponse
--------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/ResendStatusResponse.csv

.. _structure-HandlingStatusResponse:

HandlingStatusResponse
----------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/HandlingStatusResponse.csv

.. _structure-SpecialRequestResponse:

SpecialRequestResponse
----------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/SpecialRequestResponse.csv

.. _structure-TransactionTypeResponse:

TransactionTypeResponse
-----------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/TransactionTypeResponse.csv

.. _structure-HandlingFeeTypeResponse:

HandlingFeeTypeResponse
-----------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/HandlingFeeTypeResponse.csv

.. _structure-WeightUomResponse:

WeightUomResponse
-----------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/WeightUomResponse.csv

.. _structure-UnknownShipmentStatusResponse:

UnknownShipmentStatusResponse
-----------------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/UnknownShipmentStatusResponse.csv

.. _structure-PaginationRequest:

PaginationRequest
-----------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/PaginationRequest.csv

.. _structure-CreateOnlyPayload:

CreateOnlyPayload
-----------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/CreateOnlyPayload.csv

.. _structure-EditablePayload:

EditablePayload
---------------

.. csv-table:: (inherit :ref:`structure-CreateOnlyPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/EditablePayload.csv


.. _structure-PaginationResponse:

PaginationResponse
------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/PaginationResponse.csv

.. _structure-ApiResponseMeta:

ApiResponseMeta
---------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/ApiResponseMeta.csv

.. _structure-ReturnInventoryPayload:

ReturnInventoryPayload
----------------------

.. csv-table:: (inherit :ref:`structure-EditablePayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/ReturnInventoryPayload.csv

.. _structure-ReturnRequestLineItemImagePayload:

ReturnRequestLineItemImagePayload
---------------------------------

.. csv-table:: (inherit :ref:`structure-CreateOnlyPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ReturnRequestLineItemImagePayload.csv

.. _structure-ReturnRequestLineItemVasPayload:

ReturnRequestLineItemVasPayload
-------------------------------

.. csv-table:: (inherit :ref:`structure-EditablePayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ReturnRequestLineItemVasPayload.csv

.. _structure-ShipmentPayload:

ShipmentPayload
---------------

.. csv-table:: (inherit :ref:`structure-EditablePayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ShipmentPayload.csv

.. _structure-ReturnRequestLineItemPayload:

ReturnRequestLineItemPayload
----------------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ReturnRequestLineItemPayload.csv

.. _structure-ReturnRequestPayload:

ReturnRequestPayload
--------------------

.. csv-table:: (inherit :ref:`structure-EditablePayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ReturnRequestPayload.csv

.. _structure-CreateNonRrLabelShipmentRequest:

CreateNonRrLabelShipmentRequest
-------------------------------

.. csv-table::  (inherit :ref:`structure-ShipmentPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   trackingNumber, string_
   carrier, string_

.. _structure-EditReturnRequestLineItemRequest:

EditReturnRequestLineItemRequest
--------------------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/EditReturnRequestLineItemRequest.csv



.. _structure-ShipmentWithLabel:

ShipmentWithLabel
-----------------

.. csv-table:: (inherit :ref:`structure-ShipmentPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ShipmentWithLabel.csv


.. _structure-LabelPayload:

LabelPayload
------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/General/LabelPayload.csv


.. _structure-ShipmentCostDetailPayload:

ShipmentCostDetailPayload
-------------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ShipmentCostDetailPayload.csv

.. _structure-ShipmentSupplementPayload:

ShipmentSupplementPayload
-------------------------

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnRequest/ShipmentSupplementPayload.csv

.. _structure-UpdateReturnRequestLineItemHandlingRequest:

UpdateReturnRequestLineItemHandlingRequest
------------------------------------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnRequestLineItemId, long_
   handlingCode, string_

.. _structure-ResendShipmentPayload:

ResendShipmentPayload
---------------------

.. csv-table:: (inherit :ref:`structure-EditablePayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Resend/ResendShipmentPayload.csv

.. _structure-ResendPayload:

ResendPayload
-------------

.. csv-table:: (inherit :ref:`structure-EditablePayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Resend/ResendPayload.csv

.. _structure-SearchResendPayload:

SearchResendPayload
-------------------

.. csv-table:: (inherit :ref:`structure-ResendPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Resend/SearchResendPayload.csv



