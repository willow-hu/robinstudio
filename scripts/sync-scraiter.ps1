param(
    [string]$Source = 'E:\Study\scraiter\Human-AI_Col\web-app\ScrAIter'
)
$ErrorActionPreference = 'Stop'
$dist = Join-Path $Source 'frontend\dist'
if (-not (Test-Path -LiteralPath (Join-Path $dist 'index.html'))) {
    throw 'Missing frontend/dist/index.html. Build the frontend in the source project first.'
}
if (-not (Test-Path -LiteralPath (Join-Path $dist 'assets'))) {
    throw 'Missing frontend/dist/assets. Build the frontend in the source project first.'
}
$destination = Join-Path (Split-Path $PSScriptRoot -Parent) 'apps\scraiter'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Get-ChildItem -LiteralPath $dist | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $destination -Recurse -Force
}
# Replace the Vite scaffold favicon only in the published copy.
$indexPath = Join-Path $destination 'index.html'
$indexHtml = [System.IO.File]::ReadAllText($indexPath).Replace('href="/vite.svg"', 'href="/images/favicon-32x32.png"').Replace('type="image/svg+xml"', 'type="image/png"')
[System.IO.File]::WriteAllText($indexPath, $indexHtml, [System.Text.UTF8Encoding]::new($false))
Write-Output "ScrAIter build synced to $destination"
