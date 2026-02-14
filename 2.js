// 全局变量
const bgContainer = document.getElementById("bgContainer");
const startMenu = document.getElementById("startMenu");
const overlay = document.getElementById("overlay");
const contextMenu = document.getElementById("contextMenu");
const taskbarApps = document.getElementById("taskbarApps");

let slideshowInterval = null;
let openApps = {};

// 扩展壁纸列表为9张图片
let wallpaperList = [
    "https://picsum.photos/id/1018/1920/1080",
    "https://picsum.photos/id/1015/1920/1080",
    "https://picsum.photos/id/1019/1920/1080",
    "https://picsum.photos/id/1039/1920/1080",
    "https://picsum.photos/id/1040/1920/1080",
    "https://picsum.photos/id/1041/1920/1080",
    "https://picsum.photos/id/1042/1920/1080",
    "https://picsum.photos/id/1043/1920/1080",
    "https://picsum.photos/id/1044/1920/1080"
];

// 扩展A文件夹图片列表为9张图片
const AFolderImages = [
    {
        name: "夫妻长春图片1",
        url: "https://picsum.photos/id/1005/1920/1080",
        description: "夫妻长春商城图片1"
    },
    {
        name: "夫妻长春图片2",
        url: "https://picsum.photos/id/1025/1920/1080",
        description: "夫妻长春商城图片2"
    },
    {
        name: "夫妻长春图片3",
        url: "https://picsum.photos/id/1035/1920/1080",
        description: "夫妻长春商城图片3"
    },
    {
        name: "夫妻长春图片4",
        url: "https://picsum.photos/id/1003/1920/1080",
        description: "夫妻长春商城图片4"
    },
    {
        name: "夫妻长春图片5",
        url: "https://picsum.photos/id/1002/1920/1080",
        description: "夫妻长春商城图片5"
    },
    {
        name: "夫妻长春图片6",
        url: "https://picsum.photos/id/1001/1920/1080",
        description: "夫妻长春商城图片6"
    },
    {
        name: "夫妻长春图片7",
        url: "https://picsum.photos/id/1000/1920/1080",
        description: "夫妻长春商城图片7"
    },
    {
        name: "夫妻长春图片8",
        url: "https://picsum.photos/id/999/1920/1080",
        description: "夫妻长春商城图片8"
    },
    {
        name: "夫妻长春图片9",
        url: "https://picsum.photos/id/998/1920/1080",
        description: "夫妻长春商城图片9"
    }
];

// 初始化
window.onload = function() {
    // 更新时钟
    updateClock();
    setInterval(updateClock, 1000);
    
    // 设置侧边栏切换
    setupSidebarTabs();
    
    // 设置壁纸预览点击事件
    setupWallpaperPreview();
    
    // 设置滑块事件
    setupSliders();
    
    // 设置图标显示/隐藏
    setupIconVisibility();
    
    // 设置右键菜单
    setupContextMenu();
    
    // 设置窗口拖动
    setupWindowDrag();
    
    // 设置分类标签
    setupCategoryTabs();
    
    // 初始化加载在线壁纸
    loadOnlineWallpapers();
    
    // 加载保存的自定义网站
    loadSavedWebsites();
    
    // 加载本地图片库
    loadLocalImages();
    
    // 加载用户创建的文件夹
    loadUserFolders();
    
    // 设置记事本自动保存
    setupNotepadAutoSave();
    
    // 检查是否需要启动幻灯片
    checkSlideshowStatus();
};

// 检查幻灯片状态并启动
function checkSlideshowStatus() {
    const slideshowEnabled = localStorage.getItem('slideshowEnabled') === 'true';
    document.getElementById('slideshowEnabled').checked = slideshowEnabled;
    
    if (slideshowEnabled) {
        const savedInterval = localStorage.getItem('slideshowInterval');
        const savedShuffle = localStorage.getItem('slideshowShuffle') === 'true';
        const savedSource = localStorage.getItem('slideshowSource') || 'online';
        
        // 恢复幻灯片设置
        document.getElementById('intervalSlider').value = savedInterval || 10;
        document.getElementById('intervalValue').textContent = `${savedInterval || 10} 秒`;
        document.getElementById('shuffleSlides').checked = savedShuffle;
        document.getElementById('slideshowSource').value = savedSource;
        
        // 启动幻灯片
        startSlideshow();
    }
}

// 加载用户创建的文件夹
function loadUserFolders() {
    const folders = JSON.parse(localStorage.getItem('folders') || '[]');
    
    folders.forEach(folder => {
        addFolderToSidebar(folder);
    });
}

// 设置记事本自动保存
function setupNotepadAutoSave() {
    const notepadText = document.getElementById('notepadText');
    
    // 加载保存的记事本内容
    const savedText = localStorage.getItem('notepadText');
    if (savedText) {
        notepadText.value = savedText;
    }
    
    // 监听文本变化，自动保存
    notepadText.addEventListener('input', debounce(function() {
        localStorage.setItem('notepadText', notepadText.value);
    }, 1000));
    
    // 监听窗口关闭事件，确保最后内容被保存
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('notepadText', notepadText.value);
    });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// 更新时钟
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById("clock").textContent = `${hours}:${minutes}`;
    
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    document.getElementById("date").textContent = `${year}/${month}/${day}`;
}

// 设置分类标签
function setupCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有active类
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // 添加active类到当前项
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // 根据分类显示不同的内容
            if (category === 'online') {
                loadOnlineWallpapers();
            } else if (category === 'local') {
                loadLocalWallpapers();
            } else if (category === 'A-folder') {
                loadAFolderWallpapers();
            } else if (category === 'colors') {
                loadColorWallpapers();
            }
        });
    });
}

// 加载在线壁纸
function loadOnlineWallpapers() {
    const wallpaperPreview = document.getElementById('wallpaperPreview');
    wallpaperPreview.innerHTML = '';
    
    wallpaperList.forEach((src, index) => {
        const wallpaperItem = document.createElement('div');
        wallpaperItem.className = `wallpaper-item ${index === 0 ? 'active' : ''}`;
        wallpaperItem.setAttribute('data-src', src);
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `壁纸${index + 1}`;
        
        const cacheStatus = document.createElement('div');
        cacheStatus.className = 'cache-status';
        cacheStatus.textContent = `壁纸${index + 1}`;
        
        wallpaperItem.appendChild(img);
        wallpaperItem.appendChild(cacheStatus);
        
        wallpaperItem.addEventListener('click', () => {
            document.querySelectorAll('.wallpaper-item').forEach(i => i.classList.remove('active'));
            wallpaperItem.classList.add('active');
            
            setBackground(src);
            localStorage.setItem('savedBg', src);
        });
        
        wallpaperPreview.appendChild(wallpaperItem);
    });
}

