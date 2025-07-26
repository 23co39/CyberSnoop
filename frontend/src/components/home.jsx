import React, { useState } from 'react';
import { Shield, Search, Globe, Lock, Zap, Eye } from 'lucide-react';

const Home = ({ onAnalyze }) => {
  const [urlInput, setUrlInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setIsAnalyzing(true);
      // Call the parent component's analyze function
      onAnalyze(urlInput.trim(), () => setIsAnalyzing(false));
    }
  };

  return (
    <div className="text-amber-600 bg-amber-50 border-amber-200" style={{backgroundColor : '#3c4748'}}>
      {/* Hero Section */}
                <div className="flex justify-center align-middle">
            <img src="/images/snoop.svg" alt="Check Website Safety" className="w-full max-w-md h-auto mx-auto"/>
          </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Hero Content */}

          {/* URL Input Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="p-8 rounded-2xl shadow-2xl border border-teal-600" style={{ backgroundColor: '#273b40' }}>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com or paste suspicious URL here..."
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
                  />
                </div>
                <button
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim() || isAnalyzing}
                  className=" text-black px-8 py-4 rounded-xl transition-all flex items-center space-x-2 font-semibold disabled:cursor-not-allowed min-w-fit"style={{background : '#cae9ea'}}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Analyze URL</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-left">
                <Lock className="w-4 h-4 inline mr-1" />
                Your URLs are analyzed securely and not stored permanently.
              </p>
            </div>
          </div>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed"style={{color : '#1d1d1d'}}>
              Protect yourself from malicious websites with our phishing detection system. 
              Simply paste any URL and get instant security analysis with detailed threat assessment.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Home;