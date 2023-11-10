.. _decimal: https://docs.microsoft.com/en-us/dotnet/api/system.decimal?view=netcore-3.1
.. _string: https://docs.microsoft.com/en-us/dotnet/api/system.string?view=netcore-3.1
.. _long: https://docs.microsoft.com/en-us/dotnet/api/system.int64?view=netcore-3.1
.. _integer: https://docs.microsoft.com/en-us/dotnet/api/system.int32?view=netcore-3.1
.. _double: https://docs.microsoft.com/en-us/dotnet/api/system.double?view=netcore-3.1
.. _Datetime: https://docs.microsoft.com/en-us/dotnet/api/system.datetime?view=netcore-3.1
.. _bool: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/bool
.. _guid: https://learn.microsoft.com/en-us/dotnet/api/system.guid?view=netcore-3.1

Label Service Limitation
=========================

Royal Mail
------------
Service type code: ``rm``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/rm.csv

Royal Mail(MR)
--------------
Service type code: ``RETURN_RM_BIR``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/rm.csv

DPD
------------
Service type code: ``pdpd``, ``RETURN_GBR_DPD_BIR``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/dpd.csv

DHL
------------
Service type code: ``sdhl``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/sdhl.csv

Correos
------------
Service type code: ``ucepaq``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/correosPostmen.csv

Colissimo
------------
Service type code: ``ucss``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/patriceColissimo.csv

UPS Ground-NJ
--------------
Service type code: ``ups_nj``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/upsPostmen.csv

UPS Ground-WA
--------------
Service type code: ``ups_wa``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/upsPostmen.csv

USPS-NJ
--------------
Service type code: ``usps``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/usps.csv

USPS-BROKER-NJ
--------------
Service type code: ``RETURN_USPS_BROKER_NJ``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/usps.csv

Fedex Ground-NJ
----------------
Service type code: ``fedex_ground``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/postmenFedex.csv

Sendle AU Domestic
-------------------
Service type code: ``sendle_au_domestic``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/sendle.csv

Qxpress
---------
Service type code: ``easyparcel_qxpress``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/easyparcel.csv

J&T express
------------
Service type code: ``easyparcel_jnt_express``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/easyparcel.csv

Canada Post
------------
Service type code: ``ubi_ca``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/ubiCa.csv

AU Post
---------
Service type code: ``ubi_au``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/ubiAu.csv

SF Express
-----------
Service type code: ``sf_hk``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/sfHk.csv

DHL Parcel Ground-NJ
----------------------
Service type code: ``RETURN_DHL_PARCEL_GROUND_NJ``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/dhlUsa.csv

DHL Parcel Ground-WA
----------------------
Service type code: ``RETURN_DHL_PARCEL_GROUND_WA``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/dhlUsa.csv

FREU-Colissimo
---------------
Service type code: ``RETURN_PATRICE_EUR``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/patriceEur.csv

USPS Priority Mail-WA
-----------------------
Service type code: ``endicia``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/stampsEndica_pm.csv

USPS Parcel Select-WA
-----------------------
Service type code: ``endicia_parcel_select``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/stampsEndica_ga.csv

USPS Priority Mail-NJ
-----------------------
Service type code: ``RETURN_USPS_NJ``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/stampsEndica_pm.csv

USPS Ground Advantage-NJ
-------------------------
Service type code: ``RETURN_ENDICIA_USPS_GROUND_ADVANTAGE_NJ``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/stampsEndica_ga.csv

USPS Ground Advantage-WA
-------------------------
Service type code: ``RETURN_ENDICIA_USPS_GROUND_ADVANTAGE_WA``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/stampsEndica_ga.csv

FREU-DHL
------------
Service type code: ``RETURN_PATRICE_DHL_EUR``

.. csv-table::
   :header: "Name", "Type", "Required", "Limitation"
   :widths: 15, 10, 10, 30
   :file: models/LabelServiceLimitation/patriceDhlEur.csv