// 加载A文件夹壁纸
function loadAFolderWallpapers() {
    const wallpaperPreview = document.getElementById('wallpaperPreview');
    wallpaperPreview.innerHTML = '';
    
    // 在实际应用中，这里会从文件系统中加载A文件夹的图片
    // 这里使用示例数据
    AFolderImages.forEach((file, index) => {
        const wallpaperItem = document.createElement('div');
        wallpaperItem.className = `wallpaper-item ${index === 0 ? 'active' : ''}`;
        wallpaperItem.setAttribute('data-src', file.url);
        
        const img = document.createElement('img');
        img.src = file.url;
        img.alt = file.name;
        
        const cacheStatus = document.createElement('div');
        cacheStatus.className = 'cache-status';
        cacheStatus.textContent = file.description || file.name;
        
        wallpaperItem.appendChild(img);
        wallpaperItem.appendChild(cacheStatus);
        
        wallpaperItem.addEventListener('click', () => {
            document.querySelectorAll('.wallpaper-item').forEach(i => i.classList.remove('active'));
            wallpaperItem.classList.add('active');
            
            setBackground(file.url);
            localStorage.setItem('savedBg', file.url);
        });
        
        wallpaperPreview.appendChild(wallpaperItem);
    });
}

// 加载本地壁纸
function loadLocalWallpapers() {
    const wallpaperPreview = document.getElementById('wallpaperPreview');
    wallpaperPreview.innerHTML = '';
    
    // 从本地存储加载图片
    const localImages = getLocalImages();
    
    if (localImages.length === 0) {
        wallpaperPreview.innerHTML = '<p>暂无本地图片，请先上传图片</p>';
        return;
    }
    
    localImages.forEach((image, index) => {
        const wallpaperItem = document.createElement('div');
        wallpaperItem.className = `wallpaper-item ${index === 0 ? 'active' : ''}`;
        wallpaperItem.setAttribute('data-src', image.dataUrl);
        
        const img = document.createElement('img');
        img.src = image.dataUrl;
        img.alt = image.name;
        
        const cacheStatus = document.createElement('div');
        cacheStatus.className = 'cache-status';
        cacheStatus.textContent = image.name;
        
        wallpaperItem.appendChild(img);
        wallpaperItem.appendChild(cacheStatus);
        
        wallpaperItem.addEventListener('click', () => {
            document.querySelectorAll('.wallpaper-item').forEach(i => i.classList.remove('active'));
            wallpaperItem.classList.add('active');
            
            setBackground(image.dataUrl);
            localStorage.setItem('savedBg', image.dataUrl);
        });
        
        wallpaperPreview.appendChild(wallpaperItem);
    });
}

// 加载纯色背景
function loadColorWallpapers() {
    const wallpaperPreview = document.getElementById('wallpaperPreview');
    wallpaperPreview.innerHTML = '';
    
    const colors = [
        { name: '深蓝', value: '#0078d7' },
        { name: '红色', value: '#d13438' },
        { name: '绿色', value: '#107c10' },
        { name: '紫色', value: '#5c2d91' },
        { name: '橙色', value: '#ca5010' },
        { name: '深灰', value: '#323130' },
        { name: '浅蓝', value: '#50a6ff' },
        { name: '粉色', value: '#ff69b4' },
        { name: '青色', value: '#00ced1' }
    ];
    
    colors.forEach((color, index) => {
        const wallpaperItem = document.createElement('div');
        wallpaperItem.className = `wallpaper-item ${index === 0 ? 'active' : ''}`;
        wallpaperItem.setAttribute('data-src', color.value);
        wallpaperItem.style.backgroundColor = color.value;
        wallpaperItem.style.height = '100px';
        wallpaperItem.style.display = 'flex';
        wallpaperItem.style.alignItems = 'center';
        wallpaperItem.style.justifyContent = 'center';
        wallpaperItem.style.color = '#fff';
        wallpaperItem.style.fontWeight = 'bold';
        wallpaperItem.textContent = color.name;
        
        wallpaperItem.addEventListener('click', () => {
            document.querySelectorAll('.wallpaper-item').forEach(i => i.classList.remove('active'));
            wallpaperItem.classList.add('active');
            
            setBackgroundColor(color.value);
            localStorage.setItem('savedBg', color.value);
        });
        
        wallpaperPreview.appendChild(wallpaperItem);
    });
}

// 设置背景颜色
function setBackgroundColor(color) {
    bgContainer.style.backgroundImage = 'none';
    bgContainer.style.backgroundColor = color;
}

// 设置侧边栏切换
function setupSidebarTabs() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const settingsMains = document.querySelectorAll('.settings-main');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有active类
            sidebarItems.forEach(i => i.classList.remove('active'));
            settingsMains.forEach(m => m.classList.remove('active'));
            
            // 添加active类到当前项
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // 如果切换到回收站标签，加载回收站内容
            if (tabId === 'trash') {
                loadTrash();
            }
        });
    });
}

// 设置壁纸预览点击事件
function setupWallpaperPreview() {
    // 这个函数现在在分类标签点击事件中处理
}

// 设置滑块事件
function setupSliders() {
    const intervalSlider = document.getElementById('intervalSlider');
    const intervalValue = document.getElementById('intervalValue');
    
    intervalSlider.addEventListener('input', () => {
        intervalValue.textContent = `${intervalSlider.value} 秒`;
        // 保存间隔时间
        localStorage.setItem('slideshowInterval', intervalSlider.value);
        
        // 如果幻灯片正在运行，重启以应用新间隔
        if (slideshowInterval) {
            stopSlideshow();
            startSlideshow();
        }
    });
    
    // 幻灯片开关事件
    document.getElementById('slideshowEnabled').addEventListener('change', function() {
        const isChecked = this.checked;
        localStorage.setItem('slideshowEnabled', isChecked);
        
        if (isChecked) {
            startSlideshow();
        } else {
            stopSlideshow();
        }
    });
    
    // 无序播放开关事件
    document.getElementById('shuffleSlides').addEventListener('change', function() {
        localStorage.setItem('slideshowShuffle', this.checked);
    });
    
    // 幻灯片源切换事件
    document.getElementById('slideshowSource').addEventListener('change', function() {
        localStorage.setItem('slideshowSource', this.value);
        
        // 如果幻灯片正在运行，重启以应用新源
        if (slideshowInterval) {
            stopSlideshow();
            startSlideshow();
        }
    });
}

