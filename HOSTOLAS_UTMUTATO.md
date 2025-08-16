# GÉTEK Weboldal Hostolási Útmutató - Hostigo

## 📁 Feltöltendő Fájlok

A `dist` mappában található összes fájlt és mappát fel kell tölteni a Hostigo szerver `public_html` vagy `www` könyvtárába.

### Fájlstruktúra:
```
public_html/
├── index.html              # Főoldal
├── favicon.ico            # Weboldal ikon
├── robots.txt             # SEO fájl
├── _redirects            # SPA routing
├── googled83ff45d5ffb9af0.html  # Google verifikáció
├── assets/               # CSS, JS, képek
│   ├── index-DEARC7uo.css
│   ├── index-C3-J5YrW.js
│   └── [képfájlok]
├── fonts/                # Betűtípusok
├── logo/                 # Logók
└── partners/             # Partner logók
```

## 🚀 Hostolási Lépések

### 1. Fájlok Feltöltése
- Jelentkezz be a Hostigo cPanel-be vagy FTP-be
- Navigálj a `public_html` mappába
- Töltsd fel a teljes `dist` mappa tartalmát

### 2. Hostigo Specifikus Beállítások

#### A) .htaccess fájl SPA routing-hoz:
Hozz létre egy `.htaccess` fájlt a `public_html` mappában:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Handle Angular and React Router
    RewriteRule ^(?!.*\.).*$ /index.html [L]
    
    # Cache static assets
    <IfModule mod_expires.c>
        ExpiresActive on
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/webp "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
    </IfModule>
    
    # Gzip compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    </IfModule>
</IfModule>
```

### 3. Domain Beállítás
- Állítsd be a domain-t a Hostigo cPanel-ben
- Ha subdomain: `getek.hostigo.hu`
- Ha saját domain: `getek.hu` vagy `www.getek.hu`

### 4. SSL Tanúsítvány
- Aktiváld a Let's Encrypt SSL-t a Hostigo cPanel-ben
- Vagy töltsd fel saját SSL tanúsítványt

## ⚙️ Admin Felület Elérése

A weboldal admin felülete elérhető lesz:
- URL: `https://yourdomain.hu/admin/getek2025admin`
- Itt lehet szerkeszteni a projektek adatait és képeket

## 🔒 Biztonság

### Fontos biztonsági lépések:
1. **Admin URL titkos tartása** - csak szükséges személyekkel osszd meg
2. **Regular backup** - készíts rendszeres mentést
3. **SSL használata** - mindig HTTPS protokoll
4. **Jelszó védelem** - erős admin kulcs használata

## 📊 SEO Optimalizáció

A weboldal már SEO optimalizált:
- ✅ Magyar nyelvű meta tagek
- ✅ Strukturált adatok
- ✅ Gyors betöltés
- ✅ Mobile responsive
- ✅ Robots.txt

## 🛠️ Karbantartás

### Rendszeres feladatok:
- **Tartalom frissítés**: Admin felületen keresztül
- **Backup készítés**: Hetente vagy havonta
- **SSL megújítás**: Automatikus Let's Encrypt esetén
- **Teljesítmény monitoring**: Betöltési idő ellenőrzése

## 🆘 Hibaelhárítás

### Gyakori problémák:

#### Oldal nem töltődik be:
- Ellenőrizd a fájlok feltöltését
- `.htaccess` fájl helyessége
- Domain beállítások

#### Admin felület nem elérhető:
- URL ellenőrzése: `/admin/getek2025admin`
- JavaScript engedélyezése
- Cache törlése

#### Képek nem jelennek meg:
- Fájlútvonalak ellenőrzése
- Jogosultságok (775 mappákra, 644 fájlokra)
- MIME típusok beállítása

## 📞 Támogatás

Ha problémákba ütközöl:
1. Hostigo support: support@hostigo.hu
2. Fejlesztői támogatás: [kapcsolat]

---

**Utolsó frissítés:** 2025. augusztus 16.
**Weboldal verzió:** Production Ready
**Status:** ✅ Hostolásra kész
