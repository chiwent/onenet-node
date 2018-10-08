#!/usr/bin/node env

const OneNet = require('../lib/jsSDK.js')
const fs = require('fs')




let localPath = process.cwd();

let readLocalFile = (filename) => {
    return fs.readFileSync(localPath + '/' + filename, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            throw Error
        }
        return data;
    })
}

let configOptions = JSON.parse(readLocalFile('onenetConfig.json'));

const onenet = new OneNet(configOptions);

// 设备ID
let deviceId = '3267572';


// 获取设备状态
let mainGetDeviceStatus = () => onenet.getDeviceStatus('3267572').then(response => {
    console.log(response)
}).catch(err => {
    if (err)
        console.log(err)
});


let dataStreamId = ['temp', 'humi']
let limit = 5

// 获取数据
let mainGetDataPoints = () => onenet.getDataPoints(deviceId, `datastream_id=${dataStreamId[0]},${dataStreamId[1]}&limit=${limit}`).then(response => {
    let dataCount = response.data.count;
    let dataStream = response.data.datastreams;
    console.log('Number of data: ', dataCount)
    console.log('\n')
    dataStream.forEach((item1, index) => {
        console.log('DataStreamId:', dataStreamId[index])
        item1.datapoints.forEach(item2 => {
            console.log('Time: ', item2.at);
            console.log('value: ', item2.value);
        })
        console.log('\n')
    })
}).catch(err => {
    console.log(err)
})


let addOptions = {
    'id': 'NodeDemo',
    'tags': ['node', 'demo'],
    'uint': '', // 指标
    'unit_symbol': '' // 单位
}

// 创建数据流
let mainAddDataStream = () => onenet.addDataStream(deviceId, addOptions).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
    // mainAddDataStream(); 


let addPoints = {
    "datastreams": [{
        "id": "NodeDemo",
        "datapoints": [{
            "value": 666
        }]
    }]
}

// 上传数据点
let mainAddDataPoints = () => onenet.addDataPoints(deviceId, addPoints).then(response => {
    console.log(response)
}).catch(err => {
    console.log(err)
})

// mainAddDataPoints();

// 两种实现的方式： async/await、promise
// let addDatas = async() => {
//     await mainAddDataStream();
//     await mainAddDataPoints();
// }
// mainAddDataStream().then(() => mainAddDataPoints())




// 上传二进制文件
let localFile = 'ubuntu.jpg' // 文件

// console.log('binary-data:', binaryData)
let mainAddBinary = () => {
        let binaryData = fs.readFileSync(localPath + '/' + localFile, (err, data) => {
            if (err) throw err;
            // let encodeData = new Buffer(data, 'binary').toString('base64')
            // let decodeData = new Buffer(encodeData, 'base64').toString('binary');
            let bin = new Buffer(data, 'binary');
        });
        onenet.addBindata(deviceId, 'binary', binaryData).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    //mainAddBinary();


// 模糊查询触发器
let triggerName = 'tDemo'
let mainGetSomeTriggers = () => onenet.getSomeTriggers(triggerName, 2, 4).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
    // mainGetSomeTriggers();




// 以下是视频功能

// 备注：SDK视频功能写于2018-10-8，此时的onenet已经将原有的部分视频API废弃，API文档没有更新（工作人员称会在几天内上线新API文档），目前生产环境可用，但是测试环境不可用

let rtmpOptions = JSON.parse(readLocalFile('rtmpConfig.json'));

const rtmp = new OneNet(rtmpOptions);

const rtmpDeviceId = '45277587'

let productId = '175345'


let binaryData = fs.readFileSync(localPath + '/' + localFile, (err, data) => {
    if (err) throw err;
    let bin = new Buffer(data, 'binary');
});

// 查询设备下通道信息

let devAddress = '183.230.40.149:8080/ipc/video' //测试环境  
let buildAddress = 'http://api.heclouds.com/ipc/video' //生产环境  

let mainGetVideoChannel = () => rtmp.getVideoChannel(rtmpDeviceId, buildAddress).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
    // mainGetVideoChannel();


// 增加设备下通道信息

let channelId = '666'
let title = 'NodeSDK'
let desc = 'addChannel'
let userId = '108620'
let mainAddVideoChannel = () => rtmp.addVideoChannel(rtmpDeviceId, channelId, productId, title, desc, buildAddress).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
    // mainAddVideoChannel()


// 查询设备在线状态

let devIds = '233'
let maingetVideoStatus = () => rtmp.getVideoStatus(devIds, productId, devAddress).then(response => {
    console.log(response)
}).catch(err => {
    console.log(err)
})
maingetVideoStatus()


// 设备数据透传

let mainPostVideoData = () => {

        rtmp.postVideoData(rtmpDeviceId, binaryData, buildAddress).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    // mainPostVideoData();


// 发送命令

let mainPostCmd = () => {
        let qos = 0
        let type = 0
        rtmp.postCMD(rtmpDeviceId, qos, type, binaryData, devAddress).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    // mainPostCmd()


// 播放记录列表查询

let mainGetOnlineList = () => {

        let channelId = 'test'
        let protocolType = 'RTMP'
        let pageKey = 'test'
        let pageSize = 3
        let page = 2
        rtmp.getOnlineList(productId, rtmpDeviceId, channelId, protocolType, pageKey, pageSize, page, devAddress).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
    // mainGetOnlineList()