一个脚本：通过命令行完成部署测试环境代码，npm run release 依赖ssh2-sftp-client
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

npm run release 将build完成的文件部署到服务器上。部署和打包同时完成是可以实现的
搞一下单元测试
```
