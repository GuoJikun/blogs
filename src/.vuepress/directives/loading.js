const loading = {
    install: (Vue, option) => {
        Vue.directive('load', {
            bind(el, { value }) {
                el.style.position = 'relative'
                el.loading = loading.createLoadingEle(option)
                const style = {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'hsla(0,0%,100%,0.9)',
                    color: '#409eff',
                    transition: 'opacity 0.3s',
                }
                if (value) {
                    style.display = 'flex'
                } else {
                    style.display = 'none'
                }
                loading.setRootStyle(el.loading, style)
                el.appendChild(el.loading)
            },
            componentUpdated(el, { value }) {
                if (value) {
                    el.loading.style.display = 'flex'
                } else {
                    el.loading.style.display = 'none'
                }
            },
        })
    },
    createLoadingEle: (option) => {
        const root = document.createElement('div')
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
            <path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"></animateTransform>
            </path>
        </svg>`
        let inner = svg
        if (option && option.loadingText) {
            const text = `<p style="user-select: none;">${option.loadingText}</p>`
            inner = svg + text
        }
        root.innerHTML = `<div style="text-align: center;">${inner}</div>`
        return root
    },
    setRootStyle(ele, style) {
        const entries = Object.entries(style)

        for (const [key, val] of entries) {
            ele.style[key] = val
        }
    },
}

export default loading
