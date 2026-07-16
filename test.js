const MCAPITR = require('./src/MCAPITR');

const api = new MCAPITR();
const testAddress = 'play.hypixel.net';

async function runTests() {
  console.log("Starting MCAPITR module tests...\n");

  try {
    // 1. JSON Methods
    console.log("--- 1. JSON Data Methods ---");
    const status = await api.serverStatus(testAddress);
    console.log("✅ serverStatus: OK (Players: " + status.players?.online + "/" + status.players?.max + ")");

    const popular = await api.popularServers();
    console.log("✅ popularServers: OK (Found " + popular.length + " servers)");

    // 2. URL String Methods
    console.log("\n--- 2. URL String Methods ---");
    console.log("✅ serverIcon: " + api.serverIcon(testAddress));
    console.log("✅ sharpIcon: " + api.sharpIcon(testAddress));
    console.log("✅ serverBanner: " + api.serverBanner(testAddress));
    console.log("✅ motdBanner: " + api.motdBanner('&aTest'));
    console.log("✅ widget: " + api.widget(testAddress, 'large', 'dark'));

    // 3. Buffer Methods
    console.log("\n--- 3. Buffer Methods ---");
    const iconBuf = await api.serverIconBuffer(testAddress);
    console.log("✅ serverIconBuffer: OK (" + iconBuf.length + " bytes)");

    const sharpBuf = await api.sharpIconBuffer(testAddress);
    console.log("✅ sharpIconBuffer: OK (" + sharpBuf.length + " bytes)");

    const bannerBuf = await api.serverBannerBuffer(testAddress);
    console.log("✅ serverBannerBuffer: OK (" + bannerBuf.length + " bytes)");

    const motdBuf = await api.motdBannerBuffer('&aHello &bWorld');
    console.log("✅ motdBannerBuffer: OK (" + motdBuf.length + " bytes)");

    console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY! No missing methods.");
  } catch (err) {
    console.error("\n❌ TEST FAILED:", err.message);
  }
}

runTests();
