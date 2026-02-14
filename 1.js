// 1.js - 智能控制面板所有JavaScript代码
$(document).ready(function () {
    // 原有初始化代码...
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 1000);

    // 新增导航项颜色
    document.querySelectorAll('.nav-item').forEach(item => {
        const hue = Math.floor(Math.random() * 360);
        item.style.setProperty('--hue', hue);
    });
    
    // 为模态框中的链接设置随机颜色
    document.querySelectorAll('.modal-link').forEach(item => {
        const hue = Math.floor(Math.random() * 360);
        item.style.setProperty('--hue', hue);
    });
    
    // 初始化所有功能
    initImageSettings();
    initButtonImages();
    initDynamicBackground();
    initMegaNewDoor();
});

function toggleDarkMode() {
    $('body').toggleClass('dark-mode');
}

function toggleNav() {
    $('.nav-grid').toggleClass('active');
}

// 修复全屏功能
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        // 进入全屏
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // 退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// 新增缩放功能
function zoomIn() {
    let currentZoom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zoom-level'));
    if (currentZoom < 2.0) {
        currentZoom += 0.1;
        document.documentElement.style.setProperty('--zoom-level', currentZoom);
        updateZoomDisplay(currentZoom);
    }
}

function zoomOut() {
    let currentZoom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zoom-level'));
    if (currentZoom > 0.5) {
        currentZoom -= 0.1;
        document.documentElement.style.setProperty('--zoom-level', currentZoom);
        updateZoomDisplay(currentZoom);
    }
}

function updateZoomDisplay(zoomLevel) {
    const zoomPercentage = Math.round(zoomLevel * 100);
    document.getElementById('zoom-level').textContent = `${zoomPercentage}%`;
}

// 新增功能：显示/隐藏所有UI
function toggleUI() {
    document.body.classList.toggle('hidden-mode');
    const hideBtn = document.querySelector('.hide-toggle-btn');
    if (document.body.classList.contains('hidden-mode')) {
        hideBtn.textContent = '👁️🗨️';
    } else {
        hideBtn.textContent = '👁️';
    }
}

// 新增功能：显示模态框
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// 新增功能：隐藏模态框
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// 新增功能：添加新网站
function addNewSite() {
    const name = document.getElementById('site-name').value.trim();
    const url = document.getElementById('site-url').value.trim();
    
    if (!name || !url) {
        alert('请填写网站名称和URL');
        return;
    }
    
    // 验证URL格式
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        alert('URL必须以http://或https://开头');
        return;
    }
    
    // 创建新的导航项
    const newItem = document.createElement('a');
    newItem.href = url;
    newItem.className = 'nav-item';
    newItem.textContent = name;
    newItem.target = '_blank';
    
    // 设置随机颜色
    const hue = Math.floor(Math.random() * 360);
    newItem.style.setProperty('--hue', hue);
    
    // 添加到导航网格
    document.querySelector('.nav-grid').appendChild(newItem);
    
    // 清空表单
    document.getElementById('site-name').value = '';
    document.getElementById('site-url').value = '';
    
    // 关闭模态框
    hideModal('add-site-modal');
    
    alert('网站添加成功！');
}

// 点击模态框外部关闭模态框
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 图片上传和设置功能
let currentImageData = null;
let currentFilters = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    opacity: 50
};

// 预设背景图片
const presetBackgrounds = [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1516383605648-7464163893e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
];

// 初始化图片设置
function initImageSettings() {
    // 加载保存的背景图片
    const savedImage = localStorage.getItem('customBackground');
    const savedFilters = localStorage.getItem('backgroundFilters');
    
    if (savedImage) {
        currentImageData = savedImage;
        updateBackgroundImage(savedImage);
    }
    
    if (savedFilters) {
        currentFilters = JSON.parse(savedFilters);
        updateFilterControls();
        applyFilters();
    }
    
    // 初始化预设背景
    const presetContainer = document.querySelector('.preset-backgrounds');
    presetContainer.innerHTML = '';
    
    presetBackgrounds.forEach((url, index) => {
        const presetItem = document.createElement('div');
        presetItem.className = 'preset-bg-item';
        presetItem.style.backgroundImage = `url(${url})`;
        presetItem.style.backgroundSize = 'cover';
        presetItem.style.backgroundPosition = 'center';
        
        // 如果是当前背景，添加active类
        if (savedImage === url) {
            presetItem.classList.add('active');
        }
        
        presetItem.addEventListener('click', () => {
            document.querySelectorAll('.preset-bg-item').forEach(item => item.classList.remove('active'));
            presetItem.classList.add('active');
            currentImageData = url;
            updateBackgroundImage(url);
            saveBackgroundSettings();
        });
        
        presetContainer.appendChild(presetItem);
    });
    
    // 添加滤镜滑块事件监听
    document.getElementById('brightness-slider').addEventListener('input', function(e) {
        currentFilters.brightness = parseInt(e.target.value);
        document.getElementById('brightness-value').textContent = `${currentFilters.brightness}%`;
        applyFilters();
    });
    
    document.getElementById('contrast-slider').addEventListener('input', function(e) {
        currentFilters.contrast = parseInt(e.target.value);
        document.getElementById('contrast-value').textContent = `${currentFilters.contrast}%`;
        applyFilters();
    });
    
    document.getElementById('saturation-slider').addEventListener('input', function(e) {
        currentFilters.saturation = parseInt(e.target.value);
        document.getElementById('saturation-value').textContent = `${currentFilters.saturation}%`;
        applyFilters();
    });
    
    document.getElementById('opacity-slider').addEventListener('input', function(e) {
        currentFilters.opacity = parseInt(e.target.value);
        document.getElementById('opacity-value').textContent = `${currentFilters.opacity}%`;
        applyFilters();
    });
    
    // 添加图片上传事件监听
    document.getElementById('image-upload').addEventListener('change', handleImageUpload);
    
    // 添加上传区域点击事件
    document.getElementById('upload-area').addEventListener('click', function() {
        document.getElementById('image-upload').click();
    });
    
    // 添加拖放支持
    const uploadArea = document.getElementById('upload-area');
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
        uploadArea.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        uploadArea.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        uploadArea.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            document.getElementById('image-upload').files = files;
            handleImageUpload({target: {files: files}});
        }
    });
}

