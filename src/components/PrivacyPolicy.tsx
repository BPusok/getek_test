import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Mail, Phone, User } from "lucide-react";

const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => {
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
            <span className="text-gradient">Adatvédelmi Szabályzat</span>
          </h1>
          <p className="text-muted-foreground">
            Hatályos: 2025. augusztus 16-tól
          </p>
        </div>

        <div className="space-y-8">
          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Adatkezelő Adatai</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="space-y-1 text-sm">
                  <p><strong>Adatkezelő:</strong> GÉTEK Mérnöki Szolgáltató Kft.</p>
                  <p><strong>Székhely:</strong> H-1183 Budapest, Szil utca 5.</p>
                  <p><strong>Cégjegyzékszám:</strong> 01 09 422575</p>
                  <p><strong>Adószám:</strong> 32408342-2-43</p>
                  <p><strong>Kapcsolat:</strong> iroda@getek.hu, +36 20 4857309</p>
                  <p><strong>Adatvédelmi kapcsolattartó:</strong> Kovács Árpád</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Kezelt Adatok</h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Általunk kezelt személyes adatok:</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Név, beosztás</li>
                  <li>E-mail cím</li>
                  <li>Telefonszám</li>
                  <li>Cégnév, cím</li>
                  <li>Számlázási adatok</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Adatkezelés célja:</h3>
                <div className="bg-green-50 p-4 rounded-lg text-sm">
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Szolgáltatás teljesítése</li>
                    <li>Kapcsolattartás</li>
                    <li>Számlázás</li>
                    <li>Jogszabályi kötelezettségek teljesítése</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Adatkezelés jogalapja:</h3>
                <p className="text-sm">
                  Szerződés teljesítése (GDPR 6. cikk (1) b pont), valamint 
                  jogos érdek (GDPR 6. cikk (1) f pont).
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Adatkezelés Időtartama</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <p><strong>Szerződéses adatok:</strong> Szerződés teljesítését követő 5 év</p>
                  <p><strong>Számviteli adatok:</strong> Jogszabály szerint 8 év</p>
                  <p><strong>Kapcsolattartási adatok:</strong> Visszavonásig vagy törlés kéréséig</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Az Ön Jogai</h2>
            </div>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">GDPR szerinti jogok:</h3>
                <ul className="space-y-2 text-sm list-disc list-inside">
                  <li><strong>Hozzáférési jog:</strong> Tájékoztatás kérése az adatkezelésről</li>
                  <li><strong>Helyesbítési jog:</strong> Hibás adatok javításának kérése</li>
                  <li><strong>Törlési jog:</strong> Adatok törlésének kérése</li>
                  <li><strong>Korlátozási jog:</strong> Adatkezelés korlátozásának kérése</li>
                  <li><strong>Tiltakozási jog:</strong> Adatkezelés elleni tiltakozás</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Hogyan gyakorolhatja jogait?</h4>
                <p className="text-sm">
                  Írásban az <strong>iroda@getek.hu</strong> e-mail címre vagy postai úton 
                  a székhelyünkre küldött levélben. Válaszunkat 30 napon belül megküldjük.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Adatvédelem és Biztonság</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Adatbiztonság:</h3>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Elektronikus adatok jelszóval védett rendszerekben</li>
                  <li>Papír dokumentumok zárható szekrényben</li>
                  <li>Hozzáférés csak arra jogosult személyek számára</li>
                  <li>Rendszeres biztonsági mentések</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Adattovábbítás:</h3>
                <p className="text-sm">
                  Személyes adatokat harmadik félnek csak jogszabályi kötelezettség esetén 
                  (pl. NAV, bíróság) vagy az Ön kifejezett hozzájárulásával továbbítunk.
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Weboldal és Sütik</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Weboldalunk:</h3>
                <p className="text-sm">
                  Weboldalunk alapvetően csak technikai működéshez szükséges sütiket használ. 
                  Nem gyűjtünk látogatási statisztikákat, nem használunk elemzési eszközöket.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Használt sütik:</h4>
                <ul className="space-y-1 text-sm list-disc list-inside">
                  <li>Funkcionális sütik: A weboldal működéséhez szükségesek</li>
                  <li>Beállítások mentése: Felhasználói preferenciák tárolása</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Panaszkezelés</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-sm">
                Ha úgy érzi, hogy adatkezelésünk nem megfelelő, panaszt tehet:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Nálunk
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>iroda@getek.hu</p>
                    <p>H-1183 Budapest, Szil utca 5.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Hatóságnál
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>Nemzeti Adatvédelmi és Információszabadság Hatóság</p>
                    <p>H-1055 Budapest, Falk Miksa utca 9-11.</p>
                    <p>ugyfelszolgalat@naih.hu</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 bg-blue-50 border-blue-200">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Kérdése van?</h3>
              <p className="text-sm text-muted-foreground">
                Az adatvédelemmel kapcsolatos kérdéseit szívesen megválaszoljuk: 
                <strong> iroda@getek.hu</strong> | <strong>+36 20 4857309</strong>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
