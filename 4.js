// 4.js - 安卓桌面系统JavaScript文件

// 系统数据存储
const systemData = {
    // 从本地存储加载网站数据
    websites: JSON.parse(localStorage.getItem('androidWebsites')) || getDefaultWebsites(),
    // 从本地存储加载回收站数据
    recycleBin: JSON.parse(localStorage.getItem('androidRecycleBin')) || [],
    // 从本地存储加载设置数据
    settings: JSON.parse(localStorage.getItem('androidSettings')) || {
        themeColor: '#2196F3',
        background: {
            type: 'gradient',
            value: 'linear-gradient(135deg, #667eea, #764ba2)'
        },
        categoryBackgrounds: {
            home: null,
            games: null,
            social: null,
            tools: null,
            entertainment: null,
            news: null,
            education: null,
            shopping: null
        },
        currentCategory: 'home',
        selectedColor: '#2196F3',
        darkMode: false,
        deviceMode: 'tablet',
        dynamicBackground: 'none',
        animationSpeed: 5,
        particleColor: '#2196F3',
        iconSize: 60,
        showNotifications: true,
        showSeconds: false,
        showDate: true,
        // 回收站设置
        defaultRetentionTime: '30',
        deleteConfirm: true,
        autoClean: true,
        cleanNotification: '1day',
        // 状态栏设置
        showWiFi: true,
        showSignal: true,
        showBattery: true,
        showTime: true,
        wifiStrength: 4,
        signalStrength: 4,
        networkType: '5G',
        batteryLevel: 80,
        isCharging: false,
        dateFormat: 'full',
        timeFormat: '24',
        autoHideStatusBar: false,
        transparentStatusBar: true
    }
};

// 获取默认网站数据（扩展更多网站）
function getDefaultWebsites() {
    return [
        // 桌面中心
        { id: 1, name: "百度搜索", url: "https://www.baidu.com", category: "home", color: "#2196F3", icon: "fa-search" },
        { id: 2, name: "谷歌搜索", url: "https://www.google.com", category: "home", color: "#4285F4", icon: "fa-search" },
        { id: 3, name: "添加网站", url: "javascript:openAddWebsiteDialog()", category: "home", color: "#4CAF50", icon: "fa-plus-circle" },
        
        // 游戏中心
        { id: 4, name: "Steam", url: "https://store.steampowered.com", category: "games", color: "#171a21", icon: "fab fa-steam" },
        { id: 5, name: "4399小游戏", url: "https://www.4399.com", category: "games", color: "#FF5722", icon: "fa-gamepad" },
        { id: 6, name: "腾讯游戏", url: "https://game.qq.com", category: "games", color: "#9C27B0", icon: "fa-gamepad" },
        { id: 7, name: "添加游戏", url: "javascript:openAddWebsiteDialog('games')", category: "games", color: "#9C27B0", icon: "fa-plus" },
        
        // 社交媒体
        { id: 8, name: "微博", url: "https://weibo.com", category: "social", color: "#FF8200", icon: "fab fa-weibo" },
        { id: 9, name: "知乎", url: "https://www.zhihu.com", category: "social", color: "#0084FF", icon: "fab fa-zhihu" },
        { id: 10, name: "微信网页版", url: "https://wx.qq.com", category: "social", color: "#07C160", icon: "fab fa-weixin" },
        { id: 11, name: "QQ网页版", url: "https://web.qq.com", category: "social", color: "#12B7F5", icon: "fab fa-qq" },
        { id: 12, name: "抖音", url: "https://www.douyin.com", category: "social", color: "#000000", icon: "fab fa-tiktok" },
        { id: 13, name: "快手", url: "https://www.kuaishou.com", category: "social", color: "#FF5000", icon: "fas fa-play-circle" },
        { id: 14, name: "添加社交", url: "javascript:openAddWebsiteDialog('social')", category: "social", color: "#00BCD4", icon: "fa-plus" },
        
        // 实用工具
        { id: 15, name: "GitHub", url: "https://github.com", category: "tools", color: "#333333", icon: "fab fa-github" },
        { id: 16, name: "谷歌翻译", url: "https://translate.google.com", category: "tools", color: "#4285F4", icon: "fa-language" },
        { id: 17, name: "百度网盘", url: "https://pan.baidu.com", category: "tools", color: "#2932E1", icon: "fa-cloud" },
        { id: 18, name: "钉钉", url: "https://www.dingtalk.com", category: "tools", color: "#0086FF", icon: "fas fa-comment" },
        { id: 19, name: "飞书", url: "https://www.feishu.cn", category: "tools", color: "#00B2FF", icon: "fas fa-comments" },
        { id: 20, name: "添加工具", url: "javascript:openAddWebsiteDialog('tools')", category: "tools", color: "#FF9800", icon: "fa-plus" },
        
        // 娱乐休闲
        { id: 21, name: "Bilibili", url: "https://www.bilibili.com", category: "entertainment", color: "#FB7299", icon: "fas fa-play-circle" },
        { id: 22, name: "网易云音乐", url: "https://music.163.com", category: "entertainment", color: "#C20C0C", icon: "fas fa-music" },
        { id: 23, name: "优酷", url: "https://www.youku.com", category: "entertainment", color: "#00A1D6", icon: "fas fa-film" },
        { id: 24, name: "腾讯视频", url: "https://v.qq.com", category: "entertainment", color: "#3196FA", icon: "fas fa-video" },
        { id: 25, name: "爱奇艺", url: "https://www.iqiyi.com", category: "entertainment", color: "#00BE06", icon: "fas fa-tv" },
        { id: 26, name: "芒果TV", url: "https://www.mgtv.com", category: "entertainment", color: "#FF6A00", icon: "fas fa-film" },
        { id: 27, name: "添加娱乐", url: "javascript:openAddWebsiteDialog('entertainment')", category: "entertainment", color: "#9C27B0", icon: "fa-plus" },
        
        // 新闻资讯
        { id: 28, name: "新浪新闻", url: "https://news.sina.com.cn", category: "news", color: "#E6162D", icon: "fas fa-newspaper" },
        { id: 29, name: "腾讯新闻", url: "https://news.qq.com", category: "news", color: "#12B7F5", icon: "fas fa-newspaper" },
        { id: 30, name: "今日头条", url: "https://www.toutiao.com", category: "news", color: "#FF4400", icon: "fas fa-newspaper" },
        { id: 31, name: "添加新闻", url: "javascript:openAddWebsiteDialog('news')", category: "news", color: "#607D8B", icon: "fa-plus" },
        
        // 学习资源
        { id: 32, name: "慕课网", url: "https://www.imooc.com", category: "education", color: "#F48024", icon: "fas fa-graduation-cap" },
        { id: 33, name: "网易公开课", url: "https://open.163.com", category: "education", color: "#C20C0C", icon: "fas fa-chalkboard-teacher" },
        { id: 34, name: "中国大学MOOC", url: "https://www.icourse163.org", category: "education", color: "#FF6A00", icon: "fas fa-university" },
        { id: 35, name: "添加学习", url: "javascript:openAddWebsiteDialog('education')", category: "education", color: "#009688", icon: "fa-plus" },
        
        // 购物生活
        { id: 36, name: "淘宝", url: "https://www.taobao.com", category: "shopping", color: "#FF4400", icon: "fas fa-shopping-cart" },
        { id: 37, name: "京东", url: "https://www.jd.com", category: "shopping", color: "#E33333", icon: "fas fa-shopping-bag" },
        { id: 38, name: "拼多多", url: "https://www.pinduoduo.com", category: "shopping", color: "#FF5000", icon: "fas fa-shopping-basket" },
        { id: 39, name: "美团", url: "https://www.meituan.com", category: "shopping", color: "#FFC300", icon: "fas fa-utensils" },
        { id: 40, name: "饿了么", url: "https://www.ele.me", category: "shopping", color: "#0086FF", icon: "fas fa-hamburger" },
        { id: 41, name: "添加购物", url: "javascript:openAddWebsiteDialog('shopping')", category: "shopping", color: "#E91E63", icon: "fa-plus" }
    ];
}