// 处理图片上传
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
        alert('请上传图片文件！');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        currentImageData = e.target.result;
        updateBackgroundImage(currentImageData);
        
        // 显示预览
        const preview = document.getElementById('image-preview');
        preview.src = currentImageData;
        preview.style.display = 'block';
        
        saveBackgroundSettings();
    };
    reader.readAsDataURL(file);
}

// 更新背景图片
function updateBackgroundImage(imageData) {
    const imgBg = document.getElementById('img-bg');
    imgBg.style.backgroundImage = `url(${imageData})`;
}

// 更新滤镜控制
function updateFilterControls() {
    document.getElementById('brightness-slider').value = currentFilters.brightness;
    document.getElementById('contrast-slider').value = currentFilters.contrast;
    document.getElementById('saturation-slider').value = currentFilters.saturation;
    document.getElementById('opacity-slider').value = currentFilters.opacity;
    
    document.getElementById('brightness-value').textContent = `${currentFilters.brightness}%`;
    document.getElementById('contrast-value').textContent = `${currentFilters.contrast}%`;
    document.getElementById('saturation-value').textContent = `${currentFilters.saturation}%`;
    document.getElementById('opacity-value').textContent = `${currentFilters.opacity}%`;
}

// 应用滤镜
function applyFilters() {
    const imgBg = document.getElementById('img-bg');
    const gradient = document.querySelector('.gradient-linear');
    
    imgBg.style.filter = `brightness(${currentFilters.brightness}%) contrast(${currentFilters.contrast}%) saturate(${currentFilters.saturation}%)`;
    gradient.style.opacity = currentFilters.opacity / 100;
    
    saveBackgroundSettings();
}

// 保存背景设置
function saveBackgroundSettings() {
    if (currentImageData) {
        localStorage.setItem('customBackground', currentImageData);
        localStorage.setItem('backgroundFilters', JSON.stringify(currentFilters));
    }
}

// 保存图片设置
function saveImageSettings() {
    saveBackgroundSettings();
    hideModal('image-modal');
    alert('图片设置已保存！');
}

// 重置背景
function resetBackground() {
    currentImageData = null;
    currentFilters = {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        opacity: 50
    };
    
    const imgBg = document.getElementById('img-bg');
    const gradient = document.querySelector('.gradient-linear');
    
    imgBg.style.backgroundImage = `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`;
    imgBg.style.filter = 'none';
    gradient.style.opacity = 0.5;
    
    document.getElementById('image-preview').style.display = 'none';
    updateFilterControls();
    
    localStorage.removeItem('customBackground');
    localStorage.removeItem('backgroundFilters');
    
    // 重置预设选中状态
    document.querySelectorAll('.preset-bg-item').forEach(item => item.classList.remove('active'));
    
    alert('背景已重置！');
}

// 按钮图片设置功能
let currentButtonElement = null;
let currentButtonImageData = null;
let currentButtonImageSettings = {
    size: 100,
    position: 50,
    icon: null
};
let currentButtonElementType = null; // 'nav' 或 'modal'