// 设置图标显示/隐藏
function setupIconVisibility() {
    const iconCheckboxes = [
        { id: 'iconThisPC', name: '1此电脑' },
        { id: 'iconDocuments', name: '文档' },
        { id: 'iconPictures', name: '图片' },
        { id: 'iconMusic', name: '音乐' },
        { id: 'iconSettings', name: '设置' },
        { id: 'iconCalculator', name: '计算器' },
        { id: 'iconNotepad', name: '记事本' },
        { id: 'iconBrowser', name: '浏览器' },
        { id: 'iconMedia', name: '媒体播放器' }
    ];
    
    iconCheckboxes.forEach(item => {
        const checkbox = document.getElementById(item.id);
        checkbox.addEventListener('change', (e) => {
            const icon = document.querySelector(`.icon[data-name="${item.name}"]`);
            if (icon) {
                icon.style.display = e.target.checked ? 'flex' : 'none';
            }
        });
    });
}

// 设置右键菜单
function setupContextMenu() {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.top = `${e.pageY}px`;
    });

    document.addEventListener('click', () => {
        contextMenu.style.display = 'none';
    });
}

// 设置窗口拖动
function setupWindowDrag() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(win => {
        const header = win.querySelector('.win-header');
        let isDragging = false;
        let offsetX, offsetY;
        
        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            
            // 将窗口置于最前
            windows.forEach(w => w.style.zIndex = '100');
            win.style.zIndex = '101';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                win.style.left = `${e.clientX - offsetX}px`;
                win.style.top = `${e.clientY - offsetY}px`;
                win.style.transform = 'none';
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    });
}

// 设置背景
function setBackground(src) {
    bgContainer.style.backgroundImage = `url(${src})`;
    bgContainer.style.backgroundColor = 'transparent';
}

// 链接背景
function setLinkBg() {
    const link = document.getElementById("imgLink").value.trim();
    if (link) {
        setBackground(link);
        localStorage.setItem("savedBg", link);
        
        // 添加到壁纸列表
        wallpaperList.push(link);
        
        // 添加预览项
        const previewContainer = document.getElementById('wallpaperPreview');
        const previewItem = document.createElement('div');
        previewItem.className = 'wallpaper-item';
        previewItem.setAttribute('data-src', link);
        
        const img = document.createElement('img');
        img.src = link;
        img.alt = "自定义壁纸";
        
        const cacheStatus = document.createElement('div');
        cacheStatus.className = 'cache-status';
        cacheStatus.textContent = '自定义壁纸';
        
        previewItem.appendChild(img);
        previewItem.appendChild(cacheStatus);
        
        previewItem.addEventListener('click', () => {
            document.querySelectorAll('.wallpaper-item').forEach(i => i.classList.remove('active'));
            previewItem.classList.add('active');
            setBackground(link);
            localStorage.setItem('savedBg', link);
        });
        previewContainer.appendChild(previewItem);
    }
}

// 本地上传背景
document.getElementById("localImg").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const url = event.target.result;
            setBackground(url);
            localStorage.setItem("savedBg", url);
        };
        reader.readAsDataURL(file);
    }
});

// 开始幻灯片放映
function startSlideshow() {
    stopSlideshow();
    
    const interval = parseInt(document.getElementById('intervalSlider').value) * 1000;
    
    slideshowInterval = setInterval(() => {
        changeWallpaper();
    }, interval);
}

// 停止幻灯片放映
function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

// 切换壁纸
function changeWallpaper() {
    const shuffle = document.getElementById('shuffleSlides').checked;
    const source = document.getElementById('slideshowSource').value;
    
    let currentBg = localStorage.getItem('savedBg');
    let imageList = [];
    
    // 根据源选择图片列表
    if (source === 'online') {
        imageList = wallpaperList;
    } else if (source === 'local') {
        // 从本地存储加载图片
        const localImages = getLocalImages();
        imageList = localImages.map(img => img.dataUrl);
    } else if (source === 'A-folder') {
        imageList = AFolderImages.map(img => img.url);
    }
    
    if (imageList.length === 0) return;
    
    let currentIndex = imageList.indexOf(currentBg);
    
    let newIndex;
    if (shuffle) {
        // 随机切换 - 确保不是当前图片
        do {
            newIndex = Math.floor(Math.random() * imageList.length);
        } while (newIndex === currentIndex && imageList.length > 1);
    } else {
        // 顺序切换
        newIndex = (currentIndex + 1) % imageList.length;
    }
    
    const newBg = imageList[newIndex];
    setBackground(newBg);
    localStorage.setItem('savedBg', newBg);
    
    // 更新预览选中状态
    document.querySelectorAll('.wallpaper-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-src') === newBg) {
            item.classList.add('active');
        }
    });
}

// 打开应用
function openApp(appName) {
    const appWindow = document.getElementById(`${appName}Win`);
    
    if (appWindow) {
        appWindow.style.display = 'block';
        openApps[appName] = true;
        
        // 添加到任务栏
        addToTaskbar(appName);
        
        // 关闭开始菜单
        startMenu.classList.remove('active');
        overlay.classList.remove('active');
        
        // 将窗口置于最前
        document.querySelectorAll('.window').forEach(win => {
            if (win.id !== `${appName}Win`) {
                win.style.zIndex = '100';
            }
        });
        appWindow.style.zIndex = '101';
        
        // 如果是文件管理器，加载桌面文件夹内容
        if (appName === 'explorer') {
            // 检查历史记录是否为空，如果为空则添加桌面
            if (fileHistory.length === 0) {
                fileHistory.push('桌面');
                historyIndex = 0;
            }
            
            // 更新前进后退按钮状态
            updateNavigationButtons();
            
            // 加载桌面文件夹内容
            loadFolderContent('桌面');
            
            // 选中桌面文件夹
            document.querySelectorAll('.file-sidebar .sidebar-item').forEach(item => {
                item.classList.remove('active');
                if (item.textContent === '桌面') {
                    item.classList.add('active');
                }
            });
        }
    }
}

// 关闭应用
function closeApp(appName) {
    const appWindow = document.getElementById(`${appName}Win`);
    
    if (appWindow) {
        appWindow.style.display = 'none';
        openApps[appName] = false;
        
        // 从任务栏移除
        removeFromTaskbar(appName);
    }
}