// 保存数据到本地存储
function saveData() {
    localStorage.setItem('androidWebsites', JSON.stringify(systemData.websites));
    localStorage.setItem('androidRecycleBin', JSON.stringify(systemData.recycleBin));
    localStorage.setItem('androidSettings', JSON.stringify(systemData.settings));
}

// 显示启动选择界面
function showLaunchSelection() {
    document.getElementById('launchSelection').style.display = 'flex';
    document.getElementById('overlay').classList.add('active');
    showNotification('请选择设备模式或进入快速设置', 'info');
}

// 隐藏启动选择界面
function hideLaunchSelection() {
    document.getElementById('launchSelection').style.display = 'none';
    document.getElementById('overlay').classList.remove('active');
}

// 选择设备模式
function selectDeviceMode(mode) {
    systemData.settings.deviceMode = mode;
    saveData();
    
    hideLaunchSelection();
    openAndroidDesktop();
}

// 从启动界面打开设置
function openSettingsFromLaunch() {
    hideLaunchSelection();
    openSettings();
}

// 显示通知
function showNotification(message, type = 'info') {
    if (!systemData.settings.showNotifications) return;
    
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    text.textContent = message;
    
    const icon = notification.querySelector('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    } else if (type === 'warning') {
        icon.className = 'fas fa-exclamation-triangle';
    } else {
        icon.className = 'fas fa-info-circle';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 打开安卓桌面
function openAndroidDesktop() {
    const desktop = document.getElementById('androidDesktop');
    const overlay = document.getElementById('overlay');
    
    desktop.className = 'android-desktop active ' + systemData.settings.deviceMode + '-mode';
    
    desktop.classList.add('active');
    overlay.classList.add('active');
    
    updateTime();
    updateStatusBar();
    refreshAppGrid();
    
    // 检查回收站过期项目
    checkExpiredItems();
    
    showNotification('安卓桌面已启动', 'success');
}

// 关闭安卓桌面
function closeAndroidDesktop() {
    const desktop = document.getElementById('androidDesktop');
    const overlay = document.getElementById('overlay');
    
    desktop.classList.remove('active');
    overlay.classList.remove('active');
    
    closeAddWebsiteDialog();
    closeSettings();
    closeRecycleBin();
    
    showNotification('安卓桌面已关闭', 'info');
}

// 切换侧边栏
function toggleSidebar() {
    if (systemData.settings.deviceMode === 'tablet') {
        const sidebar = document.getElementById('categorySidebar');
        sidebar.classList.toggle('active');
    }
}

// 切换分类
function switchCategory(category) {
    systemData.settings.currentCategory = category;
    saveData();
    
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.target.closest('.category-item').classList.add('active');
    
    const categoryNames = {
        'home': '桌面中心',
        'games': '游戏中心',
        'social': '社交媒体',
        'tools': '实用工具',
        'entertainment': '娱乐休闲',
        'news': '新闻资讯',
        'education': '学习资源',
        'shopping': '购物生活'
    };
    
    document.getElementById('currentCategory').textContent = categoryNames[category] || category;
    refreshAppGrid();
    applyCategoryBackground(category);
    
    if (window.innerWidth <= 900 && systemData.settings.deviceMode === 'tablet') {
        const sidebar = document.getElementById('categorySidebar');
        sidebar.classList.remove('active');
    }
    
    showNotification(`切换到 ${categoryNames[category] || category}`, 'info');
}

// 应用分类背景
function applyCategoryBackground(category) {
    const bgContainer = document.getElementById('categoryBackground');
    const categoryBg = systemData.settings.categoryBackgrounds[category];
    
    if (categoryBg && categoryBg.value) {
        bgContainer.style.display = 'block';
        bgContainer.src = categoryBg.value;
        
        if (categoryBg.type === 'video') {
            bgContainer.className = 'category-background';
            bgContainer.autoplay = true;
            bgContainer.muted = true;
            bgContainer.loop = true;
            bgContainer.playsInline = true;
        } else {
            bgContainer.className = 'category-background';
        }
    } else {
        bgContainer.style.display = 'none';
    }
}

// 刷新应用网格
function refreshAppGrid() {
    const grid = document.getElementById('appGrid');
    const currentCategory = systemData.settings.currentCategory;
    
    grid.innerHTML = '';
    
    const categoryWebsites = systemData.websites.filter(website => website.category === currentCategory);
    
    categoryWebsites.forEach(website => {
        const appItem = document.createElement('div');
        appItem.className = 'app-item';
        appItem.setAttribute('onclick', website.url.startsWith('javascript:') ? website.url.substring(11) : `openWebFrame('${website.name}', '${website.url}')`);
        
        const iconSize = systemData.settings.iconSize;
        const iconSizeClass = systemData.settings.deviceMode === 'phone' ? 
            `style="width: ${iconSize-10}px; height: ${iconSize-10}px;"` : 
            `style="width: ${iconSize}px; height: ${iconSize}px;"`;
        
        appItem.innerHTML = `
            <div class="app-icon" style="background: ${website.color};" ${iconSizeClass}>
                <i class="${website.icon.startsWith('fab') ? 'fab' : 'fas'} ${website.icon.replace('fab ', '').replace('fas ', '')}"></i>
            </div>
            <div class="app-name">${website.name}</div>
            <div class="app-delete" onclick="moveToRecycleBin(${website.id}, event)">
                <i class="fas fa-times"></i>
            </div>
        `;
        
        grid.appendChild(appItem);
    });
    
    // 添加"添加网站"按钮
    const addButton = document.createElement('div');
    addButton.className = 'add-app-btn';
    addButton.onclick = () => openAddWebsiteDialog(currentCategory);
    
    addButton.innerHTML = `
        <div class="add-app-icon">
            <i class="fas fa-plus"></i>
        </div>
        <div class="add-app-text">添加网站</div>
    `;
    
    grid.appendChild(addButton);
    
    // 如果分类为空，显示提示
    if (categoryWebsites.length === 0) {
        grid.innerHTML = '';
        
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div class="empty-icon">
                <i class="fas fa-folder-open"></i>
            </div>
            <div class="empty-text">这个分类是空的</div>
            <div class="empty-subtext">点击下方按钮添加网站</div>
        `;
        
        grid.appendChild(emptyState);
        grid.appendChild(addButton);
    }
}

// 移动到回收站
function moveToRecycleBin(id, event) {
    if (event) event.stopPropagation();
    
    if (systemData.settings.deleteConfirm && !confirm('确定要删除这个网站吗？网站将移动到回收站。')) {
        return;
    }
    
    const websiteIndex = systemData.websites.findIndex(website => website.id === id);
    if (websiteIndex === -1) return;
    
    const website = systemData.websites[websiteIndex];
    
    // 添加到回收站
    const recycleItem = {
        ...website,
        deleteDate: new Date().toISOString(),
        retentionType: systemData.settings.defaultRetentionTime,
        expireDate: calculateExpireDate(systemData.settings.defaultRetentionTime)
    };
    
    systemData.recycleBin.push(recycleItem);
    
    // 从网站列表中移除
    systemData.websites.splice(websiteIndex, 1);
    
    saveData();
    refreshAppGrid();
    
    showNotification(`已移动到回收站: ${website.name}`, 'success');
}

// 计算过期日期
function calculateExpireDate(retentionType) {
    const now = new Date();
    
    switch(retentionType) {
        case 'permanent':
            return null; // 永不过期
        case 'tomorrow':
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            return tomorrow.toISOString();
        case '7':
            const sevenDays = new Date(now);
            sevenDays.setDate(sevenDays.getDate() + 7);
            return sevenDays.toISOString();
        case '30':
        default:
            const thirtyDays = new Date(now);
            thirtyDays.setDate(thirtyDays.getDate() + 30);
            return thirtyDays.toISOString();
    }
}

// 打开回收站
function openRecycleBin() {
    const dialog = document.getElementById('recycleBinDialog');
    const overlay = document.getElementById('overlay');
    
    dialog.classList.add('active');
    overlay.classList.add('active');
    
    refreshRecycleBin();
    updateRecycleStats();
    
    showNotification('回收站已打开', 'info');
}

// 关闭回收站
function closeRecycleBin() {
    const dialog = document.getElementById('recycleBinDialog');
    const overlay = document.getElementById('overlay');
    
    dialog.classList.remove('active');
    overlay.classList.remove('active');
}

// 刷新回收站显示
function refreshRecycleBin() {
    const containers = {
        'all': 'recycleBinContent',
        'permanent': 'recycleBinPermanent',
        '30days': 'recycleBin30Days',
        '7days': 'recycleBin7Days',
        'tomorrow': 'recycleBinTomorrow'
    };
    
    for (const tab in containers) {
        const container = document.getElementById(containers[tab]);
        if (!container) continue;
        
        container.innerHTML = '';
        
        let items = systemData.recycleBin;
        
        if (tab !== 'all') {
            items = items.filter(item => {
                if (tab === 'permanent') return item.retentionType === 'permanent';
                if (tab === '30days') return item.retentionType === '30';
                if (tab === '7days') return item.retentionType === '7';
                if (tab === 'tomorrow') return item.retentionType === 'tomorrow';
                return true;
            });
        }
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="recycle-bin-empty">
                    <div class="recycle-bin-empty-icon">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                    <div class="recycle-bin-empty-text">回收站是空的</div>
                    <div class="recycle-bin-empty-subtext">删除的网站将出现在这里</div>
                </div>
            `;
            continue;
        }
        
        items.forEach(item => {
            const deleteDate = new Date(item.deleteDate);
            const deleteDateStr = deleteDate.toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            let statusText = '';
            let statusClass = '';
            
            switch(item.retentionType) {
                case 'permanent':
                    statusText = '永久收藏';
                    statusClass = 'status-permanent';
                    break;
                case '30':
                    statusText = '30天后删除';
                    statusClass = 'status-30days';
                    break;
                case '7':
                    statusText = '7天后删除';
                    statusClass = 'status-7days';
                    break;
                case 'tomorrow':
                    statusText = '明天删除';
                    statusClass = 'status-tomorrow';
                    break;
            }
            
            const recycleItem = document.createElement('div');
            recycleItem.className = 'recycle-bin-item';
            recycleItem.innerHTML = `
                <div class="recycle-bin-info">
                    <div class="recycle-bin-icon" style="background: ${item.color};">
                        <i class="${item.icon.startsWith('fab') ? 'fab' : 'fas'} ${item.icon.replace('fab ', '').replace('fas ', '')}"></i>
                    </div>
                    <div class="recycle-bin-details">
                        <div class="recycle-bin-name">${item.name} <span class="status-tag ${statusClass}">${statusText}</span></div>
                        <div class="recycle-bin-meta">
                            <span>分类: ${getCategoryName(item.category)}</span>
                            <span>删除时间: ${deleteDateStr}</span>
                        </div>
                    </div>
                </div>
                <div class="recycle-bin-actions">
                    <button class="action-btn restore-btn" onclick="restoreFromRecycleBin(${item.id})">
                        <i class="fas fa-redo"></i>
                        恢复
                    </button>
                    <button class="action-btn delete-btn" onclick="permanentDelete(${item.id})">
                        <i class="fas fa-trash"></i>
                        永久删除
                    </button>
                    <button class="action-btn keep-btn" onclick="changeRetentionType(${item.id})">
                        <i class="fas fa-clock"></i>
                        更改保留
                    </button>
                </div>
            `;
            
            container.appendChild(recycleItem);
        });
    }
}

// 从回收站恢复
function restoreFromRecycleBin(id) {
    const itemIndex = systemData.recycleBin.findIndex(item => item.id === id);
    if (itemIndex === -1) return;
    
    const item = systemData.recycleBin[itemIndex];
    
    // 移除回收站属性
    const { deleteDate, retentionType, expireDate, ...websiteData } = item;
    
    // 添加回网站列表
    systemData.websites.push(websiteData);
    
    // 从回收站移除
    systemData.recycleBin.splice(itemIndex, 1);
    
    saveData();
    refreshRecycleBin();
    refreshAppGrid();
    updateRecycleStats();
    
    showNotification(`已恢复: ${item.name}`, 'success');
}

// 永久删除
function permanentDelete(id) {
    if (!confirm('确定要永久删除这个项目吗？此操作不可撤销。')) {
        return;
    }
    
    const itemIndex = systemData.recycleBin.findIndex(item => item.id === id);
    if (itemIndex === -1) return;
    
    const item = systemData.recycleBin[itemIndex];
    
    systemData.recycleBin.splice(itemIndex, 1);
    
    saveData();
    refreshRecycleBin();
    updateRecycleStats();
    
    showNotification(`已永久删除: ${item.name}`, 'success');
}

// 更改保留类型
function changeRetentionType(id) {
    const itemIndex = systemData.recycleBin.findIndex(item => item.id === id);
    if (itemIndex === -1) return;
    
    const item = systemData.recycleBin[itemIndex];
    
    const newType = prompt(
        `为 "${item.name}" 选择保留类型:\n1. permanent - 永久收藏\n2. 30 - 30天后删除\n3. 7 - 7天后删除\n4. tomorrow - 明天删除\n\n请输入选项 (permanent/30/7/tomorrow):`,
        item.retentionType
    );
    
    if (!newType || !['permanent', '30', '7', 'tomorrow'].includes(newType)) {
        showNotification('无效的保留类型', 'error');
        return;
    }
    
    systemData.recycleBin[itemIndex].retentionType = newType;
    systemData.recycleBin[itemIndex].expireDate = calculateExpireDate(newType);
    
    saveData();
    refreshRecycleBin();
    updateRecycleStats();
    
    showNotification(`已更改保留类型为: ${getRetentionTypeName(newType)}`, 'success');
}

// 获取保留类型名称
function getRetentionTypeName(type) {
    switch(type) {
        case 'permanent': return '永久收藏';
        case '30': return '30天后删除';
        case '7': return '7天后删除';
        case 'tomorrow': return '明天删除';
        default: return type;
    }
}

// 清空回收站
function emptyRecycleBin() {
    if (!confirm('确定要清空回收站吗？所有项目将被永久删除。')) {
        return;
    }
    
    systemData.recycleBin = [];
    saveData();
    refreshRecycleBin();
    updateRecycleStats();
    
    showNotification('回收站已清空', 'success');
}

// 恢复全部项目
function restoreAllItems() {
    if (systemData.recycleBin.length === 0) {
        showNotification('回收站为空', 'info');
        return;
    }
    
    if (!confirm(`确定要恢复回收站中的所有 ${systemData.recycleBin.length} 个项目吗？`)) {
        return;
    }
    
    systemData.recycleBin.forEach(item => {
        const { deleteDate, retentionType, expireDate, ...websiteData } = item;
        systemData.websites.push(websiteData);
    });
    
    systemData.recycleBin = [];
    saveData();
    refreshRecycleBin();
    refreshAppGrid();
    updateRecycleStats();
    
    showNotification(`已恢复所有 ${systemData.recycleBin.length} 个项目`, 'success');
}

// 更新回收站统计
function updateRecycleStats() {
    const total = systemData.recycleBin.length;
    const permanent = systemData.recycleBin.filter(item => item.retentionType === 'permanent').length;
    const thirtyDays = systemData.recycleBin.filter(item => item.retentionType === '30').length;
    const sevenDays = systemData.recycleBin.filter(item => item.retentionType === '7').length;
    const tomorrow = systemData.recycleBin.filter(item => item.retentionType === 'tomorrow').length;
    
    document.getElementById('recycleTotalCount').textContent = total;
    document.getElementById('recyclePermanentCount').textContent = permanent;
    document.getElementById('recycle30DaysCount').textContent = thirtyDays;
    document.getElementById('recycle7DaysCount').textContent = sevenDays;
    document.getElementById('recycleTomorrowCount').textContent = tomorrow;
}

// 检查过期项目
function checkExpiredItems() {
    if (!systemData.settings.autoClean) return;
    
    const now = new Date();
    const expiredItems = [];
    
    systemData.recycleBin.forEach((item, index) => {
        if (item.retentionType === 'permanent') return;
        
        if (item.expireDate && new Date(item.expireDate) <= now) {
            expiredItems.push({ index, item });
        }
    });
    
    if (expiredItems.length > 0) {
        // 从后往前删除，避免索引错乱
        expiredItems.sort((a, b) => b.index - a.index);
        
        expiredItems.forEach(({ index, item }) => {
            systemData.recycleBin.splice(index, 1);
        });
        
        saveData();
        
        if (expiredItems.length === 1) {
            showNotification(`已自动清理过期项目: ${expiredItems[0].item.name}`, 'info');
        } else {
            showNotification(`已自动清理 ${expiredItems.length} 个过期项目`, 'info');
        }
    }
}

// 切换回收站标签页
function switchRecycleTab(tabId) {
    document.querySelectorAll('#recycleBinDialog .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('#recycleBinDialog .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`recycleTab${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`).classList.add('active');
}

// 获取分类名称
function getCategoryName(category) {
    const names = {
        'home': '桌面中心',
        'games': '游戏中心',
        'social': '社交媒体',
        'tools': '实用工具',
        'entertainment': '娱乐休闲',
        'news': '新闻资讯',
        'education': '学习资源',
        'shopping': '购物生活'
    };
    
    return names[category] || category;
}

// 打开添加网站对话框
function openAddWebsiteDialog(category = null) {
    const dialog = document.getElementById('addWebsiteDialog');
    const overlay = document.getElementById('overlay');
    
    if (category) {
        document.getElementById('websiteCategory').value = category;
    }
    
    dialog.classList.add('active');
    overlay.classList.add('active');
    
    document.getElementById('websiteName').value = '';
    document.getElementById('websiteUrl').value = '';
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector('.color-option[style*="background: #2196F3"]').classList.add('active');
    systemData.settings.selectedColor = '#2196F3';
}

// 关闭添加网站对话框
function closeAddWebsiteDialog() {
    const dialog = document.getElementById('addWebsiteDialog');
    const overlay = document.getElementById('overlay');
    
    dialog.classList.remove('active');
    overlay.classList.remove('active');
}

// 选择颜色
function selectColor(color) {
    systemData.settings.selectedColor = color;
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

// 保存网站
function saveWebsite() {
    const name = document.getElementById('websiteName').value.trim();
    const url = document.getElementById('websiteUrl').value.trim();
    const category = document.getElementById('websiteCategory').value;
    const icon = document.getElementById('websiteIcon').value;
    
    if (!name || !url) {
        showNotification('请填写网站名称和地址', 'error');
        return;
    }
    
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('javascript:')) {
        showNotification('请输入有效的网址，以http://或https://开头', 'error');
        return;
    }
    
    const newWebsite = {
        id: Date.now(),
        name: name,
        url: url,
        category: category,
        color: systemData.settings.selectedColor,
        icon: icon
    };
    
    systemData.websites.push(newWebsite);
    saveData();
    
    refreshAppGrid();
    closeAddWebsiteDialog();
    
    showNotification(`已添加网站: ${name}`, 'success');
}

// 打开设置
function openSettings() {
    const dialog = document.getElementById('settingsDialog');
    const overlay = document.getElementById('overlay');
    
    dialog.classList.add('active');
    overlay.classList.add('active');
    
    loadCurrentSettings();
    updateRecycleStats();
    
    showNotification('设置面板已打开', 'info');
}

// 关闭设置
function closeSettings() {
    const dialog = document.getElementById('settingsDialog');
    const overlay = document.getElementById('overlay');
    
    dialog.classList.remove('active');
    overlay.classList.remove('active');
}

// 加载当前设置到UI
function loadCurrentSettings() {
    // 夜间模式切换
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (systemData.settings.darkMode) {
        darkModeToggle.classList.add('active');
    } else {
        darkModeToggle.classList.remove('active');
    }
    
    // 动态背景选择
    document.querySelectorAll('.dynamic-bg-option').forEach(option => {
        option.classList.remove('active');
    });
    const dynamicBgOption = document.querySelector(`.dynamic-bg-option[onclick*="${systemData.settings.dynamicBackground}"]`);
    if (dynamicBgOption) {
        dynamicBgOption.classList.add('active');
    }
    
    // 动画速度
    document.getElementById('animationSpeed').value = systemData.settings.animationSpeed;
    
    // 图标大小
    document.getElementById('iconSize').value = systemData.settings.iconSize;
    updateIconSizeValue(systemData.settings.iconSize);
    
    // 通知开关
    const notificationToggle = document.getElementById('notificationToggle');
    if (systemData.settings.showNotifications) {
        notificationToggle.classList.add('active');
    } else {
        notificationToggle.classList.remove('active');
    }
    
    // 秒数开关
    const secondsToggle = document.getElementById('secondsToggle');
    if (systemData.settings.showSeconds) {
        secondsToggle.classList.add('active');
    } else {
        secondsToggle.classList.remove('active');
    }
    
    // 日期开关
    const dateToggle = document.getElementById('dateToggle');
    if (systemData.settings.showDate) {
        dateToggle.classList.add('active');
    } else {
        dateToggle.classList.remove('active');
    }
    
    // 设备模式选择
    document.querySelectorAll('.dynamic-bg-option').forEach(option => {
        option.classList.remove('active');
    });
    const deviceModeOption = document.querySelector(`.dynamic-bg-option[onclick*="${systemData.settings.deviceMode}"]`);
    if (deviceModeOption) {
        deviceModeOption.classList.add('active');
    }
    
    // 状态栏设置
    const wifiToggle = document.getElementById('wifiToggle');
    if (systemData.settings.showWiFi) {
        wifiToggle.classList.add('active');
    } else {
        wifiToggle.classList.remove('active');
    }
    
    const signalToggle = document.getElementById('signalToggle');
    if (systemData.settings.showSignal) {
        signalToggle.classList.add('active');
    } else {
        signalToggle.classList.remove('active');
    }
    
    const batteryToggle = document.getElementById('batteryToggle');
    if (systemData.settings.showBattery) {
        batteryToggle.classList.add('active');
    } else {
        batteryToggle.classList.remove('active');
    }
    
    const timeToggle = document.getElementById('timeToggle');
    if (systemData.settings.showTime) {
        timeToggle.classList.add('active');
    } else {
        timeToggle.classList.remove('active');
    }
    
    document.getElementById('wifiStrength').value = systemData.settings.wifiStrength;
    document.getElementById('signalStrength').value = systemData.settings.signalStrength;
    document.getElementById('networkType').value = systemData.settings.networkType;
    document.getElementById('batteryLevel').value = systemData.settings.batteryLevel;
    document.getElementById('batteryLevelValue').textContent = systemData.settings.batteryLevel + '%';
    document.getElementById('dateFormat').value = systemData.settings.dateFormat;
    document.getElementById('timeFormat').value = systemData.settings.timeFormat;
    
    const autoHideToggle = document.getElementById('autoHideToggle');
    if (systemData.settings.autoHideStatusBar) {
        autoHideToggle.classList.add('active');
    } else {
        autoHideToggle.classList.remove('active');
    }
    
    const transparentToggle = document.getElementById('transparentToggle');
    if (systemData.settings.transparentStatusBar) {
        transparentToggle.classList.add('active');
    } else {
        transparentToggle.classList.remove('active');
    }
    
    // 回收站设置
    document.getElementById('defaultRetentionTime').value = systemData.settings.defaultRetentionTime;
    
    const deleteConfirmToggle = document.getElementById('deleteConfirmToggle');
    if (systemData.settings.deleteConfirm) {
        deleteConfirmToggle.classList.add('active');
    } else {
        deleteConfirmToggle.classList.remove('active');
    }
    
    const autoCleanToggle = document.getElementById('autoCleanToggle');
    if (systemData.settings.autoClean) {
        autoCleanToggle.classList.add('active');
    } else {
        autoCleanToggle.classList.remove('active');
    }
    
    document.getElementById('cleanNotification').value = systemData.settings.cleanNotification;
    
    // 加载分类背景设置
    loadCategoryBgSettings();
}

// 切换标签页
function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId + 'Tab').classList.add('active');
}