// 初始化按钮图片
function initButtonImages() {
    // 加载保存的按钮图片设置
    const savedButtonImages = localStorage.getItem('buttonImages');
    if (savedButtonImages) {
        const buttonImages = JSON.parse(savedButtonImages);
        
        // 为每个导航按钮应用保存的图片
        document.querySelectorAll('.nav-item').forEach(button => {
            const buttonText = button.textContent.trim();
            if (buttonImages[buttonText]) {
                const imageSettings = buttonImages[buttonText];
                applyButtonImage(button, imageSettings);
            }
        });
        
        // 为每个模态框按钮应用保存的图片
        initModalButtonImages('ai-modal', buttonImages);
        initModalButtonImages('game-modal', buttonImages);
        initModalButtonImages('movie-modal', buttonImages);
    }
    
    // 添加按钮图片上传事件监听
    document.getElementById('button-image-upload').addEventListener('change', handleButtonImageUpload);
    
    // 添加上传区域点击事件
    document.getElementById('button-upload-area').addEventListener('click', function() {
        document.getElementById('button-image-upload').click();
    });
    
    // 添加图片大小滑块事件监听
    document.getElementById('image-size-slider').addEventListener('input', function(e) {
        const size = parseInt(e.target.value);
        document.getElementById('image-size-value').textContent = `${size}%`;
        
        // 更新预览
        const previewImage = document.querySelector('#current-button-preview .item-image');
        if (previewImage.style.backgroundImage) {
            previewImage.style.backgroundSize = `${size}%`;
        }
    });
    
    // 添加图片位置滑块事件监听
    document.getElementById('image-position-slider').addEventListener('input', function(e) {
        const position = parseInt(e.target.value);
        updatePositionValue(position);
        
        // 更新预览
        const previewImage = document.querySelector('#current-button-preview .item-image');
        if (previewImage.style.backgroundImage) {
            let positionValue = 'center';
            if (position < 25) positionValue = 'top';
            else if (position < 75) positionValue = 'center';
            else positionValue = 'bottom';
            
            previewImage.style.backgroundPosition = positionValue;
        }
    });
    
    // 实现裁剪区域拖动功能
    const cropArea = document.getElementById('crop-area');
    let isDragging = false;
    let startX, startY;
    
    cropArea.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX - cropArea.getBoundingClientRect().left;
        startY = e.clientY - cropArea.getBoundingClientRect().top;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const cropContainer = document.getElementById('crop-container');
        const containerRect = cropContainer.getBoundingClientRect();
        
        let newLeft = e.clientX - containerRect.left - startX;
        let newTop = e.clientY - containerRect.top - startY;
        
        // 限制在容器内
        newLeft = Math.max(0, Math.min(newLeft, containerRect.width - cropArea.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, containerRect.height - cropArea.offsetHeight));
        
        cropArea.style.left = `${newLeft}px`;
        cropArea.style.top = `${newTop}px`;
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
}

// 初始化模态框按钮图片
function initModalButtonImages(modalId, buttonImages) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const modalLinks = modal.querySelectorAll('.modal-link');
    modalLinks.forEach(button => {
        const buttonText = button.textContent.trim();
        if (buttonImages[buttonText]) {
            const imageSettings = buttonImages[buttonText];
            applyModalButtonImage(button, imageSettings);
        }
    });
}

// 显示按钮图片设置模态框
function showButtonSettingsModal(buttonElement) {
    currentButtonElement = buttonElement;
    currentButtonElementType = 'nav'; // 默认是导航按钮
    
    // 保存当前按钮元素到隐藏输入框
    document.getElementById('current-button-element').value = buttonElement.textContent.trim();
    
    // 更新当前按钮预览
    document.getElementById('current-button-text').textContent = buttonElement.textContent.trim();
    
    // 加载当前按钮的图片设置
    const savedButtonImages = localStorage.getItem('buttonImages');
    if (savedButtonImages) {
        const buttonImages = JSON.parse(savedButtonImages);
        const buttonText = buttonElement.textContent.trim();
        
        if (buttonImages[buttonText]) {
            currentButtonImageSettings = buttonImages[buttonText];
        } else {
            // 默认设置
            currentButtonImageSettings = {
                size: 100,
                position: 50,
                icon: null,
                type: 'nav'
            };
        }
    }
    
    // 更新滑块值
    document.getElementById('image-size-slider').value = currentButtonImageSettings.size;
    document.getElementById('image-size-value').textContent = `${currentButtonImageSettings.size}%`;
    
    document.getElementById('image-position-slider').value = currentButtonImageSettings.position;
    updatePositionValue(currentButtonImageSettings.position);
    
    // 更新预览
    const previewImage = buttonElement.querySelector('.item-image');
    if (previewImage.style.backgroundImage) {
        document.getElementById('button-image-preview').src = previewImage.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
        document.getElementById('button-image-preview').style.display = 'block';
        
        // 隐藏上传区域，显示裁剪区域
        document.getElementById('button-upload-area').style.display = 'none';
        document.getElementById('crop-container').style.display = 'block';
    } else if (previewImage.textContent) {
        // 显示预设图标
        document.getElementById('button-image-preview').style.display = 'none';
        
        // 隐藏上传区域和裁剪区域
        document.getElementById('button-upload-area').style.display = 'none';
        document.getElementById('crop-container').style.display = 'none';
    } else {
        document.getElementById('button-image-preview').style.display = 'none';
        
        // 显示上传区域，隐藏裁剪区域
        document.getElementById('button-upload-area').style.display = 'block';
        document.getElementById('crop-container').style.display = 'none';
    }
    
    // 重置预设图标选中状态
    document.querySelectorAll('.preset-icon-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.icon === currentButtonImageSettings.icon) {
            item.classList.add('active');
        }
    });
    
    // 显示模态框
    document.getElementById('button-image-modal').style.display = 'flex';
}