// 添加到任务栏
function addToTaskbar(appName) {
    const appNames = {
        'settings': '设置',
        'calculator': '计算器',
        'notepad': '记事本',
        'explorer': '文件资源管理器',
        'browser': '浏览器',
        'media': '媒体播放器'
    };
    
    if (!document.getElementById(`taskbar-${appName}`)) {
        const taskbarApp = document.createElement('button');
        taskbarApp.className = 'taskbar-app';
        taskbarApp.id = `taskbar-${appName}`;
        taskbarApp.textContent = appNames[appName];
        taskbarApp.onclick = () => {
            const appWindow = document.getElementById(`${appName}Win`);
            if (appWindow.style.display === 'block') {
                // 如果窗口已打开，点击任务栏按钮将其置于最前
                document.querySelectorAll('.window').forEach(win => {
                    win.style.zIndex = '100';
                });
                appWindow.style.zIndex = '101';
                
                // 激活任务栏按钮
                document.querySelectorAll('.taskbar-app').forEach(btn => {
                    btn.classList.remove('active');
                });
                taskbarApp.classList.add('active');
            } else {
                // 如果窗口未打开，打开窗口
                openApp(appName);
            }
        };
        
        taskbarApps.appendChild(taskbarApp);
    }
}

// 从任务栏移除
function removeFromTaskbar(appName) {
    const taskbarApp = document.getElementById(`taskbar-${appName}`);
    if (taskbarApp) {
        taskbarApp.remove();
    }
}

// 开始菜单控制
document.getElementById('startBtn').addEventListener('click', () => {
    startMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    startMenu.classList.remove('active');
    overlay.classList.remove('active');
});

// 计算器功能
let calcValue = '0';
let calcOperator = '';
let calcWaitingForOperand = false;

function updateCalcDisplay() {
    document.getElementById('calcDisplay').textContent = calcValue;
}

function appendNumber(number) {
    if (calcWaitingForOperand) {
        calcValue = number;
        calcWaitingForOperand = false;
    } else {
        calcValue = calcValue === '0' ? number : calcValue + number;
    }
    updateCalcDisplay();
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(calcValue);
    
    if (calcOperator && !calcWaitingForOperand) {
        calculate();
    }
    
    calcOperator = nextOperator;
    calcWaitingForOperand = true;
}

function calculate() {
    const inputValue = parseFloat(calcValue);
    
    if (calcOperator === '+') {
        calcValue = String(parseFloat(calcValue) + inputValue);
    } else if (calcOperator === '-') {
        calcValue = String(parseFloat(calcValue) - inputValue);
    } else if (calcOperator === '*') {
        calcValue = String(parseFloat(calcValue) * inputValue);
    } else if (calcOperator === '/') {
        calcValue = String(parseFloat(calcValue) / inputValue);
    } else if (calcOperator === '%') {
        calcValue = String(parseFloat(calcValue) / 100);
    }
    
    calcOperator = '';
    calcWaitingForOperand = true;
    updateCalcDisplay();
}

function clearCalc() {
    calcValue = '0';
    calcOperator = '';
    calcWaitingForOperand = false;
    updateCalcDisplay();
}

function deleteLast() {
    if (calcValue.length > 1) {
        calcValue = calcValue.slice(0, -1);
    } else {
        calcValue = '0';
    }
    updateCalcDisplay();
}

function toggleSign() {
    calcValue = String(-parseFloat(calcValue));
    updateCalcDisplay();
}

// 文件管理器功能
let fileHistory = [];
let historyIndex = -1;

function navigateTo(folder) {
    document.querySelectorAll('.file-sidebar .sidebar-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 更新历史记录
    if (historyIndex !== fileHistory.length - 1) {
        fileHistory = fileHistory.slice(0, historyIndex + 1);
    }
    fileHistory.push(folder);
    historyIndex = fileHistory.length - 1;
    
    // 更新前进后退按钮状态
    updateNavigationButtons();
    
    // 加载文件夹内容
    loadFolderContent(folder);
}

function goBack() {
    if (historyIndex > 0) {
        historyIndex--;
        const folder = fileHistory[historyIndex];
        
        // 更新侧边栏选中状态
        document.querySelectorAll('.file-sidebar .sidebar-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('onclick') === `navigateTo('${folder}')` || 
                (item.textContent === folder && !item.hasAttribute('onclick'))) {
                item.classList.add('active');
            }
        });
        
        // 更新前进后退按钮状态
        updateNavigationButtons();
        
        // 加载文件夹内容
        loadFolderContent(folder);
    }
}

function goForward() {
    if (historyIndex < fileHistory.length - 1) {
        historyIndex++;
        const folder = fileHistory[historyIndex];
        
        // 更新侧边栏选中状态
        document.querySelectorAll('.file-sidebar .sidebar-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('onclick') === `navigateTo('${folder}')` || 
                (item.textContent === folder && !item.hasAttribute('onclick'))) {
                item.classList.add('active');
            }
        });
        
        // 更新前进后退按钮状态
        updateNavigationButtons();
        
        // 加载文件夹内容
        loadFolderContent(folder);
    }
}

function updateNavigationButtons() {
    const backButton = document.querySelector('.file-toolbar button:nth-child(1)');
    const forwardButton = document.querySelector('.file-toolbar button:nth-child(2)');
    
    backButton.disabled = historyIndex <= 0;
    forwardButton.disabled = historyIndex >= fileHistory.length - 1;
    
    backButton.style.opacity = backButton.disabled ? '0.5' : '1';
    forwardButton.style.opacity = forwardButton.disabled ? '0.5' : '1';
}

function uploadFile() {
    document.getElementById('fileUpload').click();
}

function handleFileUpload(files) {
    if (files.length === 0) {
        alert('请选择要上传的文件');
        return;
    }
    
    // 获取当前选中的文件夹
    const activeFolder = document.querySelector('.file-sidebar .sidebar-item.active').textContent;
    
    // 保存文件到localStorage
    saveFilesToStorage(files, activeFolder);
    
    // 显示上传成功消息
    alert(`成功上传 ${files.length} 个文件到 ${activeFolder} 文件夹`);
    
    // 刷新当前文件夹内容
    loadFolderContent(activeFolder);
}

