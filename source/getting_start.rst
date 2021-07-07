Getting Started
===============

Getting return label
--------------------

1. :ref:`method-CreateReturnRequest` - create Return Request with product and shipment information. If Return Request is created successfully, ``shipmentId`` will be returned in the response message
2. :ref:`method-CreateLabel` - request label by ``shipmentId``.
3. :ref:`notification-label` - label request result will be notified through callback URL

Cancelling return label
-----------------------

:ref:`method-CancelLabel` - cancel label from its linked return request.
Cancel label by ``labelId``, which is expected in the Label result notification.

Getting and editing return request
----------------------------------

:ref:`method-EditReturnRequest` - with returnRequestId, returned in CreateReturnRequest response

Return inventory at return arrival
----------------------------------

:ref:`notification-MarkReceived` - when the return arrives at the warehouse, it will be marked received.
Notification will be sent to your callback URL. Return inventory payload (returnInventoryId is included) will be included in the notification payload.

Disposing return inventory
--------------------------

:ref:`method-UpdateReturnInventoryHandling` - update handling by returnInventoryId, with dispose handling

:ref:`method-CancelReturnInventoryHandling` - cancel handling by returnInventoryId

Creating recall and resend
--------------------------

- | :ref:`method-CreateRecall` - with list of returnInventoryId
  | Recall tracking number will be notified by callback
- | :ref:`method-CreateResend` - with list of returnInventoryId
  | Resend tracking number will be notified by callback

Adding VAS on return inventory
------------------------------

- | :ref:`method-CreateVas` - with list of ReturnRequestLineItemVasPayload
  | every return inventory has its own returnRequestLineItemId (ref: :ref:`structure-returnInventoryPayload`)

Response Meta
-------------

All response contains a ``meta`` property for clients to identify the status of the message.

For a normal response, ``status`` code must be ``200``. Any other status code means that the request cannot complete successfully.

Below shows an example of a success :ref:`method-GetApiBalance` response

.. code-block:: json

  {
    "apiBalances": [
      {
        "apiBalanceId": 7,
        "currencyCode": "usd",
        "balance": 2044.233
      }
    ],
    "correlationId": "0HM9VIKSKH2CB:00000002",
    "meta": {
      "status": 200,
      "data": {},
      "errorCode": null,
      "error": {}
    },
    "totalNumberOfRecords": 1
  }

Below shows a example of a fail :ref:`method-GetWarehouse` response (invalid ``warehouseId``)

.. code-block:: json

  {
    "correlationId": "0HM9VIKSKH2CF:00000002",
    "meta": {
      "status": 400,
      "data": {},
      "errorCode": "VALIDATION_FAILED",
      "error": {
        "warehouseId": "The value 'invalid' is not valid."
      }
    }
  }
