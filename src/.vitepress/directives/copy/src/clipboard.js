function createNode(text) {
    const node = document.createElement("pre");
    node.style.width = "1px";
    node.style.height = "1px";
    node.style.position = "fixed";
    node.style.top = "5px";
    node.textContent = text;
    return node;
}

export function copyNode(node) {
    return new Promise((resolve, reject) => {
        if ("clipboard" in navigator) {
            navigator.clipboard
                .writeText(node.textContent || "")
                .then(() => {
                    resolve(node.textContent || "");
                })
                .catch((err) => {
                    reject(err);
                });
        }

        const selection = getSelection();
        if (selection == null) {
            reject(new Error());
        }

        selection.removeAllRanges();

        const range = document.createRange();
        range.selectNodeContents(node);
        selection.addRange(range);

        document.execCommand("copy");
        selection.removeAllRanges();
        resolve(node.textContent || "");
    });
}

export function copyText(text) {
    return new Promise((resolve, reject) => {
        if ("clipboard" in navigator) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    resolve(text);
                })
                .catch((err) => {
                    reject(err);
                });
        }

        const body = document.body;
        if (!body) {
            reject(new Error());
        }

        const node = createNode(text);
        body.appendChild(node);
        copyNode(node);
        body.removeChild(node);
        return resolve(text);
    });
}
