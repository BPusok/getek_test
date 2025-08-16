import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, Check, X } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy van-e már mentett hozzájárulás
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      functional: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      functional: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      functional: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto">
      <Card className="glass-card border-2 border-primary/20 shadow-xl">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Cookie className="w-8 h-8 text-primary" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Sütik (Cookie-k) használata
                </h3>
                <p className="text-sm text-muted-foreground">
                  Weboldalunk sütiket használ a megfelelő működés érdekében. 
                  A szükséges sütik a weboldal működéséhez elengedhetetlenek.
                </p>
              </div>

              {showDetails && (
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Szükséges sütik</h4>
                        <p className="text-xs text-muted-foreground">
                          A weboldal működéséhez elengedhetetlenek
                        </p>
                      </div>
                      <div className="text-green-600">
                        <Check className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">Funkcionális sütik</h4>
                        <p className="text-xs text-muted-foreground">
                          Felhasználói élmény javítása (beállítások mentése)
                        </p>
                      </div>
                      <div className="text-blue-600">
                        <Settings className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAcceptAll}
                  className="bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Minden süti elfogadása
                </Button>
                
                <Button 
                  onClick={handleAcceptNecessary}
                  variant="outline"
                  size="sm"
                >
                  Csak szükséges sütik
                </Button>
                
                <Button 
                  onClick={() => setShowDetails(!showDetails)}
                  variant="ghost"
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showDetails ? 'Kevesebb' : 'Részletek'}
                </Button>

                <Button 
                  onClick={handleReject}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-2" />
                  Elutasítás
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Több információ a{" "}
                <button 
                  className="text-primary hover:underline"
                  onClick={() => {/* Cookie policy megnyitása */}}
                >
                  süti szabályzatban
                </button>
                {" "}és az{" "}
                <button 
                  className="text-primary hover:underline"
                  onClick={() => {/* Privacy policy megnyitása */}}
                >
                  adatvédelmi szabályzatban
                </button>.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
