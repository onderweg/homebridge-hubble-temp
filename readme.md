# homebridge-hubble-temp

Motorola baby monitor temperature plugin for [HomeBridge](https://github.com/nfarina/homebridge).

Adds a temperature sensor accessory to Homekit, with same temperature value as can be seen in Hubble app.

Tested with:

- Motorola MBP-845 Connect camera

## Installation

1. Install homebridge
2. Install this plugin using: `npm install -g https://github.com/onderweg/homebridge-hubble-temp.git`
3. Update your Homebridge configuration file (`config.json`)

## Configuration

The available fields in the config.json file are:
 - `host` [Mandatory] Camera IP or host name
 - `update_interal`: [Optional] Defines the polling period in seconds for the temperature value (default is 60s)

Example:

```
"accessories": [
    {
        "accessory": "HubbleCameraTemp",
        "name": "Baby room temperature",
        "host": "192.168.1.10",
        "update_interval": 60
    }    
]
```