// 保存文件到localStorage
function saveFilesToStorage(files, folder) {
    // 获取现有的文件
    let storageFiles = JSON.parse(localStorage.getItem('storageFiles') || '{}');
    
    // 如果文件夹不存在，创建它
    if (!storageFiles[folder]) {
        storageFiles[folder] = [];
    }
    
    // 处理每个文件
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            // 创建文件对象
            const fileObj = {
                id: 'file_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                name: file.name,
                type: file.type,
                dataUrl: event.target.result,
                size: file.size,
                folder: folder,
                uploadedAt: new Date().toISOString()
            };
            
            // 添加到文件列表
            storageFiles[folder].push(fileObj);
            
            // 保存到localStorage
            localStorage.setItem('storageFiles', JSON.stringify(storageFiles));
        };
        
        // 根据文件类型选择读取方式
        if (file.type.startsWith('image/')) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsDataURL(file);
        }
    });
}

// 从localStorage获取文件夹内容
function getFolderContent(folder) {
    const storageFiles = JSON.parse(localStorage.getItem('storageFiles') || '{}');
    return storageFiles[folder] || [];
}

// 加载文件夹内容
function loadFolderContent(folder) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    
    // 获取文件夹内容
    const files = getFolderContent(folder);
    
    // 添加文件夹中的文件
    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.setAttribute('data-id', file.id);
        fileItem.setAttribute('data-folder', folder);
        
        // 创建文件图标
        const img = document.createElement('img');
        if (file.type.startsWith('image/')) {
            img.src = file.dataUrl;
        } else if (file.type.startsWith('text/')) {
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>';
        } else if (file.type.startsWith('audio/')) {
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>';
        } else if (file.type.startsWith('video/')) {
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>';
        } else {
            img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V8h10v2z"/></svg>';
        }
        img.alt = file.name;
        
        // 创建文件名
        const span = document.createElement('span');
        span.textContent = file.name;
        
        // 添加右键菜单功能
        fileItem.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            // 创建自定义右键菜单
            const customMenu = document.createElement('div');
            customMenu.className = 'context-menu';
            customMenu.style.display = 'block';
            customMenu.style.left = `${e.pageX}px`;
            customMenu.style.top = `${e.pageY}px`;
            
            // 打开选项
            const openItem = document.createElement('div');
            openItem.className = 'context-item';
            openItem.textContent = '打开';
            openItem.onclick = () => {
                openFile(file);
                customMenu.remove();
            };
            
            // 删除选项
            const deleteItem = document.createElement('div');
            deleteItem.className = 'context-item';
            deleteItem.textContent = '删除';
            deleteItem.onclick = () => {
                // 确认删除
                if (confirm(`确定要删除 "${file.name}" 吗？删除后可以在回收站中恢复。`)) {
                    // 保存到回收站
                    saveFileToTrash(file, 'file');
                    
                    // 从localStorage删除
                    removeFileFromStorage(file.id, folder);
                    
                    // 从文件列表移除
                    fileItem.remove();
                    
                    // 关闭右键菜单
                    customMenu.remove();
                }
            };
            
            customMenu.appendChild(openItem);
            customMenu.appendChild(deleteItem);
            document.body.appendChild(customMenu);
            
            // 点击其他地方关闭菜单
            const closeMenu = () => {
                customMenu.remove();
                document.removeEventListener('click', closeMenu);
            };
            
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            }, 100);
        });
        
        fileItem.appendChild(img);
        fileItem.appendChild(span);
        fileList.appendChild(fileItem);
    });
    
    // 如果没有文件，显示提示信息
    if (files.length === 0) {
        fileList.innerHTML = '<p>此文件夹为空</p>';
    }
}

// 从localStorage删除文件
function removeFileFromStorage(id, folder) {
    let storageFiles = JSON.parse(localStorage.getItem('storageFiles') || '{}');
    
    if (storageFiles[folder]) {
        storageFiles[folder] = storageFiles[folder].filter(file => file.id !== id);
        localStorage.setItem('storageFiles', JSON.stringify(storageFiles));
    }
}

// 打开文件
function openFile(file) {
    if (file.type.startsWith('image/')) {
        // 打开图片
        openApp('media');
        const mediaContent = document.getElementById('mediaContent');
        mediaContent.innerHTML = '';
        
        const img = document.createElement('img');
        img.src = file.dataUrl;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        
        mediaContent.appendChild(img);
    } else if (file.type.startsWith('text/')) {
        // 打开文本文件
        openApp('notepad');
        const notepadText = document.getElementById('notepadText');
        
        // 从dataUrl获取文本内容
        const base64Data = file.dataUrl.split(',')[1];
        const textContent = atob(base64Data);
        
        notepadText.value = textContent;
    } else if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        // 打开音频或视频
        openApp('media');
        const mediaContent = document.getElementById('mediaContent');
        mediaContent.innerHTML = '';
        
        const media = document.createElement(file.type.startsWith('audio/') ? 'audio' : 'video');
        media.src = file.dataUrl;
        media.controls = true;
        media.autoplay = true;
        media.style.maxWidth = '100%';
        media.style.maxHeight = '100%';
        
        mediaContent.appendChild(media);
    } else {
        alert('不支持的文件类型');
    }
}

// 创建文件夹
function createFolder() {
    const folderName = prompt('请输入文件夹名称:');
    if (folderName) {
        // 获取现有的文件夹
        let folders = JSON.parse(localStorage.getItem('folders') || '[]');
        
        // 检查文件夹是否已存在
        if (folders.includes(folderName)) {
            alert('文件夹已存在');
            return;
        }
        
        // 添加新文件夹
        folders.push(folderName);
        localStorage.setItem('folders', JSON.stringify(folders));
        
        // 添加文件夹到侧边栏
        addFolderToSidebar(folderName);
        
        alert(`文件夹 "${folderName}" 创建成功`);
    }
}

// 添加文件夹到侧边栏
function addFolderToSidebar(folderName) {
    const fileSidebar = document.querySelector('.file-sidebar');
    
    const sidebarItem = document.createElement('div');
    sidebarItem.className = 'sidebar-item';
    sidebarItem.textContent = folderName;
    sidebarItem.onclick = function() {
        document.querySelectorAll('.file-sidebar .sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        
        // 更新历史记录
        if (historyIndex !== fileHistory.length - 1) {
            fileHistory = fileHistory.slice(0, historyIndex + 1);
        }
        fileHistory.push(folderName);
        historyIndex = fileHistory.length - 1;
        
        // 更新前进后退按钮状态
        updateNavigationButtons();
        
        // 加载文件夹内容
        loadFolderContent(folderName);
    };
    
    fileSidebar.appendChild(sidebarItem);
}

// 浏览器功能
function browserGo() {
    const url = document.getElementById('browserUrl').value;
    const frame = document.getElementById('browserFrame');
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        frame.src = 'https://' + url;
    } else {
        frame.src = url;
    }
}

