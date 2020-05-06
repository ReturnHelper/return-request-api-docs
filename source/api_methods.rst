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
    
Input: 
  :ref:`structure-SearchReturnInventoryRequest`

Output:
  :ref:`structure-SearchReturnInventoryResponse`

----

.. _method-GetReturnInventory:

GetReturnInventory
------------------

Get Return Inventory

::

    [GET] /returnInventory/getReturnInventory

Input: 
    long_ ``returnInventoryId`` 

Output:
  :ref:`structure-ReturnInventoryResponse`


.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
