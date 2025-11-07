📖 File Structure
credential-system/
│
├── frontend/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   ├── CredentialDemo.tsx
│   │   │   ├── AlgorithmViewer.tsx
│   │   │   └── VerificationFlow.tsx
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/                           # Python Backend
│   ├── app/
│   │   ├── main.py                    # FastAPI application
│   │   ├── config.py                  # Configuration
│   │   ├── models/                    # SQLAlchemy models
│   │   │   ├── credential.py
│   │   │   ├── institution.py
│   │   │   ├── student.py
│   │   │   └── verification_log.py
│   │   ├── schemas/                   # Pydantic schemas
│   │   │   ├── credential.py
│   │   │   └── verification.py
│   │   ├── api/                       # API routes
│   │   │   ├── credentials.py
│   │   │   ├── verification.py
│   │   │   └── institutions.py
│   │   ├── services/                  # Business logic
│   │   │   ├── credential_service.py  # O(n log n)
│   │   │   ├── verification_service.py # O(log n)
│   │   │   ├── blockchain_service.py
│   │   │   └── ngsi_ld_service.py
│   │   ├── utils/                     # Utilities
│   │   │   ├── crypto.py              # Ed25519 signing
│   │   │   ├── did.py                 # DID resolution
│   │   │   ├── vlei.py                # vLEI verification
│   │   │   └── cache.py               # Redis caching
│   │   └── db/
│   │       └── database.py
│   ├── alembic/                       # Database migrations
│   ├── tests/                         # Unit & integration tests
│   ├── scripts/                       # Utility scripts
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── blockchain/                        # Smart Contracts
│   ├── contracts/
│   │   └── CredentialRegistry.sol
│   ├── migrations/
│   ├── test/
│   └── hardhat.config.js
│
├── docs/                              # Documentation
│   ├── architecture.md
│   ├── algorithms.md
│   ├── api-reference.md
│   ├── deployment-guide.md
│   └── risk-mitigation.md
│
├── k8s/                               # Kubernetes manifests
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── ingress.yaml
│   └── configmap.yaml
│
├── docker-compose.yml                 # Local development
├── docker-compose.prod.yml            # Production
├── .gitignore
└── README.md