// 媒体播放器增强功能
function showUrlInput() {
    const urlSection = document.getElementById('urlInputSection');
    const downloadSection = document.getElementById('downloadInputSection');
    
    urlSection.style.display = 'block';
    downloadSection.style.display = 'none';
    
    // 自动聚焦到输入框
    document.getElementById('videoUrl').focus();
}

function showDownloadInput() {
    const urlSection = document.getElementById('urlInputSection');
    const downloadSection = document.getElementById('downloadInputSection');
    
    urlSection.style.display = 'none';
    downloadSection.style.display = 'block';
    
    // 自动聚焦到输入框
    document.getElementById('downloadUrl').focus();
}

function loadMediaFromUrl() {
    const url = document.getElementById('videoUrl').value.trim();
    if (!url) {
        alert('请输入视频链接');
        return;
    }
    
    // 验证URL格式
    let videoUrl = url;
    if (!videoUrl.startsWith('http://') && !videoUrl.startsWith('https://')) {
        videoUrl = 'https://' + videoUrl;
    }
    
    const mediaContent = document.getElementById('mediaContent');
    mediaContent.innerHTML = '';
    
    // 创建视频元素
    const video = document.createElement('video');
    video.src = videoUrl;
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    
    // 添加错误处理
    video.onerror = function() {
        mediaContent.innerHTML = '<p>无法加载视频，请检查链接是否正确或视频格式是否支持</p>';
    };
    
    // 添加加载指示器
    const loadingText = document.createElement('p');
    loadingText.textContent = '正在加载视频...';
    mediaContent.appendChild(loadingText);
    
    video.onloadstart = function() {
        loadingText.textContent = '正在加载视频...';
    };
    
    video.oncanplay = function() {
        mediaContent.innerHTML = '';
        mediaContent.appendChild(video);
    };
    
    mediaContent.appendChild(video);
}

function downloadVideo() {
    const url = document.getElementById('downloadUrl').value.trim();
    if (!url) {
        alert('请输入下载链接');
        return;
    }
    
    // 验证URL格式
    let downloadUrl = url;
    if (!downloadUrl.startsWith('http://') && !downloadUrl.startsWith('https://')) {
        downloadUrl = 'https://' + downloadUrl;
    }
    
    // 创建下载链接
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'video_' + Date.now() + '.mp4'; // 使用时间戳作为文件名
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    alert('开始下载视频，如果下载没有自动开始，请检查链接是否正确');
}

function loadMediaFile(file) {
    const mediaContent = document.getElementById('mediaContent');
    mediaContent.innerHTML = '';
    
    if (!file) return;
    
    // 支持的文件类型
    const supportedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
    const supportedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo', 'video/mpeg'];
    
    if (supportedImageTypes.includes(file.type)) {
        const img = document.createElement('img');
        img.src = file.url || URL.createObjectURL(file);
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        mediaContent.appendChild(img);
    } else if (supportedVideoTypes.includes(file.type)) {
        const video = document.createElement('video');
        video.src = file.url || URL.createObjectURL(file);
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        mediaContent.appendChild(video);
    } else {
        mediaContent.innerHTML = '<p>不支持的文件格式。请选择图片或视频文件。</p>';
    }
}

function openMediaFile() {
    document.getElementById('mediaFile').click();
}

// 自定义网站功能
function addCustomWebsite() {
    const name = document.getElementById('websiteName').value.trim();
    const url = document.getElementById('websiteUrl').value.trim();
    const icon = document.getElementById('websiteIcon').value.trim();
    
    if (!name || !url) {
        alert('请输入网站名称和URL');
        return;
    }
    
    // 验证URL格式
    let fullUrl = url;
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
        fullUrl = 'https://' + fullUrl;
    }
    
    // 处理图标
    let iconUrl = icon;
    const iconFile = document.getElementById('websiteIconFile').files[0];
    if (iconFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            iconUrl = event.target.result;
            saveWebsite(name, fullUrl, iconUrl);
        };
        reader.readAsDataURL(iconFile);
    } else {
        saveWebsite(name, fullUrl, iconUrl);
    }
}

function saveWebsite(name, url, icon) {
    if (!icon) {
        // 如果没有提供图标，使用默认图标
        icon = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230078d7"><path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM4 9H10V11H4V9ZM14 15H4V13H14V15ZM20 15H16V13H20V15ZM20 11H12V9H20V11Z"/></svg>';
    }
    
    const website = {
        name: name,
        url: url,
        icon: icon,
        id: 'website_' + Date.now() // 添加唯一ID
    };
    
    // 保存到localStorage
    saveWebsiteToLocalStorage(website);
    
    // 添加图标到桌面
    addWebsiteToDesktop(website);
    
    // 清空表单
    document.getElementById('websiteName').value = '';
    document.getElementById('websiteUrl').value = '';
    document.getElementById('websiteIcon').value = '';
    document.getElementById('websiteIconFile').value = '';
    
    alert('网站已添加到桌面');
}

// 保存网站到localStorage
function saveWebsiteToLocalStorage(website) {
    let websites = JSON.parse(localStorage.getItem('customWebsites') || '[]');
    websites.push(website);
    localStorage.setItem('customWebsites', JSON.stringify(websites));
}

// 从localStorage获取所有网站
function getWebsitesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('customWebsites') || '[]');
}

// 从localStorage删除网站
function removeWebsiteFromLocalStorage(id) {
    let websites = JSON.parse(localStorage.getItem('customWebsites') || '[]');
    websites = websites.filter(website => website.id !== id);
    localStorage.setItem('customWebsites', JSON.stringify(websites));
}

// 保存网站到回收站
function saveWebsiteToTrash(website) {
    const trashItem = {
        ...website,
        deletedAt: new Date().toISOString()
    };
    
    let trash = JSON.parse(localStorage.getItem('websiteTrash') || '[]');
    trash.push(trashItem);
    localStorage.setItem('websiteTrash', JSON.stringify(trash));
    
    // 更新回收站UI
    loadTrash();
}

// 从回收站恢复网站
function restoreWebsiteFromTrash(id) {
    let trash = JSON.parse(localStorage.getItem('websiteTrash') || '[]');
    const website = trash.find(item => item.id === id);
    
    if (website) {
        // 恢复到网站列表
        saveWebsiteToLocalStorage(website);
        
        // 添加到桌面
        addWebsiteToDesktop(website);
        
        // 从回收站移除
        trash = trash.filter(item => item.id !== id);
        localStorage.setItem('websiteTrash', JSON.stringify(trash));
        
        // 更新回收站UI
        loadTrash();
        
        alert('网站已恢复到桌面');
    }
}