// 选择预设图标
function selectPresetIcon(iconElement) {
    // 重置所有图标选中状态
    document.querySelectorAll('.preset-icon-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 设置当前图标为选中状态
    iconElement.classList.add('active');
    
    // 保存选中的图标
    currentButtonImageSettings.icon = iconElement.dataset.icon;
    
    // 更新预览
    const previewImage = document.querySelector('#current-button-preview .item-image');
    previewImage.textContent = iconElement.dataset.icon;
    
    // 根据按钮类型设置不同的字体大小
    if (currentButtonElementType === 'modal') {
        previewImage.style.fontSize = '16px';
    } else {
        previewImage.style.fontSize = '24px';
    }
    
    previewImage.style.display = 'flex';
    previewImage.style.alignItems = 'center';
    previewImage.style.justifyContent = 'center';
    
    // 隐藏图片预览和裁剪区域
    document.getElementById('button-image-preview').style.display = 'none';
    document.getElementById('crop-container').style.display = 'none';
    document.getElementById('button-upload-area').style.display = 'none';
}

// 处理按钮图片上传
function handleButtonImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
        alert('请上传图片文件！');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        currentButtonImageData = e.target.result;
        
        // 显示裁剪区域
        document.getElementById('button-upload-area').style.display = 'none';
        document.getElementById('crop-container').style.display = 'block';
        
        // 设置裁剪图片
        document.getElementById('crop-image').src = currentButtonImageData;
        
        // 隐藏预设图标选中状态
        document.querySelectorAll('.preset-icon-item').forEach(item => {
            item.classList.remove('active');
        });
        currentButtonImageSettings.icon = null;
    };
    reader.readAsDataURL(file);
}

// 更新位置值显示
function updatePositionValue(value) {
    let positionText = '居中';
    if (value < 25) positionText = '顶部';
    else if (value < 75) positionText = '居中';
    else positionText = '底部';
    
    document.getElementById('image-position-value').textContent = positionText;
}

// 保存按钮图片设置
function saveButtonImage() {
    if (!currentButtonElement) return;
    
    // 获取当前设置
    currentButtonImageSettings.size = parseInt(document.getElementById('image-size-slider').value);
    currentButtonImageSettings.position = parseInt(document.getElementById('image-position-slider').value);
    
    // 应用图片设置到按钮
    applyButtonImage(currentButtonElement, currentButtonImageSettings);
    
    // 保存到本地存储
    saveButtonImageSettings();
    
    // 关闭模态框
    hideModal('button-image-modal');
    
    alert('按钮图片设置已保存！');
}

// 应用按钮图片设置
function applyButtonImage(buttonElement, settings) {
    const imageElement = buttonElement.querySelector('.item-image');
    
    // 清除之前的设置
    imageElement.style.backgroundImage = '';
    imageElement.textContent = '';
    imageElement.style.fontSize = '';
    imageElement.style.display = '';
    imageElement.style.alignItems = '';
    imageElement.style.justifyContent = '';
    
    if (settings.icon) {
        // 使用预设图标
        imageElement.textContent = settings.icon;
        imageElement.style.fontSize = '24px';
        imageElement.style.display = 'flex';
        imageElement.style.alignItems = 'center';
        imageElement.style.justifyContent = 'center';
    } else if (settings.imageData) {
        // 使用自定义图片
        imageElement.style.backgroundImage = `url(${settings.imageData})`;
        imageElement.style.backgroundSize = `${settings.size}%`;
        imageElement.style.backgroundRepeat = 'no-repeat';
        
        let positionValue = 'center';
        if (settings.position < 25) positionValue = 'top';
        else if (settings.position < 75) positionValue = 'center';
        else positionValue = 'bottom';
        
        imageElement.style.backgroundPosition = positionValue;
    }
}

// 应用模态框按钮图片设置
function applyModalButtonImage(buttonElement, settings) {
    const imageElement = buttonElement.querySelector('.item-image');
    
    // 清除之前的设置
    imageElement.style.backgroundImage = '';
    imageElement.textContent = '';
    imageElement.style.fontSize = '';
    
    if (settings.icon) {
        // 使用预设图标
        imageElement.textContent = settings.icon;
        imageElement.style.fontSize = '16px';
    } else if (settings.imageData) {
        // 使用自定义图片
        imageElement.style.backgroundImage = `url(${settings.imageData})`;
        imageElement.style.backgroundSize = `${settings.size}%`;
        imageElement.style.backgroundRepeat = 'no-repeat';
        
        let positionValue = 'center';
        if (settings.position < 25) positionValue = 'top';
        else if (settings.position < 75) positionValue = 'center';
        else positionValue = 'bottom';
        
        imageElement.style.backgroundPosition = positionValue;
    }
}

