import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie, Settings, Info } from "lucide-react";

const CookiePolicy = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza
          </Button>
          <h1 className="text-4xl font-bold font-heading mb-4">
            <span className="text-gradient">Süti (Cookie) Szabályzat</span>
          </h1>
          <p className="text-muted-foreground">
            Hatályos: 2025. augusztus 16-tól
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Info className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Mi az a süti?</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm">
                A sütik (cookie-k) kis szövegfájlok, amelyeket a weboldal az Ön 
                böngészőjében tárol. Ezek segítenek a weboldal működésében és 
                a felhasználói élmény javításában.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Fontos tudnivaló:</h3>
                <p className="text-sm">
                  Weboldalunk minimális számú sütit használ, kizárólag a működéshez 
                  szükséges funkcionalitásokhoz.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Cookie className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Általunk Használt Sütik</h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Szükséges sütik:</h3>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm list-disc list-inside">
                    <li><strong>Munkamenet kezelés:</strong> A weboldal alapvető működéséhez</li>
                    <li><strong>Biztonsági sütik:</strong> Csalás és visszaélések megelőzéséhez</li>
                    <li><strong>Betöltési preferenciák:</strong> Oldal betöltési beállítások mentése</li>
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Ezek a sütik a weboldal működéséhez elengedhetetlenek, nem kapcsolhatók ki.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Funkcionális sütik:</h3>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm list-disc list-inside">
                    <li><strong>Cookie hozzájárulás:</strong> Az Ön süti beállításainak mentése</li>
                    <li><strong>Felhasználói beállítások:</strong> Nyelv, téma preferenciák</li>
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Ezek javítják a felhasználói élményt, de a weboldal nélkülük is működik.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Amit NEM használunk:</h3>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <ul className="space-y-1 text-sm list-disc list-inside">
                    <li>Elemzési sütik (Google Analytics, stb.)</li>
                    <li>Marketing sütik</li>
                    <li>Harmadik féltől származó követő sütik</li>
                    <li>Reklámozási sütik</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Süti Beállítások</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Hogyan kezelheti a sütiket:</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-foreground">Böngésző beállítások:</h4>
                    <p>A legtöbb böngészőben beállíthatja, hogy mely sütiket fogadja el.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-foreground">Sütik törlése:</h4>
                    <p>A böngésző beállításaiban törölheti a már mentett sütiket.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-medium text-foreground">Funkcionális sütik:</h4>
                    <p>A cookie bannerben módosíthatja a funkcionális sütik használatát.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Figyelem:</h4>
                <p className="text-sm">
                  Ha letiltja a szükséges sütiket, a weboldal nem fog megfelelően működni. 
                  Egyes funkciók nem lesznek elérhetők.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Böngésző Specifikus Beállítások</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Google Chrome:</h4>
                  <p className="text-sm">Beállítások → Adatvédelem és biztonság → Sütik</p>
                  
                  <h4 className="font-medium text-foreground">Mozilla Firefox:</h4>
                  <p className="text-sm">Beállítások → Adatvédelem és biztonság → Sütik</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Safari:</h4>
                  <p className="text-sm">Beállítások → Adatvédelem → Sütik kezelése</p>
                  
                  <h4 className="font-medium text-foreground">Microsoft Edge:</h4>
                  <p className="text-sm">Beállítások → Sütik és webhelyadatok</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Adatvédelem</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Adatkezelés:</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>A sütikben tárolt adatok helyi gépen maradnak</li>
                  <li>Nem osztjuk meg süti adatokat harmadik felekkel</li>
                  <li>Nem használjuk személyazonosításra</li>
                  <li>Automatikusan törlődnek a beállított idő után</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Tárolási idő:</h3>
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <ul className="space-y-1 list-disc list-inside">
                    <li><strong>Munkamenet sütik:</strong> Böngésző bezárásáig</li>
                    <li><strong>Beállítási sütik:</strong> 1 év</li>
                    <li><strong>Funkcionális sütik:</strong> 30 nap</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 bg-blue-50 border-blue-200">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Kérdése van a sütikkel kapcsolatban?</h3>
              <p className="text-sm text-muted-foreground">
                Írjon nekünk: <strong>iroda@getek.hu</strong> vagy hívjon: <strong>+36 20 4857309</strong>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
