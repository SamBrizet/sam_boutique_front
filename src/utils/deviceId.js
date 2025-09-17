export const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  
  if (!deviceId) {
    // Crear ID basado en características del navegador
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      window.screen.width + 'x' + window.screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    deviceId = 'device_' + btoa(fingerprint).substr(0, 20);
    localStorage.setItem('deviceId', deviceId);
  }
  
  return deviceId;
};
