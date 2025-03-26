// errorHandling.js
export const fetchWithErrorHandling = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Lỗi: ${response.status}`);
      return response.json();
    } catch (error) {
      return { error: error.message };
    }
  };
  