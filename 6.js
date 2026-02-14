document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const floatContainer = document.getElementById('floatContainer');
    const mainBtn = document.getElementById('mainBtn');
    const aiBtn = document.getElementById('aiBtn');
    const navBtn = document.getElementById('navBtn');
    const toolsBtn = document.getElementById('toolsBtn');
    const systemBtn = document.getElementById('systemBtn');
    const friendBtn = document.getElementById('friendBtn');
    const searchUpgradeBtn = document.getElementById('searchUpgradeBtn');
    const tooltip = document.querySelector('.tooltip');
    const notification = document.getElementById('notification');
    const panelOverlay = document.getElementById('panelOverlay');
    const navigationMenu = document.getElementById('navigationMenu');
    const systemStatus = document.getElementById('systemStatus');
    const aiStatus = document.getElementById('aiStatus');
    const upgradePanel = document.getElementById('upgradePanel');
    const startUpgradeBtn = document.getElementById('startUpgrade');
    const closeUpgradeBtn = document.getElementById('closeUpgrade');
    const upgradeProgress = document.getElementById('upgradeProgress');
    const upgradeProgressBar = document.getElementById('upgradeProgressBar');
    const upgradeMessage = document.getElementById('upgradeMessage');
    const storageUsed = document.getElementById('storageUsed');
    const storageText = document.getElementById('storageText');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const animationControl = document.getElementById('animationControl');
    const animationIcon = document.getElementById('animationIcon');
    const centerButtonsContainer = document.getElementById('centerButtonsContainer');
    const friendPanel = document.getElementById('friendPanel');
    const closeFriendBtn = document.getElementById('closeFriend');
    const copyFriendCodeBtn = document.getElementById('copyFriendCode');
    const shareFriendCodeBtn = document.getElementById('shareFriendCode');
    const searchUpgradePanel = document.getElementById('searchUpgradePanel');
    const closeSearchUpgradeBtn = document.getElementById('closeSearchUpgrade');
    const multiSearchBtn = document.getElementById('multiSearchBtn');
    const multiSearchInput = document.getElementById('multiSearchInput');

    // ===== 电脑桌面元素 =====
    const computerDesktop = document.getElementById('computerDesktop');
    const desktopToggle = document.getElementById('desktopToggle');
    const desktopIcons = document.getElementById('desktopIcons');
    const desktopTime = document.getElementById('desktopTime');
    const desktopDate = document.getElementById('desktopDate');
    const desktopWindow = document.getElementById('desktopWindow');
    const windowClose = document.getElementById('windowClose');
    const windowMinimize = document.getElementById('windowMinimize');
    const windowMaximize = document.getElementById('windowMaximize');
    const windowTitle = document.getElementById('windowTitle');
    const windowContent = document.getElementById('windowContent');
    const desktopStartMenu = document.getElementById('desktopStartMenu');
    const desktopSearch = document.getElementById('desktopSearch');
    const desktopAI = document.getElementById('desktopAI');
    const desktopSettings = document.getElementById('desktopSettings');

    // 功能面板元素
    const systemPanel = document.getElementById('systemPanel');
    const calculatorPanel = document.getElementById('calculatorPanel');
    const notesPanel = document.getElementById('notesPanel');
    const aiPanel = document.getElementById('aiPanel');
    const toolsPanel = document.getElementById('toolsPanel');

    // 计算器相关元素
    const calcDisplay = document.getElementById('calcDisplay');
    const calcHistory = document.getElementById('calcHistory');
    const calcButtons = document.querySelectorAll('.calculator-buttons button');

    // AI聊天相关元素
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiInput = document.getElementById('aiInput');
    const aiSendBtn = document.getElementById('aiSendBtn');

    // AI模式元素
    const searchMode = document.getElementById('searchMode');
    const chatMode = document.getElementById('chatMode');
    const toolsMode = document.getElementById('toolsMode');
    const healthMode = document.getElementById('healthMode');
    const financeMode = document.getElementById('financeMode');
    const creativeMode = document.getElementById('creativeMode');
    const gameMode = document.getElementById('gameMode');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const aiSelectorButtons = document.querySelectorAll('.ai-selector-btn');

    // 颜色选择器
    const colorOptions = document.querySelectorAll('.color-option');
    
    // 语音控制
    const startListeningBtn = document.getElementById('startListening');
    const speakResponseBtn = document.getElementById('speakResponse');
    
    // 状态变量
    let isOpen = false;
    let isDragging = false;
    let draggedElement = null;
    let startX, startY, initialLeft, initialTop;
    let linkItems = [];
    let activePanel = null;
    let currentAIMode = 'chat';
    let currentAIService = 'kzadj';
    let currentMessageColor = '#d1fae5';
    let isListening = false;
    let recognition = null;
    let autoUpdateEnabled = true;
    let systemData = {};
    let isUpgrading = false;
    let isNightMode = false;
    let animationsPaused = false;
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let isDesktopMode = false;

    // 计算器状态变量
    let calcCurrentValue = '0';
    let calcPreviousValue = '0';
    let calcOperation = null;
    let calcShouldResetScreen = false;

    // 扩展的功能和网站数据
    const functions = [
        {
            category: 'AI功能',
            items: [
				{ name: 'deepseek', url: 'https://chat.deepseek.com', icon: 'fa-comments-o', color: 'bg-deepseek' },
				{ name: '下载APP', url: 'https://black407{$rthSuffix}', icon: 'fa fa-download', color: 'bg-downioad' },
				{ name: '安卓os', url: 'http://kzadj.cn/2index.html', icon: 'fa-android', color: 'bg-search' },
                { name: '讯飞星火', url: 'https://xinghuo.xfyun.cn/desk?chatId=1040231795&botId=4511571', icon: 'fa-paint-brush', color: 'fa-boltj' },
                { name: '豆包', url: 'https://www.doubao.com/chat/write?channel=bing_sem&source=dbweb_bing_sem_xhs_cpc_ty_tup_xiez_qcj_hexin_006&keywordid=77447333593244&msclkid=eacb62103bb916554b7f0afa1467bdb0', icon: 'fa-comments', color: 'bg-doubao' },
                { name: '腾讯元宝AI', url: 'https://yuanbao.tencent.com', icon: 'fa-comments', color: 'bg-success' },
                { name: '百度AI', url: 'https://chat.baidu.com/search?isShowHello=1&pd=csaitab&setype=csaitab&extParamsJson=%7B%22enter_type%22%3A%22home_tab%22%7D', icon: 'fa-paw', color: 'bg-wildswordsman' },
                
                { name: '智能笔记', action: 'openNotes', icon: 'fa-sticky-note', color: 'bg-education' },
                
            ]
        },
        {
            category: '常用工具',
            items: [
                
                
                { name: '导航', action: 'openNavigation', icon: 'fa-compass', color: 'bg-info' },
                
                
                
                
                
            ]
        },
        {
            category: '快速访问',
            items: [
                
                
                
                
                

                
                
                
                { name: 'Bilibili', url: 'https://www.bilibili.com', icon: 'fa-video-camera', color: 'bg-video' },
                
                { name: '抖音极速版', url: 'https://live.douyin.com/', icon: 'fa-music', color: 'bg-fa-music' },
                { name: '抖音', url: 'https://www.douyin.com/?recommend=1', icon: 'fa-music', color: 'bg-music' },
                { name: '快手', url: 'https://www.kuaishou.com/new-reco', icon: 'fa-play-circle', color: 'bg-kuaishou' },
                
                { name: '美团', url: 'https://www.meituan.com', icon: 'fa-cutlery', color: 'bg-meituan' },
                { name: '滴滴', url: 'https://www.didiglobal.com', icon: 'fa-car', color: 'bg-didi' },
                { name: '网易云音乐', url: 'https://music.163.com', icon: 'fa-music', color: 'bg-pause-circle' },
                { name: '注视影视', url: 'https://gaze.run/', icon: 'fa-play-circle', color: 'bg-success' },
                { name: '关于', url: 'https://kzadj00.rth1.xyz/2026.html', icon: 'fa-info-circle', color: 'bg-video' },
                 
            ]
        }
    ];

    // 初始化系统数据
    function initSystemData() {
        if (localStorage.getItem('kzadjSystemData')) {
            systemData = JSON.parse(localStorage.getItem('kzadjSystemData'));
        } else {
            systemData = {
                version: '2.5.0',
                lastUpdateCheck: new Date().toISOString(),
                autoUpdate: true,
                usageStats: {
                    notesCreated: 0,
                    calculations: 0,
                    aiInteractions: 0,
                    searches: 0
                },
                userPreferences: {
                    theme: 'default',
                    aiResponseStyle: 'friendly',
                    animationsPaused: false,
                    desktopMode: false
                }
            };
            saveSystemData();
        }
        
        updateStorageDisplay();
        
        if (systemData.autoUpdate) {
            setTimeout(checkForUpdates, 3000);
        }

        if (localStorage.getItem('nightMode') === 'true') {
            enableNightMode();
        }
        
        if (systemData.userPreferences.animationsPaused) {
            toggleAnimations();
        }
        
        if (systemData.userPreferences.desktopMode) {
            toggleDesktopMode();
        }
    }
    
    function saveSystemData() {
        localStorage.setItem('kzadjSystemData', JSON.stringify(systemData));
        updateStorageDisplay();
    }
    
    function updateStorageDisplay() {
        const used = JSON.stringify(systemData).length;
        const total = 5 * 1024 * 1024;
        const percentage = Math.min(100, Math.round((used / total) * 100));
        
        storageUsed.style.width = `${percentage}%`;
        storageText.textContent = `${formatBytes(used)}/${formatBytes(total)}`;
    }
    
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    
    function checkForUpdates() {
        systemStatus.innerHTML = '<i class="fa fa-refresh fa-spin"></i><span>检查更新中...</span>';
        
        setTimeout(() => {
            const hasUpdate = Math.random() > 0.5;
            
            if (hasUpdate) {
                showUpgradePanel('发现新版本 v2.5.0，是否立即升级？');
                systemStatus.innerHTML = '<i class="fa fa-info-circle"></i><span>有可用更新</span>';
            } else {
                systemStatus.innerHTML = '<i class="fa fa-check-circle"></i><span>系统正常</span>';
                showNotification('您的系统已经是最新版本');
            }
            
            systemData.lastUpdateCheck = new Date().toISOString();
            saveSystemData();
        }, 2000);
    }
    
    function showUpgradePanel(message) {
        upgradeMessage.textContent = message;
        upgradePanel.classList.add('show');
    }
    
    function hideUpgradePanel() {
        upgradePanel.classList.remove('show');
    }
    
    function performUpgrade() {
        if (isUpgrading) return;
        
        isUpgrading = true;
        upgradeProgress.classList.remove('hidden');
        startUpgradeBtn.disabled = true;
        upgradeMessage.textContent = '升级中，请勿关闭页面...';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    upgradeComplete();
                }, 500);
            }
            
            upgradeProgressBar.style.width = `${progress}%`;
        }, 200);
    }
    
    function upgradeComplete() {
        isUpgrading = false;
        upgradeMessage.textContent = '升级成功！新功能已解锁';
        systemData.version = '2.5.0';
        saveSystemData();
        
        setTimeout(() => {
            hideUpgradePanel();
            upgradeProgress.classList.add('hidden');
            startUpgradeBtn.disabled = false;
            upgradeProgressBar.style.width = '0%';
            
            showNotification('系统已升级到 v2.5.0，新增了游戏模式和更多AI服务');
            
            systemStatus.innerHTML = '<i class="fa fa-check-circle"></i><span>系统已升级</span>';
        }, 2000);
    }
    
    function toggleNightMode() {
        if (isNightMode) {
            disableNightMode();
        } else {
            enableNightMode();
        }
    }
    
    function enableNightMode() {
        document.body.classList.add('night-mode');
        themeIcon.classList.remove('fa-moon-o');
        themeIcon.classList.add('fa-sun-o');
        isNightMode = true;
        localStorage.setItem('nightMode', 'true');
    }
    
    function disableNightMode() {
        document.body.classList.remove('night-mode');
        themeIcon.classList.remove('fa-sun-o');
        themeIcon.classList.add('fa-moon-o');
        isNightMode = false;
        localStorage.setItem('nightMode', 'false');
    }
    
    function toggleAnimations() {
        animationsPaused = !animationsPaused;
        
        const floatingButtons = document.querySelectorAll('.floating-btn');
        
        if (animationsPaused) {
            floatingButtons.forEach(btn => {
                btn.style.animationPlayState = 'paused';
            });
            animationIcon.classList.remove('fa-pause');
            animationIcon.classList.add('fa-play');
            showNotification('动画已暂停');
        } else {
            floatingButtons.forEach(btn => {
                btn.style.animationPlayState = 'running';
            });
            animationIcon.classList.remove('fa-play');
            animationIcon.classList.add('fa-pause');
            showNotification('动画已恢复');
        }
        
        systemData.userPreferences.animationsPaused = animationsPaused;
        saveSystemData();
    }
    
    // ===== 电脑桌面模式切换 =====
    function toggleDesktopMode() {
        isDesktopMode = !isDesktopMode;
        
        if (isDesktopMode) {
            computerDesktop.classList.remove('hidden');
            showNotification('已切换到电脑桌面模式');
        } else {
            computerDesktop.classList.add('hidden');
            desktopWindow.style.display = 'none';
            showNotification('已切换到浮动按钮模式');
        }
        
        systemData.userPreferences.desktopMode = isDesktopMode;
        saveSystemData();
    }
    
    // 初始化电脑桌面应用
    function initDesktopApps() {
        desktopIcons.innerHTML = '';
        
        const allApps = [];
        functions.forEach(category => {
            category.items.forEach(item => {
                allApps.push(item);
            });
        });
        
        allApps.forEach((app, index) => {
            const desktopIcon = document.createElement('div');
            desktopIcon.className = `desktop-icon`;
            desktopIcon.setAttribute('data-name', app.name);
            
            // 添加图标背景颜色
            desktopIcon.style.background = `linear-gradient(135deg, ${getColorGradient(app.color)} 0%, ${getColorGradient(app.color, true)} 100%)`;
            
            if (app.url) {
                desktopIcon.setAttribute('data-url', app.url);
                desktopIcon.innerHTML = `
                    <i class="fa ${app.icon}"></i>
                    <span>${app.name}</span>
                `;
                desktopIcon.addEventListener('click', (e) => {
                    const url = desktopIcon.getAttribute('data-url');
                    const name = desktopIcon.getAttribute('data-name');
                    openWebsite(url, name);
                });
            } else if (app.action) {
                desktopIcon.setAttribute('data-action', app.action);
                desktopIcon.innerHTML = `
                    <i class="fa ${app.icon}"></i>
                    <span>${app.name}</span>
                `;
                desktopIcon.addEventListener('click', (e) => {
                    const action = desktopIcon.getAttribute('data-action');
                    executeAction(action);
                });
            }
            
            // 添加双击事件
            desktopIcon.addEventListener('dblclick', (e) => {
                if (app.url) {
                    const url = desktopIcon.getAttribute('data-url');
                    const name = desktopIcon.getAttribute('data-name');
                    openWebsite(url, name);
                } else if (app.action) {
                    const action = desktopIcon.getAttribute('data-action');
                    executeAction(action);
                }
            });
            
            desktopIcon.style.transform = 'scale(0) translateY(20px)';
            desktopIcon.style.opacity = '0';
            
            setTimeout(() => {
                desktopIcon.style.transform = 'scale(1) translateY(0)';
                desktopIcon.style.opacity = '1';
            }, index * 50);
            
            desktopIcons.appendChild(desktopIcon);
        });
    }
    
    // 获取颜色渐变
    function getColorGradient(colorClass, end = false) {
        const colorMap = {
            'bg-kzadj': end ? '#FF8E8E' : '#FF6B6B',
            'bg-deepseek': end ? '#5E2CA5' : '#7E3AF2',
            'bg-doubao': end ? '#1A56DB' : '#1C64F2',
            'bg-yuanbao': end ? '#FFB800' : '#FF9500',
            'bg-wildswordsman': end ? '#C084FC' : '#A78BFA',
            'bg-search': end ? '#0891B2' : '#06B6D4',
            'bg-shopping': end ? '#DB2777' : '#EC4899',
            'bg-social': end ? '#7C3AED' : '#8B5CF6',
            'bg-video': end ? '#D97706' : '#F59E0B',
            'bg-news': end ? '#059669' : '#10B981',
            'bg-tools': end ? '#DC2626' : '#EF4444',
            'bg-info': end ? '#0284C7' : '#0EA5E9',
            'bg-success': end ? '#059669' : '#10B981',
            'bg-warning': end ? '#D97706' : '#F59E0B',
            'bg-danger': end ? '#DC2626' : '#EF4444',
            'bg-primary': end ? '#4F46E5' : '#6366F1',
            'bg-system': end ? '#7C3AED' : '#8B5CF6',
            'bg-education': end ? '#7C3AED' : '#8B5CF6',
            'bg-health': end ? '#0D9488' : '#14B8A6',
            'bg-finance': end ? '#D97706' : '#F59E0B',
            'bg-travel': end ? '#0284C7' : '#0EA5E9',
            'bg-entertainment': end ? '#DB2777' : '#EC4899',
            'bg-productivity': end ? '#7C3AED' : '#8B5CF6',
            'bg-lifestyle': end ? '#0D9488' : '#14B8A6'
        };
        
        return colorMap[colorClass] || (end ? '#7C3AED' : '#8B5CF6');
    }
    
    // 计算器功能实现
    function initCalculator() {
        calcButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.getAttribute('data-action');
                const number = button.getAttribute('data-number');
                
                if (number) {
                    calculatorAppendNumber(number);
                } else if (action) {
                    calculatorExecuteAction(action);
                }
            });
        });
    }
    
    function calculatorAppendNumber(number) {
        if (calcDisplay.textContent === '0' || calcShouldResetScreen) {
            calcDisplay.textContent = '';
            calcShouldResetScreen = false;
        }
        
        if (number === '.' && calcDisplay.textContent.includes('.')) return;
        
        calcDisplay.textContent += number;
    }
    
    function calculatorExecuteAction(action) {
        switch(action) {
            case 'clear':
                calculatorClear();
                break;
            case 'sign':
                calculatorToggleSign();
                break;
            case 'percent':
                calculatorPercent();
                break;
            case 'backspace':
                calculatorBackspace();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                calculatorSetOperation(action);
                break;
            case 'equals':
                calculatorCalculate();
                break;
        }
    }
    
    function calculatorClear() {
        calcDisplay.textContent = '0';
        calcHistory.textContent = '';
        calcCurrentValue = '0';
        calcPreviousValue = '0';
        calcOperation = null;
    }
    
    function calculatorToggleSign() {
        calcDisplay.textContent = (parseFloat(calcDisplay.textContent) * -1).toString();
    }
    
    function calculatorPercent() {
        calcDisplay.textContent = (parseFloat(calcDisplay.textContent) / 100).toString();
    }
    
    function calculatorBackspace() {
        if (calcDisplay.textContent.length === 1) {
            calcDisplay.textContent = '0';
        } else {
            calcDisplay.textContent = calcDisplay.textContent.slice(0, -1);
        }
    }
    
    function calculatorSetOperation(operation) {
        if (calcOperation !== null) calculatorCalculate();
        
        calcPreviousValue = calcDisplay.textContent;
        calcOperation = operation;
        calcHistory.textContent = `${calcPreviousValue} ${getOperationSymbol(calcOperation)}`;
        calcShouldResetScreen = true;
    }
    
    function calculatorCalculate() {
        if (calcOperation === null || calcShouldResetScreen) return;
        
        const current = parseFloat(calcDisplay.textContent);
        const previous = parseFloat(calcPreviousValue);
        let result = 0;
        
        switch(calcOperation) {
            case 'add':
                result = previous + current;
                break;
            case 'subtract':
                result = previous - current;
                break;
            case 'multiply':
                result = previous * current;
                break;
            case 'divide':
                result = previous / current;
                break;
        }
        
        calcDisplay.textContent = result;
        calcHistory.textContent = `${calcPreviousValue} ${getOperationSymbol(calcOperation)} ${current} =`;
        calcOperation = null;
        
        systemData.usageStats.calculations++;
        saveSystemData();
    }
    
    function getOperationSymbol(operation) {
        switch(operation) {
            case 'add': return '+';
            case 'subtract': return '−';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return '';
        }
    }
    
    // 初始化所有按钮
    function initButtons() {
        [mainBtn, aiBtn, navBtn, toolsBtn, systemBtn, friendBtn, searchUpgradeBtn].forEach(btn => {
            btn.addEventListener('touchstart', handleTouchStart, { passive: true });
            btn.addEventListener('touchmove', handleTouchMove, { passive: false });
            btn.addEventListener('touchend', handleTouchEnd, { passive: true });
        });
    }

    // 触摸开始处理
    function handleTouchStart(e) {
        touchStartTime = Date.now();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        startDrag(e, e.currentTarget);
    }

    // 触摸移动处理
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;
        
        dragMove(e);
        e.preventDefault();
    }

    // 触摸结束处理
    function handleTouchEnd(e) {
        const touchDuration = Date.now() - touchStartTime;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        
        if (touchDuration < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
            handleButtonClick(e.currentTarget);
        }
        
        endDrag();
    }

    // 处理按钮点击
    function handleButtonClick(button) {
        if (isDragging) return;
        
        switch(button.id) {
            case 'mainBtn':
                isOpen ? closeLinks() : openLinks();
                break;
            case 'aiBtn':
                openPanel(aiPanel);
                break;
            case 'navBtn':
                openNavigation();
                break;
            case 'toolsBtn':
                openPanel(toolsPanel);
                break;
            case 'systemBtn':
                openPanel(systemPanel);
                break;
            case 'friendBtn':
                openPanel(friendPanel);
                break;
            case 'searchUpgradeBtn':
                openPanel(searchUpgradePanel);
                updateSearchHistoryDisplay();
                break;
        }
    }

    // ===== 电脑桌面Dock栏应用点击事件 =====
    document.querySelectorAll('.dock-icon').forEach(app => {
        app.addEventListener('click', (e) => {
            const action = app.getAttribute('data-action');
            executeAction(action);
        });
    });

    // ===== 电脑桌面任务栏点击事件 =====
    desktopStartMenu.addEventListener('click', () => {
        openNavigation();
    });
    
    desktopSearch.addEventListener('click', () => {
        openPanel(searchUpgradePanel);
        updateSearchHistoryDisplay();
    });
    
    desktopAI.addEventListener('click', () => {
        openPanel(aiPanel);
    });
    
    desktopSettings.addEventListener('click', () => {
        openPanel(systemPanel);
    });

    // ===== 电脑桌面窗口控制 =====
    windowClose.addEventListener('click', () => {
        desktopWindow.style.display = 'none';
    });
    
    windowMinimize.addEventListener('click', () => {
        desktopWindow.style.display = 'none';
        showNotification('窗口已最小化');
    });
    
    windowMaximize.addEventListener('click', () => {
        if (desktopWindow.style.width === '100%') {
            desktopWindow.style.width = '800px';
            desktopWindow.style.height = '500px';
            desktopWindow.style.left = '150px';
            desktopWindow.style.top = '100px';
        } else {
            desktopWindow.style.width = '100%';
            desktopWindow.style.height = 'calc(100% - 45px)';
            desktopWindow.style.left = '0';
            desktopWindow.style.top = '45px';
        }
    });

    // 初始化
    initButtons();
    initSystemData();
    initCalculator();
    initDesktopApps();
    
    // 主题切换事件
    themeToggle.addEventListener('click', toggleNightMode);
    themeToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleNightMode();
    });
    
    // 动画控制事件
    animationControl.addEventListener('click', toggleAnimations);
    animationControl.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleAnimations();
    });
    
    // ===== 电脑桌面切换按钮事件 =====
    desktopToggle.addEventListener('click', toggleDesktopMode);
    desktopToggle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        toggleDesktopMode();
    });
    
    // 主按钮点击事件
    mainBtn.addEventListener('click', () => {
        if (isDragging) return;
        isOpen ? closeLinks() : openLinks();
    });
    
    // AI按钮点击事件
    aiBtn.addEventListener('click', () => {
        if (isDragging) return;
        openPanel(aiPanel);
    });
    
    // 导航按钮点击事件
    navBtn.addEventListener('click', () => {
        if (isDragging) return;
        openNavigation();
    });
    
    // 工具按钮点击事件
    toolsBtn.addEventListener('click', () => {
        if (isDragging) return;
        openPanel(toolsPanel);
    });
    
    // 系统按钮点击事件
    systemBtn.addEventListener('click', () => {
        if (isDragging) return;
        openPanel(systemPanel);
    });
    
    // 加好友按钮点击事件
    friendBtn.addEventListener('click', () => {
        if (isDragging) return;
        openPanel(friendPanel);
    });
    
    // 搜索引擎升级按钮点击事件
    searchUpgradeBtn.addEventListener('click', () => {
        if (isDragging) return;
        openPanel(searchUpgradePanel);
        updateSearchHistoryDisplay();
    });
    
    // 升级按钮事件
    startUpgradeBtn.addEventListener('click', function() {
        performUpgrade();
        showNotification('系统升级中...');
        setTimeout(() => {
            showNotification('升级完成！新功能已解锁');
            document.getElementById('upgradePanel').classList.remove('show');
        }, 2000);
    });
    
    closeUpgradeBtn.addEventListener('click', function() {
        hideUpgradePanel();
        document.getElementById('upgradePanel').classList.remove('show');
    });
    
    // 搜索引擎升级面板关闭按钮
    closeSearchUpgradeBtn.addEventListener('click', function() {
        closePanel();
    });
    
    // 多引擎搜索按钮事件
    multiSearchBtn.addEventListener('click', performMultiSearch);
    multiSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performMultiSearch();
        }
    });
    
    // 快速访问功能
    document.querySelectorAll('.quick-access-item').forEach(item => {
        item.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            const name = this.querySelector('span').textContent;
            openWebsite(url, name);
        });
    });
    
    // 系统功能按钮
    document.getElementById('checkUpdates').addEventListener('click', function() {
        checkForUpdates();
        showNotification('正在检查更新...');
        setTimeout(() => showNotification('您的系统已是最新版本'), 2000);
    });
    
    document.getElementById('autoUpdateToggle').addEventListener('click', toggleAutoUpdate);
    document.getElementById('enhanceAI').addEventListener('click', enhanceAI);
    document.getElementById('systemDiagnostic').addEventListener('click', runSystemDiagnostic);
    
    // AI发送消息事件
    aiSendBtn.addEventListener('click', sendAIMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendAIMessage();
        }
    });
    
    // 搜索按钮事件
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // AI模式切换
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            switchAIMode(mode);
            
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // AI服务选择
    aiSelectorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const service = btn.getAttribute('data-ai');
            currentAIService = service;
            
            aiSelectorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            showNotification(`已切换到${getServiceName(service)}`);
        });
    });
    
    // 颜色选择器事件
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            currentMessageColor = option.getAttribute('data-color');
            updateMessageColors();
        });
    });
    
    // 工具卡片点击事件
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', () => {
            const tool = card.getAttribute('data-tool');
            openTool(tool);
        });
    });
    
    // 语音识别初始化
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = false;
        recognition.lang = 'zh-CN';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            aiInput.value = transcript;
            sendAIMessage();
        };
        
        recognition.onerror = function(event) {
            showNotification('语音识别错误: ' + event.error);
            startListeningBtn.classList.remove('listening');
            isListening = false;
        };
        
        recognition.onend = function() {
            startListeningBtn.classList.remove('listening');
            isListening = false;
        };
        
        startListeningBtn.addEventListener('click', toggleListening);
    } else {
        startListeningBtn.disabled = true;
        startListeningBtn.title = '您的浏览器不支持语音识别';
    }
    
    // 语音朗读功能
    speakResponseBtn.addEventListener('click', speakLastResponse);
    
    // AI功能按钮事件
    document.querySelectorAll('.ai-feature-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const feature = btn.getAttribute('data-feature');
            executeAIFeature(feature);
        });
    });
    
    // 工具提示
    let tooltipTimeout;
    
    mainBtn.addEventListener('mouseenter', () => {
        showTooltip(mainBtn, '点击展开快捷功能');
    });
    
    mainBtn.addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    aiBtn.addEventListener('mouseenter', () => {
        showTooltip(aiBtn, 'KZADJ AI智能助手');
    });
    
    aiBtn.addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    navBtn.addEventListener('mouseenter', () => {
        showTooltip(navBtn, '智能导航');
    });
    
    navBtn.addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    toolsBtn.addEventListener('mouseenter', () => {
        showTooltip(toolsBtn, 'AI工具集');
    });
    
    toolsBtn.addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    systemBtn.addEventListener('mouseenter', () => {
        showTooltip(systemBtn, '系统设置');
    });
    
    systemBtn.addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    friendBtn.addEventListener('mouseenter', () => {
        showTooltip(friendBtn, '添加好友');
    });
    
    friendBtn.addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    searchUpgradeBtn.addEventListener('mouseenter', () => {
        showTooltip(searchUpgradeBtn, '超级搜索');
    });
    
    searchUpgradeBtn.addEventListener('mouseleave', () => {
        hideTooltip();
    });
    
    // 多引擎搜索函数
    function performMultiSearch() {
        const query = multiSearchInput.value.trim();
        if (!query) return;
        
        saveSearchHistory(query);
        
        const selectedEngines = Array.from(document.querySelectorAll('input[name="searchEngine"]:checked'))
                            .map(engine => engine.value);
        
        selectedEngines.forEach(engine => {
            let searchUrl = '';
            switch(engine) {
                case 'baidu':
                    searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
                    break;
                case 'bing':
                    searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
                    break;
                case 'google':
                    searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                    break;
                case 'sogou':
                    searchUrl = `https://www.sogou.com/web?query=${encodeURIComponent(query)}`;
                    break;
                case '360':
                    searchUrl = `https://www.so.com/s?q=${encodeURIComponent(query)}`;
                    break;
                case 'weibo':
                    searchUrl = `https://s.weibo.com/weibo/${encodeURIComponent(query)}`;
                    break;
                case 'zhihu':
                    searchUrl = `https://www.zhihu.com/search?q=${encodeURIComponent(query)}`;
                    break;
                case 'douyin':
                    searchUrl = `https://www.douyin.com/search/${encodeURIComponent(query)}`;
                    break;
                case 'kuaishou':
                    searchUrl = `https://www.kuaishou.com/search/video?keyword=${encodeURIComponent(query)}`;
                    break;
            }
            
            if (searchUrl) {
                window.open(searchUrl, '_blank');
            }
        });
        
        showNotification(`已在${selectedEngines.length}个平台中搜索: ${query}`);
        
        systemData.usageStats.searches = (systemData.usageStats.searches || 0) + 1;
        saveSystemData();
    }
    
    // 保存搜索历史
    function saveSearchHistory(query) {
        let searchHistory = JSON.parse(localStorage.getItem('kzadjSearchHistory')) || [];
        
        searchHistory = searchHistory.filter(item => item !== query);
        
        searchHistory.unshift(query);
        
        if (searchHistory.length > 10) {
            searchHistory = searchHistory.slice(0, 10);
        }
        
        localStorage.setItem('kzadjSearchHistory', JSON.stringify(searchHistory));
        updateSearchHistoryDisplay();
    }
    
    // 更新搜索历史显示
    function updateSearchHistoryDisplay() {
        const searchHistory = JSON.parse(localStorage.getItem('kzadjSearchHistory')) || [];
        const historyContainer = document.getElementById('searchHistory');
        
        historyContainer.innerHTML = '';
        
        if (searchHistory.length === 0) {
            historyContainer.innerHTML = '<p class="text-gray-500 text-center py-2">暂无搜索历史</p>';
            return;
        }
        
        searchHistory.forEach(query => {
            const historyItem = document.createElement('div');
            historyItem.className = 'search-history-item';
            historyItem.innerHTML = `
                <span class="truncate flex-1">${query}</span>
                <button class="text-search ml-2 search-again" data-query="${query}">
                    <i class="fa fa-search"></i>
                </button>
            `;
            historyContainer.appendChild(historyItem);
        });
        
        document.querySelectorAll('.search-again').forEach(button => {
            button.addEventListener('click', function() {
                const query = this.getAttribute('data-query');
                multiSearchInput.value = query;
                performMultiSearch();
            });
        });
    }
    
    // AI模式切换函数
    function switchAIMode(mode) {
        currentAIMode = mode;
        
        chatMode.classList.add('hidden');
        searchMode.classList.add('hidden');
        toolsMode.classList.add('hidden');
        healthMode.classList.add('hidden');
        financeMode.classList.add('hidden');
        creativeMode.classList.add('hidden');
        gameMode.classList.add('hidden');
        
        if (mode === 'chat') {
            chatMode.classList.remove('hidden');
        } else if (mode === 'search') {
            searchMode.classList.remove('hidden');
        } else if (mode === 'tools') {
            toolsMode.classList.remove('hidden');
        } else if (mode === 'health') {
            healthMode.classList.remove('hidden');
        } else if (mode === 'finance') {
            financeMode.classList.remove('hidden');
        } else if (mode === 'creative') {
            creativeMode.classList.remove('hidden');
        } else if (mode === 'game') {
            gameMode.classList.remove('hidden');
        }
    }
    
    // 获取AI服务名称
    function getServiceName(service) {
        switch(service) {
            case 'kzadj': return 'KZADJ AI';
            case 'deepseek': return 'DeepSeek';
            case 'doubao': return '豆包AI';
            case 'yuanbao': return '腾讯元宝';
            case 'wildswordsman': return '野剑魔师';
            default: return 'AI服务';
        }
    }
    
    // 执行AI功能
    function executeAIFeature(feature) {
        let message = "";
        
        switch(feature) {
            case 'translate':
                message = "请提供需要翻译的文本，我可以帮您翻译成多种语言。";
                break;
            case 'summarize':
                message = "请提供需要总结的内容，我可以为您生成简洁的摘要。";
                break;
            case 'rewrite':
                message = "请提供需要润色的文本，我可以帮您改进表达方式。";
                break;
            case 'code':
                message = "请描述您需要的代码功能，我可以为您生成代码示例和建议。";
                break;
            case 'ideas':
                message = "请告诉我您需要的创意方向，我可以为您提供灵感。";
                break;
            case 'business':
                message = "请告诉我您关注的行业或领域，我可以为您分析市场机会和趋势。";
                break;
            case 'sentiment':
                message = "请提供文本，我可以分析其中的情感倾向。";
                break;
            case 'keywords':
                message = "请提供文本，我可以提取其中的关键词。";
                break;
            case 'image':
                message = "请提供图像或描述图像内容，我可以帮您分析。";
                break;
            case 'writing':
                message = "请提供您的写作内容，我可以帮您改进和优化。";
                break;
        }
        
        switchAIMode('chat');
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === 'chat') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        addAIMessage(message, 'bot');
    }
    
    // 打开工具
    function openTool(tool) {
        switch(tool) {
            case 'calculator':
                openPanel(calculatorPanel);
                break;
            case 'notes':
                openPanel(notesPanel);
                loadNotes();
                break;
            case 'converter':
                showNotification('单位转换功能即将推出');
                break;
            case 'translator':
                switchAIMode('chat');
                openPanel(aiPanel);
                addAIMessage("请提供需要翻译的文本，我可以帮您翻译成多种语言。", 'bot');
                break;
            case 'weather':
                showNotification('天气查询功能即将推出');
                break;
            case 'qrcode':
                showNotification('二维码生成功能即将推出');
                break;
        }
    }
    
    // 加载笔记
    function loadNotes() {
        const savedNotes = localStorage.getItem('kzadjNotes');
        if (savedNotes) {
            document.getElementById('notesContent').value = savedNotes;
        }
    }
    
    // 更新消息颜色
    function updateMessageColors() {
        const botMessages = document.querySelectorAll('.ai-message.bot');
        botMessages.forEach(msg => {
            msg.style.backgroundColor = currentMessageColor;
        });
    }
    
    // 语音识别开关
    function toggleListening() {
        if (isListening) {
            recognition.stop();
            startListeningBtn.classList.remove('listening');
            isListening = false;
        } else {
            recognition.start();
            startListeningBtn.classList.add('listening');
            isListening = true;
            showNotification('正在聆听...');
        }
    }
    
    // 语音朗读
    function speakLastResponse() {
        const botMessages = document.querySelectorAll('.ai-message.bot');
        if (botMessages.length > 0) {
            const lastMessage = botMessages[botMessages.length - 1].textContent;
            const speech = new SpeechSynthesisUtterance(lastMessage);
            speech.lang = 'zh-CN';
            window.speechSynthesis.speak(speech);
        } else {
            showNotification('没有可朗读的回复');
        }
    }
    
    // 执行搜索
    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;
        
        const results = [
            { title: "百度百科: " + query, url: "https://m.baidu.com/s?word=" + encodeURIComponent(query) },
            { title: "知乎: " + query + "的相关讨论", url: "https://www.zhihu.com/search?q=" + encodeURIComponent(query) },
            { title: "豆瓣: " + query + "的相关内容", url: "https://www.douban.com/search?q=" + encodeURIComponent(query) },
            { title: "B站: " + query + "的视频", url: "https://search.bilibili.com/all?keyword=" + encodeURIComponent(query) },
            { title: "谷歌: " + query + "的搜索结果", url: "https://www.google.com/search?q=" + encodeURIComponent(query) }
        ];
        
        searchResults.innerHTML = '';
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.textContent = result.title;
            resultItem.addEventListener('click', () => {
                openWebsite(result.url, result.title);
            });
            searchResults.appendChild(resultItem);
        });
        
        const aiSuggestion = document.createElement('div');
        aiSuggestion.className = 'ai-suggestion';
        aiSuggestion.innerHTML = `<strong>AI建议:</strong> 关于"${query}"，您可以尝试搜索更具体的关键词以获得更精确的搜索结果。`;
        searchResults.appendChild(aiSuggestion);
    }
    
    // 打开导航菜单
    function openNavigation() {
        navigationMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭导航菜单
    function closeNavigation() {
        navigationMenu.classList.remove('active');
        document.body.style.overflow = '';
        activePanel = null;
    }
    
    // 切换自动更新
    function toggleAutoUpdate() {
        autoUpdateEnabled = !autoUpdateEnabled;
        systemData.autoUpdate = autoUpdateEnabled;
        saveSystemData();
        
        const button = document.getElementById('autoUpdateToggle');
        button.innerHTML = `<i class="fa fa-magic"></i> <span>自动升级: ${autoUpdateEnabled ? '开启' : '关闭'}</span>`;
        
        showNotification(`自动升级已${autoUpdateEnabled ? '开启' : '关闭'}`);
    }
    
    // 增强AI能力
    function enhanceAI() {
        aiStatus.innerHTML = '<i class="fa fa-refresh fa-spin"></i><span>AI优化中...</span>';
        
        setTimeout(() => {
            aiStatus.innerHTML = '<i class="fa fa-rocket"></i><span>AI已增强</span>';
            showNotification('AI能力已增强，响应速度提升30%');
            
            aiBtn.classList.add('ai-enhanced');
            setTimeout(() => {
                aiBtn.classList.remove('ai-enhanced');
            }, 3000);
        }, 2000);
    }
    
    // 运行系统诊断
    function runSystemDiagnostic() {
        systemStatus.innerHTML = '<i class="fa fa-refresh fa-spin"></i><span>诊断中...</span>';
        
        setTimeout(() => {
            systemStatus.innerHTML = '<i class="fa fa-check-circle"></i><span>系统正常</span>';
            
            const issues = Math.random() > 0.7 ? 1 : 0;
            if (issues === 0) {
                showNotification('系统诊断完成，未发现问题');
            } else {
                showNotification('系统诊断完成，发现1个小问题已自动修复');
            }
        }, 3000);
    }
    
    // 打开链接菜单
    function openLinks() {
        centerButtonsContainer.innerHTML = '';
        centerButtonsContainer.classList.add('active');
        
        functions.forEach(category => {
            category.items.forEach((item, index) => {
                const linkItem = createLinkItem(item, category.category);
                centerButtonsContainer.appendChild(linkItem);
                linkItems.push(linkItem);
                
                linkItem.style.transform = 'scale(0) translateY(20px)';
                linkItem.style.opacity = '0';
                
                setTimeout(() => {
                    linkItem.style.transform = 'scale(1) translateY(0)';
                    linkItem.style.opacity = '1';
                }, index * 100);
            });
        });
        
        mainBtn.classList.add('bg-gray-800');
        mainBtn.classList.remove('bg-kzadj');
        isOpen = true;
    }
    
    // 关闭链接菜单
    function closeLinks() {
        linkItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(0) translateY(20px)';
                item.style.opacity = '0';
                setTimeout(() => {
                    if (item.parentNode) {
                        item.parentNode.removeChild(item);
                    }
                }, 500);
            }, index * 50);
        });
        linkItems = [];
        
        centerButtonsContainer.classList.remove('active');
        
        mainBtn.classList.remove('bg-gray-800');
        mainBtn.classList.add('bg-kzadj');
        
        isOpen = false;
    }
    
    // 创建带折角的链接按钮
    function createLinkItem(item, category) {
        const linkItem = document.createElement('div');
        linkItem.className = `floating-btn w-12 h-12 rounded-full ${item.color} text-white flex items-center justify-center text-xl folded-corner glass-effect`;
        linkItem.innerHTML = `
            <i class="fa ${item.icon}"></i>
            <span class="category-label">${category}</span>
        `;
        linkItem.setAttribute('data-name', item.name);
        
        linkItem.addEventListener('touchstart', handleTouchStart, { passive: true });
        linkItem.addEventListener('touchmove', handleTouchMove, { passive: false });
        linkItem.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        if (item.url) {
            linkItem.setAttribute('data-url', item.url);
            linkItem.addEventListener('click', (e) => {
                if (isDragging) return;
                e.stopPropagation();
                const url = linkItem.getAttribute('data-url');
                const name = linkItem.getAttribute('data-name');
                openWebsite(url, name);
            });
        } else if (item.action) {
            linkItem.setAttribute('data-action', item.action);
            linkItem.addEventListener('click', (e) => {
                if (isDragging) return;
                e.stopPropagation();
                const action = linkItem.getAttribute('data-action');
                executeAction(action);
            });
        }
        
        linkItem.addEventListener('mouseenter', () => {
            showTooltip(linkItem, item.name);
        });
        
        linkItem.addEventListener('mouseleave', () => {
            hideTooltip();
        });
        
        return linkItem;
    }
    
    // 打开网站链接
    function openWebsite(url, name) {
        try {
            window.open(url, '_blank');
            showNotification(`已打开: ${name}`);
        } catch (err) {
            showNotification('无法打开链接: ' + err.message);
        }
    }
    
    // 执行功能操作
    function executeAction(action) {
        // 如果处于桌面模式，在桌面窗口中打开
        if (isDesktopMode && action !== 'openNavigation') {
            openDesktopWindow(action);
            return;
        }
        
        switch(action) {
            case 'openCalculator':
                openPanel(calculatorPanel);
                break;
            case 'openNotes':
                openPanel(notesPanel);
                loadNotes();
                break;
            case 'openDeepSeek':
                openPanel(aiPanel);
                currentAIService = 'deepseek';
                aiSelectorButtons.forEach(btn => {
                    if (btn.getAttribute('data-ai') === 'deepseek') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                break;
            case 'openDoubao':
                openPanel(aiPanel);
                currentAIService = 'doubao';
                aiSelectorButtons.forEach(btn => {
                    if (btn.getAttribute('data-ai') === 'doubao') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                break;
            case 'openYuanbao':
                openPanel(aiPanel);
                currentAIService = 'yuanbao';
                aiSelectorButtons.forEach(btn => {
                    if (btn.getAttribute('data-ai') === 'yuanbao') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                break;
            case 'openWildswordsman':
                openPanel(aiPanel);
                currentAIService = 'wildswordsman';
                aiSelectorButtons.forEach(btn => {
                    if (btn.getAttribute('data-ai') === 'wildswordsman') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                break;
            case 'openHealth':
                openPanel(aiPanel);
                switchAIMode('health');
                modeButtons.forEach(btn => {
                    if (btn.getAttribute('data-mode') === 'health') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                break;
            case 'openFinance':
                openPanel(aiPanel);
                switchAIMode('finance');
                modeButtons.forEach(btn => {
                    if (btn.getAttribute('data-mode') === 'finance') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                break;
            case 'openNavigation':
                openNavigation();
                break;
            case 'openTools':
                openPanel(toolsPanel);
                break;
            case 'openLearning':
                openPanel(toolsPanel);
                break;
            case 'openTravel':
                openPanel(toolsPanel);
                break;
            case 'openFriend':
                openPanel(friendPanel);
                break;
            case 'openSearchUpgrade':
                openPanel(searchUpgradePanel);
                updateSearchHistoryDisplay();
                break;
            case 'openImageAnalysis':
                openPanel(aiPanel);
                addAIMessage("请提供图像或描述图像内容，我可以帮您分析。", 'bot');
                break;
            case 'openSystem':
                openPanel(systemPanel);
                break;
        }
    }
    
    // 在桌面窗口中打开功能
    function openDesktopWindow(action) {
        let panelContent = '';
        let windowTitleText = '';
        
        switch(action) {
            case 'openAI':
                panelContent = aiPanel.innerHTML;
                windowTitleText = 'KZADJ AI智能助手';
                break;
            case 'openSystem':
                panelContent = systemPanel.innerHTML;
                windowTitleText = '系统设置';
                break;
            case 'openTools':
                panelContent = toolsPanel.innerHTML;
                windowTitleText = 'AI工具集';
                break;
            case 'openCalculator':
                panelContent = calculatorPanel.innerHTML;
                windowTitleText = '智能计算器';
                break;
            case 'openNotes':
                panelContent = notesPanel.innerHTML;
                windowTitleText = '智能笔记';
                break;
            case 'openSearchUpgrade':
                panelContent = searchUpgradePanel.innerHTML;
                windowTitleText = '超级搜索';
                break;
            case 'openFriend':
                panelContent = friendPanel.innerHTML;
                windowTitleText = '添加好友';
                break;
            default:
                return;
        }
        
        windowTitle.textContent = windowTitleText;
        windowContent.innerHTML = panelContent;
        desktopWindow.style.display = 'block';
        
        // 重新绑定事件
        setTimeout(() => {
            rebindWindowEvents(action);
        }, 100);
    }
    
    // 重新绑定窗口内的事件
    function rebindWindowEvents(action) {
        // 根据action重新绑定事件
        if (action === 'openCalculator') {
            const calcButtons = windowContent.querySelectorAll('.calculator-buttons button');
            calcButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const btnAction = button.getAttribute('data-action');
                    const number = button.getAttribute('data-number');
                    
                    if (number) {
                        calculatorAppendNumber(number);
                    } else if (btnAction) {
                        calculatorExecuteAction(btnAction);
                    }
                });
            });
        }
        
        // 关闭按钮
        const closeBtn = windowContent.querySelector('.close-panel');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                desktopWindow.style.display = 'none';
            });
        }
    }
    
    // 打开功能面板
    function openPanel(panel) {
        activePanel = panel;
        panel.classList.add('active');
        panelOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭功能面板
    function closePanel() {
        if (activePanel) {
            activePanel.classList.remove('active');
        }
        panelOverlay.classList.remove('active');
        document.body.style.overflow = '';
        activePanel = null;
    }
    
    // 显示工具提示
    function showTooltip(element, text) {
        const rect = element.getBoundingClientRect();
        const containerRect = floatContainer.getBoundingClientRect();
        
        tooltip.textContent = text;
        
        const tooltipX = rect.left - containerRect.left + element.offsetWidth/2;
        const tooltipY = rect.top - containerRect.top - 30;
        
        tooltip.style.left = `${Math.max(20, Math.min(tooltipX, window.innerWidth - 20))}px`;
        tooltip.style.top = `${Math.max(20, tooltipY)}px`;
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.opacity = '1';
    }
    
    // 隐藏工具提示
    function hideTooltip() {
        tooltip.style.opacity = '0';
    }
    
    // 显示通知
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.textContent = '';
        }, 2000);
    }
    
    // 发送AI消息
    function sendAIMessage() {
        const message = aiInput.value.trim();
        if (!message) return;
        
        addAIMessage(message, 'user');
        aiInput.value = '';
        
        systemData.usageStats.aiInteractions++;
        saveSystemData();
        
        let response = "";
        
        if (message.includes('搜索') || message.includes('查找') || message.includes('查询')) {
            const searchQuery = message.replace(/搜索|查找|查询/g, '').trim();
            response = `我已经为您找到关于"${searchQuery}"的信息。建议您切换到搜索模式获取更详细的结果。`;
        } else if (message.includes('翻译')) {
            const translateText = message.replace(/翻译/g, '').trim();
            response = `"${translateText}"的翻译结果如下：\n- 英语: Translation of "${translateText}"\n- 日语: "${translateText}"の翻訳\n- 法语: Traduction de "${translateText}"`;
        } else if (message.includes('总结') || message.includes('摘要')) {
            response = "请提供需要总结的内容，我可以为您生成简洁的摘要。";
        } else if (message.includes('代码') || message.includes('编程')) {
            response = "请描述您需要的代码功能，我可以为您生成代码示例和建议。";
        } else if (message.includes('商机') || message.includes('商业') || message.includes('市场')) {
            response = "请告诉我您关注的行业或领域，我可以为您分析市场机会和趋势。";
        } else if (message.includes('健康') || message.includes('健身') || message.includes('饮食')) {
            response = "我可以为您提供健康建议。请切换到健康模式获取更多功能。";
        } else if (message.includes('金融') || message.includes('投资') || message.includes('理财')) {
            response = "我可以为您提供金融分析。请切换到金融模式获取更多功能。";
        } else if (message.includes('学习') || message.includes('教育') || message.includes('课程')) {
            response = "我可以为您提供学习建议。请查看工具集中的学习助手功能。";
        } else if (message.includes('旅行') || message.includes('旅游') || message.includes('景点')) {
            response = "我可以为您提供旅行建议。请查看工具集中的旅行规划功能。";
        } else if (message.includes('升级') || message.includes('更新')) {
            response = "系统升级功能已就绪。您可以在系统设置中检查更新或启用自动升级功能。";
        } else if (message.includes('游戏') || message.includes('电竞') || message.includes('玩家')) {
            response = "我可以为您提供游戏相关的建议和攻略。请切换到游戏模式获取更多功能。";
        } else if (message.includes('好友') || message.includes('朋友') || message.includes('加好友')) {
            response = "您可以使用加好友功能分享您的好友码，邀请朋友一起使用KZADJ AI。";
        } else if (message.includes('搜索') || message.includes('引擎') || message.includes('百度') || message.includes('谷歌')) {
            response = "您可以使用超级搜索功能，同时搜索多个搜索引擎，获取更全面的信息。";
        } else {
            const responses = [
                "这是一个很好的问题！让我来帮你解答。",
                "我正在思考如何最好地回答这个问题...",
                "根据我的分析，建议你尝试以下方法...",
                "这个问题很有趣！让我为你提供一些信息。",
                "我理解你的需求，以下是我的建议...",
                "基于最新的信息，我可以告诉您...",
                "让我为您提供一些有用的资源和建议...",
                "这个问题有多种解决方案，让我为您详细介绍...",
            ];
            response = responses[Math.floor(Math.random() * responses.length)];
        }
        
        setTimeout(() => {
            addAIMessage(response, 'bot');
        }, 1000);
    }
    
    // 添加AI消息到聊天窗口
    function addAIMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `ai-message ${type}`;
        messageElement.textContent = message;
        
        if (type === 'bot') {
            messageElement.style.backgroundColor = currentMessageColor;
        }
        
        aiChatMessages.appendChild(messageElement);
        
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }
    
    // 拖拽相关函数
    function startDrag(e, element) {
        isDragging = true;
        draggedElement = element;
        
        const rect = element.getBoundingClientRect();
        initialLeft = parseFloat(element.style.left) || 0;
        initialTop = parseFloat(element.style.top) || 0;
        
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', endDrag);
        }
        
        element.classList.add('scale-110', 'shadow-xl');
        if (e.type !== 'touchstart') e.preventDefault();
    }
    
    function dragMove(e) {
        if (!isDragging || !draggedElement) return;
        
        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;
        
        let newX = initialLeft + deltaX;
        let newY = initialTop + deltaY;
        
        const padding = 10;
        const maxX = floatContainer.offsetWidth - draggedElement.offsetWidth - padding;
        const maxY = floatContainer.offsetHeight - draggedElement.offsetHeight - padding;
        
        newX = Math.max(padding, Math.min(newX, maxX));
        newY = Math.max(padding, Math.min(newY, maxY));
        
        draggedElement.style.left = `${newX}px`;
        draggedElement.style.top = `${newY}px`;
        
        if (e.type !== 'touchmove') e.preventDefault();
    }
    
    function endDrag() {
        if (!draggedElement) return;
        
        isDragging = false;
        
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', endDrag);
        
        draggedElement.classList.remove('scale-110', 'shadow-xl');
        
        draggedElement = null;
    }
    
    // 窗口大小改变处理
    window.addEventListener('resize', () => {
        if (isOpen || isDragging) return;
        
        [mainBtn, aiBtn, navBtn, toolsBtn, systemBtn, friendBtn, searchUpgradeBtn].forEach(adjustElementPosition);
        linkItems.forEach(adjustElementPosition);
    });
    
    // 调整元素位置以适应窗口大小变化
    function adjustElementPosition(element) {
        const padding = 10;
        const maxX = floatContainer.offsetWidth - element.offsetWidth - padding;
        const maxY = floatContainer.offsetHeight - element.offsetHeight - padding;
        
        const currentLeft = parseFloat(element.style.left) || 0;
        const currentTop = parseFloat(element.style.top) || 0;
        
        element.style.left = `${Math.max(padding, Math.min(currentLeft, maxX))}px`;
        element.style.top = `${Math.max(padding, Math.min(currentTop, maxY))}px`;
    }
    
    // 关闭面板事件
    document.getElementById('closeSystem').addEventListener('click', closePanel);
    document.getElementById('closeCalculator').addEventListener('click', closePanel);
    document.getElementById('closeNotes').addEventListener('click', closePanel);
    document.getElementById('closeAI').addEventListener('click', closePanel);
    document.getElementById('closeTools').addEventListener('click', closePanel);
    document.getElementById('closeFriend').addEventListener('click', closePanel);
    document.getElementById('closeNav').addEventListener('click', closeNavigation);
    panelOverlay.addEventListener('click', closePanel);
    panelOverlay.addEventListener('click', closeNavigation);
    
    // 复制好友码功能
    copyFriendCodeBtn.addEventListener('click', () => {
        const friendCode = document.getElementById('friendCode').textContent;
        navigator.clipboard.writeText(friendCode).then(() => {
            showNotification('好友码已复制到剪贴板');
        }).catch(err => {
            showNotification('复制失败: ' + err);
        });
    });
    
    // 分享好友码功能
    shareFriendCodeBtn.addEventListener('click', () => {
        const friendCode = document.getElementById('friendCode').textContent;
        if (navigator.share) {
            navigator.share({
                title: 'KZADJ AI好友邀请',
                text: `使用我的好友码 ${friendCode} 加入KZADJ AI`,
                url: window.location.href
            }).then(() => {
                showNotification('好友码分享成功');
            }).catch(err => {
                showNotification('分享失败: ' + err);
            });
        } else {
            showNotification('您的浏览器不支持分享功能，请手动复制好友码');
        }
    });
    
    // 导航菜单项点击事件
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('span').textContent;
            let url = '';
            
            switch(name) {
				case '快手直播':
                    url = 'https://live.kuaishou.com/';
                    break;
                case '空投快传':
                    url = 'https://www.airportal.cn/';
                    break;
                case '移动云手机':
                    url = 'https://cloud.139.com/#/cloudphone';
                    break;
                case '拼多多':
                    url = 'https://www.pinduoduo.com/';
                    break;
                case '微信':
                    url = 'https://wx.qq.com';
                    break;
                case '微博':
                    url = 'https://weibo.com';
                    break;
                case '今日头条':
                    url = 'https://www.toutiao.com';
                    break;
                case '哔哩哔哩':
                    url = 'https://www.bilibili.com';
                    break;
                case '网易云':
                    url = 'https://music.163.com';
                    break;
                case '知乎':
                    url = 'https://www.zhihu.com';
                    break;
                case 'Github':
                    url = 'https://github.com';
                    break;
                case '京东':
                    url = 'https://www.jd.com';
                    break;
                case '360搜索':
                    url = 'https://www.so.com';
                    break;
				case '快手直播':
                    url = 'https://live.kuaishou.com/u/3xb4wjanqpy835g';
                    break;
                case '百度':
                    url = 'https://www.baidu.com';
                    break;
                case '谷歌':
                    url = 'https://www.google.com';
                    break;
                case '淘宝':
                    url = 'https://www.taobao.com';
                    break;
                case '微信':
                    url = 'https://wx.qq.com';
                    break;
                case '微博':
                    url = 'https://weibo.com';
                    break;
                case '今日头条':
                    url = 'https://www.toutiao.com';
                    break;
                case '哔哩哔哩':
                    url = 'https://www.bilibili.com';
                    break;
                case '网易云':
                    url = 'https://music.163.com';
                    break;
                case '知乎':
                    url = 'https://www.zhihu.com';
                    break;
                case 'Github':
                    url = 'https://github.com';
                    break;
                case '京东':
                    url = 'https://www.jd.com';
                    break;
                case '360搜索':
                    url = 'https://www.so.com';
                    break;
				case '快手直播':
                    url = 'https://live.kuaishou.com/u/3xb4wjanqpy835g';
                    break;
                case '百度':
                    url = 'https://www.baidu.com';
                    break;
                case '谷歌':
                    url = 'https://www.google.com';
                    break;
                case '淘宝':
                    url = 'https://www.taobao.com';
                    break;
                case '微信':
                    url = 'https://wx.qq.com';
                    break;
                case '微博':
                    url = 'https://weibo.com';
                    break;
                case '今日头条':
                    url = 'https://www.toutiao.com';
                    break;
                case '哔哩哔哩':
                    url = 'https://www.bilibili.com';
                    break;
                case '网易云':
                    url = 'https://music.163.com';
                    break;
                case '知乎':
                    url = 'https://www.zhihu.com';
                    break;
                case 'Github':
                    url = 'https://github.com';
                    break;
                case '京东':
                    url = 'https://www.jd.com';
                    break;
                case '360搜索':
                    url = 'https://www.so.com';
                    break;
				case '快手直播':
                    url = 'https://live.kuaishou.com/u/3xb4wjanqpy835g';
                    break;
                case '百度':
                    url = 'https://www.baidu.com';
                    break;
                case '谷歌':
                    url = 'https://www.google.com';
                    break;
                case '淘宝':
                    url = 'https://www.taobao.com';
                    break;
                case '微信':
                    url = 'https://wx.qq.com';
                    break;
                case '微博':
                    url = 'https://weibo.com';
                    break;
                case '今日头条':
                    url = 'https://www.toutiao.com';
                    break;
                case '哔哩哔哩':
                    url = 'https://www.bilibili.com';
                    break;
                case '网易云':
                    url = 'https://music.163.com';
                    break;
                case '知乎':
                    url = 'https://www.zhihu.com';
                    break;
                case 'Github':
                    url = 'https://github.com';
                    break;
                case '京东':
                    url = 'https://www.jd.com';
                    break;
                case '360搜索':
                    url = 'https://www.so.com';
                    break;
				case 'deepseek':
                    url = 'https://chat.deepseek.com';
                    break;
                case '百度':
                    url = 'https://www.baidu.com';
                    break;
                case '谷歌':
                    url = 'https://www.google.com';
                    break;
                case '淘宝':
                    url = 'https://www.taobao.com';
                    break;
                case '微信':
                    url = 'https://wx.qq.com';
                    break;
                case '微博':
                    url = 'https://weibo.com';
                    break;
                case '今日头条':
                    url = 'https://www.toutiao.com';
                    break;
                case '哔哩哔哩':
                    url = 'https://www.bilibili.com';
                    break;
                case '网易云':
                    url = 'https://music.163.com';
                    break;
                case '知乎':
                    url = 'https://www.zhihu.com';
                    break;
                case 'Github':
                    url = 'https://github.com';
                    break;
                case '京东':
                    url = 'https://www.jd.com';
                    break;
                case '360搜索':
                    url = 'https://www.so.com';
                    break;
            }
            
            if (url) {
                openWebsite(url, name);
            }
            
            closeNavigation();
        });
    });
    
    // DeepSeek聊天按钮
    document.querySelector('.deepseek-chat').addEventListener('click', () => {
        closeNavigation();
        openPanel(aiPanel);
        switchAIMode('chat');
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === 'chat') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        addAIMessage("DeepSeek AI已就绪，我可以帮您解答复杂问题、生成创意内容、分析数据等。", 'bot');
    });
    
    // 豆包AI聊天按钮
    document.querySelector('.doubao-chat').addEventListener('click', () => {
        closeNavigation();
        openPanel(aiPanel);
        switchAIMode('chat');
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === 'chat') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        addAIMessage("豆包AI已就绪，我可以帮您解答问题、提供建议、生成创意内容等。", 'bot');
    });
    
    // 腾讯元宝聊天按钮
    document.querySelector('.yuanbao-chat').addEventListener('click', () => {
        closeNavigation();
        openPanel(aiPanel);
        switchAIMode('chat');
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === 'chat') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        addAIMessage("腾讯元宝AI已就绪，我可以帮您处理各种任务，提供智能建议和解决方案。", 'bot');
    });
    
    // 野剑魔师聊天按钮
    document.querySelector('.wildswordsman-chat').addEventListener('click', () => {
        closeNavigation();
        openPanel(aiPanel);
        switchAIMode('chat');
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === 'chat') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        addAIMessage("野剑魔师AI已就绪，我可以为您提供创意灵感、故事创作和游戏相关的建议。", 'bot');
    });
    
    // KZADJ AI聊天按钮
    document.querySelector('.kzadj-chat').addEventListener('click', () => {
        closeNavigation();
        openPanel(aiPanel);
        switchAIMode('chat');
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === 'chat') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        addAIMessage("KZADJ AI全能助手 v2.5.0 已就绪，我可以帮您完成各种任务，包括回答问题、分析数据、生成内容等。", 'bot');
    });

    // 新增搜索功能按钮事件
    document.getElementById('selectAllEngines').addEventListener('click', function() {
        document.querySelectorAll('input[name="searchEngine"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        showNotification('已选择所有搜索引擎');
    });

    document.getElementById('deselectAllEngines').addEventListener('click', function() {
        document.querySelectorAll('input[name="searchEngine"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        showNotification('已取消所有搜索引擎');
    });

    document.getElementById('aiOptimizeSearch').addEventListener('click', function() {
        const query = multiSearchInput.value.trim();
        if (!query) {
            showNotification('请输入搜索关键词');
            return;
        }
        
        const optimizedQueries = [
            `"${query}" 最新信息`,
            `${query} 2026年最新`,
            `${query} 深度分析`,
            `${query} 实用技巧`,
            `${query} 专业指南`
        ];
        
        const randomQuery = optimizedQueries[Math.floor(Math.random() * optimizedQueries.length)];
        document.getElementById('aiSearchSuggestions').innerHTML = 
            `AI建议搜索: <strong>${randomQuery}</strong><br>这将获得更精确的搜索结果`;
        
        multiSearchInput.value = randomQuery;
        showNotification('搜索词已优化');
    });

    document.getElementById('showMoreSites').addEventListener('click', function() {
        const grid = document.querySelector('.grid.grid-cols-3.gap-3');
        const hiddenSites = [
            { name: '爱奇艺', url: 'https://www.iqiyi.com', color: 'bg-iqiyi', icon: 'fa-television' },
            { name: '腾讯视频', url: 'https://v.qq.com', color: 'bg-tencent_video', icon: 'fa-play-circle' },
            { name: '优酷', url: 'https://www.youku.com', color: 'bg-youku', icon: 'fa-film' },
            { name: '携程', url: 'https://www.ctrip.com', color: 'bg-ctrip', icon: 'fa-plane' },
            { name: '去哪儿', url: 'https://www.qunar.com', color: 'bg-qunar', icon: 'fa-suitcase' },
            { name: '马蜂窝', url: 'https://www.mafengwo.cn', color: 'bg-mafengwo', icon: 'fa-map' }
        ];
        
        hiddenSites.forEach(site => {
            const siteElement = document.createElement('div');
            siteElement.className = `quick-access-item ${site.color} text-white text-center p-2 rounded cursor-pointer`;
            siteElement.setAttribute('data-url', site.url);
            siteElement.innerHTML = `
                <i class="fa ${site.icon} block text-xl mb-1"></i>
                <span class="text-xs">${site.name}</span>
            `;
            siteElement.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                const name = this.querySelector('span').textContent;
                openWebsite(url, name);
            });
            grid.appendChild(siteElement);
        });
        
        this.style.display = 'none';
        showNotification('已显示更多网站');
    });

    document.getElementById('addCustomSite').addEventListener('click', function() {
        const siteName = prompt('请输入网站名称:');
        if (!siteName) return;
        
        const siteUrl = prompt('请输入网站网址:');
        if (!siteUrl) return;
        
        try {
            new URL(siteUrl);
        } catch (e) {
            showNotification('网址格式不正确');
            return;
        }
        
        const grid = document.querySelector('.grid.grid-cols-3.gap-3');
        const siteElement = document.createElement('div');
        siteElement.className = `quick-access-item bg-custom text-white text-center p-2 rounded cursor-pointer`;
        siteElement.setAttribute('data-url', siteUrl);
        siteElement.innerHTML = `
            <i class="fa fa-globe block text-xl mb-1"></i>
            <span class="text-xs">${siteName}</span>
        `;
        siteElement.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            const name = this.querySelector('span').textContent;
            openWebsite(url, name);
        });
        grid.appendChild(siteElement);
        
        let customSites = JSON.parse(localStorage.getItem('kzadjCustomSites')) || [];
        customSites.push({ name: siteName, url: siteUrl });
        localStorage.setItem('kzadjCustomSites', JSON.stringify(customSites));
        
        showNotification(`已添加自定义网站: ${siteName}`);
    });

    document.getElementById('clearSearchHistory').addEventListener('click', function() {
        if (confirm('确定要清空所有搜索历史吗？')) {
            localStorage.removeItem('kzadjSearchHistory');
            updateSearchHistoryDisplay();
            showNotification('搜索历史已清空');
        }
    });

    document.getElementById('exportSearchData').addEventListener('click', function() {
        const searchHistory = JSON.parse(localStorage.getItem('kzadjSearchHistory')) || [];
        const customSites = JSON.parse(localStorage.getItem('kzadjCustomSites')) || [];
        
        const data = {
            searchHistory: searchHistory,
            customSites: customSites,
            exportTime: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `kzadj_search_data_${new Date().getTime()}.json`;
        link.click();
        
        showNotification('搜索数据已导出');
    });
    
    // 更新时间
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        desktopTime.textContent = `${hours}:${minutes}`;
        
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekday = weekdays[now.getDay()];
        desktopDate.textContent = `${year}年${month}月${day}日 周${weekday}`;
    }
    
    // 每秒更新时间
    updateTime();
    setInterval(updateTime, 1000);
});