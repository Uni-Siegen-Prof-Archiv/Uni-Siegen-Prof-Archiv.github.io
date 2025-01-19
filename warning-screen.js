document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const warnScreen = document.getElementById('warnScreen');
        const mainContent = document.getElementById('mainContent');

        warnScreen.style.opacity = '0';
        warnScreen.style.transition = 'opacity 1s';

        mainContent.style.display = 'flex';

        setTimeout(() => {
            warnScreen.style.display = 'none';
        }, 1000);
    }, 2000);
});