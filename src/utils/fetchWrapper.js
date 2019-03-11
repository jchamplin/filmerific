/**
 * Fetchwrapper class
 * This appends the API key to all requests
 */
class FetchWrapper {
  constructor(api_key = 'a5adaa4152f931848b18f31341621c54') {
    this.defaults = {
      api_key,
    };
  }

  /**
   * Fetch get wrapper
   * 
   * @param {string} path - url to get data from 
   */
  async get(path) {
    const body = {
      method: 'get',
    }
    let fullPath;

    if(path.includes('?')) {
      fullPath = `${path}&api_key=${this.defaults.api_key}`;
    } else {
      fullPath = `${path}?api_key=${this.defaults.api_key}`;
    }
    
    const response = await fetch(fullPath, {...this.defaults, ...body});
    return response.json();
  }
}

export const fetchWrapper = new FetchWrapper();