// 保存按钮图片设置到本地存储
function saveButtonImageSettings() {
    const savedButtonImages = localStorage.getItem('buttonImages') || '{}';
    const buttonImages = JSON.parse(savedButtonImages);
    
    const buttonText = currentButtonElement.textContent.trim();
    
    // 创建设置对象
    const settings = {
        size: currentButtonImageSettings.size,
        position: currentButtonImageSettings.position,
        icon: currentButtonImageSettings.icon,
        type: currentButtonElementType // 添加按钮类型标识
    };
    
    // 如果有自定义图片数据，添加到设置中
    if (currentButtonImageData) {
        settings.imageData = currentButtonImageData;
    }
    
    buttonImages[buttonText] = settings;
    localStorage.setItem('buttonImages', JSON.stringify(buttonImages));
}

// 移除按钮图片
function removeButtonImage() {
    if (!currentButtonElement) return;
    
    // 清除图片元素
    const imageElement = currentButtonElement.querySelector('.item-image');
    imageElement.style.backgroundImage = '';
    imageElement.textContent = '';
    imageElement.style.fontSize = '';
    imageElement.style.display = '';
    imageElement.style.alignItems = '';
    imageElement.style.justifyContent = '';
    
    // 清除本地存储中的设置
    const savedButtonImages = localStorage.getItem('buttonImages');
    if (savedButtonImages) {
        const buttonImages = JSON.parse(savedButtonImages);
        const buttonText = currentButtonElement.textContent.trim();
        
        delete buttonImages[buttonText];
        localStorage.setItem('buttonImages', JSON.stringify(buttonImages));
    }
    
    // 重置当前设置
    currentButtonImageSettings = {
        size: 100,
        position: 50,
        icon: null,
        type: currentButtonElementType
    };
    currentButtonImageData = null;
    
    // 更新模态框
    document.getElementById('button-image-preview').style.display = 'none';
    document.getElementById('button-upload-area').style.display = 'block';
    document.getElementById('crop-container').style.display = 'none';
    
    document.querySelectorAll('.preset-icon-item').forEach(item => {
        item.classList.remove('active');
    });
    
    alert('按钮图片已移除！');
}

// 重置按钮图片设置
function resetButtonImage() {
    // 重置滑块值
    document.getElementById('image-size-slider').value = 100;
    document.getElementById('image-size-value').textContent = '100%';
    
    document.getElementById('image-position-slider').value = 50;
    document.getElementById('image-position-value').textContent = '居中';
    
    // 重置预设图标选中状态
    document.querySelectorAll('.preset-icon-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // 重置当前设置
    currentButtonImageSettings = {
        size: 100,
        position: 50,
        icon: null
    };
    currentButtonImageData = null;
    
    // 更新模态框
    document.getElementById('button-image-preview').style.display = 'none';
    document.getElementById('button-upload-area').style.display = 'block';
    document.getElementById('crop-container').style.display = 'none';
    
    // 更新预览
    const previewImage = document.querySelector('#current-button-preview .item-image');
    previewImage.style.backgroundImage = '';
    previewImage.textContent = '';
    previewImage.style.fontSize = '';
    previewImage.style.display = '';
    previewImage.style.alignItems = '';
    previewImage.style.justifyContent = '';
    
    alert('按钮图片设置已重置！');
}

// 梅干阿牛动态背景功能
let currentDynamicBgType = 'particles';
let dynamicBgCanvas = null;
let dynamicBgAnimation = null;

function initDynamicBackground() {
    // 初始化动态背景设置
    const savedDynamicBgSettings = localStorage.getItem('dynamicBgSettings');
    if (savedDynamicBgSettings) {
        const settings = JSON.parse(savedDynamicBgSettings);
        currentDynamicBgType = settings.type || 'particles';
        
        // 设置颜色选择器
        document.getElementById('primary-color-picker').value = settings.primaryColor || '#ff6b6b';
        document.getElementById('secondary-color-picker').value = settings.secondaryColor || '#4ecdc4';
        document.getElementById('bg-color-picker').value = settings.bgColor || '#1a535c';
        
        // 设置滑块
        document.getElementById('speed-slider').value = settings.speed || 50;
        document.getElementById('density-slider').value = settings.density || 50;
        document.getElementById('size-slider').value = settings.size || 50;
        
        // 更新显示值
        document.getElementById('speed-value').textContent = `${settings.speed || 50}%`;
        document.getElementById('density-value').textContent = `${settings.density || 50}%`;
        document.getElementById('size-value').textContent = `${settings.size || 50}%`;
        
        // 设置背景类型按钮
        document.querySelectorAll('.dynamic-bg-type-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.type === currentDynamicBgType) {
                btn.classList.add('active');
            }
        });
        
        // 应用设置
        applyDynamicBackground();
    }
    
    // 添加动态背景类型按钮事件
    document.querySelectorAll('.dynamic-bg-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.dynamic-bg-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDynamicBgType = this.dataset.type;
            
            // 显示/隐藏自定义图片上传区域
            if (currentDynamicBgType === 'custom') {
                document.getElementById('custom-image-section').style.display = 'block';
            } else {
                document.getElementById('custom-image-section').style.display = 'none';
            }
        });
    });
    
    // 添加颜色选择器事件
    document.getElementById('primary-color-picker').addEventListener('input', function() {
        document.getElementById('primary-color-preview').style.backgroundColor = this.value;
    });
    
    document.getElementById('secondary-color-picker').addEventListener('input', function() {
        document.getElementById('secondary-color-preview').style.backgroundColor = this.value;
    });
    
    document.getElementById('bg-color-picker').addEventListener('input', function() {
        document.getElementById('bg-color-preview').style.backgroundColor = this.value;
    });
    
    // 添加滑块事件
    document.getElementById('speed-slider').addEventListener('input', function() {
        document.getElementById('speed-value').textContent = `${this.value}%`;
    });
    
    document.getElementById('density-slider').addEventListener('input', function() {
        document.getElementById('density-value').textContent = `${this.value}%`;
    });
    
    document.getElementById('size-slider').addEventListener('input', function() {
        document.getElementById('size-value').textContent = `${this.value}%`;
    });
    
    // 添加动态图片上传事件
    document.getElementById('dynamic-image-upload').addEventListener('change', handleDynamicImageUpload);
    
    // 添加拖放支持
    const dynamicUploadArea = document.getElementById('dynamic-upload-area');
    dynamicUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        dynamicUploadArea.style.borderColor = 'var(--primary-color)';
        dynamicUploadArea.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    dynamicUploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        dynamicUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        dynamicUploadArea.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    
    dynamicUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        dynamicUploadArea.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        dynamicUploadArea.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            document.getElementById('dynamic-image-upload').files = files;
            handleDynamicImageUpload({target: {files: files}});
        }
    });
    
    // 点击上传区域触发文件选择
    dynamicUploadArea.addEventListener('click', function() {
        document.getElementById('dynamic-image-upload').click();
    });
}

