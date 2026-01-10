'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, Clock, DollarSign, Shield, Leaf } from 'lucide-react';
import { LoanDocument } from '@/lib/types/syndicateiq';

interface ProcessingState {
  isProcessing: boolean;
  isComplete: boolean;
  error: string | null;
  progress: number;
}

interface ExtractedData {
  fileName: string;
  borrower: string;
  amount: number;
  currency: string;
  interestRate: string;
  maturityDate: string;
  facilityType: string;
  covenants: Array<{
    type: string;
    limit: string;
    frequency: string;
  }>;
  esgTargets: string[];
  lenders: string[];
  agent: string;
}

export default function DocumentProcessingPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    isComplete: false,
    error: null,
    progress: 0
  });
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setProcessing({ isProcessing: false, isComplete: false, error: null, progress: 0 });
      setExtractedData(null);
    } else {
      setProcessing(prev => ({ ...prev, error: 'Please upload a PDF file' }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false
  });

  const simulateProcessing = async () => {
    setProcessing({ isProcessing: true, isComplete: false, error: null, progress: 0 });

    // Simulate processing progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProcessing(prev => ({ ...prev, progress: i }));
    }

    // Mock extracted data
    const mockData: ExtractedData = {
      fileName: uploadedFile!.name,
      borrower: 'Green Energy Corporation',
      amount: 250000000,
      currency: 'USD',
      interestRate: 'SOFR + 2.1%',
      maturityDate: '2031-12-15',
      facilityType: 'Term Loan Facility',
      covenants: [
        { type: 'Debt/EBITDA', limit: '< 3.0x', frequency: 'Quarterly' },
        { type: 'Interest Coverage', limit: '> 4.0x', frequency: 'Quarterly' },
        { type: 'Leverage Ratio', limit: '< 2.5x', frequency: 'Quarterly' },
        { type: 'Current Ratio', limit: '> 1.5x', frequency: 'Quarterly' }
      ],
      esgTargets: [
        '30% carbon reduction by 2028',
        'Solar capacity 500MW by 2030',
        '100% renewable energy by 2032'
      ],
      lenders: ['Global Bank Ltd', 'International Finance Corp', 'Sustainable Investors Fund'],
      agent: 'Global Bank Ltd'
    };

    setExtractedData(mockData);
    setProcessing({ isProcessing: false, isComplete: true, error: null, progress: 100 });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="text-blue-600" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Document Intelligence</h1>
              <p className="text-slate-600 mt-1">AI-powered loan document analysis and extraction</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Upload Document</h2>
              
              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto text-slate-400 mb-4" size={48} />
                  <p className="text-slate-700 font-medium mb-2">
                    {isDragActive ? 'Drop PDF here' : 'Drag & drop PDF here'}
                  </p>
                  <p className="text-slate-500 text-sm">or click to browse</p>
                  <p className="text-slate-400 text-xs mt-2">PDF files only, max 10MB</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <FileText className="text-blue-600" size={24} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 truncate">{uploadedFile.name}</p>
                      <p className="text-sm text-slate-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  {!processing.isComplete && (
                    <button
                      onClick={simulateProcessing}
                      disabled={processing.isProcessing}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {processing.isProcessing ? 'Processing...' : 'Start Processing'}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setProcessing({ isProcessing: false, isComplete: false, error: null, progress: 0 });
                      setExtractedData(null);
                    }}
                    className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                  >
                    Upload New Document
                  </button>
                </div>
              )}

              {/* Processing Progress */}
              {processing.isProcessing && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-blue-600 animate-spin" size={16} />
                    <span className="text-sm font-medium text-slate-700">Processing...</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processing.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{processing.progress}% complete</p>
                </div>
              )}

              {/* Success/Error States */}
              {processing.isComplete && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="font-medium text-green-800">Processing Complete</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Document analyzed successfully. Data extracted below.
                  </p>
                </div>
              )}

              {processing.error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="text-red-600" size={20} />
                    <span className="font-medium text-red-800">Error</span>
                  </div>
                  <p className="text-sm text-red-700">{processing.error}</p>
                </div>
              )}
            </div>

            {/* Processing Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white mt-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Processing Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-100">Avg Processing Time</span>
                  <span className="font-medium">92 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Accuracy Rate</span>
                  <span className="font-medium">99.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Documents Today</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Time Saved</span>
                  <span className="font-medium">156 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Data Section */}
          <div className="lg:col-span-2">
            {extractedData ? (
              <div className="space-y-6">
                {/* Basic Details */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <DollarSign className="text-blue-600" size={24} />
                    Basic Loan Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Borrower</label>
                      <p className="text-lg font-semibold text-slate-800">{extractedData.borrower}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Facility Amount</label>
                      <p className="text-lg font-semibold text-slate-800">
                        {formatCurrency(extractedData.amount, extractedData.currency)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Interest Rate</label>
                      <p className="text-lg font-semibold text-slate-800">{extractedData.interestRate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Maturity Date</label>
                      <p className="text-lg font-semibold text-slate-800">{extractedData.maturityDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Facility Type</label>
                      <p className="text-lg font-semibold text-slate-800">{extractedData.facilityType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Agent</label>
                      <p className="text-lg font-semibold text-slate-800">{extractedData.agent}</p>
                    </div>
                  </div>
                </div>

                {/* Covenants */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <Shield className="text-amber-600" size={24} />
                    Financial Covenants
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Covenant Type</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Limit</th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700">Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {extractedData.covenants.map((covenant, index) => (
                          <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4 font-medium text-slate-800">{covenant.type}</td>
                            <td className="py-3 px-4 text-slate-700">{covenant.limit}</td>
                            <td className="py-3 px-4 text-slate-700">{covenant.frequency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ESG Targets */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                    <Leaf className="text-green-600" size={24} />
                    ESG Targets & Commitments
                  </h3>
                  <div className="space-y-3">
                    {extractedData.esgTargets.map((target, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="text-slate-800">{target}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lenders */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-6">Lending Syndicate</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {extractedData.lenders.map((lender, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="font-medium text-slate-800">{lender}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-12 shadow-lg text-center">
                <FileText className="mx-auto text-slate-300 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Document Processed</h3>
                <p className="text-slate-500">Upload a PDF document to see extracted data here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
