.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool

Data Structure
==============

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


