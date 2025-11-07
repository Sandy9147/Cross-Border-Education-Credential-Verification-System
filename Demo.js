import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Shield, FileText, User, Building, QrCode, Download, Share2, AlertCircle } from 'lucide-react';

const CredentialVerificationDemo = () => {
  const [activeStep, setActiveStep] = useState('issue');
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [credentialData, setCredentialData] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  // Sample credential data
  const sampleCredential = {
    id: "urn:ngsi-ld:AcademicCredential:MIT:CS-2024:ABCD1234",
    studentName: "Sandesh Sharma",
    degree: "Bachelor of Science in Computer Science",
    institution: "Jain University",
    gpa: 3.92,
    graduationDate: "2024-05-15",
    vLEI: "549300E57LACJZYG7P18",
    did: "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
  };

  const steps = [
    { id: 'issue', name: 'Issue Credential', icon: FileText },
    { id: 'store', name: 'Store in Wallet', icon: User },
    { id: 'share', name: 'Share Credential', icon: Share2 },
    { id: 'verify', name: 'Verify Credential', icon: Shield }
  ];

  const issueCredential = () => {
    setActiveStep('store');
    setCredentialData(sampleCredential);
  };

  const storeInWallet = () => {
    setActiveStep('share');
  };

  const shareCredential = () => {
    setActiveStep('verify');
  };

  const verifyCredential = () => {
    setVerificationStatus('verifying');
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationResult({
        valid: true,
        issuerVerified: true,
        signatureValid: true,
        notRevoked: true,
        verificationTime: 2.8,
        timestamp: new Date().toISOString()
      });
      setVerificationStatus('complete');
    }, 3000);
  };

  const resetDemo = () => {
    setActiveStep('issue');
    setVerificationStatus('idle');
    setCredentialData(null);
    setVerificationResult(null);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-blue-100 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cross-Border Credential Verification</h1>
          <p className="text-gray-600 mb-6">Interactive demonstration of the end-to-end credential lifecycle</p>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === activeStep;
              const isPast = steps.findIndex(s => s.id === activeStep) > index;
              
              return (
                <div key={step.id} className="flex-1 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isActive ? 'bg-indigo-600 text-white scale-110' : 
                    isPast ? 'bg-green-500 text-white' : 
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {isPast ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className={`text-sm font-medium text-center ${
                    isActive ? 'text-indigo-600' : isPast ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-full mt-6 absolute left-0 right-0 -z-10 ${
                      isPast ? 'bg-green-500' : 'bg-gray-200'
                    }`} style={{ width: '25%', left: `${(index + 0.5) * 25}%` }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="bg-gray-50 rounded-lg p-6 min-h-96">
            {activeStep === 'issue' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Building className="w-6 h-6 mr-2 text-indigo-600" />
                  Institution Issues Credential
                </h2>
                <p className="text-gray-600 mb-6">
                  MIT's registrar office creates a verifiable credential for a graduating student.
                </p>
                
                <div className="bg-white rounded-lg p-6 mb-6 border-2 border-gray-200">
                  <h3 className="font-semibold mb-4">Credential Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Student Name</div>
                      <div className="font-medium">Sandesh Sharma</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Degree</div>
                      <div className="font-medium">BS in Computer Science</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Institution</div>
                      <div className="font-medium">JGI</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">GPA</div>
                      <div className="font-medium">3.92 / 4.0</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Graduation Date</div>
                      <div className="font-medium">May 15, 2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">vLEI</div>
                      <div className="font-medium text-xs">549300E57...G7P18</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    What Happens Behind the Scenes
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• NGSI-LD entity created in context broker</li>
                    <li>• W3C Verifiable Credential generated and cryptographically signed</li>
                    <li>• Institution identity verified via GLEIF vLEI</li>
                    <li>• Credential hash recorded on blockchain</li>
                  </ul>
                </div>

                <button
                  onClick={issueCredential}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Issue Credential
                </button>
              </div>
            )}

            {activeStep === 'store' && credentialData && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <User className="w-6 h-6 mr-2 text-indigo-600" />
                  Store in Student Wallet
                </h2>
                <p className="text-gray-600 mb-6">
                  The credential is securely delivered to the student's digital wallet.
                </p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                    <h3 className="font-semibold mb-4">Mobile Wallet View</h3>
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg p-6 text-white shadow-lg">
                      <div className="text-xs uppercase mb-2">Academic Credential</div>
                      <div className="text-xl font-bold mb-4">{credentialData.degree}</div>
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs opacity-80">Student</div>
                          <div className="font-semibold">{credentialData.studentName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs opacity-80">GPA</div>
                          <div className="text-2xl font-bold">{credentialData.gpa}</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/20 text-xs">
                        <div className="flex justify-between">
                          <span>{credentialData.institution}</span>
                          <span>{credentialData.graduationDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                    <h3 className="font-semibold mb-4">Storage Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">Encrypted cloud backup</span>
                      </div>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">Local device storage</span>
                      </div>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">IPFS distributed storage</span>
                      </div>
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-sm">Paper backup with QR</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={storeInWallet}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Continue to Sharing
                </button>
              </div>
            )}

            {activeStep === 'share' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Share2 className="w-6 h-6 mr-2 text-indigo-600" />
                  Share Credential with Verifier
                </h2>
                <p className="text-gray-600 mb-6">
                  Student shares their credential with an employer in Singapore for job verification.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-6 border-2 border-indigo-200">
                    <QrCode className="w-12 h-12 text-indigo-600 mb-3" />
                    <h3 className="font-semibold mb-2">QR Code</h3>
                    <p className="text-sm text-gray-600">Scan to verify instantly</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-indigo-200">
                    <Share2 className="w-12 h-12 text-indigo-600 mb-3" />
                    <h3 className="font-semibold mb-2">Direct Link</h3>
                    <p className="text-sm text-gray-600">Send secure verification URL</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-indigo-200">
                    <Download className="w-12 h-12 text-indigo-600 mb-3" />
                    <h3 className="font-semibold mb-2">Download</h3>
                    <p className="text-sm text-gray-600">Export for offline verification</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
                  <h3 className="font-semibold mb-4">Privacy Controls</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm">Share degree type</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm">Share GPA</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-sm">Share graduation date</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">Share full transcript</span>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Cross-Border Transfer:</strong> This credential will be verified by an employer in Singapore. Data sovereignty is maintained through federated verification - no personal data crosses borders, only cryptographic proofs.
                    </div>
                  </div>
                </div>

                <button
                  onClick={shareCredential}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Share with Verifier
                </button>
              </div>
            )}

            {activeStep === 'verify' && (
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-indigo-600" />
                  Verify Credential Authenticity
                </h2>
                <p className="text-gray-600 mb-6">
                  Employer verifies the credential in real-time without contacting MIT.
                </p>

                {verificationStatus === 'idle' && (
                  <div>
                    <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
                      <h3 className="font-semibold mb-4">Credential to Verify</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Student</div>
                          <div className="font-medium">{credentialData.studentName}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Institution</div>
                          <div className="font-medium">{credentialData.institution}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Degree</div>
                          <div className="font-medium">{credentialData.degree}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">GPA</div>
                          <div className="font-medium">{credentialData.gpa}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-blue-900 mb-2">Verification Process</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Retrieve credential from NGSI-LD context broker</li>
                        <li>• Verify issuer identity via GLEIF vLEI</li>
                        <li>• Validate cryptographic signature</li>
                        <li>• Check revocation status</li>
                        <li>• Confirm blockchain hash integrity</li>
                      </ul>
                    </div>

                    <button
                      onClick={verifyCredential}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Start Verification
                    </button>
                  </div>
                )}

                {verificationStatus === 'verifying' && (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
                    <h3 className="text-xl font-semibold mb-2">Verifying Credential...</h3>
                    <p className="text-gray-600">This typically takes 2-3 seconds</p>
                    <div className="mt-8 max-w-md mx-auto">
                      <div className="space-y-3 text-left">
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-3"></div>
                          <span>Fetched credential from context broker</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                          <span>Verifying JGI institutional signature...</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-4 h-4 rounded-full bg-gray-300 mr-3"></div>
                          <span>Checking revocation status</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-4 h-4 rounded-full bg-gray-300 mr-3"></div>
                          <span>Validating blockchain integrity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {verificationStatus === 'complete' && verificationResult && (
                  <div>
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-6">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="w-12 h-12 text-green-600 mr-4" />
                        <div>
                          <h3 className="text-2xl font-bold text-green-900">Credential Verified!</h3>
                          <p className="text-green-700">All checks passed successfully</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-semibold">Issuer Verified</span>
                        </div>
                        <p className="text-sm text-gray-600">JGI institutional identity confirmed via vLEI</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-semibold">Signature Valid</span>
                        </div>
                        <p className="text-sm text-gray-600">Cryptographic signature intact</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-semibold">Not Revoked</span>
                        </div>
                        <p className="text-sm text-gray-600">Credential is still active</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          <span className="font-semibold">Blockchain Verified</span>
                        </div>
                        <p className="text-sm text-gray-600">Hash matches on-chain record</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
                      <h3 className="font-semibold mb-4">Verification Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Verification Time:</span>
                          <span className="font-medium">{verificationResult.verificationTime}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timestamp:</span>
                          <span className="font-medium">{new Date(verificationResult.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">Singapore (Indo-Pacific)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Data Transfer:</span>
                          <span className="font-medium text-green-600">Zero cross-border PII transfer</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-indigo-900 mb-2">🎉 Success Metrics</h4>
                      <ul className="text-sm text-indigo-800 space-y-1">
                        <li>• <strong>99.99% faster</strong> than traditional verification (2.8s vs 30 hours)</li>
                        <li>• <strong>$0 verification cost</strong> (vs $50-200 for transcript requests)</li>
                        <li>• <strong>100% fraud prevention</strong> through cryptographic proof</li>
                        <li>• <strong>Full GDPR compliance</strong> with data sovereignty maintained</li>
                      </ul>
                    </div>

                    <button
                      onClick={resetDemo}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Start New Demo
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-indigo-600">2.8s</div>
            <div className="text-sm text-gray-600">Avg Verification Time</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-green-600">99.99%</div>
            <div className="text-sm text-gray-600">Time Reduction</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-gray-600">Fraud Prevention</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow">
            <div className="text-2xl font-bold text-orange-600">$0</div>
            <div className="text-sm text-gray-600">Verification Cost</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialVerificationDemo;
