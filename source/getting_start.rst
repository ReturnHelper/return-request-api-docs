Getting Started
===============

Getting and canceling label
---------------------------------

- :ref:`method-CreateReturnRequest` - with product and shipment information
- :ref:`method-CreateLabel` with shipmentId, returned in CreateReturnRequest response
- Label result callback - result will be notified via callback URL provided in advanced
- :ref:`method-CancelLabel` with labelId - included in the label result callback

Getting and editing return request
----------------------------------

- :ref:`method-EditReturnRequest` - with returnRequestId, returned in CreateReturnRequest response

Creating return request without label (Non RR label)
----------------------------------------------------

- :ref:`method-createNonRrLabelReturnRequest` - with product, shipment information **AND** tracking number

Getting return inventory
------------------------

- Return inventory will be created after return request’s shipment is received by the warehouse
- Using :ref:`method-SearchReturnInventory` and/or :ref:`method-SearchRma`

Updating and canceling return inventory handling
------------------------------------------------

- | :ref:`method-UpdateReturnInventoryHandling` (only for dispose handling) - with returnInventoryId
  | For recall and resend, multiple return inventories can be recalled/ resent in a batch - with list of returnInventoryId

- | :ref:`method-CancelReturnInventoryHandling` (only for dispose handling) - with returnInventoryId
  | For recall and resend, need to cancel recall or cancel resend

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


Notification
------------

- | :ref:`notification-label` - Label Notification
- | :ref:`notification-Recall` - Recall Notification
- | :ref:`notification-Resend` - Resend Notification