// 处理动态背景图片上传
function handleDynamicImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match('image.*')) {
        alert('请上传图片文件！');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // 显示预览
        const preview = document.getElementById('dynamic-image-preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
        
        // 保存到本地存储
        const settings = {
            type: 'custom',
            customImage: e.target.result
        };
        localStorage.setItem('dynamicBgSettings', JSON.stringify(settings));
        
        // 应用设置
        applyDynamicBackground();
    };
    reader.readAsDataURL(file);
}

function resetDynamicBackground() {
    // 清除Canvas
    if (dynamicBgCanvas) {
        dynamicBgCanvas.remove();
        dynamicBgCanvas = null;
    }
    
    // 停止动画
    if (dynamicBgAnimation) {
        cancelAnimationFrame(dynamicBgAnimation);
        dynamicBgAnimation = null;
    }
    
    // 重置设置
    document.getElementById('primary-color-picker').value = '#ff6b6b';
    document.getElementById('secondary-color-picker').value = '#4ecdc4';
    document.getElementById('bg-color-picker').value = '#1a535c';
    
    document.getElementById('speed-slider').value = 50;
    document.getElementById('density-slider').value = 50;
    document.getElementById('size-slider').value = 50;
    
    document.getElementById('speed-value').textContent = '50%';
    document.getElementById('density-value').textContent = '50%';
    document.getElementById('size-value').textContent = '50%';
    
    document.getElementById('primary-color-preview').style.backgroundColor = '#ff6b6b';
    document.getElementById('secondary-color-preview').style.backgroundColor = '#4ecdc4';
    document.getElementById('bg-color-preview').style.backgroundColor = '#1a535c';
    
    // 重置背景类型
    document.querySelectorAll('.dynamic-bg-type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === 'particles') {
            btn.classList.add('active');
        }
    });
    currentDynamicBgType = 'particles';
    
    // 隐藏预览
    document.getElementById('dynamic-image-preview').style.display = 'none';
    
    // 清除本地存储
    localStorage.removeItem('dynamicBgSettings');
    
    alert('动态背景设置已重置！');
}

