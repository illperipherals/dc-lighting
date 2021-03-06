import { Module } from 'cerebral'

import dev from './modules/dev'
import MQTTModule from './modules/mqtt'
import * as sequences from './sequences'
import credentials from './credentials'

export default Module(({ controller }) => {
  controller.on('initialized', () => {
    controller.getSignal('appMounted')({})
  })
  return {
    state: {

    },
    signals: {
      appMounted: sequences.initialize,
    },
    modules: {
      dev,
      mqtt: MQTTModule({
        mqttUrl: credentials.mqttUrl,
        mqttOptions: {
          username: credentials.mqttUsername,
          password: credentials.mqttPassword,
          keepAlive: 10,
          queueQoSZero: false,
        },
        deviceMqttRoot: 'dev',
        deviceList: ['dev01','dev02','dev03','dev04','dev05'],
        viewRoot: 'view',
      }),
    },
    providers: {
    }
  }
})


/** MQTTModule for LOCAL EMQ BROKER
      mqtt: MQTTModule({
        mqttUrl: 'ws://10.10.101.29:8083/mqtt',
        mqttOptions: {
          username: 'webClient',
          password: 'public',
          keepAlive: 10,
          queueQoSZero: false,
        },
        deviceMqttRoot: 'dev',
        deviceList: ['dev01','dev02','dev03','dev04','dev05'],
        viewRoot: 'view',
      }),
    
    MQTTModule for CloudMQTT
    mqtt: MQTTModule({
        mqttUrl: 'wss://m11.cloudmqtt.com:30876',
        mqttOptions: {
          username: 'TestUser',
          password: 'hn_nIjPg3ffQ',
          keepAlive: 10,
          queueQoSZero: false,
        },
        deviceMqttRoot: 'dev',
        deviceList: ['dev01','dev02','dev03','dev04','dev05'],
        viewRoot: 'view',
      }),

*/