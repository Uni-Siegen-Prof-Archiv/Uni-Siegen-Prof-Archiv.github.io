async function fetchStats() {
    try {
        const response = await fetch('https://hyperguards.pythonanywhere.com/stats');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stats = await response.json();
        updateStatsDisplay(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        document.getElementById('totalVisits').textContent = 'Fehler beim Abfragen der Statistik';
    }
}

document.getElementById('totalVisits').textContent = 'Wird geladen ...';

function updateStatsDisplay(stats) {
    const element = document.getElementById('totalVisits');
    if (!stats) {
        element.textContent = 'Keine Daten verfügbar';
        return;
    }
    if (typeof stats.totalVisits !== 'number') {
        element.textContent = 'Ungültiges Datenformat';
        return;
    }
    element.textContent = stats.totalVisits;
}
async function registerNewVisit() {
    const date = new Date();
    date.setMinutes(0, 0, 0);
    const timestamp = date.toISOString().split('.')[0].replace(/[^0-9]/g, '-');
    const random = Math.floor(Math.random() * 10000);
    const usbId = `usb-${timestamp}-${random}`;
    
    try {
        const response = await fetch('https://hyperguards.pythonanywhere.com/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usbId: usbId })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        localStorage.setItem('usbId', usbId);
        await fetchStats(); 
    } catch (error) {
        console.error('Error registering visit:', error);
    }
}

async function checkAndTrackVisit() {
    const usbId = localStorage.getItem('usbId');
    if (!usbId) {
        await registerNewVisit();
    } else {
        console.log("USB bereits registriert:", usbId);
    }
}

fetchStats();

checkAndTrackVisit();

setInterval(fetchStats, 30000);
