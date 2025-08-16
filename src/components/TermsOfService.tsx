import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Scale, Clock } from "lucide-react";

const TermsOfService = ({ onBack }: { onBack: () => void }) => {
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
            <span className="text-gradient">Általános Szerződési Feltételek</span>
          </h1>
          <p className="text-muted-foreground">
            Hatályos: 2025. augusztus 16-tól
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Szolgáltató Adatai</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-1 text-sm">
                  <p><strong>Cégnév:</strong> GÉTEK Mérnöki Szolgáltató Kft.</p>
                  <p><strong>Székhely:</strong> H-1183 Budapest, Szil utca 5.</p>
                  <p><strong>Cégjegyzékszám:</strong> 01 09 422575</p>
                  <p><strong>Adószám:</strong> 32408342-2-43</p>
                  <p><strong>Képviseli:</strong> Kovács Árpád ügyvezető</p>
                  <p><strong>E-mail:</strong> iroda@getek.hu</p>
                  <p><strong>Telefon:</strong> +36 20 4857309</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Szolgáltatások</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>A GÉTEK Kft. épületgépészeti tervezéssel és tanácsadással foglalkozik.</p>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3">Főbb tevékenységek:</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Épületgépészeti tervezés</li>
                  <li>Épületenergetikai tanácsadás</li>
                  <li>Közműtervezés</li>
                  <li>Napelemes rendszerek tervezése</li>
                  <li>Műszaki tanácsadás</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm">
                  A szolgáltatások részletes leírása az egyedi ajánlatban kerül meghatározásra.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Szerződés és Teljesítés</h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Megrendelés menete:</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Megkeresés telefonon vagy e-mailben</li>
                  <li>Egyeztetés, helyszíni felmérés szükség esetén</li>
                  <li>Írásos ajánlat készítése</li>
                  <li>Megrendelés visszaigazolása</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Teljesítési idő:</h3>
                <p className="text-sm">
                  A teljesítési határidő a projekt összetettségétől függ, az ajánlatban 
                  kerül meghatározásra. Átlagosan 1-6 hét közötti időtartammal számolunk.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Díjazás és Fizetés</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Díjszabás:</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Óradíjas vagy átalánydíjas elszámolás</li>
                  <li>Minden ár tartalmazza a 27% ÁFA-t</li>
                  <li>Árak az ajánlatban kerülnek rögzítésre</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Fizetési feltételek:</h3>
                <div className="bg-blue-50 p-4 rounded-lg text-sm">
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Kisebb munkák: teljes összeg átadáskor</li>
                    <li>Nagyobb projektek: 50% előleg, 50% készre jelentéskor</li>
                    <li>Fizetési határidő: számla kézhezvételétől 8 nap</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Garancia és Felelősség</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Kellékszavatosság:</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Tervezési hibák: 2 év</li>
                  <li>Számítási hibák javítása költségmentesen</li>
                  <li>Dokumentációs hibák azonnali javítása</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Felelősség:</h3>
                <p className="text-sm">
                  Kártérítési kötelezettség a szerződés nettó értékének erejéig terjed. 
                  A garancia nem vonatkozik az ügyfél által módosított tervekre.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Egyéb Rendelkezések</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Szerzői jogok:</h3>
                <p className="text-sm">
                  A tervek szerzői joga a GÉTEK Kft-t illeti. Az ügyfél a tervek 
                  rendeltetésszerű használatára jogosult.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Jogviták:</h3>
                <p className="text-sm">
                  Vitás kérdések elsősorban egyeztetés útján kerülnek rendezésre. 
                  Ennek sikertelensége esetén a Fővárosi Törvényszék az illetékes.
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Hatálybalépés:</h4>
                <p className="text-sm">
                  Jelen ÁSZF 2025. augusztus 16. napjától hatályos.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 bg-blue-50 border-blue-200">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Elérhetőség</h3>
              <p className="text-sm text-muted-foreground">
                Kérdések esetén hívjon bennünket: 
                <strong> +36 20 4857309</strong> vagy írjon: <strong>iroda@getek.hu</strong>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
