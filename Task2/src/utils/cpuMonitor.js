const os = require('os');
const { exec } = require('child_process');

function getCpuUsage() {
    const cpus = os.cpus();
    let idleTime = 0, totalTime = 0;

    cpus.forEach(core => {
        for (let type in core.times) {
            totalTime += core.times[type];
        }
        idleTime += core.times.idle;
    });

    return 100 - (idleTime / totalTime) * 100; // CPU usage percentage
}

function monitorCpuUsage() {
    setInterval(() => {
        const usage = getCpuUsage();
        console.log(`CPU Usage: ${usage.toFixed(2)}%`);

        if (usage > 70) {
            console.log("High CPU usage detected! Restarting server...");
            exec("pm2 restart all", (err, stdout, stderr) => {
                if (err) {
                    console.error("Error restarting server:", err);
                    return;
                }
                console.log("Server restarted successfully.");
            });
        }
    }, 5000);
}

module.exports = monitorCpuUsage;