// 切换设置
function toggleSetting(setting) {
    const toggle = document.getElementById(setting + 'Toggle');
    
    if (toggle.classList.contains('active')) {
        toggle.classList.remove('active');
        systemData.settings[setting] = false;
    } else {
        toggle.classList.add('active');
        systemData.settings[setting] = true;
    }
    
    if (setting === 'date' || setting === 'seconds' || setting === 'time') {
        updateTime();
    }
    
    if (setting === 'wifi' || setting === 'signal' || setting === 'battery') {
        updateStatusBar();
    }
    
    if (setting === 'transparentStatusBar') {
        applyStatusBarTransparency();
    }
    
    if (setting === 'autoHideStatusBar') {
        toggleAutoHideStatusBar();
    }
    
    saveData();
    showNotification(`${getSettingName(setting)}已${systemData.settings[setting] ? '开启' : '关闭'}`, 'success');
}

// 切换状态栏项目
function toggleStatusBarItem(item) {
    const settingName = 'show' + item.charAt(0).toUpperCase() + item.slice(1);
    systemData.settings[settingName] = !systemData.settings[settingName];
    
    const toggle = document.getElementById(item + 'Toggle');
    if (systemData.settings[settingName]) {
        toggle.classList.add('active');
    } else {
        toggle.classList.remove('active');
    }
    
    updateStatusBar();
    saveData();
    showNotification(`${getStatusBarItemName(item)}已${systemData.settings[settingName] ? '开启' : '关闭'}`, 'success');
}

