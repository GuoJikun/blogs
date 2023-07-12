# 文件转 base64 字符串

:::info 注意
此功能使用浏览器 API 实现，您的文件不会被上传到云端。支持上传任意文件格式。
:::

<div
    :style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        width: '100%',
        border:`1px dashed ${borderColor}`,
        borderRadius: '4px'
    }"
    @click="handlerClick"
    @drop.prevent="handlerDropEnd"
    @dragover.prevent
    @dragenter="handlerDragEnter"
    @dragleave="handlerDragLeave"
>
    <div style="text-align: center;">
        <el-icon size="50px" style="margin: 0 auto 8px;"><upload-filled /></el-icon>
        <div>Drop file here or <em>click to upload</em></div>
    </div>
</div>

<div style="display:flex;justify-content: space-between;align-items: center;padding: 24px 0 16px">
    <span>转化后的Base64 字符串</span>
    <div>
        <el-button type="primary" @click="copyValue">复制</el-button>
        <el-button type="danger" @click="clearBase64">清空</el-button>
    </div>
</div>
<textarea style="width: 100%;height: 400px;border: 1px solid #ccc;border-radius: 4px;">{{ base64Str }}</textarea>

<script setup>
import { ref } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'

const borderColor = ref('#ccc');
const setBorderColor = (color)=>{
    borderColor.value = color;
}
const base64Str = ref('')
const fileToBase64 = file => {
    const reader = new FileReader();
    reader.onload = (ev)=>{
        base64Str.value = ev.target.result;
    }
    reader.readAsDataURL(file)
}
const handlerClick = ()=>{
    const inputEl = document.createElement('input');
    inputEl.setAttribute('type','file')
    inputEl.addEventListener('change', (ev)=>{
        const files = ev.target.files;
        if(files && files.length > 0){
            if(files.length > 1){
                alert('一次只能转换一个文件')
            }else{
                fileToBase64(files[0])
            }
        }else{
            alert('请选择一个文件')
        }
    });

    inputEl.click();
}

const handlerDragEnter = ev => {
    ev.preventDefault();
    setBorderColor('#409eff');
}

const handlerDragLeave = ev => {
    ev.preventDefault();
    console.log(ev.dataTransfer.files);
    setBorderColor('#ccc');
}

const handlerDropEnd = ev => {
    setBorderColor('#ccc');
    const files = ev.dataTransfer.files;
    if(files && files.length > 0){
        if(files.length > 1){
            alert('一次只能转换一个文件')
        }else{
            fileToBase64(files[0])
        }
    }else{
        alert('请选择一个文件')
    }
}

const clearBase64 = () => {
    base64Str.value = ''
}

const copyValue = () => {
    if(base64Str.value === '') return;
    // 复制文本到剪切板
    if('clipboard' in window.navigator){
        window.navigator.clipboard.writeText(base64Str.value).then(()=>{
            ElMessage.success('已复制到剪切板')
        }, ()=>{
            ElMessage.success('复制到剪切板失败')
        })
    }
}
</script>
