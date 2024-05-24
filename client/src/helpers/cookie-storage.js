export const getItem = (key) => {
    try {
      const cookies = Object.fromEntries(
        document.cookie.split(';').map(cookie => cookie.split('=').map(c => c.trim()))
      );
  
      return cookies[key] || null;
    } catch (error) {
      console.log('Error getting data');
      return null;
    }
  };
  