// 获取状态栏项目名称
function getStatusBarItemName(item) {
    const names = {
        'wifi': 'WiFi图标',
        'signal': '信号图标',
        'battery': '电池图标',
        'time': '时间显示'
    };
    
    return names[item] || item;
}

// 获取设置名称
function getSettingName(setting) {
    const names = {
        'notifications': '通知',
        'seconds': '秒数显示',
        'date': '日期显示',
        'deleteConfirm': '删除确认',
        'autoClean': '自动清理',
        'autoHideStatusBar': '自动隐藏状态栏',
        'transparentStatusBar': '状态栏透明效果'
    };
    
    return names[setting] || setting;
}

// 设置主题颜色
function setThemeColor(color) {
    systemData.settings.themeColor = color;
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    document.getElementById('mainLauncher').style.background = `linear-gradient(135deg, ${color}, #4CAF50)`;
    document.getElementById('mainLauncher').style.boxShadow = `0 10px 30px ${color.replace(')', ', 0.5)').replace('rgb', 'rgba')}`;
    
    saveData();
    showNotification(`主题颜色已切换为: ${color}`, 'success');
}

// 设置全局背景
function setBackground(presetId) {
    const bgContainer = document.getElementById('bgContainer');
    bgContainer.innerHTML = '';
    
    const presetStyles = {
        'gradient1': 'linear-gradient(135deg, #667eea, #764ba2)',
        'gradient2': 'linear-gradient(135deg, #4CAF50, #8BC34A)',
        'gradient3': 'linear-gradient(135deg, #9C27B0, #673AB7)',
        'gradient4': 'linear-gradient(135deg, #FF9800, #FF5722)',
        'gradient5': 'linear-gradient(135deg, #00BCD4, #009688)',
        'gradient6': 'linear-gradient(135deg, #F44336, #E91E63)'
    };
    
    bgContainer.style.background = presetStyles[presetId];
    bgContainer.style.backgroundSize = 'cover';
    
    document.querySelectorAll('.bg-preset').forEach(preset => {
        preset.classList.remove('active');
    });
    event.target.classList.add('active');
    
    systemData.settings.background = {
        type: 'gradient',
        value: presetStyles[presetId]
    };
    
    saveData();
    showNotification(`全局背景已切换为预设样式`, 'success');
}

