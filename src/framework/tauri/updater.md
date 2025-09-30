# Tauri 应用升级<Badge type="warning">WIP</Badge>

:::warning 注意
`Tauri` 版本需要 `>= 2`\
仅针对 `windows` 平台且全程使用 `powershell`
:::

## 安装插件

```bash
pnpm tauri add updater
```

## 对应用签名

Tauri 的更新程序需要一个签名来验证更新是否来自受信任的源。这是无法禁用的。

签名更新需要两个密钥：

-   公钥：它将在 `tauri.conf.json` 中设置，用于在安装之前验证工件。只要您的私钥是安全的，这个公钥就可以安全地上传和共享。
-   私钥：用于安装程序文件的签名。你不应该和任何人共用这把钥匙。此外，如果您丢失了此密钥，您将无法向已安装应用程序的用户发布新的更新。把密钥存放在安全的地方很重要！

### 生成密钥

可以使用 Tauri Cli 提供的 `signer generate` 命令来生成密钥，具体如下

```bash
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

### 环境变量设置

首选需要对签名应用程序使用的私钥进行配置，在打包 tauri 应用程序的时候会使用 `TAURI_SIGNING_PRIVATE_KEY` 和 `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`

```powershell
$env:TAURI_SIGNING_PRIVATE_KEY = ""
# 仅在生成密钥时设置密码时才需要设置此环境变量
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD = ""
```

### 插件配置

需要在 `tauri.config.json` 对 `updater` 插件进行相关配置，具体如下。

```json
{
    "plugins": {
        "updater": {
            "createUpdaterArtifacts": true,
            "dangerousInsecureTransportProtocol": true,
            "pubkey": "之前生成的公钥",
            "endpoints": [] // 更新的地址
        }
    }
}
```

### 构建并签名 App

```bash
# 此时打包后便会使用之前配置的私钥自动签名应用程序
pnpm tauri build
```
