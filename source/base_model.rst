.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool
.. _guid: https://learn.microsoft.com/en-us/dotnet/api/system.guid?view=netcore-3.1

Base Models
===========

Standard Response Structure
---------------------------

All response with 200 HTTP status code must includes the following properties

.. csv-table:: ``Standard Response Structure``
  :header: "Name", "Type", "Remarks"
  :widths: 15, 10, 30

  correlationId, string_,  This is a http request id (unique)
  ApiResponseMeta, :ref:`structure-ApiResponseMeta`

.. _structure-ApiResponseMeta:

ApiResponseMeta
---------------

.. csv-table:: ``ApiResponseMeta``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/ApiResponseMeta.csv


.. _structure-PaginationRequest:

PaginationRequest
-----------------

.. csv-table:: ``PaginationRequest``
   :header: "Name", "Type", "Required", "Remarks"
   :widths: 15, 10, 10, 30
   :file: models/BaseClass/PaginationRequest.csv

.. _structure-PaginationResponse:

PaginationResponse
------------------

.. csv-table:: ``PaginationResponse``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/PaginationResponse.csv

.. _structure-CreateOnlyPayload:

CreateOnlyPayload
-----------------

.. csv-table:: ``CreateOnlyPayload``
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/CreateOnlyPayload.csv

.. _structure-EditablePayload:

EditablePayload
---------------

.. csv-table:: ``EditablePayload`` (inherit :ref:`structure-CreateOnlyPayload`)
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/BaseClass/EditablePayload.csv


.. _structure-Notification:

Notification
---------------

.. csv-table::
   :header: "Name", "Type", "Remarks"
   :widths: 15, 10, 30
   :file: models/Notification/LabelNotificationResponse.csv