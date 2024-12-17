
       async function trackVisit() {
        let usbId = localStorage.getItem('usbId');
        if (usbId) {
            alert("USB already registered.");
            return;
        }
           
        const date = new Date();
        date.setMinutes(0, 0, 0); 
        const timestamp = date.toISOString().split('.')[0].replace(/[^0-9]/g, '-');
        
        const random = Math.floor(Math.random() * 10000);
        usbId = `usb-${timestamp}-${random}`;
        localStorage.setItem('usbId', usbId);
        
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

            const statsResponse = await fetch('https://hyperguards.pythonanywhere.com/stats');
            if (!statsResponse.ok) {
                throw new Error(`HTTP error! status: ${statsResponse.status}`);
            }
            
            const stats = await statsResponse.json();
            document.getElementById('totalVisits').textContent = stats.totalVisits;
        } catch (error) {
            console.error('Tracking error:', error);
            alert('Fehler beim Tracking: ' + error.message);
        }
    }
    trackVisit();
    
