Getting Started
===============

Brief Introduction
------------------

There are three main parts for a return flow:

1. Before arriving warehouse. Request a return label, then ship the return to warehouse.
2. Arrives warehouse. Image of the return will be uploaded when it is received.
3. Leave warehouse. Instructs how to handle the return by assigning a handling to the return inventory.

Request a return label
----------------------

.. warning::
  We are combining :ref:`method-CreateReturnRequest` and :ref:`method-CreateLabel` into a new single API :ref:`method-createreturnshipment`.

  The old flow of creating return request and label separately will be deprecated on 2024-12-31.

  Any new integrations should use :ref:`method-createreturnshipment` instead of :ref:`method-createreturnrequest` and :ref:`method-createlabel`. Steps shown below.


1. :ref:`method-createreturnshipment` - create a return shipment and queue a return label request
2. :ref:`notification-label` - label request result will be sent to your :ref:`notification_endpoint`

Cancel return label
-------------------

1.  If label is created successfully, it will be linked with the return request and corresponding shipment.
2.  However, in somehow, it is no longer needed. You have to cancel label in system.
3.  :ref:`method-CancelLabel` - Cancel label by ``labelId``, which is expected in the :ref:`notification-label`.

.. _gettingstarted-ReturnArrival:

Return Inventory at the return arrival
--------------------------------------

When the return shipment arrives a warehouse,
it will be marked received and converted into Return Inventory for seller's further management. (See :ref:`section-ReturnInventory`)

It is very important to note that **the whole shipment will be handled as a single Return Inventory** when converting :ref:`section-ReturnRequest` into :ref:`section-ReturnInventory`.


There are two types of return arrival:

`Type 1 - Return Shipment:`

1.  Initiated by seller and label is provided by Return Helper. Return Request has been created upon seller's request.
2.  :ref:`notification-MarkReceived` will be sent to your notification endpoint. Return inventory payload, will be included in the notification payload. ``returnInventoryId`` is expected in it.
3.  It is an action of Putaway. Image of the return will be uploaded in the next step. Please expect :ref:`notification-changeLineItemImage` later.

`Type 2 - Unknown Shipment:`

1.  Not initiated by seller but Return Helper identifies that it belongs to a specific seller. Return Request record will be created when arrives warehouse and then assign to the seller.
2.  :ref:`notification-assignUnknown` will be sent to your notification endpoint. Return inventory payload and return request payload will be included in the notification payload. ``returnInventoryId`` and ``returnRequestId`` are expected in it.
3.  Before assigning to the seller, image of shipment has been uploaded. So, this notificaion will also include the image list.
4.  However, if there is any change on the image list, you will be also notified by :ref:`notification-changeLineItemImage`.

Image of the return
-------------------

When images of the return inventory have been uploaded (or any changes in the image list), :ref:`notification-changeLineItemImage` will be sent to your notification endpoint. Image (url) list is expected in it.

Instruct how to handle the return inventory
-------------------------------------------

The following section is describing how to instruct the warehouse to handle the return inventory. i.e. Dispose, on-hold, resend, recall and others. Or requesting VAS on the return inventory.

Dispose return inventory
------------------------

:ref:`method-UpdateReturnInventoryHandling` - update handling by ``returnInventoryId``, with dispose handling.

:ref:`method-CancelReturnInventoryHandling` - cancel handling by ``returnInventoryId``.

On-hold return inventory
------------------------

:ref:`method-UpdateReturnInventoryHandling` - update handling by ``returnInventoryId``, with on-hold handling.

Create resend and cancel resend
-------------------------------

1. :ref:`method-CreateResend` - Create resend with a list of ``returnInventoryId``, to instruct which return inventories need to be resent.
2. Resend tracking number will be sent to your notification endpoint, :ref:`notification-Resend`. Resend tracking number will be included in the notification payload.
3. :ref:`method-CancelResend` - cancel the resend you have requested.

Create recall
-------------

1. :ref:`method-createrecallbyreturninventoryid` - Create recall with a list of ``returnInventoryId``. Each recall request can contains a maximum of 100 return inventories.
2. Any updates such as tracking update, pick up status change, are sent back via notification - :ref:`notification-recall`

Add VAS on return inventory
---------------------------

1. :ref:`method-CreateVas` - Add VAS to a return inventory to instruct what VAS needed for the specific return inventory.
2. When the specific VAS is finished, the VAS result will be sent to your notification endpoint, :ref:`notification-UpdateVas`. VAS result will be included in the notification payload.

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

FBA Return
----------

Customers can send their FBA products to Return Helper warehouse. After the products are received, customers can apply instructions such as restock, replenish, recall, dispose and others.

Here is an example workflow of FBA return:

1.  Customer acknownledge RH by :ref:`method-createfbashipment` and sends FBA products to Return Helper warehouse.
2.  The shipment is received and putaway as a FBA inventory with ``fnsku`` and ``quantity``. These information are push to customers via :ref:`notification`.
3.  Customers can always checks their FBA inventory with :ref:`method-GetFbaWarehouseInventoryList`.
4.  Customers create a FBA instructions by :ref:`method-createfbainstruction`. (Replehishment requires additional shipping information which is currently not supported in API.)
5.  RH will process the instruction and notify customers the results by notifications.
6.  Customer can also check the instruction status by :ref:`method-getfbainstructionrecall`, :ref:`method-getfbainstructiondispose`, :ref:`method-getfbainstructionrestock`, :ref:`method-getfbainstructionothers`.

Retrieving History Data for Existing Portal Users
-------------------------------------------------

This section is intended for existing Return Helper Portal users who are starting to implement API workflows.
If you are a normal API user, you do not need to retrieve history data because all neccessary information are exchanged between API calls.

To retrieve return shipment history data: See :ref:`method-ListShipment`

To retrieve return inventory history data: See :ref:`method-ListReturnInventory`

To retrieve FBA history data:

1.  Use :ref:`method-ListFbaShipment` to search for history FBA shipments within a date range, getting a list of fbaShipmentId.
2.  Get shipment item list using :ref:`method-GetFbaShipmentItemList`. This response contains every fba shipment items, their fnsku, total quantity as well as available quantity wihtin this fbaShipmentId.
3.  Get the fba warehouse inventory list with a fnsku by :ref:`method-GetFbaWarehouseInventoryList`
4.  Similarly, search fba instructions using :ref:`method-ListFbaInstruction`.
5.  Then, get the list of items for each fba instructions by :ref:`method-GetFbaInstructionItemList`.

Once you have successfully retrieved all the history data,
you should rely on normal API calls to maintain your data instead of continuously polling for history data.
