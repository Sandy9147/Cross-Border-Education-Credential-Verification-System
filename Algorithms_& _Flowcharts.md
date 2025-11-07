Algorithms & Flowcharts
🧮 Core Algorithms
Algorithm 1: Credential Issuance
ALGORITHM IssueCredential(studentData, institutionData, degreeData)
INPUT: Student info, Institution info, Degree details
OUTPUT: Signed verifiable credential

TIME COMPLEXITY: O(n log n)
SPACE COMPLEXITY: O(n)

STEPS:
1. Validate all input data [O(1)]
2. Verify institution vLEI [O(1) cached, O(log n) fresh]
3. Generate unique credential ID [O(1)]
4. Create NGSI-LD entity [O(n)]
5. Create W3C Verifiable Credential [O(n)]
6. Sign with Ed25519 [O(n log n)] ← Dominant
7. Store in PostgreSQL [O(1) avg]
8. Record on blockchain async [O(1)]
9. Cache for fast retrieval [O(1)]
10. Notify student [Background task]

RETURN credential with signature
Algorithm 2: Credential Verification
ALGORITHM VerifyCredential(credentialId, verifierData, consentToken)
INPUT: Credential ID, Verifier info, Consent token
OUTPUT: Verification result with confidence score

TIME COMPLEXITY: O(log n)
SPACE COMPLEXITY: O(1)

STEPS:
1. Validate GDPR consent [O(1)]
2. Fetch from cache or DB [O(1) cache hit, O(log n) miss]
3. Check credential status [O(1)]
4. Verify issuer vLEI [O(1) cached]
5. Verify Ed25519 signature [O(n)] where n = credential size
6. Check blockchain record [O(1)]
7. Binary search revocation list [O(log n)] ← Dominant
8. Calculate confidence score [O(1)]
9. Log verification event [O(1)]

RETURN {valid: true/false, confidence: 0.0-1.0, details: {...}}
Algorithm 3: Cross-Border Sync
ALGORITHM CrossBorderSync(sourceRegion, targetRegion, credentialId)
INPUT: Source region, Target region, Credential ID
OUTPUT: Sync result

TIME COMPLEXITY: O(n)
SPACE COMPLEXITY: O(n)

STEPS:
1. Classify data sensitivity (GDPR) [O(n)]
2. Apply data minimization [O(n)]
   - Personal data → Metadata only
   - Public data → Full transfer
3. Encrypt with AES-256-GCM [O(n)]
4. Transfer via HTTPS [O(n)]
5. Verify integrity [O(n)]
6. Update federation index [O(1)]
7. Log for audit trail [O(1)]

RETURN {success: true, syncMode: "METADATA_ONLY"}
📊 Flowchart: End-to-End Verification
┌─────────────────┐
│  Verifier       │
│  Receives QR    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Scan QR Code   │
│  Extract ID     │
└────────┬────────┘
         │
         ▼
    ┌────────┐
    │Consent?│ ──No──> [Return: Consent Required]
    └───┬────┘
        │Yes
        ▼
┌─────────────────┐
│  Fetch from     │
│  Context Broker │
└────────┬────────┘
         │
         ▼
    ┌──────────┐
    │  Found?  │ ──No──> [Return: Not Found]
    └────┬─────┘
         │Yes
         ▼
    ┌──────────┐
    │ Active?  │ ──No──> [Return: Revoked/Expired]
    └────┬─────┘
         │Yes
         ▼
┌─────────────────┐
│  Verify vLEI    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Verify         │
│  Signature      │
└────────┬────────┘
         │
         ▼
    ┌──────────┐
    │ Valid?   │ ──No──> [Return: Invalid Signature]
    └────┬─────┘
         │Yes
         ▼
┌─────────────────┐
│  Check          │
│  Blockchain     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Check          │
│  Revocation     │
└────────┬────────┘
         │
         ▼
    ┌──────────┐
    │Revoked?  │ ──Yes──> [Return: Revoked]
    └────┬─────┘
         │No
         ▼
┌─────────────────┐
│  Calculate      │
│  Confidence     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Log Event      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Return: VALID ✓│
│  Confidence: 95%│
│  Time: 2.8s     │
└─────────────────┘
