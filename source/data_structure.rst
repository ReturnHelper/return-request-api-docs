.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool

Data Structure
==============

.. _structure-SearchReturnInventoryRequest:

SearchReturnInventoryRequest
----------------------------

Usage 
  - :ref:`method-SearchReturnInventory`

===========================  =========  ========
variable name                 type      remark    
===========================  =========  ========
apiName                       string_                 
returnRequestNumber           string_                 
returnRequestLineItemNumber   string_                 
handlingCode                  string_                 
handlingStatusCode            string_                 
shipmentNumber                string_                 
warehouseId                   integer_                
createFromStr                 string_                 
createToStr                   string_                 
warehouseRma                  string_                 
sku                           string_                 
pageSize                      integer_                
offset                        integer_                
===========================  =========  ========

----

.. _structure-SearchReturnInventoryResponse:

SearchReturnInventoryResponse
-----------------------------

Usage 
  - :ref:`method-SearchReturnInventory`

============================  ===========================================================  ======
variable name                 type                                                         remark     
============================  ===========================================================  ======
returnInventoryList           List of :ref:`structure-SearchReturnInventoryResultPayload`
correlationId                 string_
meta                          :ref:`structure-ApiResponseMeta`
totalNumberOfRecords          integer_
============================  ===========================================================  ======

----

.. _structure-SearchReturnInventoryResultPayload:

SearchReturnInventoryResultPayload
----------------------------------

Usage
  - :ref:`structure-SearchReturnInventoryResponse`

============================  ===========================================================  ======
variable name                 type                                                         remark     
============================  ===========================================================  ======
apiName                       string_                
returnRequestNumber           string_                
shipmentNumber                string_                
vasCount                      integer_               
warehouseRma                  string_                
returnRequestRemarks          string_                
shipmentId                    long_                  
actualWeight                  decimal_               
cbm                           decimal_          
returnInventoryId             long_                  
warehouseId                   integer_               
stockAge                      double_                  
returnRequestLineItemId       long_                  
returnRequestId               integer_               
description                   string_                
weight                        decimal_               
weightUom                     string_                
valueCurrencyCode             string_                
value                         decimal_               
handlingCode                  string_                
handlingStatusCode            string_                
returnRequestLineItemImages   List of :ref:`structure-ReturnRequestLineItemImagePayload`                
returnRequestLineItemVasList  List of :ref:`structure-ReturnRequestLineItemVasPayload`                
warehouseRemarks              string_                
handlingUpdatedOnStr          string_                
sku                           string_                
modifyOn                      Datetime_
modifyBy                      string_
modifyOnStr                   string_
createOn                      Datetime_
createBy                      string_
createOnStr                   string_
============================  ===========================================================  ======

----

.. _structure-ApiResponseMeta:

ApiResponseMeta
---------------

Usage
  - :ref:`structure-SearchReturnInventoryResponse`
  - :ref:`structure-ReturnInventoryResponse`

============================  ===========================================================  ======
variable name                 type                                                         remark     
============================  ===========================================================  ======
shipmentStatusCode            string_
shipmentStatus                string_
shipmentStageDescription      string_
isShipmentEditable            bool_
============================  ===========================================================  ======

----

.. _structure-ReturnRequestLineItemImagePayload:

ReturnRequestLineItemImagePayload
---------------------------------

Usage
  - :ref:`structure-SearchReturnInventoryResultPayload`
  - :ref:`structure-ReturnInventoryResponse`

============================  =========  ======
variable name                 type       remark
============================  =========  ======
returnRequestLineItemImageId  long_
returnRequestLineItemId       long_
filename                      string_
fileExt                       string_
s3OriginalFileKey             string_
s3SmallFileKey                string_
s3MediumFileKey               string_
s3LargeFileKey                string_
createOn                      Datetime_
createBy                      string_
createOnStr                   string_
============================  =========  ======

----

.. _structure-ReturnRequestLineItemVasPayload:

ReturnRequestLineItemVasPayload
-------------------------------

Usage
  - :ref:`structure-SearchReturnInventoryResultPayload`
  - :ref:`structure-ReturnInventoryResponse`

============================  =========  ======
variable name                 type       remark
============================  =========  ======
returnRequestLineItemVasId    long_
returnRequestLineItemId       long_
vasCode                       string_
metaQuantity                  integer_
vasResult                     string_
notes                         string_
isFinished                    bool_
modifyOn                      Datetime_
modifyBy                      string_
modifyOnStr                   string_
createOn                      Datetime_
createBy                      string_
createOnStr                   string_
============================  =========  ======

.. _structure-ReturnInventoryResponse:

ReturnInventoryResponse
-----------------------

Usage
  - :ref:`method-GetReturnInventory`

============================  ===========================================================  ======
variable name                 type                                                         remark     
============================  ===========================================================  ======
correlationId                 string_
meta                          :ref:`structure-ApiResponseMeta`
returnInventoryId             long_                  
warehouseId                   integer_               
stockAge                      double_                  
returnRequestLineItemId       long_                  
returnRequestId               integer_               
description                   string_                
weight                        decimal_               
weightUom                     string_                
valueCurrencyCode             string_                
value                         decimal_               
handlingCode                  string_                
handlingStatusCode            string_                
returnRequestLineItemImages   List of :ref:`structure-ReturnRequestLineItemImagePayload`                
returnRequestLineItemVasList  List of :ref:`structure-ReturnRequestLineItemVasPayload`                
warehouseRemarks              string_                
handlingUpdatedOnStr          string_                
sku                           string_                
modifyOn                      Datetime_
modifyBy                      string_
modifyOnStr                   string_
createOn                      Datetime_
createBy                      string_
createOnStr                   string_
============================  ===========================================================  ======
