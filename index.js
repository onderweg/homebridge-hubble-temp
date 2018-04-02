const HubbleAccessory = require('./HubbleAccessory');

module.exports = function(homebridge) {          
    ({ Service, Characteristic } = homebridge.hap);
    
    homebridge.registerAccessory(
        'homebridge-hubble-temp', 
        'HubbleCameraTemp', 
        HubbleAccessory(Service, Characteristic)
    );
}