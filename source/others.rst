###########
Other Notes
###########

.. _others_usps_qr_code:

USPS QR Code
------------
For all label requests with USPS as service type, you will receive a QR code in the :ref:`notification-label`.
This QR code provides an alternative choice for your customers to print their shipping label. For more details on
USPS Label Broker®, please visit their official site here_

This service is automatically enabled in our system.

You should also provide clear instructions guiding yours customers to use the QR code properly. Below is a email template
we suggested:

::

  Step 1
  PRINT YOUR LABEL
  If you have a printer and a shipping box then Click below to generate your return label.
  {{label here}}


  **DON’T HAVE A PRINTER**
  If you don’t have a printer, you can generate a Label Broker® code to take to your USPS® Post
  Office® and they will handle creating the label. Present the Label Broker® ID below to a Retail
  Associate at the counter. Remember to hold on to your receipt for tracking purposes.
  {{qr code here}}

  Step 2
  Use the [USPS® Locator tool](https://tools.usps.com/find-location.htm) to find the [nearest Post Office](https://tools.usps.com/find-location.htm?locationType=po&serviceType=lbroretail&address={{postal code here}}).




.. _here: https://www.usps.com/business/label-broker.htm
