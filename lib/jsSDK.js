// A simple OneNet Node SDK

// https://github.com/alexyuan2013/onenet-nodejs-sdk/blob/master/onenet-sdk.js

// const fs = require('fs');
const axios = require('axios');

let requestData = (options) => {
    return new Promise((resolve, reject) => {

        axios(options).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response.data)
                }
                console.log('Status:', response.status, '\n')
            })
            /*
                .catch(err => {
                if (err) {
                    console.log('Axios Error:', err)
                }
            })
            */
    })
}

let _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
        let source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

class OneNet {
    constructor(options) {
        const defaultOptions = {
            apiAddr: 'http://api.heclouds.com'
                // deviceId: ''
        };
        this.options = Object.assign({}, options, defaultOptions);
        this.apiAddr = this.options.apiAddr;
        this.apiKey = this.options.apiKey;
        this.registerCode = this.options.registerCode;
        // this.deviceId = this.options.deviceId;
        // console.log('apiAddr:', this.apiAddr)
        // console.log('apiKey', this.apiKey)
    }
    registerDevice(options) {
        const params = {
            method: 'post',
            url: this.apiAddr + '/register_de?register_code=' + this.registerCode,
            data: options
        }
        return requestData(params);
    }
    registerAttr(options) {
        const params = {
            method: 'put',
            url: this.apiAddr + '/register_attr',
            headers: {
                'api-key': this.apiKey
            },
            data: options
        }
        return requestData(params);
    }
    addDevice(options) {
        const params = {
            method: 'post',
            url: this.apiAddr + '/devices',
            headers: {
                'api-key': this.apiKey
            },
            data: options
        }
        return requestData(params);
    }
    updateDeviceInfo(deviceId, options) {
        const options = {
            method: 'put',
            url: this.apiAddr + '/devices/' + deviceId,
            headers: {
                'api-key': this.apiKey
            },
            data: options
        }
        return requestData(params)
    }
    getDeviceInfo(deviceId) {
        const params = {
            method: 'get',
            url: this.apiAddr + '/devices/' + deviceId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params);
    }
    getDeviceStatus(deviceId) {
        const params = {
            method: 'get',
            url: this.apiAddr + '/devices/status?devIds=' + deviceId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params);
    }
    getDeviceData(deviceId) {
        const params = {
            method: 'get',
            url: this.apiAddr + '/devices/datapoints?devIds=' + deviceId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    deleteDevice(deviceId) {
        const params = {
            method: 'delete',
            url: this.apiAddr + '/devices/' + deviceId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    addDataStream(deviceId, stream) {
        const params = {
            method: 'post',
            url: this.apiAddr + '/devices/' + deviceId + '/datastreams',
            headers: {
                'api-key': this.apiKey
            },
            data: stream
        }
        return requestData(params)
    }
    updateDeviceStreamInfo(deviceId, streamId, info) {
        const params = {
            method: 'put',
            url: this.apiAddr + '/devices/' + deviceId + '/datastreams/' + streamId,
            headers: {
                'api-key': this.apiKey
            },
            data: info
        }
        return requestData(params)
    }
    getADataStream(deviceId, streamId) {
        const params = {
            method: 'get',
            url: this.apiAddr + '/devices/' + deviceId + '/datastreams/' + streamId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    getDataStreams(deviceId, streamId) {
        const params = {
            method: 'get',
            url: this.apiAddr + '/devices' + deviceId + '/datastreams/?datastream_ids=' + streamId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    deleteDataStream(deviceId, streamId) {
        const params = {
            method: 'delete',
            url: this.apiAddr + '/devices/' + deviceId + '/datastreams/' + streamId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    addDataPoints(deviceId, json) {
        const params = {
            method: 'post',
            url: this.apiAddr + '/devices/' + deviceId + '/datapoints',
            headers: {
                'api-key': this.apiKey
            },
            data: json
        }
        return requestData(params);
    }
    getDataPoints(deviceId, urlParams) {
        const params = {
            method: 'get',
            url: this.apiAddr + '/devices/' + deviceId + '/datapoints?' + urlParams,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    getATrigger(triggerId) {
        const params = {
            method: 'get',
            url: this.apiAddr + '/triggers/' + triggerId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    getSomeTriggers(triggerName, page, perPage) {
        page = page === undefined ? 1 : page
        perPage = perPage === undefined ? 10 : perPage
        const params = {
            method: 'get',
            url: this.apiAddr + '/triggers?title=' + triggerName + '&page=' + page + '&per_page=' + perPage,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    addTrigger(options) {
        const params = {
            method: 'post',
            url: this.apiAddr + '/triggers',
            headers: {
                'api-key': this.apiKey
            },
            data: options
        }
        return requestData(params)
    }
    deleteTrigger(triggerId) {
        const params = {
            method: 'delete',
            url: this.apiAddr + '/triggers/' + triggerId
        }
        return requestData(params)
    }
    nbiotRead(options) {
        let array = []
        for (let key of options) {
            array.push(key + '=' + options[key])
        }
        array = array.join('&')
        const params = {
            method: 'get',
            url: this.apiAddr + '/nbiot?' + array,
            headers: {
                'api-key': this.apiAddr
            }
        }
        return requestData(params)
    }
    nbiotWrite(writeOptions, writeData) {
        let array = []
        for (let key of writeOptions) {
            array.push(key + '=' + writeOptions[key])
        }
        array = array.join('&')
        const params = {
            method: 'post',
            url: this.apiAddr + '/nbiot?' + array,
            headers: {
                'api-key': this.apiKey,
                'Content-Type': 'application/json'
            },
            data: writeData
        }
        requestData(params)
    }
    nbiotExecute(executeOptions, executeData) {
        let array = []
        for (let key of executeOptions) {
            array.push(key + '=' + executeOptions[key])
        }
        array = array.join('&')
        const params = {
            method: 'post',
            url: this.apiAddr + '/nbiot/execute?' + array,
            headers: {
                'api-key': this.apiKey,
                'Content-Type': 'application/json'
            },
            data: executeData
        }
        requestData(params)
    }
    nbiotResources(resourcesOptions) {
        let array = []
        for (let key of resourcesOptions) {
            array.push(key + '=' + resourcesOptions[key])
        }
        array = array.join('&')
        const params = {
            method: 'get',
            url: this.apiAddr + '/nbiot/resources?' + array,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    nbiotObserve(observeOptions) {
        let array = []
        for (let key of observeOptions) {
            array.push(key + '=' + observeOptions[key])
        }
        array = array.join('&')
        const params = {
            method: 'post',
            url: this.apiAddr + '/nbiot/observe?' + array,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    addBindata(deviceId, streamId, binData) {
        const params = {
            method: 'post',
            url: this.apiAddr + '/bindata?device_id=' + deviceId + '&datastream_id=' + streamId,
            headers: {
                'api-key': this.apiKey
            },
            data: binData
        }
        return requestData(params)
    }


    // 下面是视频功能的API

    checkAddress(address) {
        if (!address.startsWith('http')) {
            return 'http://' + address
        } else {
            return address
        }
    }

    getVideoChannel(deviceId, address) {
        address = this.checkAddress(address)
        const params = {
            method: 'get',
            url: address + '/device/QryChannel?device_id=' + deviceId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params);
    }
    deleteVideoChannel(deviceId, channelId, address) {
        address = this.checkAddress(address)
        const params = {
            method: 'delete',
            url: address + '/device/DelChannel?device_id=' + deviceId + '&channel_id=' + channelId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
    addVideoChannel(deviceId, channelId, productId, title, desc, address) {
        address = this.checkAddress(address)
        const params = {
            method: 'post',
            url: address + '/device/AddChannel?device_id=' + deviceId + '&product_id=' + productId + '&channel_id=' + channelId + '&title=' + title + '&desc=' + desc,
            headers: {
                'api-key': this.apiKey
            },
        }
        return requestData(params)
    }
    getVideoStatus(devIds, productId, address) {
        address = this.checkAddress(address)
        const params = {
            method: 'get',
            url: address + '/device/QryDevStatus?devIds=' + devIds + '&product_id' + productId,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }

    // 设备数据透传
    postVideoData(deviceId, content, address) {
        address = this.checkAddress(address)
        console.log(address + '/dev_active' + '?device_id=' + deviceId) //404
        const params = {
            method: 'post',
            url: address + '/dev_active' + '?device_id=' + deviceId,
            headers: {
                'api-key': this.apiKey
            },
            data: content
        }
        return requestData(params)
    }

    // 发送命令
    postCMD(deviceId, qos, type, content, address) {
        address = this.checkAddress(address)
        let url = address + '/cmds?device_id=' + deviceId + '?qos=' + qos + '?type=' + type
        console.log(url)
        const params = {
            method: 'post',
            url: url,
            headers: {
                'api-key': apiKey
            },
            data: content
        }
        return requestData(params)
    }

    // 播放记录列表查询
    getOnlineList(productId, deviceId, channelId, protocolType, pageKey, pageSize, page, address) {
        address = this.checkAddress(address)
        let url = address + '/stat/getonlinelist?productid=' + productId + '?deviceid=' + deviceId + '?channelid=' + channelId + '?protocoltype=' + protocolType + '?page_key=' + pageKey + '?page_size=' + pageSize + '?page=' + page
        const params = {
            method: 'get',
            url: url,
            headers: {
                'api-key': this.apiKey
            }
        }
        return requestData(params)
    }
}

module.exports = OneNet