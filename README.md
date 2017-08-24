# touch-sprite-cli

触控精灵命令行工具 (非官方)

**项目仍在开发中，在 v1.0.0 发布之前，用法可能会有所变化**

## 安装

先确保已安装 Node.js (>4) 和 npm

```bash
npm install -g touch-sprite-cli
```


## 用法

```bash
tsc -h
```


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
