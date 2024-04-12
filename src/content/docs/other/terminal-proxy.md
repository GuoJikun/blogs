# 给windows终端设置代理

当你开了梯子的时候，发现在终端中(cmd，powershell)中依旧没有办法提交到github时。可以这样设置

## Powershell

```bash
$env:HTTP_PROXY="http://127.0.0.1:10809"
$env:HTTPS_PROXY="http://127.0.0.1:10809"
```

:::tip 提示
http://127.0.0.1:10809 是梯子监听的地址

只在当前终端中生效，如果想永久生效，请在环境变量中设置
:::

## Cmd

```bash
set HTTP_PROXY="http://127.0.0.1:10809"
set HTTPS_PROXY="http://127.0.0.1:10809"
```

:::tip 提示
http://127.0.0.1:10809 是梯子监听的地址

只在当前终端中生效，如果想永久生效，请在环境变量中设置
:::
