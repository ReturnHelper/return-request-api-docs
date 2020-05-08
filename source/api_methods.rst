###########
API Methods
###########

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
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
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

    [GET] /returnInventory/getReturnInventory

Input: 

.. csv-table:: 
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30

   returnInventoryId, long_
|

Output:

.. _structure-ReturnInventoryResponse:

.. csv-table:: ``ReturnInventoryResponse`` (inherit :ref:`structure-ReturnInventoryPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/ReturnInventory/ReturnInventoryResponse.csv

----

.. reference definition goes here

.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool