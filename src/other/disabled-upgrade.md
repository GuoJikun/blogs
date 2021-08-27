# 禁止软件升级

```bash
sudo echo 软件包名 hold | sudo dpkg --set-selections
```

取消软件禁止升级的限制

```bash
sudo echo 软件包名 install | sudo dpkg --set-selections
```

查看禁止升级软件列表

```bash
sudo dpkg --get-selections | grep hold
```