// 从URL设置图片
function setImageFromUrl() {
    const url = document.getElementById('imageUrl').value.trim();
    
    if (!url) {
        showNotification('请输入图片URL', 'error');
        return;
    }
    
    const bgContainer = document.getElementById('bgContainer');
    bgContainer.innerHTML = '';
    
    const img = document.createElement('img');
    img.className = 'bg-image';
    img.src = url;
    img.onload = () => {
        bgContainer.appendChild(img);
        systemData.settings.background = {
            type: 'image',
            value: url
        };
        saveData();
        showNotification('网络图片背景已应用', 'success');
        document.getElementById('imageUrl').value = '';
    };
    img.onerror = () => {
        showNotification('图片加载失败，请检查URL', 'error');
    };
}

// 从URL设置视频
function setVideoFromUrl() {
    const url = document.getElementById('videoUrl').value.trim();
    
    if (!url) {
        showNotification('请输入视频URL', 'error');
        return;
    }
    
    const bgContainer = document.getElementById('bgContainer');
    bgContainer.innerHTML = '';
    
    const video = document.createElement('video');
    video.className = 'bg-video';
    video.src = url;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    bgContainer.appendChild(video);
    
    systemData.settings.background = {
        type: 'video',
        value: url
    };
    saveData();
    showNotification('视频背景已应用', 'success');
    document.getElementById('videoUrl').value = '';
}

// 切换夜间模式
function toggleDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (toggle.classList.contains('active')) {
        toggle.classList.remove('active');
        body.classList.remove('dark-mode');
        systemData.settings.darkMode = false;
    } else {
        toggle.classList.add('active');
        body.classList.add('dark-mode');
        systemData.settings.darkMode = true;
    }
    
    saveData();
    showNotification(`夜间模式已${systemData.settings.darkMode ? '开启' : '关闭'}`, 'success');
}

