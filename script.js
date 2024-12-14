// 获取元素
const settingsButton = document.getElementById('settings');
const modal = document.getElementById('settings-modal');
const closeModalButton = document.getElementById('close-modal');
const randomImageButton = document.getElementById('set-random-image');
const todayImageButton = document.getElementById('set-today-image');

// 显示模态框
settingsButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('visible');
});

// 隐藏模态框
closeModalButton.addEventListener('click', () => {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
});

// 随机每日一图功能
function randomDailyImage() {
    fetch('https://api.vvhan.com/api/bing?type=json&rand=sj')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch random image');
            return response.json();
        })
        .then(data => {
            document.querySelector('.background').style.backgroundImage = `url(${data.data.url})`;
            alert('已切换至随机每日一图！');
        })
        .catch(error => {
            console.error('Error fetching random image:', error);
            alert('加载失败，请稍后再试！');
        });
}

// 今日每日一图功能
function todayDailyImage() {
    fetch('https://api.vvhan.com/api/bing?type=json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch today image');
            return response.json();
        })
        .then(data => {
            document.querySelector('.background').style.backgroundImage = `url(${data.data.url})`;
            alert('已切换至今天每日一图！');
        })
        .catch(error => {
            console.error('Error fetching today image:', error);
            alert('加载失败，请稍后再试！');
        });
}

// 显示当前时间
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('time').innerText = `${dateString} ${timeString}`;
}

setInterval(updateTime, 1000);

// 加载名言
function loadQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch quote');
            return response.json();
        })
        .then(data => {
            document.getElementById('quote').innerText = `“${data.content}” — 《${data.author}》`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            document.getElementById('quote').innerText = '“无法加载名言，请稍后重试。”';
        });
}

// 获取时间与日期
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
    const dateString = now.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('time').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

setInterval(updateTime, 1000);
updateTime();

// 名言获取
function updateQuote() {
    fetch('https://v1.hitokoto.cn/?c=i')
        .then(response => response.json())
        .then(data => {
            document.getElementById('quote').textContent = data.hitokoto;
            document.getElementById('author').textContent = `—— ${data.from}`;
        })
        .catch(() => {
            document.getElementById('quote').textContent = '获取失败，请稍后再试！';
            document.getElementById('author').textContent = '';
        });
}

updateQuote();

loadQuote();
todayDailyImage()
// 按钮绑定功能
randomImageButton.addEventListener('click', randomDailyImage);
todayImageButton.addEventListener('click', todayDailyImage);
document.getElementById('refresh-time').addEventListener('click', updateTime);