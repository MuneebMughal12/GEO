import API from './api';

/**
 * Resolves static local server file paths (e.g., starting with /uploads)
 * to absolute URLs using the API base URL.
 * 
 * @param {string} url - The media URL or file path.
 * @returns {string} The resolved absolute URL or original string.
 */
export const getMediaUrl = (url) => {
  if (!url) return '';
  if (typeof url !== 'string') return url;
  if (url.startsWith('/uploads')) {
    const base = API.defaults.baseURL ? API.defaults.baseURL.replace(/\/api$/, '') : 'http://localhost:5000';
    return `${base}${url}`;
  }
  return url;
};
