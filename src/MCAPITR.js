class MCAPITR {
  constructor() {
    this.baseURL = "https://mcapi.tr/api";
  }

  /**
   * Helper method to handle JSON fetching
   */
  async _fetchJSON(endpoint, options = {}) {
    const params = new URLSearchParams(options).toString();
    const url = params ? `${this.baseURL}${endpoint}?${params}` : `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      throw new Error(`MCAPITR Error [${endpoint}]: ${error.message}`);
    }
  }

  /**
   * Helper method to fetch a Buffer (Image)
   */
  async _fetchBuffer(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      throw new Error(`MCAPITR Buffer Error: ${error.message}`);
    }
  }

  /**
   * 1. Checks the status of a Minecraft server
   * @param {string} address - Server address (IP or domain)
   * @param {Object} options - Optional parameters
   * @param {boolean} [options.legacy=false] - For servers older than 1.7.2
   * @param {boolean} [options.bedrock=false] - For Bedrock edition servers
   * @returns {Promise<Object>} Server status
   */
  async serverStatus(address, options = {}) {
    return this._fetchJSON(`/status/${address}`, options);
  }

  /**
   * 2. Gets the dynamic favicon URL of a Minecraft server
   * @param {string} address - Server address (IP or domain)
   * @returns {string} Server favicon URL
   */
  serverIcon(address) {
    return `${this.baseURL}/icon/dynamic?address=${address}`;
  }

  /**
   * Gets the dynamic favicon as a Buffer
   * @param {string} address - Server address (IP or domain)
   * @returns {Promise<Buffer>}
   */
  async serverIconBuffer(address) {
    return this._fetchBuffer(this.serverIcon(address));
  }

  /**
   * 3. Gets the sharp/rounded high-res favicon URL of a Minecraft server
   * @param {string} address - Server address (IP or domain)
   * @returns {string} Sharp favicon URL
   */
  sharpIcon(address) {
    return `${this.baseURL}/icon/sharp?address=${address}`;
  }

  /**
   * Gets the sharp/rounded high-res favicon as a Buffer
   * @param {string} address - Server address (IP or domain)
   * @returns {Promise<Buffer>}
   */
  async sharpIconBuffer(address) {
    return this._fetchBuffer(this.sharpIcon(address));
  }

  /**
   * 4. Gets the MOTD banner URL of a Minecraft server
   * @param {string} address - Server address (IP or domain)
   * @returns {string} Server banner URL
   */
  serverBanner(address) {
    return `${this.baseURL}/banner/${address}`;
  }

  /**
   * Gets the MOTD banner as a Buffer
   * @param {string} address - Server address (IP or domain)
   * @returns {Promise<Buffer>}
   */
  async serverBannerBuffer(address) {
    return this._fetchBuffer(this.serverBanner(address));
  }

  /**
   * 5. Gets a custom MOTD banner URL from raw MOTD text
   * @param {string} motdText - Raw Minecraft MOTD text (e.g., &aHello &bWorld)
   * @returns {string} Custom MOTD banner URL
   */
  motdBanner(motdText) {
    return `${this.baseURL}/banner/motd?motd=${encodeURIComponent(motdText)}`;
  }

  /**
   * Gets a custom MOTD banner as a Buffer
   * @param {string} motdText - Raw Minecraft MOTD text
   * @returns {Promise<Buffer>}
   */
  async motdBannerBuffer(motdText) {
    return this._fetchBuffer(this.motdBanner(motdText));
  }

  /**
   * 6. Gets the list of popular servers
   * @returns {Promise<Array>} List of popular servers
   */
  async popularServers() {
    return this._fetchJSON(`/popular-servers`);
  }

  /**
   * 8. Generates an iframe widget URL for a server
   * @param {string} address - Server address (IP or domain)
   * @param {string} [size='large'] - Widget size ('small', 'medium', 'large')
   * @param {string} [theme='dark'] - 'dark' or 'light'
   * @returns {string} Widget URL
   */
  widget(address, size = 'large', theme = 'dark') {
    return `${this.baseURL}/widget/${size}/${address}?theme=${theme}`;
  }
}

module.exports = MCAPITR;
