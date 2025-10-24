import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after 1 second delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: string) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-blue-600 shadow-2xl animate-slide-up">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
              <Cookie className="h-6 w-6 text-blue-600" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Your Privacy Matters
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more 
                in our{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  Privacy Policy
                </a>
                .
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAcceptAll}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  Accept All Cookies
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2"
                >
                  Reject All
                </Button>
                <Button
                  onClick={() => setShowSettings(true)}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 px-6 py-2"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize Settings
                </Button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleRejectAll}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close banner"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="h-6 w-6 text-blue-600" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription className="text-slate-600">
              Manage your cookie preferences. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Necessary Cookies */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-slate-600" />
                  <h4 className="font-bold text-slate-900">Necessary Cookies</h4>
                </div>
                <Switch checked={true} disabled className="opacity-50" />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                These cookies are essential for the website to function properly. They enable basic functions like 
                page navigation and access to secure areas. The website cannot function properly without these cookies.
              </p>
              <p className="text-xs text-slate-500 mt-2 font-semibold">Always Active</p>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Cookie className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-slate-900">Analytics Cookies</h4>
                </div>
                <Switch
                  checked={preferences.analytics}
                  onCheckedChange={() => togglePreference('analytics')}
                />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                These cookies help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. This helps us improve our website's performance and user experience.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Cookie className="h-5 w-5 text-purple-600" />
                  <h4 className="font-bold text-slate-900">Marketing Cookies</h4>
                </div>
                <Switch
                  checked={preferences.marketing}
                  onCheckedChange={() => togglePreference('marketing')}
                />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                These cookies are used to track visitors across websites. The intention is to display ads that are 
                relevant and engaging for individual users and thereby more valuable for publishers and advertisers.
              </p>
            </div>

            {/* Functional Cookies */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Cookie className="h-5 w-5 text-green-600" />
                  <h4 className="font-bold text-slate-900">Functional Cookies</h4>
                </div>
                <Switch
                  checked={preferences.functional}
                  onCheckedChange={() => togglePreference('functional')}
                />
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                These cookies enable the website to provide enhanced functionality and personalization. They may be 
                set by us or by third-party providers whose services we have added to our pages.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button
              onClick={handleSavePreferences}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Save Preferences
            </Button>
            <Button
              onClick={handleAcceptAll}
              variant="outline"
              className="flex-1 border-slate-300 hover:bg-slate-50 py-3"
            >
              Accept All
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default CookieConsent;
