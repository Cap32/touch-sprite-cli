# touch-sprite-cli

触控精灵命令行工具 (非官方)

**项目仍在开发中，在 v1.0.0 发布之前，用法可能会有所变化**


## 安装

先确保已安装 Node.js (>4) 和 npm

```bash
npm install -g touch-sprite-cli
```


## 用法

### 查看帮助

        tsc -h

```
tsc <command> [args]

Commands:
  push        Upload and run script
  run         Run script
  upload      Upload file
  devicename  Get device name
  set         Set config
  get         Get config
  unset       Unset config
  devices     Manage devices

Options:
  --version   Show version number                      [boolean]
  -h, --help  Show help                                [boolean]
```


### 一些有用的配置

##### 配置开发者 Access Key

        tsc set key <开发者 ACCESS KEY>


##### 配置开发者验证串的有效期，单位秒，最大为 3600

        tsc set valid <有效期数字>


##### 配置局域网设备地址

        tsc set target <局域网设备地址>

例如：`192.168.1.123:50005`


##### 添加设备

        tsc devices add <设备号>

**设备数量不能超过开发者的最大设备数限制**


##### 列出所有设备号

        tsc devices list


##### 删除指定设备

        tsc devices remove <设备号>


##### 清楚所有设备

        tsc devices clear


## 集成到 Sublime Text 3

1. 在终端获取 `node` 路径 (macOS/linux 用户 `which node`, windows 用户 `where node`)
2. 在终端获取 `touch-sprite-cli` 路径 (macOS/linux 用户 `which tsc`, windows 用户 `where tsc`
3. 创建 `touch-sprite.sublime-build` 文件到 Packages 目录，写入：

```json
{
    "cmd": ["<touch-sprite-cli 路径>", "push", "-f=$file"],
    "selector": "source.lua",
    "path": "<node 路径>"
}
```

当然，也可以用类似的方法集成到其它 IDE


## License

MIT
