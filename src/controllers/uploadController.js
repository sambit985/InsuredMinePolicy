const { Worker } = require('worker_threads');
const path = require('path');

exports.uploadFile = (req, res) => {
  if (!req.file) {
    console.log("❌ No file uploaded");
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log(`📂 Received file: ${req.file.path}`);

  const worker = new Worker(path.join(__dirname, '../workers/worker.js'), {
    workerData: { filePath: req.file.path }
  });

  worker.on('message', (msg) => {
    console.log("✅ Worker Response:", msg);
    res.json({ message: "File processed successfully", details: msg });
    worker.terminate();
  });

  worker.on('error', (err) => {
    console.error("❌ Worker Error:", err);
    res.status(500).json({ error: err.message });
    worker.terminate();
  });

  worker.on('exit', (code) => {
    console.log(`🛑 Worker exited with code: ${code}`);
    if (code !== 0) {
      console.error(`❌ Worker exited abnormally`);
    }
  });
};
