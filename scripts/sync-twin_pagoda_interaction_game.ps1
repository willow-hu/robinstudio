param(
    [string]$Source = 'E:\Study\scraiter\game\interaction_game_demo'
)
$ErrorActionPreference = 'Stop'
$destination = Join-Path (Split-Path $PSScriptRoot -Parent) 'apps\twin_pagoda_interaction_game'
$entries = @('index.html', 'config.js', 'scripts', 'styles', 'game_scripts', 'imgs')
foreach ($entry in $entries) {
    if (-not (Test-Path -LiteralPath (Join-Path $Source $entry))) {
        throw "Missing game source: $entry"
    }
}
New-Item -ItemType Directory -Path $destination -Force | Out-Null
foreach ($entry in $entries) {
    Copy-Item -LiteralPath (Join-Path $Source $entry) -Destination $destination -Recurse -Force
}
# The source UIManager has a duplicated reset() tail outside the class.
# Remove only that known duplicate in the published copy; keep the source intact.
$uiPath = Join-Path $destination 'scripts\uiManager.js'
$uiCode = [System.IO.File]::ReadAllText($uiPath).Replace("`r`n", "`n")
$classEnd = $uiCode.LastIndexOf("`n}")
if ($classEnd -ge 0) {
    $tail = $uiCode.Substring($classEnd + 2).Trim()
    if ($tail.StartsWith('this.isTyping = false;') -and $uiCode.Substring(0, $classEnd).Contains($tail)) {
        [System.IO.File]::WriteAllText($uiPath, $uiCode.Substring(0, $classEnd + 2) + "`n", [System.Text.UTF8Encoding]::new($false))
        Write-Output 'Removed duplicated UIManager reset tail from the published copy.'
    }
}
Write-Output "Game runtime files synced to $destination"
