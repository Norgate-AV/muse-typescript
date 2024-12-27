#!/usr/bin/env pwsh

$answer = Read-Host "Transfer now? (Y/n): "
if ($answer -ne 'Y' -and $answer -ne 'y' -and $answer -ne '') {
    exit 0
}

Write-Host

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

& "$scriptDir/upload.ps1"
