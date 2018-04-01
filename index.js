const HubbleClient = require('./lib/hubble-client.js');

let Service;
let Characteristic;

class HubbleAccessory {

    constructor(log, config) {
        this.log = log;
        this.services = [];
        this.hubbleClient = new HubbleClient({
            host: config.host
        });
        this.update_interval = Number(config["update_interval"] || 60);
        this.setup();     
    }

    setup() {
        this.services = [
            this.accessoryInfo(),
            this.sensorService()
        ]
    }

    getServices() {
        return this.services;
    }    

    accessoryInfo() {
        const accessoryInfo = new Service.AccessoryInformation();
    
        accessoryInfo
          .setCharacteristic(Characteristic.Manufacturer, "Motorola")
          .setCharacteristic(Characteristic.Model, "Baby monitor")                    
          .setCharacteristic(Characteristic.SerialNumber, "123-456-789");
    
        return accessoryInfo;
    }    

    sensorService() {
        let sensorService = new Service.TemperatureSensor("Hubble temperature");
        sensorService
            .getCharacteristic(Characteristic.CurrentTemperature)
            .setProps({
                minValue: -50,
                maxValue: 50
            })               
            .on('get', this.getCurrentTemperature.bind(this));
        
        setInterval(async () => {
            this.log('Temperature polling start');
            const value = await this.hubbleClient.getTemperature();
            sensorService
                .getCharacteristic(Characteristic.CurrentTemperature)
                .updateValue(value);   
        }, this.update_interval * 1000);

        return sensorService;
    }  

    async getCurrentTemperature(callback) {
        try {
            const value = await this.hubbleClient.getTemperature();
            callback(null, value);
        } catch (e) {
            callback(e);
        }
    };
}

module.exports = function(homebridge) {          
    ({ Service, Characteristic } = homebridge.hap);
    
    homebridge.registerAccessory('homebridge-hubble-temp', 'HubbleCameraTemp', HubbleAccessory);
}