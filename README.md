# 🧠 Node.js Projects Collection

A collection of Node.js-based projects exploring **core cryptographic concepts**, **security primitives**, and **backend fundamentals** — all built **without frameworks** to deeply understand the underlying mechanisms of cryptography, data integrity, and authentication systems.

---

## 📚 Project List

### 🔐 1. cryptography-service

A Node.js API that provides various **cryptographic primitives** as a service.
Includes:

* Symmetric and asymmetric encryption/decryption
* Hashing and encoding
* Digital signatures

> **Goal:** Learn how to design modular cryptographic APIs and build reusable security services.

---

### 💎 2. ethereum-wallet-generator

A Node.js CLI and API that generates **Ethereum wallets** using the `ethers.js` library.
Includes:

* Private/public key generation
* Address derivation
* Mnemonic phrase creation

> **Goal:** Understand key derivation and wallet creation logic in blockchain systems.

---

### 📁 3. file-encryption

An API for encrypting and decrypting **files** securely using Node.js `crypto` module.
Includes:

* AES encryption
* Stream-based encryption/decryption
* File integrity validation

> **Goal:** Learn how to handle binary data and large files efficiently in Node.js.

---

### 🧮 4. hash-&-encode

A Node.js API that provides **hashing and encoding** utilities.
Supports:

* SHA256, SHA512, MD5, BLAKE2b
* Base64, Hex, URL encoding

> **Goal:** Master the fundamentals of hashing and encoding with the `crypto` module.

---

### 🔑 5. jwt-authentication

A minimal Node.js implementation of **JWT-based authentication**.
Features:

* User registration and login
* Token-based authentication
* Middleware validation

> **Goal:** Understand how to implement stateless authentication in secure APIs.

---

### 🌲 6. merkle-tree-implementation

A full **Merkle Tree** implementation in Node.js for verifying data integrity.
Includes:

* Tree construction
* Merkle proof generation and verification
* Hash-based verification

> **Goal:** Learn how blockchains ensure data consistency and trust using Merkle Trees.

---

### 🗒️ 7. note-taking-app

A minimalistic backend-only **Note-Taking API** built entirely from scratch.
Features:

* CRUD operations for notes
* Lightweight routing system
* JSON-based schema validation

> **Goal:** Strengthen understanding of raw HTTP server design and routing in Node.js.

---

### 🔏 8. password-vault-api

A secure **password management API** built using encryption techniques.
Features:

* Encrypted storage for passwords
* User authentication
* Safe retrieval of credentials

> **Goal:** Learn to protect sensitive user data with best security practices.

---

### ✍️ 9. sign-message

A Node.js service for **signing and verifying messages** using asymmetric cryptography.
Includes:

* Private key-based signing
* Public key verification
* Integrity validation

> **Goal:** Explore real-world cryptographic signing workflows and trust models.

---

## ⚙️ Technologies Used

* **Node.js** (Core HTTP, Crypto, FS modules)
* **Ethers.js** (Ethereum wallet operations)
* **Joi** (Schema validation)
* **Multer** (File uploads)
* **JWT** (Authentication)
* **Custom-built routing and service layers**

---

## 🧩 Project Structure Example

```
project-name/
├── controllers/
├── services/
├── routes/
├── schema/
├── middleware/
├── utils/
├── index.js
└── README.md
```

Each project is **independent**, follows a **layered architecture**, and uses only **raw Node.js** — no frameworks like Express.js, Fastify, or NestJS.

---

## 🚀 Setup Instructions

Clone the repository and navigate into any project directory:

```bash
git clone https://github.com/<your-username>/nodejs-crypto-projects.git
cd nodejs-crypto-projects/<project-name>
npm install
npm start
```

You can modify the `PORT` and other configs inside each project’s `config.js` file.

---

## 🧠 Learning Objectives

* Understand **low-level Node.js internals**
* Build **secure APIs** without frameworks
* Implement **cryptographic systems** from scratch
* Learn **error handling**, **routing**, and **validation**
* Explore the **foundations of blockchain and web security**

---

## 🧩 Future Additions

* 🔄 RSA key generation API
* 🪙 Blockchain address validator
* 🧬 Random number generator service
* 🪶 REST-to-GRPC conversion experiments

---

## 🧑‍💻 Author

**Muhtadi Laskar**
*Self-taught programmer passionate about cryptography, backend systems, and blockchain development.*
💡 “I build to understand.”

---
