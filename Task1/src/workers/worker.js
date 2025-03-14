const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csv = require('csv-parser');
const xlsx = require('xlsx');
require('../db/connection'); // Ensure DB connection is established
const User = require('../models/user');
const Agent = require('../models/agent');
const PolicyCategory = require('../models/policyCategory');
const PolicyInfo = require('../models/policyInfo');
const PolicyCarrier = require('../models/policyCarrier');
const UserAccount = require('../models/userAccount');


async function processFile() {
  try {
    const { filePath } = workerData;
    const fileExt = filePath.split('.').pop().toLowerCase();
    let data = [];

    if (fileExt === 'csv') {
      console.log("📌 Processing CSV file...");
      data = await parseCSV(filePath);
    } else if (fileExt === 'xlsx') {
      console.log("📌 Processing XLSX file...");
      data = parseXLSX(filePath);
    } else {
      throw new Error("Unsupported file format.");
    }

    if (data.length === 0) {
      throw new Error("No data found in the file.");
    }


    await saveData(data);
    //delete file after complete process
    fs.unlinkSync(filePath);

    parentPort.postMessage({ message: 'File processed successfully', count: data.length });

  } catch (error) {
    console.error("❌ Worker Error:", error.message);
    parentPort.postMessage({ error: error.message });
  }
}

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        console.log(`✅ CSV Parsing completed, total records: ${results.length}`);
        resolve(results);
      })
      .on('error', (err) => reject(err));
  });
}

function parseXLSX(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(sheet);
}

async function saveData(data) {
    try {
  
      const users = [];
      const agents = [];
      const policyCarriers = [];
      const policyCategories = [];
      const policyInfos = [];
      const userAccounts = [];
  
      for (let item of data) {
        users.push({
          firstname: item.firstname || '',
          dob: item.dob || '',
          email: item.email || '',
          address: item.address || '',
          phone: item.phone || '',
          state: item.state || '',
          zip: item.zip || '',
          gender: item.gender || '',
          account_name: item.account_name || '',
          account_type: item.account_type || '',
          userType: item.userType || ''
        });
  
        agents.push({
          agent: item.agent || '',
          agency_id: item.agency_id || ''
        });
  
        policyCarriers.push({
          company_name: item.company_name || ''
        });
  
        policyCategories.push({
          category_name: item.category_name || ''
        });
  
        policyInfos.push({
          policy_number: item.policy_number || '',
          policy_start_date: item.policy_start_date || '',
          policy_end_date: item.policy_end_date || '',
          policy_type: item.policy_type || '',
          firstname: item.firstname || ''
        });
  
        userAccounts.push({
          account_name: item.account_name || ''
        });
      }
  
  
      await Promise.allSettled([
        User.insertMany(users),
        Agent.insertMany(agents),
        PolicyCarrier.insertMany(policyCarriers),
        PolicyCategory.insertMany(policyCategories),
        PolicyInfo.insertMany(policyInfos),
        UserAccount.insertMany(userAccounts)
      ]);
  
      console.log(`✅ Successfully saved ${data.length} records.`);
  
    } catch (err) {
      console.error("❌ Error saving data:", err.message);
      throw err;
    }
  }
  

processFile();
