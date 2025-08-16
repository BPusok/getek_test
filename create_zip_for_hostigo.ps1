# GÉTEK Weboldal - ZIP Készítő Script Hostigo Hostoláshoz
# Ez a script létrehoz egy ZIP fájlt a dist mappából a könnyebb feltöltéshez

Write-Host "GÉTEK Weboldal ZIP Készítő - Hostigo Hostoláshoz" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

$DistPath = ".\dist"
$ZipFileName = "getek_weboldal_$(Get-Date -Format 'yyyyMMdd_HHmmss').zip"
$ZipPath = ".\$ZipFileName"

# Ellenőrizzük a dist mappát
if (!(Test-Path $DistPath)) {
    Write-Host "HIBA: A dist mappa nem található!" -ForegroundColor Red
    Write-Host "Futtasd le először: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "Dist mappa megtalálva: $DistPath" -ForegroundColor Green

# Fájlstatisztikák
$FileCount = (Get-ChildItem -Recurse $DistPath -File).Count
$FolderCount = (Get-ChildItem -Recurse $DistPath -Directory).Count
$TotalSize = [math]::Round((Get-ChildItem -Recurse $DistPath -File | Measure-Object Length -Sum).Sum / 1MB, 2)

Write-Host "Statisztikák:" -ForegroundColor Cyan
Write-Host "  - Fájlok száma: $FileCount" -ForegroundColor White
Write-Host "  - Mappák száma: $FolderCount" -ForegroundColor White  
Write-Host "  - Teljes méret: $TotalSize MB" -ForegroundColor White

Write-Host ""
Write-Host "ZIP fájl létrehozása..." -ForegroundColor Yellow

try {
    # ZIP fájl létrehozása
    Compress-Archive -Path "$DistPath\*" -DestinationPath $ZipPath -Force
    
    $ZipSize = [math]::Round((Get-Item $ZipPath).Length / 1MB, 2)
    
    Write-Host "✅ ZIP fájl sikeresen létrehozva!" -ForegroundColor Green
    Write-Host "  - Fájl neve: $ZipFileName" -ForegroundColor White
    Write-Host "  - Fájl mérete: $ZipSize MB" -ForegroundColor White
    Write-Host "  - Teljes útvonal: $((Get-Item $ZipPath).FullName)" -ForegroundColor Gray
    
    Write-Host ""
    Write-Host "HOSTIGO FELTÖLTÉSI ÚTMUTATÓ:" -ForegroundColor Cyan
    Write-Host "1. Jelentkezz be a Hostigo cPanel-be" -ForegroundColor White
    Write-Host "2. Nyisd meg a Fájlkezelőt" -ForegroundColor White
    Write-Host "3. Navigálj a 'public_html' mappába" -ForegroundColor White
    Write-Host "4. Töltsd fel a ZIP fájlt: $ZipFileName" -ForegroundColor White
    Write-Host "5. Csomagold ki a ZIP fájlt a 'public_html' mappában" -ForegroundColor White
    Write-Host "6. Töröld a ZIP fájlt a szerver után kicsomagolás után" -ForegroundColor White
    
    Write-Host ""
    Write-Host "ELLENŐRZÉSI LISTA:" -ForegroundColor Yellow
    Write-Host "☐ ZIP feltöltve és kicsomagolva" -ForegroundColor White
    Write-Host "☐ .htaccess fájl a gyökér mappában" -ForegroundColor White
    Write-Host "☐ Domain beállítva (getek.hostigo.hu vagy saját domain)" -ForegroundColor White
    Write-Host "☐ SSL tanúsítvány aktiválva" -ForegroundColor White
    Write-Host "☐ Weboldal tesztelve: https://domain.hu" -ForegroundColor White
    Write-Host "☐ Admin felület tesztelve: https://domain.hu/admin/getek2025admin" -ForegroundColor White
    
    Write-Host ""
    Write-Host "Sikeres hostolást! 🚀" -ForegroundColor Green
    
} catch {
    Write-Host "❌ HIBA a ZIP fájl létrehozásakor:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