function applyDynamicBackground() {
    // 清除现有背景
    const container = document.getElementById('dynamic-bg-container');
    container.innerHTML = '';
    
    // 停止现有动画
    if (dynamicBgAnimation) {
        cancelAnimationFrame(dynamicBgAnimation);
        dynamicBgAnimation = null;
    }
    
    // 获取设置
    const primaryColor = document.getElementById('primary-color-picker').value;
    const secondaryColor = document.getElementById('secondary-color-picker').value;
    const bgColor = document.getElementById('bg-color-picker').value;
    const speed = parseInt(document.getElementById('speed-slider').value) / 50;
    const density = parseInt(document.getElementById('density-slider').value) / 100;
    const size = parseInt(document.getElementById('size-slider').value) / 50;
    
    // 保存设置
    const settings = {
        type: currentDynamicBgType,
        primaryColor: primaryColor,
        secondaryColor: secondaryColor,
        bgColor: bgColor,
        speed: parseInt(document.getElementById('speed-slider').value),
        density: parseInt(document.getElementById('density-slider').value),
        size: parseInt(document.getElementById('size-slider').value)
    };
    
    // 如果是自定义图片类型，保存图片数据
    if (currentDynamicBgType === 'custom' && document.getElementById('dynamic-image-preview').style.display !== 'none') {
        settings.customImage = document.getElementById('dynamic-image-preview').src;
    }
    
    localStorage.setItem('dynamicBgSettings', JSON.stringify(settings));
    
    // 根据类型应用背景
    switch(currentDynamicBgType) {
        case 'particles':
            createParticleBackground(primaryColor, secondaryColor, bgColor, speed, density, size);
            break;
        case 'gradient':
            createGradientBackground(primaryColor, secondaryColor, bgColor, speed);
            break;
        case 'wave':
            createWaveBackground(primaryColor, secondaryColor, bgColor, speed, density, size);
            break;
        case 'custom':
            createCustomImageBackground(settings.customImage);
            break;
    }
    
    hideModal('dynamic-bg-modal');
    alert('动态背景设置已应用！');
}

// 创建粒子背景
function createParticleBackground(primaryColor, secondaryColor, bgColor, speed, density, size) {
    const container = document.getElementById('dynamic-bg-container');
    
    // 创建Canvas
    dynamicBgCanvas = document.createElement('canvas');
    dynamicBgCanvas.width = container.clientWidth;
    dynamicBgCanvas.height = container.clientHeight;
    dynamicBgCanvas.style.position = 'absolute';
    dynamicBgCanvas.style.top = '0';
    dynamicBgCanvas.style.left = '0';
    dynamicBgCanvas.style.width = '100%';
    dynamicBgCanvas.style.height = '100%';
    container.appendChild(dynamicBgCanvas);
    
    const ctx = dynamicBgCanvas.getContext('2d');
    
    // 粒子数组
    const particles = [];
    const particleCount = Math.floor(100 * density);
    
    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * dynamicBgCanvas.width,
            y: Math.random() * dynamicBgCanvas.height,
            size: Math.random() * 5 * size,
            speedX: (Math.random() - 0.5) * 2 * speed,
            speedY: (Math.random() - 0.5) * 2 * speed,
            color: Math.random() > 0.5 ? primaryColor : secondaryColor
        });
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, dynamicBgCanvas.width, dynamicBgCanvas.height);
        
        // 更新和绘制粒子
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 边界检查
            if (particle.x < 0 || particle.x > dynamicBgCanvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > dynamicBgCanvas.height) particle.speedY *= -1;
            
            // 绘制粒子
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        dynamicBgAnimation = requestAnimationFrame(animate);
    }
    
    animate();
}

// 创建渐变背景
function createGradientBackground(primaryColor, secondaryColor, bgColor, speed) {
    const container = document.getElementById('dynamic-bg-container');
    
    // 创建渐变元素
    const gradientEl = document.createElement('div');
    gradientEl.style.position = 'absolute';
    gradientEl.style.top = '0';
    gradientEl.style.left = '0';
    gradientEl.style.width = '100%';
    gradientEl.style.height = '100%';
    gradientEl.style.background = `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}, ${bgColor})`;
    gradientEl.style.backgroundSize = '400% 400%';
    gradientEl.style.animation = `gradientAnimation ${20 / speed}s ease infinite`;
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    container.appendChild(gradientEl);
}

