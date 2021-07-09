Getting Started
===============

Get return label
----------------

1. :ref:`method-CreateReturnRequest` - create Return Request with product and shipment information. If Return Request is created successfully, ``shipmentId`` will be returned in the response message.
2. :ref:`method-CreateLabel` - request label by ``shipmentId``
3. :ref:`notification-label` - label request result will be sent to your :ref:`notification_endpoint`

Cancel return label
-------------------

:ref:`method-CancelLabel` - cancel label from its linked return request
Cancel label by ``labelId``, which is expected in the :ref:`notification-label`.

Return inventory at return arrival
----------------------------------

- | When the return arrives at the warehouse, it will be marked received.
- | :ref:`notification-MarkReceived` will be sent to your notification endpoint. Return inventory payload, will be included in the notification payload. ``returnInventoryId`` is expected in it.

Image of the return uploaded
----------------------------

- | When images of the return have been uploaded (or any changes in the image list), :ref:`notification-changeLineItemImage` will be sent to your notification endpoint. Image list is expected in it.
- | Return inventory has another nickname: line item, and image list belongs to return inventory.

Dispose return inventory
------------------------

:ref:`method-UpdateReturnInventoryHandling` - update handling by ``returnInventoryId``, with dispose handling

:ref:`method-CancelReturnInventoryHandling` - cancel handling by ``returnInventoryId``

On-hold return inventory
------------------------

:ref:`method-UpdateReturnInventoryHandling` - update handling by ``returnInventoryId``, with on-hold handling

Create recall and cancel recall
-------------------------------

- | :ref:`method-CreateRecall` - Create recall with list of ``returnInventoryId``, to instruct which return inventories need to be recalled.
- | AWB will be sent to your notification endpoint, :ref:`notification-Recall`. AWB will be included in the notification payload.
- | :ref:`method-CancelRecall` - cancel the recall you have requested

Create resend and cancel resend
-------------------------------

- | :ref:`method-CreateResend` - Create resend with list of ``returnInventoryId``, to instruct which return inventories need to be resent.
- | Resend tracking number will be sent to your notification endpoint, :ref:`notification-Resend`. Resend tracking number will be included in the notification payload.
- | :ref:`method-CancelResend` - cancel the resend you have requested

Add VAS on return inventory
---------------------------

- | :ref:`method-CreateVas` - Add VAS to a return inventory to instruct what VAS needed for the specific return inventory.
- | When the specific VAS is finished, the VAS result will be sent to your notification endpoint, :ref:`notification-UpdateVas`. VAS result will be included in the notification payload.

Response Meta
-------------

All response contains a ``meta`` property for clients to identify the status of the message.

For a normal response, ``status`` code must be ``200``. Any other status code means that the request cannot complete successfully.

Below shows an example of a success :ref:`method-GetApiBalance` response

.. code-block:: json
  :emphasize-lines: 11

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
  :emphasize-lines: 4,6,8

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