// 从回收站永久删除网站
function permanentlyDeleteWebsiteFromTrash(id) {
    let trash = JSON.parse(localStorage.getItem('websiteTrash') || '[]');
    trash = trash.filter(item => item.id !== id);
    localStorage.setItem('websiteTrash', JSON.stringify(trash));
    
    // 更新回收站UI
    loadTrash();
    
    alert('网站已永久删除');
}

// 清空回收站
function emptyTrash() {
    if (confirm('确定要清空回收站吗？此操作不可恢复。')) {
        localStorage.removeItem('websiteTrash');
        loadTrash();
        alert('回收站已清空');
    }
}

// 加载回收站内容
function loadTrash() {
    const trashList = document.getElementById('trashList');
    trashList.innerHTML = '';
    
    // 获取所有回收站内容
    const websiteTrash = JSON.parse(localStorage.getItem('websiteTrash') || '[]');
    const fileTrash = JSON.parse(localStorage.getItem('fileTrash') || '[]');
    
    // 合并回收站内容
    const allTrash = [...websiteTrash, ...fileTrash];
    
    if (allTrash.length === 0) {
        trashList.innerHTML = '<p>回收站是空的</p>';
        return;
    }
    
    // 添加清空回收站按钮
    const emptyBtn = document.createElement('button');
    emptyBtn.className = 'setting-item button';
    emptyBtn.textContent = '清空回收站';
    emptyBtn.onclick = emptyTrash;
    trashList.appendChild(emptyBtn);
    trashList.appendChild(document.createElement('br'));
    trashList.appendChild(document.createElement('br'));
    
    // 添加回收站项目
    allTrash.forEach(item => {
        const trashItem = document.createElement('div');
        trashItem.className = 'trash-item';
        
        const itemInfo = document.createElement('div');
        
        if (item.type === 'image' || item.type === 'file') {
            // 文件或图片
            let iconSrc = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V8h10v2z"/></svg>';
            
            if (item.type === 'image') {
                iconSrc = item.dataUrl;
            } else if (item.type === 'file') {
                if (item.type.startsWith('image/')) {
                    iconSrc = item.dataUrl;
                } else if (item.type.startsWith('text/')) {
                    iconSrc = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>';
                } else if (item.type.startsWith('audio/')) {
                    iconSrc = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>';
                } else if (item.type.startsWith('video/')) {
                    iconSrc = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>';
                }
            }
            
            itemInfo.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${iconSrc}" alt="${item.name}" style="width: 32px; height: 32px; margin-right: 10px; object-fit: cover;">
                    <div>
                        <div style="font-weight: bold;">${item.name}</div>
                        <div style="font-size: 12px; color: #666;">${item.type || '文件'}</div>
                        <div style="font-size: 10px; color: #999;">删除时间: ${formatDate(new Date(item.deletedAt))}</div>
                    </div>
                </div>
            `;
        } else {
            // 网站
            itemInfo.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${item.icon}" alt="${item.name}" style="width: 32px; height: 32px; margin-right: 10px;">
                    <div>
                        <div style="font-weight: bold;">${item.name}</div>
                        <div style="font-size: 12px; color: #666;">${item.url}</div>
                        <div style="font-size: 10px; color: #999;">删除时间: ${formatDate(new Date(item.deletedAt))}</div>
                    </div>
                </div>
            `;
        }
        
        const itemActions = document.createElement('div');
        itemActions.className = 'trash-actions';
        
        const restoreBtn = document.createElement('button');
        restoreBtn.className = 'setting-item button';
        restoreBtn.textContent = '恢复';
        
        if (item.type === 'image' || item.type === 'file') {
            restoreBtn.onclick = () => restoreFileFromTrash(item.id);
        } else {
            restoreBtn.onclick = () => restoreWebsiteFromTrash(item.id);
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'setting-item button';
        deleteBtn.textContent = '永久删除';
        
        if (item.type === 'image' || item.type === 'file') {
            deleteBtn.onclick = () => permanentlyDeleteFileFromTrash(item.id);
        } else {
            deleteBtn.onclick = () => permanentlyDeleteWebsiteFromTrash(item.id);
        }
        
        itemActions.appendChild(restoreBtn);
        itemActions.appendChild(deleteBtn);
        
        trashItem.appendChild(itemInfo);
        trashItem.appendChild(itemActions);
        
        trashList.appendChild(trashItem);
    });
}

// 格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 保存文件到回收站
function saveFileToTrash(item, type) {
    const trashItem = {
        ...item,
        type: type,
        deletedAt: new Date().toISOString()
    };
    
    let trash = JSON.parse(localStorage.getItem('fileTrash') || '[]');
    trash.push(trashItem);
    localStorage.setItem('fileTrash', JSON.stringify(trash));
    
    // 更新回收站UI
    loadTrash();
}

// 从回收站恢复文件
function restoreFileFromTrash(id) {
    let trash = JSON.parse(localStorage.getItem('fileTrash') || '[]');
    const item = trash.find(item => item.id === id);
    
    if (item) {
        if (item.type === 'image') {
            // 恢复图片
            let localImages = JSON.parse(localStorage.getItem('localImages') || '[]');
            localImages.push(item);
            localStorage.setItem('localImages', JSON.stringify(localImages));
            
            // 刷新本地图片库
            loadLocalImages();
        } else if (item.type === 'file') {
            // 恢复文件
            let storageFiles = JSON.parse(localStorage.getItem('storageFiles') || '{}');
            
            if (!storageFiles[item.folder]) {
                storageFiles[item.folder] = [];
            }
            
            storageFiles[item.folder].push(item);
            localStorage.setItem('storageFiles', JSON.stringify(storageFiles));
            
            // 刷新当前文件夹内容
            const activeFolder = document.querySelector('.file-sidebar .sidebar-item.active').getAttribute('onclick').match(/'([^']+)'/)[1];
            loadFolderContent(activeFolder);
        }
        
        // 从回收站移除
        trash = trash.filter(item => item.id !== id);
        localStorage.setItem('fileTrash', JSON.stringify(trash));
        
        // 更新回收站UI
        loadTrash();
        
        alert('文件已恢复');
    }
}

// 从回收站永久删除文件
function permanentlyDeleteFileFromTrash(id) {
    let trash = JSON.parse(localStorage.getItem('fileTrash') || '[]');
    trash = trash.filter(item => item.id !== id);
    localStorage.setItem('fileTrash', JSON.stringify(trash));
    
    // 更新回收站UI
    loadTrash();
    
    alert('文件已永久删除');
}

