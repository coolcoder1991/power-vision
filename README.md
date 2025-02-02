# powervision

This is a simple web app for tracking battery charging levels for anything.

## Quick Start

1. Clone repo and run the command:
   `make prod` (or equivalently: `docker compose -f docker-compose.prod.yml up -d`)

2. Go to: `http://localhost:4173/` bring up the UI.
3. Open the hamburg menue in the upper right and select `Add Device`  
   A new device should be created. You can edit the device details or name by clicking the device box.

Devices will base their charging level off of time between charges. By default, devices will decrease at 10% per day. After a device has been charged using PowerVision for the first time, the charging will decrease per-day based on that.

Device boxes are color-coded to match their estimated power level.
Delete any device by clicking on the device, then selecting `edit`, then `delete`.
