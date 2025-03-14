# InsuredMine Task 1

This project is a Node.js-based API that allows users to upload XLSX/CSV data into MongoDB using worker threads, search for policy information by username, and aggregate policies by each user. The project is designed with a modular and secure structure for better maintainability.

## Task Requirements

1. **File Upload API**: Upload XLSX/CSV data into MongoDB using worker threads.
2. **Search API**: Retrieve policy information based on the username.
3. **Aggregation API**: Provide aggregated policy data by each user.
4. **Modular MongoDB Schema**: Store each data category in separate collections for efficient querying.

## Project Structure

project-root/
│── server.js
│── package.json
│── .env
│── src/
│   │── config/
│   │   ├── config.js
│   │   ├── index.js
│   ├── db/
│   │   ├── connection.js
│   ├── models/
│   │   ├── Agent.js
│   │   ├── User.js
│   │   ├── UserAccount.js
│   │   ├── PolicyCategory.js
│   │   ├── PolicyCarrier.js
│   │   ├── PolicyInfo.js
│   ├── routes/
│   │   ├── uploadRoutes.js
│   │   ├── policyRoutes.js
│   ├── controllers/
│   │   ├── uploadController.js
│   │   ├── policyController.js
│   ├── workers/
│   │   ├── worker.js
│── uploads/

