# pomelo
pomelo framework

[專案介紹 pomelo](https://hackmd.io/@chiisen/HJFpzAfoY)

檢查 pomelo 是否安裝成功
```shell=
pomelo --version
```

初始化專案
```shell=
pomelo init
```

安裝套件
```shell=
sh ./npm-install.sh
```
![npm-install.sh](https://i.imgur.com/419WoZo.png)

安裝 redis
```shell=
npm install redis
```
參考: [Node-Redis](https://www.npmjs.com/package/redis)

如果 log4js 一直出現 `Error: ENOENT: no such file or directory`
請試著建立第一個無法開啟的空檔案，其他檔案會自動建立，錯誤訊息也會消失

安裝 sqlite
```shell=
npm install sqlite3
```

安裝 short-uuid
```shell=
npm install short-uuid
```