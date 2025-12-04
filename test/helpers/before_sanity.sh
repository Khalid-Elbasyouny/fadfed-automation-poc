#!/bin/bash

echo "🔹 Killing Appium servers..."
# kill every appium process
pkill -f "appium" 2>/dev/null

# any pros holding ports Appium specifically (editable if needed)
for port in {4723..4735}; do
  lsof -ti tcp:$port | xargs kill -9 2>/dev/null
done

echo "🔹 Killing hanging WebdriverIO/Node processes..."
pkill -f "wdio" 2>/dev/null
pkill -f "webdriver" 2>/dev/null
pkill -f "mocha" 2>/dev/null

echo "🔹 Restarting ADB server..."
adb kill-server
adb start-server

echo "🔹 Killing running emulators (optional)..."
# close any emulator
adb devices | awk 'NR>1 && $1 ~ /emulator-/ {print $1}' | while read -r emu; do
  echo "Killing $emu"
  adb -s "$emu" emu kill
done

echo "✅ Cleanup done. You can now run your  tests on a clean state."
