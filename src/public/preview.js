// 图片预览 Web Component
class ImagePreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // 状态
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.minScale = 0.1;
        this.maxScale = 5;
        this.scaleStep = 0.2;

        this.render();
        this.bindEvents();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(6px);
                    z-index: 9999;
                    display: none;
                    flex-direction: column;
                    user-select: none;
                }
                
                :host(.visible) {
                    display: flex;
                }
                
                .toolbar {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    z-index: 10;
                }
                
                .close-btn {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(6px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 8px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    width: 44px;
                    height: 44px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }
                
                .close-btn:hover {
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(10px);
                }
                
                .toolbar-buttons {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .bottom-controls {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background-color: rgba(33, 33, 33, 0.6);
                    backdrop-filter: blur(6px);
                    padding: 12px 24px;
                    border-radius: 25px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .toolbar-btn,
                .bottom-controls .toolbar-btn {
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 4px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    width: 32px;
                    height: 32px;
                }
                
                .toolbar-btn:hover,
                .bottom-controls .toolbar-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: rgba(255, 255, 255, 0.4);
                }
                
                .zoom-text {
                    color: white;
                    font-size: 14px;
                    min-width: 50px;
                    text-align: center;
                    margin-left: 8px;
                    font-family: monospace;
                }
                
                .image-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                }
                
                .preview-image {
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    cursor: grab;
                    transform-origin: center;
                    transition: transform 0.3s ease;
                }
                
                .preview-image:active {
                    cursor: grabbing;
                }
                
                .preview-image.dragging {
                    transition: none;
                }
                
                .loading,
                .error {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                    margin: 0 auto 16px;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                .error svg {
                    color: #ff6b6b;
                    margin-bottom: 16px;
                }
                
                .error p {
                    margin: 0;
                    color: #ff6b6b;
                }
                
                @media (max-width: 768px) {
                    .toolbar {
                        top: 16px;
                        right: 16px;
                    }
                    
                    .close-btn {
                        width: 40px;
                        height: 40px;
                        padding: 6px;
                    }
                    
                    .bottom-controls {
                        bottom: 16px;
                        padding: 10px 14px;
                        gap: 6px;
                    }
                    
                    .toolbar-btn {
                        width: 32px;
                        height: 32px;
                        padding: 6px;
                    }
                    
                    .zoom-text {
                        font-size: 12px;
                        min-width: 40px;
                    }
                    
                    .preview-image {
                        max-width: 95%;
                        max-height: 95%;
                    }
                }
            </style>
            
            <div class="toolbar">
                <button class="close-btn" id="close-btn" title="关闭">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <div class="image-container" id="image-container">
                <img class="preview-image" id="preview-image" draggable="false">
                
                <div class="loading" id="loading" style="display: none;">
                    <div class="loading-spinner"></div>
                    <p>加载中...</p>
                </div>
                
                <div class="error" id="error" style="display: none;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <p>图片加载失败</p>
                </div>
                
                <!-- 底部缩放控制 -->
                <div class="bottom-controls">
                    <button class="toolbar-btn" id="zoom-in" title="放大">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                    
                    <button class="toolbar-btn" id="zoom-out" title="缩小">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </button>
                    
                    <button class="toolbar-btn" id="reset-zoom" title="重置">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                            <path d="M3 21v-5h5"></path>
                        </svg>
                    </button>
                    
                    <span class="zoom-text" id="zoom-text">100%</span>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const image = this.shadowRoot.getElementById("preview-image");
        const container = this.shadowRoot.getElementById("image-container");
        const zoomInBtn = this.shadowRoot.getElementById("zoom-in");
        const zoomOutBtn = this.shadowRoot.getElementById("zoom-out");
        const resetBtn = this.shadowRoot.getElementById("reset-zoom");
        const closeBtn = this.shadowRoot.getElementById("close-btn");
        const loading = this.shadowRoot.getElementById("loading");
        const error = this.shadowRoot.getElementById("error");

        // 缩放按钮
        zoomInBtn.addEventListener("click", () => this.zoomIn());
        zoomOutBtn.addEventListener("click", () => this.zoomOut());
        resetBtn.addEventListener("click", () => this.resetZoom());
        closeBtn.addEventListener("click", () => this.close());

        // 点击遮罩关闭
        container.addEventListener("click", (e) => {
            if (e.target === container) {
                this.close();
            }
        });

        // 图片加载事件
        image.addEventListener("load", () => {
            loading.style.display = "none";
            error.style.display = "none";
            image.style.display = "block";
        });

        image.addEventListener("error", () => {
            loading.style.display = "none";
            error.style.display = "block";
            image.style.display = "none";
        });

        // 鼠标拖拽
        image.addEventListener("mousedown", (e) => this.handleMouseDown(e));

        // 键盘事件
        document.addEventListener("keydown", (e) => this.handleKeydown(e));

        // 滚轮缩放
        this.addEventListener("wheel", (e) => this.handleWheel(e), {
            passive: false,
        });
    }

    show(src, alt = "") {
        const image = this.shadowRoot.getElementById("preview-image");
        const loading = this.shadowRoot.getElementById("loading");
        const error = this.shadowRoot.getElementById("error");

        // 重置状态
        this.resetZoom();
        loading.style.display = "block";
        error.style.display = "none";
        image.style.display = "none";

        // 设置图片
        image.src = src;
        image.alt = alt;

        // 显示组件
        this.classList.add("visible");
        document.body.style.overflow = "hidden";
    }

    close() {
        this.classList.remove("visible");
        document.body.style.overflow = "";

        // 触发关闭事件
        this.dispatchEvent(new CustomEvent("close"));
    }

    zoomIn() {
        if (this.scale < this.maxScale) {
            this.scale = Math.min(this.scale + this.scaleStep, this.maxScale);
            this.updateTransform();
        }
    }

    zoomOut() {
        if (this.scale > this.minScale) {
            this.scale = Math.max(this.scale - this.scaleStep, this.minScale);
            this.updateTransform();
        }
    }

    resetZoom() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }

    updateTransform() {
        const image = this.shadowRoot.getElementById("preview-image");
        const zoomText = this.shadowRoot.getElementById("zoom-text");

        // 将 translate 放在 scale 前面，这样位移就不会被缩放影响
        image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        zoomText.textContent = `${Math.round(this.scale * 100)}%`;
    }

    handleMouseDown(e) {
        if (this.scale <= 1) return;

        this.isDragging = true;
        // 计算鼠标相对于图片中心的偏移
        this.dragStart = {
            x: e.clientX - this.translateX,
            y: e.clientY - this.translateY,
        };

        const image = this.shadowRoot.getElementById("preview-image");
        image.classList.add("dragging");

        const handleMouseMove = (e) => {
            if (!this.isDragging) return;

            // 直接根据鼠标移动距离计算新的位移
            this.translateX = e.clientX - this.dragStart.x;
            this.translateY = e.clientY - this.dragStart.y;
            this.updateTransform();
        };

        const handleMouseUp = () => {
            this.isDragging = false;
            image.classList.remove("dragging");
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        e.preventDefault();
    }

    handleWheel(e) {
        if (!this.classList.contains("visible")) return;

        e.preventDefault();
        const delta = e.deltaY > 0 ? -this.scaleStep : this.scaleStep;
        const newScale = Math.max(
            this.minScale,
            Math.min(this.maxScale, this.scale + delta)
        );

        if (newScale !== this.scale) {
            this.scale = newScale;
            this.updateTransform();
        }
    }

    handleKeydown(e) {
        if (!this.classList.contains("visible")) return;

        switch (e.key) {
            case "Escape":
                this.close();
                break;
            case "+":
            case "=":
                this.zoomIn();
                break;
            case "-":
                this.zoomOut();
                break;
            case "0":
                this.resetZoom();
                break;
        }
    }
}

// 注册 Web Component
customElements.define("image-preview", ImagePreview);

// 创建全局实例
const globalImagePreview = document.createElement("image-preview");
document.body.appendChild(globalImagePreview);

// 全局方法
window.$nativePreview = {
    open(src, alt = "") {
        globalImagePreview.show(src, alt);
    },
    close() {
        globalImagePreview.close();
    },
};

// 自动为图片添加预览功能
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "IMG" && target.dataset.preview !== "false") {
        window.$nativePreview.open(target.src, target.alt);
    }
});
