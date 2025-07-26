import React from 'react';
import { Shield, ShieldCheck, ShieldX, AlertTriangle, ArrowLeft } from 'lucide-react';

const Results = ({ analysisResult, onGoBack, onAnalyzeNew }) => {
  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Available</h3>
          <p className="text-gray-600 mb-4">Please analyze a URL first</p>
          <button
            onClick={onGoBack}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (analysisResult.status) {
      case 'safe':
        return <ShieldCheck className="w-12 h-12 text-green-600" />;
      case 'suspicious':
        return <AlertTriangle className="w-12 h-12 text-yellow-600" />;
      case 'dangerous':
        return <ShieldX className="w-12 h-12 text-red-600" />;
      default:
        return <Shield className="w-12 h-12 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (analysisResult.status) {
      case 'safe':
        return 'from-green-500 to-green-600';
      case 'suspicious':
        return 'from-yellow-500 to-yellow-600';
      case 'dangerous':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCheckIcon = (status) => {
    switch (status) {
      case 'pass':
        return <ShieldCheck className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'fail':
        return <ShieldX className="w-5 h-5 text-red-600" />;
      default:
        return <Shield className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PhishGuard
              </span>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={onGoBack}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Home
              </button>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Results
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onGoBack}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another URL</span>
        </button>

        {/* Main Result Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {getStatusIcon()}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{analysisResult.riskLevel}</h1>
            <p className="text-gray-600 break-all bg-gray-50 px-4 py-2 rounded-lg">
              {analysisResult.url}
            </p>
          </div>

          {/* Confidence Score */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Confidence Score</span>
              <span className="text-sm font-bold text-gray-900">{analysisResult.confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${getStatusColor()}`}
                style={{ width: `${analysisResult.confidence}%` }}
              ></div>
            </div>
          </div>

          {/* Analysis Timestamp */}
          <p className="text-sm text-gray-500 text-center">
            Analysis completed on {analysisResult.timestamp}
          </p>
        </div>

        {/* Security Checks */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Checks
            </h3>
            <div className="space-y-4">
              {analysisResult.checks.map((check, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  {getCheckIcon(check.status)}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{check.name}</h4>
                    <p className="text-sm text-gray-600">{check.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Recommendations
            </h3>
            <div className="space-y-3">
              {analysisResult.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onAnalyzeNew}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            Analyze Another URL
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium"
          >
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;