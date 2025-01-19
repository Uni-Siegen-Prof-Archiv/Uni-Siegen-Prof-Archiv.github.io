document.addEventListener('DOMContentLoaded', function() {
    const warnScreen = document.getElementById('warnScreen');
    const mainContent = document.getElementById('mainContent');

    warnScreen.style.display = 'flex';
    mainContent.style.display = 'none';

    setTimeout(() => {
        warnScreen.style.opacity = '0';
        warnScreen.style.transition = 'opacity 1s ease-in-out';

        mainContent.style.display = 'block';

        setTimeout(() => {
            warnScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 1000);
    }, 1500);
});