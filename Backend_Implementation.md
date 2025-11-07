 Backend Implementation
⚙️ Core Services
4.1 Credential Service
python# app/services/credential_service.py

async def issue_credential(request, private_key):
    """
    Issue new credential
    
    Time Complexity: O(n log n)
    Average Duration: 500ms
    
    Steps:
    1. Verify institution vLEI (50ms)
    2. Generate credential ID (5ms)
    3. Create NGSI-LD entity (10ms)
    4. Create W3C VC (10ms)
    5. Sign with Ed25519 (180ms) ← Bottleneck
    6. Store in database (120ms)
    7. Record on blockchain (15s async)
    8. Send notification (background)
    """
4.2 Verification Service
python# app/services/verification_service.py

async def verify_credential(credential_id, verifier_data):
    """
    Verify credential authenticity
    
    Time Complexity: O(log n)
    Average Duration: 2.8s
    
    Steps:
    1. Validate consent (10ms)
    2. Fetch credential (85ms - cached: 1ms)
    3. Check status (2ms)
    4. Verify issuer vLEI (30ms)
    5. Verify signature (95ms) ← Bottleneck
    6. Check blockchain (150ms)
    7. Check revocation (40ms)
    8. Calculate confidence (5ms)
    """
🗄️ Database Schema
sql-- PostgreSQL Database Schema

-- Institutions Table
CREATE TABLE institutions (
    id VARCHAR PRIMARY KEY,
    legal_name VARCHAR NOT NULL,
    vlei VARCHAR(20) UNIQUE NOT NULL,
    did VARCHAR UNIQUE NOT NULL,
    public_key_jwk JSON NOT NULL,
    accreditation JSON,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Students Table
CREATE TABLE students (
    id VARCHAR PRIMARY KEY,
    student_id VARCHAR UNIQUE NOT NULL,
    did VARCHAR UNIQUE NOT NULL,
    given_name VARCHAR NOT NULL,
    family_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    consent_verification BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Credentials Table
CREATE TABLE credentials (
    id VARCHAR PRIMARY KEY,
    credential_type VARCHAR NOT NULL,
    degree_title VARCHAR NOT NULL,
    issued_by VARCHAR NOT NULL,
    issued_to VARCHAR NOT NULL,
    gpa FLOAT,
    verifiable_credential JSON NOT NULL,
    status VARCHAR DEFAULT 'Active',
    credential_hash VARCHAR NOT NULL,
    blockchain_tx VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Verification Logs Table
CREATE TABLE verification_logs (
    id SERIAL PRIMARY KEY,
    credential_id VARCHAR NOT NULL,
    verifier_id VARCHAR NOT NULL,
    result VARCHAR NOT NULL,
    confidence FLOAT,
    verification_time FLOAT,
    timestamp TIMESTAMP DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX idx_credentials_issued_by ON credentials(issued_by);
CREATE INDEX idx_credentials_status ON credentials(status);
CREATE INDEX idx_credentials_hash ON credentials(credential_hash);
CREATE INDEX idx_verification_logs_credential ON verification_logs(credential_id);
🔐 Smart Contract (Solidity)
solidity// CredentialRegistry.sol - Polygon Smart Contract

pragma solidity ^0.8.0;

contract CredentialRegistry {
    struct CredentialRecord {
        bytes32 credentialHash;
        string issuerDID;
        string studentDID;
        uint256 timestamp;
        bool isRevoked;
    }
    
    mapping(bytes32 => CredentialRecord) public credentials;
    mapping(address => bool) public authorizedIssuers;
    
    event CredentialRecorded(bytes32 indexed hash, string issuer);
    event CredentialRevoked(bytes32 indexed hash);
    
    function recordCredential(
        bytes32 credentialHash,
        string memory issuerDID,
        string memory studentDID
    ) external returns (bool) {
        require(authorizedIssuers[msg.sender], "Unauthorized");
        require(credentials[credentialHash].timestamp == 0, "Already exists");
        
        credentials[credentialHash] = CredentialRecord({
            credentialHash: credentialHash,
            issuerDID: issuerDID,
            studentDID: studentDID,
            timestamp: block.timestamp,
            isRevoked: false
        });
        
        emit CredentialRecorded(credentialHash, issuerDID);
        return true;
    }
    
    function verifyCredential(bytes32 credentialHash) 
        external 
        view 
        returns (bool valid, string memory issuer, uint256 timestamp) 
    {
        CredentialRecord memory record = credentials[credentialHash];
        
        if (record.timestamp == 0 || record.isRevoked) {
            return (false, "", 0);
        }
        
        return (true, record.issuerDID, record.timestamp);
    }
}
🚀 API Endpoints
yaml# Complete API Reference

Base URL: https://api.credentials.edu/api/v1

Credentials:
  POST   /credentials/issue           # Issue new credential
  GET    /credentials/{id}            # Get credential by ID
  DELETE /credentials/{id}/revoke     # Revoke credential
  GET    /credentials/                # Query credentials

Verification:
  POST   /verification/verify         # Verify single credential
  POST   /verification/batch-verify   # Batch verification

Institutions:
  POST   /institutions/                # Register institution
  GET    /institutions/{id}            # Get institution details
  PUT    /institutions/{id}            # Update institution

Health:
  GET    /health                       # System health check
  GET    /metrics                      # Prometheus metrics
