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

`touch-sprite -h`

```
touch-sprite <command> [args]

Commands:
  push        Upload and run script
  run         Run script
  stop        Stop script
  status      Get device status
  upload      Upload file
  devicename  Get device name
  set         Set config
  get         Get config
  unset       Unset config
  devices     Manage devices

Options:
  --version   Show version number                              [boolean]
  -h, --help  Show help                                        [boolean]
```

### 一些有用的配置

* 配置开发者 Access Key `touch-sprite set key <开发者 ACCESS KEY>`
* 配置开发者验证串的有效期，单位秒，最大为 3600 `touch-sprite set valid <有效期数字>`
* 配置局域网设备 IP 地址 `touch-sprite set target <局域网设备地址>`
* 添加设备 (设备数量不能超过开发者的最大设备数限制) `touch-sprite devices add <设备号>`
* 列出所有设备号 `touch-sprite devices list`
* 删除指定设备 `touch-sprite devices remove <设备号>`
* 清除所有设备 `touch-sprite devices clear`

## 集成到 Sublime Text 3

1.  在终端获取 `node` 路径 (macOS/linux 用户 `which node`, windows 用户 `where node`)
2.  在终端获取 `touch-sprite-cli` 路径 (macOS/linux 用户 `which touch-sprite`, windows 用户 `where touch-sprite`
3.  创建 `touch-sprite.sublime-build` 文件到 Packages 目录，写入：

```json
{
  "cmd": ["<touch-sprite-cli 路径>", "push", "-f=$file"],
  "selector": "source.lua",
  "path": "<node 路径>"
}
```

当然，也可以用类似的方法集成到其它 IDE

## 相关项目

* [node-touch-sprite-remote](https://github.com/Cap32/node-touch-sprite-remote): Node module API version

## License

MIT
