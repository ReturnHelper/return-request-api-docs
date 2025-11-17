.. _gettingstarted:

Getting Started
===============

Prerequisites
-------------

1. Request for API access (see: :ref:`index-Authenication`)
2. Prepare notification endpoint for receiving notifications from our system (see: :ref:`notification`).
   If no notfication endpoint is provided, no label restule will be receive.
3. Go through the :ref:`gettingstarted` page

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

It is very important to note that creating a return label is a asynchronous process. User must integrate notification endpoint to receive the label result. The flow of the label request is as follows:

.. image:: images/api_key_token.png
    :alt: Create Return Label Flow
    :align: center


Cancel return label
-------------------

1.  If label is created successfully, it will be linked with the return request and corresponding shipment.
2.  However, in somehow, it is no longer needed. You have to cancel label in system.
3.  :ref:`method-CancelLabel` - Cancel label by ``labelId``, which is expected in the :ref:`notification-label`.

.. _gettingstarted-RMA:

RMA (Return Merchandise Authorization)
--------------------------------------

When a shipment enters our warehouse, it is immediately assigned a globally unique RMA value to enhance customer tracking to their packages, and also avoid communication errors.

We use RMA as our main communication identifier instead of the shipment tracking number for several reasons.

- Tracking numbers can be duplicated among different carriers or even within the same carrier.
- When a user decides to split a parcel (using :ref:`method-createvas`) , multiple parcels may share the same tracking number. By using RMA, we can simply assign new RMA numbers to identify each parcel after a split.

The format of a normal RMA:

- <warehouse prefix>-<warehouse ID>-<YYMMDD>-<environment single letter><rma sequence max 5 digits>-<check digits>
- Example: ``TWN-20-230101-D12345-36``

The format of a splitted RMA (After calling :ref:`method-createvas`):

- <warehouse prefix>-<warehouse ID>-<YYMMDD>-<environment single letter><rma sequence max 5 digits>-<split sequence 2 digits>-<check digits>
- Example: ``TWN-20-230101-D12345-01-36``

.. _gettingstarted-ReturnArrival:

Return Inventory at the return arrival
--------------------------------------

When the return shipment arrives a warehouse,
it will be marked received and converted into Return Inventory (See :ref:`section-ReturnInventory`) for seller's further management such as applying :ref:`method-UpdateReturnInventoryHandling`.

There are two types of return arrival:

`Type 1 - Return Shipment:`

1.  Initiated by seller and label is provided by Return Helper. Return Request has been created upon seller's request.
2.  :ref:`notification-warehousemarkshipmentarrivedv2` will be sent to your notification endpoint. Followed by :ref:`notification-inventorycreated` where ``returnInventoryId`` is expected in it.
3.  In some cases, when there are multiple packages that uses the same label, each package will be handled as a return inventory within the same shipment (and return request). i.e. There will be multiple :ref:`notification-inventorycreated` sent to your notification endpoint. Each inventory has their own ``returnInventoryId`` but they can share the same ``shipmentId`` and ``returnRequestId``.
4.  Inventory image will be uploaded in the next step. It will be pushed as :ref:`notification-changeLineItemImage`.

`Type 2 - Unknown Shipment:`

1.  Not initiated by seller but Return Helper identifies that it belongs to a specific seller. Return Request record will be created when arrives warehouse and then assign to the seller.
2.  :ref:`notification-assignUnknown` will be sent to your notification endpoint. Return inventory payload and return request payload will be included in the notification payload. ``returnInventoryId``, ``shipmentId`` and ``returnRequestId`` are expected in it.

    As the unknown shipment is now converted to a return shipment, the same case about multiple packages also applies here. i.e. There will be multiple :ref:`notification-inventorycreated` sent to your notification endpoint. Each inventory has their own ``returnInventoryId`` but they can share the same ``shipmentId`` and ``returnRequestId``.
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

.. _gettingstarted-customfield:

CustomField
------------

Custom field is a new feature that allows you to store additional information of the return.
It can be used to store any of your information that is not covered by the existing fields.

It is a ``Dictionary<string,string>`` list, you can store any key-value pair in it. The maximum number of custom fields for return is 24.

Please note that we do not process custom field data. It is only for your reference.

Sample:

.. code-block:: json

  {
    "customFieldMap": {
      "customerId": "buyer123",
      "dateOfPurchase": "2024-07-01"
    }
  }

Example of custom field usage:

1. :ref:`method-createreturnshipment` - Create return shipment with custom field.
2. Once the return shipment arrives, :ref:`notification-warehousemarkshipmentarrivedv2` will be sent to your notification endpoint which include custom fields.


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
