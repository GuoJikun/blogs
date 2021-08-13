<template>
    <div>
        <layout-item title="Loading 加载状态"></layout-item>
        <layout-item title="基础用法">
            <div v-load="laoding" style="height: 20vw">
                <p>
                    由于 CentOS 8 上周被宣布将会提前 EOL，而且 CentOS 项目的重心也将转移到滚动更新发行版 CentOS Stream
                    上，因此对于追求稳定性的 CentOS 用户来说，寻找一份 CentOS 的替代方案显得尤为重要
                </p>
                <p>
                    虽然官方建议他们从 CentOS 迁移到 CentOS
                    Stream，但很显然，许多人并不接受这个建议，否则大家的反应也不会如此激烈。而听闻此消息的 CentOS
                    创始人迅速行动起来，宣布创建新项目 Rocky Linux，旨在将 CentOS 延续下去。即便目前 Rocky Linux
                    还处于非常早期的阶段，但有着“社区驱动”和“创始人”这两大光环加持，因此并不妨碍大众对它的期待，其
                    GitHub repo 持续增长的 star 数量就说明了一切。
                </p>
                <p>
                    不过 Rocky Linux 毕竟还没真正“落地”，对于 CentOS
                    用户而言，这是一个值得期待的方案，而不是可以马上采纳的选择。所以不少用户提到了 Debian、Ubuntu
                    以及其他一些流行的服务器 Linux 发行版。
                </p>
                <p>
                    然而同为派生自 RHEL 的 Oracle Linux 却鲜被人提及。事实上，为了吸引 CentOS 用户的注意，Oracle
                    上周就已经迅速在 GitHub 提供了从 CentOS 迁移到 Oracle Linux 的脚本（可将 CentOS 8、7 和 6 切换为
                    Oracle Linux），并且还建立了专门的网站向 CentOS 用户“安利”Oracle Linux，声称 Oracle Linux 是比
                    CentOS 更好的替代方案。
                </p>
            </div>
        </layout-item>
    </div>
</template>

<script>
export default {
    data() {
        return {
            laoding: true,
        }
    },
}
</script>
