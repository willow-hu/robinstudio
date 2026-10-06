param(
    [string]$Source = 'E:\Study\Game_as_UGC\Codes\museum-ugc-prototype'
)
$ErrorActionPreference = 'Stop'
$dist = Join-Path $Source 'dist'
foreach ($entry in @('index.html', 'assets', 'data\ugc_data.json', 'data\users_data.json')) {
    if (-not (Test-Path -LiteralPath (Join-Path $dist $entry))) {
        throw "Missing dist/$entry. Build the frontend in the source project first."
    }
}
$destination = Join-Path (Split-Path $PSScriptRoot -Parent) 'apps\museum-ugc'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Get-ChildItem -LiteralPath $dist | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse -Force
}
Write-Output "Museum UGC build synced to $destination"