// 设置动态背景
function setDynamicBackground(type) {
    systemData.settings.dynamicBackground = type;
    
    document.querySelectorAll('.dynamic-bg-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.closest('.dynamic-bg-option').classList.add('active');
    
    applyDynamicBackground();
    saveData();
    showNotification(`动态背景已切换为: ${getDynamicBgName(type)}`, 'success');
}

// 获取动态背景名称
function getDynamicBgName(type) {
    const names = {
        'none': '无效果',
        'particles': '粒子效果',
        'gradient-flow': '渐变流动',
        'grid': '网格动画',
        'stars': '星空效果',
        'bubbles': '气泡效果'
    };
    
    return names[type] || type;
}

// 应用动态背景
function applyDynamicBackground() {
    const container = document.getElementById('dynamicBackground');
    container.innerHTML = '';
    container.className = 'dynamic-background';
    
    if (systemData.settings.dynamicBackground === 'none') {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    if (systemData.settings.dynamicBackground === 'particles') {
        container.innerHTML = '<div class="particles-background" id="particlesBg"></div>';
        container.classList.add('active');
        createParticles();
    } else if (systemData.settings.dynamicBackground === 'gradient-flow') {
        container.innerHTML = '<div class="gradient-flow-background"></div>';
        container.classList.add('active');
    } else if (systemData.settings.dynamicBackground === 'grid') {
        container.innerHTML = '<div class="grid-background"></div>';
        container.classList.add('active');
    } else if (systemData.settings.dynamicBackground === 'stars') {
        container.innerHTML = '<div class="stars-background" id="starsBg"></div>';
        container.classList.add('active');
        createStars();
    } else if (systemData.settings.dynamicBackground === 'bubbles') {
        container.innerHTML = '<div class="particles-background" id="bubblesBg"></div>';
        container.classList.add('active');
        createBubbles();
    }
}

// 创建粒子效果
function createParticles() {
    const container = document.getElementById('particlesBg');
    if (!container) return;
    
    const particleCount = 50;
    const speed = systemData.settings.animationSpeed * 2;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = systemData.settings.particleColor;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(particle);
        
        animateParticle(particle, speed);
    }
}

// 动画粒子
function animateParticle(particle, speed) {
    let x = Math.random() * 100;
    let y = Math.random() * 100;
    let dx = (Math.random() - 0.5) * speed * 0.1;
    let dy = (Math.random() - 0.5) * speed * 0.1;
    
    function move() {
        x += dx;
        y += dy;
        
        if (x < 0 || x > 100) dx = -dx;
        if (y < 0 || y > 100) dy = -dy;
        
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        
        requestAnimationFrame(move);
    }
    
    move();
}

// 创建星星效果
function createStars() {
    const container = document.getElementById('starsBg');
    if (!container) return;
    
    const starCount = 100;
    const speed = systemData.settings.animationSpeed * 0.5;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        container.appendChild(star);
        
        animateStar(star, speed);
    }
}

// 动画星星
function animateStar(star, speed) {
    let opacity = parseFloat(star.style.opacity);
    let direction = 1;
    
    function twinkle() {
        opacity += 0.02 * direction * speed;
        
        if (opacity > 1) {
            opacity = 1;
            direction = -1;
        } else if (opacity < 0.3) {
            opacity = 0.3;
            direction = 1;
        }
        
        star.style.opacity = opacity;
        
        setTimeout(twinkle, 50);
    }
    
    twinkle();
}

// 创建气泡效果
function createBubbles() {
    const container = document.getElementById('bubblesBg');
    if (!container) return;
    
    const bubbleCount = 30;
    const speed = systemData.settings.animationSpeed * 0.5;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.style.position = 'absolute';
        bubble.style.width = Math.random() * 40 + 10 + 'px';
        bubble.style.height = bubble.style.width;
        bubble.style.backgroundColor = systemData.settings.particleColor;
        bubble.style.borderRadius = '50%';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.top = '100%';
        bubble.style.opacity = Math.random() * 0.3 + 0.1;
        
        container.appendChild(bubble);
        
        animateBubble(bubble, speed);
    }
}

// 动画气泡
function animateBubble(bubble, speed) {
    const startLeft = parseFloat(bubble.style.left);
    let top = 100;
    const riseSpeed = Math.random() * 0.5 + 0.2 * speed;
    const swayAmount = Math.random() * 20 + 10;
    
    function rise() {
        top -= riseSpeed;
        
        if (top < -50) {
            top = 100;
            bubble.style.left = Math.random() * 100 + '%';
        }
        
        const sway = Math.sin(top * 0.1) * swayAmount;
        bubble.style.left = (startLeft + sway) + '%';
        bubble.style.top = top + '%';
        
        requestAnimationFrame(rise);
    }
    
    rise();
}

// 设置粒子颜色
function setParticleColor(color) {
    systemData.settings.particleColor = color;
    
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    if (systemData.settings.dynamicBackground !== 'none') {
        applyDynamicBackground();
    }
    
    saveData();
    showNotification(`粒子颜色已切换为: ${color}`, 'success');
}

// 更新图标大小值显示
function updateIconSizeValue(size) {
    const valueElement = document.getElementById('iconSizeValue');
    if (size <= 50) {
        valueElement.textContent = '小';
    } else if (size <= 70) {
        valueElement.textContent = '中';
    } else {
        valueElement.textContent = '大';
    }
}

