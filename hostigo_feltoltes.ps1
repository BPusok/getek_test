# GÉTEK Weboldal Hostigo Feltöltő Script
# Használat: Módosítsd az FTP adatokat és futtasd PowerShell-ben

param(
    [string]$FtpServer = "ftp.hostigo.hu",
    [string]$Username = "your_username",
    [string]$Password = "your_password",
    [string]$RemotePath = "/public_html"
)

Write-Host "GÉTEK Weboldal Feltöltése Hostigo-ra" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

# Ellenőrizzük, hogy létezik-e a dist mappa
$DistPath = ".\dist"
if (!(Test-Path $DistPath)) {
    Write-Host "HIBA: A dist mappa nem található!" -ForegroundColor Red
    Write-Host "Futtasd le először: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "Dist mappa megtalálva: $DistPath" -ForegroundColor Green

# FTP feltöltési function (példa - szükséges lehet FTP kliens)
function Upload-ToFTP {
    Write-Host "FTP feltöltés elkezdése..." -ForegroundColor Yellow
    Write-Host "Szerver: $FtpServer" -ForegroundColor Gray
    Write-Host "Felhasználó: $Username" -ForegroundColor Gray
    Write-Host "Távoli útvonal: $RemotePath" -ForegroundColor Gray
    
    # Itt használhatsz FTP klienseket mint WinSCP, FileZilla command line, stb.
    Write-Host ""
    Write-Host "MANUÁLIS LÉPÉSEK:" -ForegroundColor Cyan
    Write-Host "1. Nyisd meg az FTP kliensedet (FileZilla, WinSCP, stb.)" -ForegroundColor White
    Write-Host "2. Csatlakozz: $FtpServer" -ForegroundColor White
    Write-Host "3. Navigálj a $RemotePath mappába" -ForegroundColor White
    Write-Host "4. Töltsd fel a teljes dist mappa tartalmát" -ForegroundColor White
    Write-Host ""
}

# Fájlok listázása
Write-Host "Feltöltendő fájlok:" -ForegroundColor Cyan
Get-ChildItem -Recurse $DistPath | ForEach-Object {
    $RelativePath = $_.FullName.Replace($PWD.Path + "\dist\", "")
    Write-Host "  - $RelativePath" -ForegroundColor Gray
}

Write-Host ""
$FileCount = (Get-ChildItem -Recurse $DistPath -File).Count
$FolderCount = (Get-ChildItem -Recurse $DistPath -Directory).Count
Write-Host "Összesen: $FileCount fájl, $FolderCount mappa" -ForegroundColor Green

Write-Host ""
Write-Host "Szeretnéd elindítani a feltöltést? (Y/N)" -ForegroundColor Yellow
$UserInput = Read-Host

if ($UserInput -eq "Y" -or $UserInput -eq "y") {
    Upload-ToFTP
} else {
    Write-Host "Feltöltés megszakítva." -ForegroundColor Red
}

Write-Host ""
Write-Host "FONTOS LÉPÉSEK A FELTÖLTÉS UTÁN:" -ForegroundColor Cyan
Write-Host "1. Ellenőrizd a weboldal működését: https://yourdomain.hu" -ForegroundColor White
Write-Host "2. Teszteld az admin felületet: https://yourdomain.hu/admin/getek2025admin" -ForegroundColor White  
Write-Host "3. Állítsd be az SSL tanúsítványt a Hostigo cPanel-ben" -ForegroundColor White
Write-Host "4. Készíts mentést az eredeti fájlokról" -ForegroundColor White
Write-Host ""
Write-Host "Sikeres hostolást! 🚀" -ForegroundColor Green
