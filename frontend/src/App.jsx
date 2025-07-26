import React, { useState } from 'react';
import Home from './components/home';
import Results from './components/result';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);

  // Mock phishing detection analysis
  const performPhishingAnalysis = (url) => {
    const suspiciousPatterns = [
      'bit.ly', 'tinyurl', 'paypal-secure', 'amazon-update', 'microsoft-security',
      'bank-verify', 'account-suspended', 'urgent-action', 'click-here-now'
    ];
    
    const legitDomains = [
      'google.com', 'facebook.com', 'amazon.com', 'microsoft.com', 'apple.com',
      'github.com', 'stackoverflow.com', 'wikipedia.org', 'youtube.com'
    ];

    const urlLower = url.toLowerCase();
    const isSuspicious = suspiciousPatterns.some(pattern => urlLower.includes(pattern));
    const isLegit = legitDomains.some(domain => urlLower.includes(domain));
    
    let riskLevel, status, confidence;
    
    if (isLegit) {
      riskLevel = 'Safe';
      status = 'safe';
      confidence = Math.floor(Math.random() * 5) + 95; // 95-99%
    } else if (isSuspicious) {
      riskLevel = 'High Risk';
      status = 'dangerous';
      confidence = Math.floor(Math.random() * 10) + 85; // 85-94%
    } else {
      riskLevel = Math.random() > 0.7 ? 'Medium Risk' : 'Low Risk';
      status = riskLevel === 'Medium Risk' ? 'suspicious' : 'safe';
      confidence = Math.floor(Math.random() * 20) + 75; // 75-94%
    }

    const checks = [
      { name: 'SSL Certificate', status: Math.random() > 0.3 ? 'pass' : 'fail', description: 'Valid SSL encryption detected' },
      { name: 'Domain Age', status: Math.random() > 0.4 ? 'pass' : 'warning', description: 'Domain registered for sufficient time' },
      { name: 'Reputation Score', status: status === 'dangerous' ? 'fail' : 'pass', description: 'No malicious activity reported' },
      { name: 'URL Structure', status: isSuspicious ? 'fail' : 'pass', description: 'URL structure analysis' },
      { name: 'Content Analysis', status: Math.random() > 0.2 ? 'pass' : 'warning', description: 'Page content security check' }
    ];

    return {
      url,
      riskLevel,
      status,
      confidence,
      timestamp: new Date().toLocaleString(),
      checks,
      recommendations: generateRecommendations(status)
    };
  };

  const generateRecommendations = (status) => {
    if (status === 'dangerous') {
      return [
        'Do not enter personal information on this website',
        'Avoid clicking links or downloading files',
        'Report this URL to your security team',
        'Use official websites by typing URLs directly'
      ];
    } else if (status === 'suspicious') {
      return [
        'Exercise caution when visiting this website',
        'Verify the URL spelling and domain carefully',
        'Look for secure connection indicators (HTTPS)',
        'Consider using the official website instead'
      ];
    } else {
      return [
        'Website appears to be legitimate',
        'Always verify URLs before entering sensitive data',
        'Keep your browser and security software updated',
        'Be cautious of unexpected links in emails'
      ];
    }
  };

  const handleAnalyze = (url, callback) => {
    // Simulate API call delay
    setTimeout(() => {
      const analysis = performPhishingAnalysis(url);
      setAnalysisResult(analysis);
      setCurrentPage('results');
      if (callback) callback(); // Reset loading state
    }, 2000);
  };

  const handleGoBack = () => {
    setCurrentPage('home');
  };

  const handleAnalyzeNew = () => {
    setAnalysisResult(null);
    setCurrentPage('home');
  };

  return (
    <div>
      {currentPage === 'home' ? (
        <Home onAnalyze={handleAnalyze} />
      ) : (
        <Results 
          analysisResult={analysisResult}
          onGoBack={handleGoBack}
          onAnalyzeNew={handleAnalyzeNew}
        />
      )}
    </div>
  );
};

export default App;