// 改变设备模式
function changeDeviceMode(mode) {
    systemData.settings.deviceMode = mode;
    
    document.querySelectorAll('.dynamic-bg-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.closest('.dynamic-bg-option').classList.add('active');
    
    const desktop = document.getElementById('androidDesktop');
    desktop.className = 'android-desktop active ' + mode + '-mode';
    
    refreshAppGrid();
    
    saveData();
    showNotification(`已切换为${mode === 'tablet' ? '平板' : '手机'}模式`, 'success');
}

// 应用设置
function applySettings() {
    systemData.settings.animationSpeed = parseInt(document.getElementById('animationSpeed').value);
    systemData.settings.iconSize = parseInt(document.getElementById('iconSize').value);
    systemData.settings.defaultRetentionTime = document.getElementById('defaultRetentionTime').value;
    systemData.settings.cleanNotification = document.getElementById('cleanNotification').value;
    
    // 状态栏设置
    systemData.settings.wifiStrength = parseInt(document.getElementById('wifiStrength').value);
    systemData.settings.signalStrength = parseInt(document.getElementById('signalStrength').value);
    systemData.settings.networkType = document.getElementById('networkType').value;
    systemData.settings.batteryLevel = parseInt(document.getElementById('batteryLevel').value);
    systemData.settings.dateFormat = document.getElementById('dateFormat').value;
    systemData.settings.timeFormat = document.getElementById('timeFormat').value;
    
    saveData();
    showNotification('所有设置已保存并应用', 'success');
    
    applySavedSettings();
    refreshAppGrid();
    updateStatusBar();
    
    closeSettings();
}

// 重置所有设置
function resetAllSettings() {
    if (confirm('确定要重置所有设置吗？这将恢复所有默认设置。')) {
        localStorage.removeItem('androidWebsites');
        localStorage.removeItem('androidRecycleBin');
        localStorage.removeItem('androidSettings');
        location.reload();
    }
}

// 重置状态栏设置
function resetStatusBarSettings() {
    if (confirm('确定要重置状态栏设置吗？')) {
        systemData.settings.showWiFi = true;
        systemData.settings.showSignal = true;
        systemData.settings.showBattery = true;
        systemData.settings.showTime = true;
        systemData.settings.wifiStrength = 4;
        systemData.settings.signalStrength = 4;
        systemData.settings.networkType = '5G';
        systemData.settings.batteryLevel = 80;
        systemData.settings.isCharging = false;
        systemData.settings.dateFormat = 'full';
        systemData.settings.timeFormat = '24';
        systemData.settings.autoHideStatusBar = false;
        systemData.settings.transparentStatusBar = true;
        
        saveData();
        loadCurrentSettings();
        updateStatusBar();
        showNotification('状态栏设置已重置', 'success');
    }
}

// 测试状态栏
function testStatusBar() {
    // 模拟WiFi信号变化
    let wifiStrength = 4;
    const wifiInterval = setInterval(() => {
        wifiStrength = wifiStrength === 0 ? 4 : wifiStrength - 1;
        document.getElementById('wifiStrength').value = wifiStrength;
        systemData.settings.wifiStrength = wifiStrength;
        updateStatusBar();
    }, 500);
    
    // 模拟电池电量变化
    let batteryLevel = 100;
    const batteryInterval = setInterval(() => {
        batteryLevel = batteryLevel === 0 ? 100 : batteryLevel - 10;
        document.getElementById('batteryLevel').value = batteryLevel;
        document.getElementById('batteryLevelValue').textContent = batteryLevel + '%';
        systemData.settings.batteryLevel = batteryLevel;
        updateStatusBar();
    }, 1000);
    
    // 停止测试
    setTimeout(() => {
        clearInterval(wifiInterval);
        clearInterval(batteryInterval);
        loadCurrentSettings();
        updateStatusBar();
        showNotification('状态栏测试完成', 'success');
    }, 5000);
    
    showNotification('状态栏测试开始，5秒后结束', 'info');
}

// 开启WiFi
function turnOnWiFi() {
    systemData.settings.showWiFi = true;
    systemData.settings.wifiStrength = 4;
    
    const wifiToggle = document.getElementById('wifiToggle');
    wifiToggle.classList.add('active');
    
    document.getElementById('wifiStrength').value = 4;
    
    updateStatusBar();
    saveData();
    showNotification('WiFi已开启', 'success');
}

// 关闭WiFi
function turnOffWiFi() {
    systemData.settings.showWiFi = false;
    
    const wifiToggle = document.getElementById('wifiToggle');
    wifiToggle.classList.remove('active');
    
    updateStatusBar();
    saveData();
    showNotification('WiFi已关闭', 'success');
}

// 设置充电状态
function setCharging(isCharging) {
    systemData.settings.isCharging = isCharging;
    updateStatusBar();
    saveData();
    showNotification(`电池${isCharging ? '正在充电' : '未充电'}`, 'success');
}

// 更新状态栏
function updateStatusBar() {
    // 更新WiFi显示
    const wifiStatus = document.getElementById('wifiStatus');
    if (systemData.settings.showWiFi) {
        wifiStatus.classList.remove('disabled');
        wifiStatus.style.display = 'flex';
        
        // 更新WiFi信号强度
        const wifiCircles = document.querySelectorAll('.wifi-circle');
        for (let i = 0; i < wifiCircles.length; i++) {
            if (i < systemData.settings.wifiStrength) {
                wifiCircles[i].style.borderColor = 'white';
            } else {
                wifiCircles[i].style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        }
    } else {
        wifiStatus.classList.add('disabled');
        wifiStatus.style.display = 'none';
    }
    
    // 更新信号显示
    const signalStatus = document.getElementById('signalStatus');
    if (systemData.settings.showSignal) {
        signalStatus.classList.remove('disabled');
        signalStatus.style.display = 'flex';
        
        // 更新信号强度
        const signalBars = document.querySelectorAll('.signal-bar');
        for (let i = 0; i < signalBars.length; i++) {
            if (i < systemData.settings.signalStrength) {
                signalBars[i].style.background = 'white';
            } else {
                signalBars[i].style.background = 'rgba(255, 255, 255, 0.3)';
            }
        }
    } else {
        signalStatus.classList.add('disabled');
        signalStatus.style.display = 'none';
    }
    
    // 更新电池显示
    const batteryStatus = document.getElementById('batteryStatus');
    if (systemData.settings.showBattery) {
        batteryStatus.classList.remove('disabled');
        batteryStatus.style.display = 'flex';
        
        // 更新电池电量
        const batteryLevel = document.getElementById('batteryLevel');
        const batteryPercent = document.getElementById('batteryPercent');
        const batteryLevelBar = document.getElementById('batteryLevel');
        
        const level = systemData.settings.batteryLevel;
        batteryLevelBar.style.width = level + '%';
        batteryPercent.textContent = level + '%';
        
        // 根据电量改变颜色
        if (level <= 20) {
            batteryLevelBar.style.background = '#F44336'; // 红色
        } else if (level <= 50) {
            batteryLevelBar.style.background = '#FF9800'; // 橙色
        } else {
            batteryLevelBar.style.background = 'white'; // 白色
        }
        
        // 充电状态
        if (systemData.settings.isCharging) {
            batteryLevelBar.style.animation = 'pulse 1s infinite';
        } else {
            batteryLevelBar.style.animation = 'none';
        }
    } else {
        batteryStatus.classList.add('disabled');
        batteryStatus.style.display = 'none';
    }
    
    // 更新时间显示
    const currentTime = document.getElementById('currentTime');
    if (systemData.settings.showTime) {
        currentTime.classList.remove('disabled');
        currentTime.style.display = 'block';
        updateTime();
    } else {
        currentTime.classList.add('disabled');
        currentTime.style.display = 'none';
    }
    
    // 应用状态栏透明效果
    applyStatusBarTransparency();
}

// 应用状态栏透明效果
function applyStatusBarTransparency() {
    const statusBar = document.querySelector('.status-bar');
    if (systemData.settings.transparentStatusBar) {
        statusBar.style.background = 'rgba(33, 33, 33, 0.7)';
        statusBar.style.backdropFilter = 'blur(10px)';
    } else {
        statusBar.style.background = '#212121';
        statusBar.style.backdropFilter = 'none';
    }
    
    if (systemData.settings.darkMode) {
        if (systemData.settings.transparentStatusBar) {
            statusBar.style.background = 'rgba(18, 18, 18, 0.7)';
        } else {
            statusBar.style.background = '#121212';
        }
    }
}

// 切换自动隐藏状态栏
function toggleAutoHideStatusBar() {
    const statusBar = document.querySelector('.status-bar');
    if (systemData.settings.autoHideStatusBar) {
        statusBar.style.transform = 'translateY(-100%)';
        statusBar.style.transition = 'transform 0.3s ease';
        
        // 鼠标移到顶部时显示
        document.addEventListener('mousemove', handleAutoHideStatusBar);
    } else {
        statusBar.style.transform = 'translateY(0)';
        document.removeEventListener('mousemove', handleAutoHideStatusBar);
    }
}

// 处理自动隐藏状态栏
function handleAutoHideStatusBar(e) {
    const statusBar = document.querySelector('.status-bar');
    if (e.clientY < 50) {
        statusBar.style.transform = 'translateY(0)';
    } else {
        statusBar.style.transform = 'translateY(-100%)';
    }
}

// 加载分类背景设置
function loadCategoryBgSettings() {
    const container = document.getElementById('categoryBgSettings');
    container.innerHTML = '';
    
    const categories = {
        'home': '桌面中心',
        'games': '游戏中心',
        'social': '社交媒体',
        'tools': '实用工具',
        'entertainment': '娱乐休闲',
        'news': '新闻资讯',
        'education': '学习资源',
        'shopping': '购物生活'
    };
    
    for (let category in categories) {
        const bgSetting = document.createElement('div');
        bgSetting.className = 'category-bg-setting';
        
        const currentBg = systemData.settings.categoryBackgrounds[category];
        let previewStyle = '';
        if (currentBg && currentBg.value) {
            previewStyle = `background-image: url('${currentBg.value}')`;
        } else {
            previewStyle = 'background: #f0f0f0';
        }
        
        bgSetting.innerHTML = `
            <div class="category-bg-name">${categories[category]}</div>
            <div class="category-bg-preview" style="${previewStyle}" onclick="setCategoryBg('${category}')"></div>
            <input type="file" id="categoryBgUpload-${category}" accept="image/*,video/*" style="display: none;" onchange="uploadCategoryBg('${category}', this)">
            <input type="text" class="form-input" id="categoryBgUrl-${category}" placeholder="图片/视频URL" style="flex: 1; padding: 8px;">
            <button class="btn-primary" onclick="saveCategoryBg('${category}')" style="padding: 8px 12px; font-size: 0.9rem;">保存</button>
        `;
        
        container.appendChild(bgSetting);
    }
}

// 设置分类背景
function setCategoryBg(category) {
    document.getElementById(`categoryBgUpload-${category}`).click();
}

// 上传分类背景
function uploadCategoryBg(category, input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById(`categoryBgUrl-${category}`).value = e.target.result;
        
        const preview = document.querySelector(`.category-bg-setting .category-bg-preview`);
        if (file.type.startsWith('video')) {
            preview.style.backgroundImage = `url('https://cdn-icons-png.flaticon.com/512/125/125345.png')`;
        } else {
            preview.style.backgroundImage = `url('${e.target.result}')`;
        }
        
        showNotification(`${getCategoryName(category)}背景已上传`, 'success');
    };
    
    reader.readAsDataURL(file);
}

// 保存分类背景
function saveCategoryBg(category) {
    const urlInput = document.getElementById(`categoryBgUrl-${category}`);
    const url = urlInput.value.trim();
    
    if (!url) {
        showNotification('请输入背景URL', 'error');
        return;
    }
    
    const isVideo = url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') || 
                   url.includes('.avi') || url.includes('video') || url.includes('youtube');
    
    systemData.settings.categoryBackgrounds[category] = {
        type: isVideo ? 'video' : 'image',
        value: url
    };
    
    saveData();
    showNotification(`${getCategoryName(category)}背景已保存`, 'success');
    
    if (systemData.settings.currentCategory === category) {
        applyCategoryBackground(category);
    }
    
    urlInput.value = '';
}

// 上传图片处理
function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
        showNotification('请选择图片文件', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const bgContainer = document.getElementById('bgContainer');
        bgContainer.innerHTML = '';
        
        const img = document.createElement('img');
        img.className = 'bg-image';
        img.src = e.target.result;
        bgContainer.appendChild(img);
        
        systemData.settings.background = {
            type: 'image',
            value: e.target.result
        };
        saveData();
        
        showNotification('背景图片已上传并应用', 'success');
    };
    
    reader.readAsDataURL(file);
}

