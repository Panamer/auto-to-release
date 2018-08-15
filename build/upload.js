const Client = require('ssh2-sftp-client')
const ora = require('ora')
const path = require('path')
const glob = require('glob')
const sftp = new Client()

// 本地目录
const localPath = path.join(__dirname, '../dist').replace(/\\/g, '/')
// 远程目录
const remotePath = '/var/adm'
// 允许上传的文件扩展名
const allowFiles = ['html', 'css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'eot', 'svg', 'ttf', 'woff']

const spinner = ora('开始上传...').start()

// 连接 sftp
sftp.connect({
    host: '47.96.162.26',
    port: '',
    username: 'root',
    password: 'A631dca800e'
}).then(() => {
    // 先删除目录
    return sftp.rmdir(remotePath, true)
}).then(() => {
    // 再创建目录
    return Promise.all([
        sftp.mkdir(`${remotePath}/static/fonts`, true),
        sftp.mkdir(`${remotePath}/static/img`, true),
        sftp.mkdir(`${remotePath}/static/css`, true),
        sftp.mkdir(`${remotePath}/static/js`, true)
    ])
}).then(() => {
    // 上传所有匹配到的文件
    const files = glob.sync(`${localPath}/**/*.{${allowFiles.join(',')}}`)
    return Promise.all(
        files.map(localFile => {
            const remoteFile = localFile.replace(localPath, remotePath)
            return sftp.put(localFile, remoteFile)
        })
    )
}).then(() => {
    spinner.succeed('上传完成')
    process.exit()
}).catch(err => {
    spinner.fail('上传失败')
    process.exit()
})
