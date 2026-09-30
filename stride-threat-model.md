# STRIDE Threat Model: OWASP NodeGoat

## Overview
This document outlines four application-specific threats identified within the OWASP NodeGoat architecture. The analysis focuses on the two primary trust boundaries: (1) The public internet to the Node.js Web Application, and (2) The Node.js Web Application to the internal MongoDB database.

## Threat Analysis (STRIDE)

### Threat 1: Insecure Direct Object Reference (IDOR)
* **STRIDE Category:** Information Disclosure / Spoofing
* **Trust Boundary:** Public Internet -> Web Application (Port 4000)
* **Description:** The allocations route trusts client-side `userId` URL parameters without verifying the user's authorization against their active session. An authenticated attacker can manipulate the URL integer (e.g., `/allocations/1`) to spoof another user's identity and disclose their private financial allocation data.

### Threat 2: NoSQL Injection via `$where` Clause
* **STRIDE Category:** Tampering / Information Disclosure
* **Trust Boundary:** Web Application -> MongoDB Database (Port 27017)
* **Description:** The allocations filter passes untrusted user input directly into a MongoDB `$where` JavaScript evaluation clause. An attacker can inject arbitrary JavaScript (e.g., `1'; return 1 == '1`), tampering with the query logic to force the database to return all records across the entire system.

### Threat 3: Regular Expression Denial of Service (ReDoS)
* **STRIDE Category:** Denial of Service
* **Trust Boundary:** Public Internet -> Web Application (Port 4000)
* **Description:** The Bank Routing number validation regex contains nested greedy quantifiers (`/([0-9]+)+\#/`). An attacker can submit a crafted string of non-matching characters, causing catastrophic backtracking that consumes 100% of the Node.js single-threaded event loop, rendering the application unavailable to all users.

### Threat 4: Server-Side JavaScript (SSJS) Injection (eval)
* **STRIDE Category:** Elevation of Privilege / Tampering
* **Trust Boundary:** Public Internet -> Web Application (Port 4000)
* **Description:** The pre-tax contributions module utilizes the dangerous `eval()` function to parse user input. An attacker can inject arbitrary Node.js commands (e.g., `process.exit()`), elevating their privileges to execute remote code directly on the host server.