// 加载保存的自定义网站
function loadSavedWebsites() {
    const websites = getWebsitesFromLocalStorage();
    
    // 清空桌面现有的自定义网站图标
    document.querySelectorAll('.icon.custom-website').forEach(icon => {
        icon.remove();
    });
    
    // 添加保存的网站到桌面
    websites.forEach(website => {
        addWebsiteToDesktop(website);
    });
}

function addWebsiteToDesktop(website) {
    const desktopIcons = document.getElementById('desktopIcons');
    
    const icon = document.createElement('div');
    icon.className = 'icon custom-website';
    icon.setAttribute('data-name', website.name);
    icon.setAttribute('data-id', website.id);
    icon.onclick = () => openCustomWebsite(website.url);
    
    // 添加右键菜单功能
    icon.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        // 创建自定义右键菜单
        const customMenu = document.createElement('div');
        customMenu.className = 'context-menu';
        customMenu.style.display = 'block';
        customMenu.style.left = `${e.pageX}px`;
        customMenu.style.top = `${e.pageY}px`;
        
        // 删除选项
        const deleteItem = document.createElement('div');
        deleteItem.className = 'context-item';
        deleteItem.textContent = '删除';
        deleteItem.onclick = () => {
            // 确认删除
            if (confirm(`确定要删除 "${website.name}" 吗？删除后可以在回收站中恢复。`)) {
                // 保存到回收站
                saveWebsiteToTrash(website);
                
                // 从localStorage删除
                removeWebsiteFromLocalStorage(website.id);
                
                // 从桌面移除
                icon.remove();
                
                // 关闭右键菜单
                customMenu.remove();
            }
        };
        
        customMenu.appendChild(deleteItem);
        document.body.appendChild(customMenu);
        
        // 点击其他地方关闭菜单
        const closeMenu = () => {
            customMenu.remove();
            document.removeEventListener('click', closeMenu);
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 100);
    });
    
    const img = document.createElement('img');
    img.src = website.icon;
    img.alt = website.name;
    
    const span = document.createElement('span');
    span.textContent = website.name;
    
    icon.appendChild(img);
    icon.appendChild(span);
    desktopIcons.appendChild(icon);
}

function openCustomWebsite(url) {
    openApp('browser');
    document.getElementById('browserUrl').value = url;
    browserGo();
}

// 本地图片功能
function uploadLocalImages() {
    const fileInput = document.getElementById('localImageUpload');
    const files = fileInput.files;
    
    if (files.length === 0) {
        alert('请选择要上传的图片');
        return;
    }
    
    // 保存图片到localStorage
    saveLocalImages(files);
    
    // 显示上传成功消息
    alert(`成功上传 ${files.length} 张图片`);
    
    // 清空文件输入
    fileInput.value = '';
    
    // 刷新本地图片库
    loadLocalImages();
}

// 保存本地图片到localStorage
function saveLocalImages(files) {
    // 获取现有的本地图片
    let localImages = JSON.parse(localStorage.getItem('localImages') || '[]');
    
    // 处理每张图片
    Array.from(files).forEach(file => {
        // 只处理图片文件
        if (!file.type.startsWith('image/')) {
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            // 创建图片对象
            const image = {
                id: 'image_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
                name: file.name,
                type: file.type,
                dataUrl: event.target.result,
                size: file.size,
                uploadedAt: new Date().toISOString()
            };
            
            // 添加到本地图片列表
            localImages.push(image);
            
            // 保存到localStorage
            localStorage.setItem('localImages', JSON.stringify(localImages));
        };
        
        reader.readAsDataURL(file);
    });
}

// 从localStorage获取所有本地图片
function getLocalImages() {
    return JSON.parse(localStorage.getItem('localImages') || '[]');
}

// 加载本地图片库
function loadLocalImages() {
    const localImagesList = document.getElementById('localImagesList');
    localImagesList.innerHTML = '';
    
    const localImages = getLocalImages();
    
    if (localImages.length === 0) {
        localImagesList.innerHTML = '<p>暂无本地图片，请先上传图片</p>';
        return;
    }
    
    // 添加图片到图片库
    localImages.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.className = 'local-image-item';
        imageItem.setAttribute('data-id', image.id);
        
        const img = document.createElement('img');
        img.src = image.dataUrl;
        img.alt = image.name;
        
        // 添加右键菜单功能
        imageItem.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            // 创建自定义右键菜单
            const customMenu = document.createElement('div');
            customMenu.className = 'context-menu';
            customMenu.style.display = 'block';
            customMenu.style.left = `${e.pageX}px`;
            customMenu.style.top = `${e.pageY}px`;
            
            // 删除选项
            const deleteItem = document.createElement('div');
            deleteItem.className = 'context-item';
            deleteItem.textContent = '删除';
            deleteItem.onclick = () => {
                // 确认删除
                if (confirm(`确定要删除 "${image.name}" 吗？删除后可以在回收站中恢复。`)) {
                    // 保存到回收站
                    saveFileToTrash(image, 'image');
                    
                    // 从localStorage删除
                    removeLocalImage(image.id);
                    
                    // 从图片库移除
                    imageItem.remove();
                    
                    // 关闭右键菜单
                    customMenu.remove();
                    
                    // 如果没有图片了，显示提示信息
                    if (getLocalImages().length === 0) {
                        localImagesList.innerHTML = '<p>暂无本地图片，请先上传图片</p>';
                    }
                }
            };
            
            customMenu.appendChild(deleteItem);
            document.body.appendChild(customMenu);
            
            // 点击其他地方关闭菜单
            const closeMenu = () => {
                customMenu.remove();
                document.removeEventListener('click', closeMenu);
            };
            
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            }, 100);
        });
        
        imageItem.appendChild(img);
        localImagesList.appendChild(imageItem);
    });
}

// 从localStorage删除本地图片
function removeLocalImage(id) {
    let localImages = JSON.parse(localStorage.getItem('localImages') || '[]');
    localImages = localImages.filter(image => image.id !== id);
    localStorage.setItem('localImages', JSON.stringify(localImages));
}

// 其他功能
function refreshDesktop() {
    // 刷新桌面
    location.reload();
}

function showDisplaySettings() {
    openApp('settings');
    // 切换到显示设置选项卡
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.settings-main').forEach(m => m.classList.remove('active'));
    document.querySelector('.sidebar-item[data-tab="system"]').classList.add('active');
    document.getElementById('system').classList.add('active');
}