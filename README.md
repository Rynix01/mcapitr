# MCAPI.TR Node.js API Wrapper

<div align="center">
  <p>The official, fully-typed Node.js API wrapper for <strong>MCAPI.TR</strong>. Easily fetch Minecraft server statuses, generate dynamic banners, retrieve high-resolution icons, and more directly from your Node.js applications.</p>
</div>

---

## 🚀 Features
- **Zero Dependencies:** Built entirely with native Node.js APIs (uses native `fetch`).
- **Full TypeScript Support:** Ships with `index.d.ts` for full autocompletion and strict typings.
- **Buffer Support:** Every image endpoint has a `Buffer` equivalent, making it incredibly easy to use with Discord bots (Discord.js) or save to the file system.
- **Modern & Fast:** Supports Java Edition, Bedrock Edition, and Legacy servers.

## 📦 Installation

Install the package using your favorite package manager:

**npm:**
```bash
npm install mcapitr
```

**yarn:**
```bash
yarn add mcapitr
```

**pnpm:**
```bash
pnpm add mcapitr
```

**bun:**
```bash
bun add mcapitr
```

## 🛠️ Quick Start

```javascript
const MCAPITR = require('mcapitr');
const api = new MCAPITR();

async function run() {
  const status = await api.serverStatus('play.hypixel.net');
  console.log(`Hypixel is ${status.offline ? 'Offline' : 'Online'}!`);
  if (!status.offline) {
    console.log(`Players: ${status.players.online}/${status.players.max}`);
  }
}

run();
```

---

## 📚 API Reference & Examples

### 1. JSON Data Methods

#### `serverStatus(address, options)`
Fetches the current status, player count, MOTD, and version of a Minecraft server.
- **`address`** *(string)*: The server IP or domain (e.g., `play.hypixel.net`).
- **`options`** *(object)*: Optional. `{ bedrock: true }` for Bedrock servers, or `{ legacy: true }` for pre-1.7.2 servers.

```javascript
const status = await api.serverStatus('play.hypixel.net');
console.log(status.motd.clean); // Returns clean MOTD without color codes
console.log(status.version.name); // e.g., "Requires MC 1.8 / 1.20"
```

#### `popularServers()`
Retrieves a list of the most popular servers currently tracked by MCAPI.TR.
```javascript
const servers = await api.popularServers();
servers.forEach(server => console.log(server.address, server.online));
```

---

### 2. URL Generators (String)
These methods instantly return a string URL that you can embed in HTML `<img>` tags or Markdown.

#### `serverIcon(address)`
Returns the URL for the standard 64x64 dynamic server favicon.
```javascript
const iconUrl = api.serverIcon('play.hypixel.net');
// https://mcapi.tr/api/icon/dynamic?address=play.hypixel.net
```

#### `sharpIcon(address)`
Returns the URL for a high-resolution, rounded-corner version of the server favicon.
```javascript
const sharpUrl = api.sharpIcon('play.hypixel.net');
```

#### `serverBanner(address)`
Returns the URL for an automatically generated MOTD banner image for the server.
```javascript
const bannerUrl = api.serverBanner('play.hypixel.net');
```

#### `motdBanner(motdText)`
Generates a custom banner URL from raw Minecraft color codes.
```javascript
const customBanner = api.motdBanner('&aWelcome to &bMy Server!');
```

#### `widget(address, size, theme)`
Returns a URL intended to be used inside an HTML `<iframe>` to display a live server status widget.
- **`size`**: `'small'`, `'medium'`, or `'large'`
- **`theme`**: `'dark'` or `'light'`
```javascript
const widgetIframe = api.widget('play.hypixel.net', 'large', 'dark');
```

---

### 3. Buffer Methods (Promise<Buffer>)
Need to download the image directly to your server's RAM? These methods fetch the image bytes and return a native Node.js `Buffer`.

#### `serverIconBuffer(address)` / `sharpIconBuffer(address)`
```javascript
const fs = require('fs');

// Download the high-res icon and save it locally
const buffer = await api.sharpIconBuffer('play.hypixel.net');
fs.writeFileSync('hypixel-icon.png', buffer);
console.log('Icon saved!');
```

#### `serverBannerBuffer(address)` / `motdBannerBuffer(motdText)`
```javascript
// Great for Discord.js bots!
const { AttachmentBuilder } = require('discord.js');

const bannerBuffer = await api.serverBannerBuffer('play.hypixel.net');
const attachment = new AttachmentBuilder(bannerBuffer, { name: 'banner.png' });
// channel.send({ files: [attachment] });
```

---

## 📄 License
This project is licensed under the MIT License.
