async function clearAppCache() {
  console.log("Clearing app cache...");
  await browser.execute('mobile: shell', {
    command: 'pm',
    args: ['clear', 'sa.fadfed.fadfedapp'],
  });
}
module.exports = {
  clearAppCache
};