// 上传视频处理
function handleVideoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('video.*')) {
        showNotification('请选择视频文件', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const bgContainer = document.getElementById('bgContainer');
        bgContainer.innerHTML = '';
        
        const video = document.createElement('video');
        video.className = 'bg-video';
        video.src = e.target.result;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        bgContainer.appendChild(video);
        
        systemData.settings.background = {
            type: 'video',
            value: e.target.result
        };
        saveData();
        
        showNotification('视频背景已上传并应用', 'success');
    };
    
    reader.readAsDataURL(file);
}

// 打开网页框架
function openWebFrame(frameName, frameUrl) {
    if (frameUrl.startsWith('javascript:')) {
        eval(frameUrl.substring(11));
        return;
    }
    
    document.getElementById('webFrameTitle').innerHTML = `<i class="fas fa-globe"></i> ${frameName}`;
    document.getElementById('webFrame').src = frameUrl;
    document.getElementById('webFrameContainer').classList.add('active');
    
    showNotification(`正在打开: ${frameName}`, 'success');
}

// 关闭网页框架
function closeWebFrame() {
    document.getElementById('webFrameContainer').classList.remove('active');
    document.getElementById('webFrame').src = 'about:blank';
}

// 刷新框架
function refreshFrame() {
    const iframe = document.getElementById('webFrame');
    iframe.src = iframe.src;
    showNotification('页面已刷新', 'success');
}

// 在新标签页打开
function openInNewTab() {
    const iframe = document.getElementById('webFrame');
    if (iframe.src && iframe.src !== 'about:blank') {
        window.open(iframe.src, '_blank');
    }
}

// 更新时间
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    
    let timeStr = '';
    if (systemData.settings.timeFormat === '12') {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeStr = `${hours}:${minutes} ${ampm}`;
    } else {
        hours = hours.toString().padStart(2, '0');
        timeStr = `${hours}:${minutes}`;
        if (systemData.settings.showSeconds) {
            timeStr += `:${seconds}`;
        }
    }
    
    document.getElementById('currentTime').textContent = timeStr;
    
    // 更新日期显示
    const currentDate = document.getElementById('currentDate');
    if (systemData.settings.showDate) {
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
        
        let dateStr = '';
        switch(systemData.settings.dateFormat) {
            case 'full':
                dateStr = `${year}年${month}月${day}日`;
                break;
            case 'short':
                dateStr = `${month}/${day}`;
                break;
            case 'weekday':
                dateStr = weekday;
                break;
            case 'none':
                dateStr = '';
                break;
        }
        
        currentDate.textContent = dateStr;
    } else {
        currentDate.textContent = '';
    }
    
    setTimeout(updateTime, systemData.settings.showSeconds ? 1000 : 60000);
}

// 初始化事件监听器
function initEventListeners() {
    // 确保网站进入后不会自动弹出任何界面
    // 只显示安卓图标按钮
    
    document.getElementById('mainLauncher').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    document.getElementById('overlay').addEventListener('click', function() {
        closeAndroidDesktop();
        closeWebFrame();
        closeAddWebsiteDialog();
        closeSettings();
        closeRecycleBin();
        hideLaunchSelection();
    });
    
    document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
    document.getElementById('videoUpload').addEventListener('change', handleVideoUpload);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeWebFrame();
            closeAddWebsiteDialog();
            closeSettings();
            closeRecycleBin();
            closeAndroidDesktop();
            hideLaunchSelection();
        }
        
        if (e.ctrlKey && e.key === 'd') {
            openAndroidDesktop();
        }
        
        if (e.ctrlKey && e.key === 'p') {
            openSettings();
        }
        
        if (e.ctrlKey && e.key === 'm') {
            toggleDarkMode();
        }
        
        if (e.ctrlKey && e.key === 'l') {
            showLaunchSelection();
        }
        
        if (e.ctrlKey && e.key === 'r') {
            openRecycleBin();
        }
        
        if (e.ctrlKey && e.key === 't') {
            // 切换状态栏可见性
            const statusBar = document.querySelector('.status-bar');
            if (statusBar.style.display !== 'none') {
                statusBar.style.display = 'none';
            } else {
                statusBar.style.display = 'flex';
            }
        }
    });
    
    setTimeout(() => {
        showNotification('欢迎使用安卓桌面系统，点击右下角安卓图标按钮开始', 'info');
    }, 1000);
    
    refreshAppGrid();
    
    // 添加事件监听器
    document.getElementById('iconSize').addEventListener('input', function() {
        updateIconSizeValue(this.value);
    });
    
    document.getElementById('batteryLevel').addEventListener('input', function() {
        document.getElementById('batteryLevelValue').textContent = this.value + '%';
    });
    
    document.getElementById('wifiStrength').addEventListener('input', function() {
        systemData.settings.wifiStrength = parseInt(this.value);
        updateStatusBar();
    });
    
    document.getElementById('signalStrength').addEventListener('input', function() {
        systemData.settings.signalStrength = parseInt(this.value);
        updateStatusBar();
    });
    
    document.getElementById('networkType').addEventListener('change', function() {
        systemData.settings.networkType = this.value;
        updateStatusBar();
    });
    
    document.getElementById('dateFormat').addEventListener('change', function() {
        systemData.settings.dateFormat = this.value;
        updateTime();
    });
    
    document.getElementById('timeFormat').addEventListener('change', function() {
        systemData.settings.timeFormat = this.value;
        updateTime();
    });
    
    // 检查过期项目
    checkExpiredItems();
}

// 应用保存的设置
function applySavedSettings() {
    if (systemData.settings.themeColor) {
        document.getElementById('mainLauncher').style.background = `linear-gradient(135deg, ${systemData.settings.themeColor}, #4CAF50)`;
        document.getElementById('mainLauncher').style.boxShadow = `0 10px 30px ${systemData.settings.themeColor.replace(')', ', 0.5)').replace('rgb', 'rgba')}`;
    }
    
    if (systemData.settings.darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    const bgContainer = document.getElementById('bgContainer');
    if (systemData.settings.background) {
        const bg = systemData.settings.background;
        
        if (bg.type === 'gradient') {
            bgContainer.style.background = bg.value;
        } else if (bg.type === 'image') {
            const img = document.createElement('img');
            img.className = 'bg-image';
            img.src = bg.value;
            bgContainer.appendChild(img);
        } else if (bg.type === 'video') {
            const video = document.createElement('video');
            video.className = 'bg-video';
            video.src = bg.value;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            bgContainer.appendChild(video);
        }
    }
    
    applyCategoryBackground(systemData.settings.currentCategory);
    applyDynamicBackground();
    applyStatusBarTransparency();
    
    // 应用自动隐藏状态栏
    if (systemData.settings.autoHideStatusBar) {
        toggleAutoHideStatusBar();
    }
}

// 初始化函数
function init() {
    applySavedSettings();
    updateTime();
    updateStatusBar();
    initEventListeners();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}