#!/bin/bash

# Configuration - Set these according to your environment
APP_PACKAGE_NAME="sa.fadfed.fadfedapp"
LOG_FILE="/tmp/test_cleanup_$(date +%Y%m%d_%H%M%S).log"
PORTS_TO_FREE=(
    "4723-4735"  # Appium ports
    "4444-4449"  # Selenium ports
    "8000-8010"  # Test server ports (reduced range)
)

# Exit on error and undefined variables
set -euo pipefail

# Initialize dry run mode
dry_run=false

# Parse command line arguments
for arg in "$@"; do
    case $arg in
        --dry-run)
            dry_run=true
            shift
            ;;
        --help)
            echo "Usage: $0 [--dry-run]"
            echo "  --dry-run   Show what would be done without making changes"
            exit 0
            ;;
    esac
done

# Log function for consistent output
log() {
    local message="[$(date +'%Y-%m-%d %H:%M:%S')] $1"
    echo "$message"
    echo "$message" >> "$LOG_FILE"
}

# Check if a process is running
is_process_running() {
    pgrep -f "$1" >/dev/null 2>&1
}

# Function to safely kill processes
safe_kill() {
    local pattern=$1
    local name=$2
    
    if is_process_running "$pattern"; then
        if [ "$dry_run" = true ]; then
            log "[DRY RUN] Would stop $name processes (pattern: $pattern)"
            return
        fi
        
        log "🔹 Stopping $name processes..."
        pkill -f "$pattern" 2>/dev/null || true
        
        # Give processes a moment to shut down gracefully
        sleep 2
        
        # Force kill if still running
        if is_process_running "$pattern"; then
            log "⚠️  $name processes still running, forcing termination..."
            pkill -9 -f "$pattern" 2>/dev/null || true
        fi
    else
        log "ℹ️  No $name processes found to stop"
    fi
}

# Function to free up ports
free_ports() {
    local port_range=$1
    local port_start=${port_range%-*}
    local port_end=${port_range#*-}
    
    if [ "$dry_run" = true ]; then
        log "[DRY RUN] Would free up ports $port_start-$port_end"
        return
    fi
    
    log "🔹 Freeing up ports $port_start-$port_end..."
    local ports_freed=0
    for port in $(seq $port_start $port_end); do
        local pids=$(lsof -ti tcp:$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            log "  - Freeing port $port (PIDs: $pids)"
            echo "$pids" | xargs -r kill -9 2>/dev/null || true
            ports_freed=$((ports_freed + 1))
        fi
    done
    
    if [ $ports_freed -eq 0 ]; then
        log "ℹ️  No active connections found in port range $port_start-$port_end"
    fi
}

main() {
    log "🚀 Starting test environment cleanup..."
    log "Log file: $LOG_FILE"
    
    if [ "$dry_run" = true ]; then
        log "⚠️  DRY RUN MODE: No changes will be made"
    fi
    
    # Stop test runners and related processes
    safe_kill "wdio" "WebdriverIO"
    safe_kill "mocha" "Mocha"
    safe_kill "jest" "Jest"
    safe_kill "appium" "Appium"
    
    # Free configured ports
    for port_range in "${PORTS_TO_FREE[@]}"; do
        free_ports "$port_range"
    done
    
    # Clean up ADB if available
    if command -v adb &> /dev/null; then
        log "🔄 Restarting ADB server..."
        if [ "$dry_run" = false ]; then
            adb kill-server 2>/dev/null || true
            adb start-server 2>/dev/null || log "⚠️  Failed to restart ADB server"
        fi
        
        # Clean up emulators if any
        local emulators
        emulators=$(adb devices 2>/dev/null | awk 'NR>1 && $1 ~ /emulator-/ {print $1}')
        if [ -n "$emulators" ]; then
            log "📱 Found emulators, cleaning up..."
            echo "$emulators" | while read -r emu; do
                if [ "$dry_run" = true ]; then
                    log "[DRY RUN] Would kill emulator: $emu"
                else
                    log "  - Killing emulator: $emu"
                    adb -s "$emu" emu kill 2>/dev/null || true
                fi
            done
        else
            log "ℹ️  No running emulators found"
        fi
        
        # Reset device state if device is connected
        if adb get-state 2>/dev/null | grep -q "device"; then
            log "📱 Resetting device state for $APP_PACKAGE_NAME..."
            if [ "$dry_run" = false ]; then
                adb shell pm clear "$APP_PACKAGE_NAME" 2>/dev/null || log "⚠️  Failed to clear app data"
                adb shell am force-stop "$APP_PACKAGE_NAME" 2>/dev/null || log "⚠️  Failed to stop app"
            fi
        else
            log "ℹ️  No physical device connected"
        fi
    else
        log "ℹ️  ADB not found, skipping device cleanup"
    fi
    
    # Clean up temporary files
    log "🧹 Cleaning temporary files..."
    if [ "$dry_run" = false ]; then
        find /tmp -maxdepth 1 -name "*.png" -delete 2>/dev/null || true
        find /tmp -maxdepth 1 -name "*.log" -delete 2>/dev/null || true
    else
        local screenshot_count=$(find /tmp -maxdepth 1 -name "*.png" 2>/dev/null | wc -l)
        local log_count=$(find /tmp -maxdepth 1 -name "*.log" 2>/dev/null | wc -l)
        log "[DRY RUN] Would delete $screenshot_count screenshot(s) and $log_count log file(s)"
    fi
    
    log "✅ Cleanup completed successfully!"
    log "Full log available at: $LOG_FILE"
    exit 0
}

# Run the main function
main "$@"
