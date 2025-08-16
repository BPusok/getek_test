# GÉTEK Projektek Admin Kezelése

Ez a dokumentáció azt ismerteti, hogyan lehet használni az admin felületet a referencia projektek szerkesztéséhez.

## Admin felület elérése

Az admin felület egy speciális URL kulccsal érhető el:

```
http://localhost:8080/admin/getek2025admin
```

### URL kulcs megváltoztatása

Az admin kulcs a `src/components/AdminProjects.tsx` fájlban található:

```typescript
const ADMIN_KEY = "getek2025admin"; // Változtasd meg ezt a kulcsot
```

## Funkciók

### 1. Projekt hozzáadása
- Kattints az "Add Project" gombra
- Töltsd ki a kötelező mezőket (cím, leírás)
- Add meg a kategóriát (Residential, Industrial, Public)
- **Tölts fel egyedi képet vagy használd az alapértelmezett kategória képét**
- Add meg a helyszínt és évet
- Add meg a funkciókat (Features)
- Kattints a "Save Project" gombra

### 2. Projekt szerkesztése
- Kattints a ceruza ikonra a projekt kártyáján
- Módosítsd a szükséges mezőket
- **Cseréld ki a képet vagy használj alapértelmezettet**
- Kattints a "Save Project" gombra

### 3. Projekt törlése
- Kattints a piros kuka ikonra a projekt kártyáján
- Erősítsd meg a törlést a felugró ablakban

### 4. Képfeltöltés és -kezelés 🆕
- **Egyedi kép feltöltése**: Kattints az "Upload Image" gombra és válassz képet
- **Automatikus optimalizálás**: A képek automatikusan átméretezésre és tömörítésre kerülnek
- **Alapértelmezett kép használata**: A "Use Default" gombbal visszaállíthatod a kategória alapértelmezett képét
- **Vizuális jelzés**: Az egyedi képekkel rendelkező projektek "Custom Image" címkét kapnak
- **Támogatott formátumok**: JPG, PNG, GIF, WebP
- **Maximális fájlméret**: 10MB (a rendszer optimalizálja a képet tárolás előtt)
- **Végső képméret**: Automatikusan 800x600 pixel maximumra átméretezve, 80% minőség JPEG tömörítéssel

### 5. Funkciókezelés (Features)
- Projekt szerkesztésekor kattints az "Add Feature" gombra új funkció hozzáadásához
- Az X gombbal törölhetsz funkciókat
- Minden funkciónak saját input mezője van

### 6. Alapértelmezett projektek visszaállítása
- Kattints a "Reset to Defaults" gombra
- Erősítsd meg a műveletet - ez törli az összes egyéni projektet és képet

## Adattárolás

A projektek és az **egyedi képek** a böngésző localStorage-jában tárolódnak a `getek_projects` kulcs alatt. Ez azt jelenti:
- Az adatok és képek csak az adott böngészőben maradnak meg
- Böngésző cache törlése esetén elvesznek
- Különböző böngészők/gépek különböző adatokat látnak
- **Egyedi képek Base64 formátumban tárolódnak** (ez növeli a tárolási méretet)

### Képtárolás részletei 🆕
- **Formátum**: Base64 kódolt JPEG képek
- **Optimalizálás**: Automatikus átméretezés max 800x600 pixelre
- **Tömörítés**: 80% minőségű JPEG tömörítés
- **Tárolási méret**: Egy optimalizált kép körülbelül 100-300KB Base64 kódolással
- **localStorage limit**: Általában ~5-10MB böngészőnként, ez körülbelül 20-50 egyedi képet jelent

## Képkezelés

A rendszer **hibrid képkezelést** használ:

### Alapértelmezett képek
- **Residential**: project-residential.jpg (statikus asset)
- **Industrial**: project-industrial.jpg (statikus asset)
- **Public**: project-healthcare.jpg (statikus asset)

### Egyedi feltöltött képek
- **Tárolás**: Base64 formátumban a localStorage-ban
- **Betöltés**: Közvetlenül a Base64 string-ből
- **Felismerés**: A `data:` előtaggal kezdődő image string alapján

### Képoptimalizálás folyamata 🆕
1. **Feltöltés**: Felhasználó kiválaszt egy képet
2. **Validálás**: Fájltípus és méret ellenőrzése (max 10MB)
3. **Betöltés**: HTML5 Canvas API-val
4. **Átméretezés**: Arányos skálázás max 800x600 pixelre
5. **Tömörítés**: JPEG formátum 80% minőséggel
6. **Tárolás**: Base64 string mentése localStorage-ba

## Biztonsági megjegyzések

⚠️ **Fontos biztonsági szempontok:**

1. **Kulcs megváltoztatása**: Az alapértelmezett `getek2025admin` kulcsot mindenképp változtasd meg élesítés előtt
2. **HTTPS használata**: Éles környezetben csak HTTPS-en keresztül használd az admin felületet
3. **IP korlátozás**: Fontold meg az admin felület IP címekkel való korlátozását
4. **Backup**: A localStorage könnyen elveszhet, készíts rendszeres mentéseket

## Testreszabás

### Admin kulcs megváltoztatása
```typescript
// src/components/AdminProjects.tsx
const ADMIN_KEY = "your-new-secret-key";
```

### Új kategória hozzáadása
1. Frissítsd a `Project` interfészt a `src/hooks/use-projects.ts` fájlban
2. Add hozzá az új képet a `getImageForCategory` függvényhez
3. Frissítsd a Select komponenst az `AdminProjects.tsx`-ben

### Styling testreszabása
Az admin felület ugyanazokat a Tailwind osztályokat és CSS változókat használja, mint a főoldal.

## Hibaelhárítás

### "Navigate to /" error
- Ellenőrizd, hogy helyes admin kulcsot használsz-e
- Győződj meg róla, hogy a React Router megfelelően működik

### Projektek nem mentődnek
- Ellenőrizd a böngésző konzolt hibákereséshez
- Győződj meg róla, hogy a localStorage engedélyezett
- Próbáld ki inkognitó módban

### Képek nem jelennek meg
- Ellenőrizd, hogy a képek léteznek-e az `src/assets/` mappában (alapértelmezett képek)
- Győződj meg róla, hogy a Vite asset handling megfelelően működik
- Egyedi képek esetén ellenőrizd a localStorage méretét

### Képfeltöltési problémák 🆕
- **"Please select a valid image file"**: Csak képfájlokat (JPG, PNG, GIF, WebP) tölts fel
- **"Image file must be smaller than 10MB"**: Válassz kisebb képfájlt
- **"Failed to upload and process image"**: 
  - Ellenőrizd a böngésző konzolt további részletekért
  - Próbáld más képformátummal
  - Győződj meg róla, hogy a kép nem sérült
- **localStorage túlcsordulás**: Ha túl sok egyedi képet töltöttél fel, törölj néhányat vagy használj alapértelmezett képeket

### Teljesítmény problémák 🆕
- **Lassú betöltés**: Nagy méretű Base64 képek lassíthatják az oldalt
- **Memória problémák**: Túl sok egyedi kép túlterhelheti a böngészőt
- **Megoldás**: Használj kevesebb egyedi képet vagy reset-eld a projekteket

---

## Támogatás

Ha problémáid vannak az admin felülettel, ellenőrizd:
1. A böngésző konzolt hibákért
2. A hálózati lapot API hívásokért
3. A localStorage tartalmát a fejlesztői eszközökben