// 创建波浪背景
function createWaveBackground(primaryColor, secondaryColor, bgColor, speed, density, size) {
    const container = document.getElementById('dynamic-bg-container');
    
    // 创建Canvas
    dynamicBgCanvas = document.createElement('canvas');
    dynamicBgCanvas.width = container.clientWidth;
    dynamicBgCanvas.height = container.clientHeight;
    dynamicBgCanvas.style.position = 'absolute';
    dynamicBgCanvas.style.top = '0';
    dynamicBgCanvas.style.left = '0';
    dynamicBgCanvas.style.width = '100%';
    dynamicBgCanvas.style.height = '100%';
    container.appendChild(dynamicBgCanvas);
    
    const ctx = dynamicBgCanvas.getContext('2d');
    
    // 波浪参数
    let time = 0;
    const waveCount = Math.floor(3 * density);
    const waves = [];
    
    // 创建波浪
    for (let i = 0; i < waveCount; i++) {
        waves.push({
            amplitude: 20 + Math.random() * 30 * size,
            frequency: 0.01 + Math.random() * 0.02,
            speed: 0.02 + Math.random() * 0.03 * speed,
            color: i % 2 === 0 ? primaryColor : secondaryColor,
            offset: Math.random() * Math.PI * 2
        });
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, dynamicBgCanvas.width, dynamicBgCanvas.height);
        
        // 绘制波浪
        waves.forEach((wave, index) => {
            ctx.beginPath();
            ctx.moveTo(0, dynamicBgCanvas.height / 2);
            
            for (let x = 0; x < dynamicBgCanvas.width; x++) {
                const y = dynamicBgCanvas.height / 2 + 
                          Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
                ctx.lineTo(x, y);
            }
            
            ctx.lineTo(dynamicBgCanvas.width, dynamicBgCanvas.height);
            ctx.lineTo(0, dynamicBgCanvas.height);
            ctx.closePath();
            
            ctx.fillStyle = wave.color + '40'; // 添加透明度
            ctx.fill();
        });
        
        time += 0.05;
        dynamicBgAnimation = requestAnimationFrame(animate);
    }
    
    animate();
}

// 创建自定义图片背景
function createCustomImageBackground(imageData) {
    const container = document.getElementById('dynamic-bg-container');
    
    // 创建图片元素
    const imgEl = document.createElement('div');
    imgEl.style.position = 'absolute';
    imgEl.style.top = '0';
    imgEl.style.left = '0';
    imgEl.style.width = '100%';
    imgEl.style.height = '100%';
    imgEl.style.backgroundImage = `url(${imageData})`;
    imgEl.style.backgroundSize = 'cover';
    imgEl.style.backgroundPosition = 'center';
    
    container.appendChild(imgEl);
}

// Mega New Door 功能
function initMegaNewDoor() {
    // 初始化 Mega New Door 设置
    const savedMegaNewDoorSettings = localStorage.getItem('megaNewDoorSettings');
    if (savedMegaNewDoorSettings) {
        const settings = JSON.parse(savedMegaNewDoorSettings);
        
        // 设置颜色选择器
        document.getElementById('frame-color-picker').value = settings.color || '#4a90e2';
        
        // 设置滑块
        document.getElementById('frame-opacity-slider').value = settings.opacity || 80;
        document.getElementById('frame-opacity-value').textContent = `${settings.opacity || 80}%`;
        
        // 设置样式按钮
        document.querySelectorAll('.dynamic-bg-type-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.type === (settings.style || 'classic')) {
                btn.classList.add('active');
            }
        });
        
        // 应用设置
        applyMegaNewDoor();
    }
    
    // 添加样式按钮事件
    document.querySelectorAll('.dynamic-bg-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.dynamic-bg-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 添加透明度滑块事件
    document.getElementById('frame-opacity-slider').addEventListener('input', function() {
        document.getElementById('frame-opacity-value').textContent = `${this.value}%`;
    });
}

function resetMegaNewDoor() {
    // 重置设置
    document.getElementById('frame-color-picker').value = '#4a90e2';
    document.getElementById('frame-opacity-slider').value = 80;
    document.getElementById('frame-opacity-value').textContent = '80%';
    
    // 重置样式按钮
    document.querySelectorAll('.dynamic-bg-type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === 'classic') {
            btn.classList.add('active');
        }
    });
    
    // 清除本地存储
    localStorage.removeItem('megaNewDoorSettings');
    
    // 移除框架
    const frame = document.getElementById('mega-new-door-frame');
    frame.style.display = 'none';
    
    alert('Mega New Door 设置已重置！');
}

function applyMegaNewDoor() {
    // 获取设置
    const color = document.getElementById('frame-color-picker').value;
    const opacity = parseInt(document.getElementById('frame-opacity-slider').value) / 100;
    const style = document.querySelector('.dynamic-bg-type-btn.active').dataset.type;
    
    // 保存设置
    const settings = {
        color: color,
        opacity: parseInt(document.getElementById('frame-opacity-slider').value),
        style: style
    };
    localStorage.setItem('megaNewDoorSettings', JSON.stringify(settings));
    
    // 应用设置
    const frame = document.getElementById('mega-new-door-frame');
    frame.style.display = 'block';
    frame.style.backgroundColor = color;
    frame.style.opacity = opacity;
    
    // 根据样式添加额外样式
    frame.className = 'mega-new-door-frame';
    if (style === 'modern') {
        frame.style.border = `10px solid ${color}`;
        frame.style.boxShadow = `0 0 50px ${color}`;
    } else if (style === 'minimal') {
        frame.style.border = `1px solid ${color}`;
    } else {
        frame.style.border = `5px solid ${color}`;
        frame.style.boxShadow = `0 0 20px ${color}`;
    }
    
    hideModal('mega-new-door-modal');
    alert('Mega New Door 设置已应用！');
}