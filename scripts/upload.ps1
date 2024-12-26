#!/usr/bin/env pwsh

# Load environment variables from .env file
$envFilePath = Join-Path -Path (Split-Path -Parent $MyInvocation.MyCommand.Path) -ChildPath "../.env"

if (-not (Test-Path $envFilePath)) {
    Write-Host "Error: .env file not found"
    exit 1
}

Get-Content $envFilePath | ForEach-Object {
    if ($_ -match "^\s*([^#][^=]+)=(.*)$") {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2])
    }
}

# Check required environment variables
if (-not $env:HOST) {
    Write-Host "Error: HOST not found in .env file"
    exit 1
}

if (-not $env:USER) {
    Write-Host "Error: USER not found in .env file"
    exit 1
}

# Read program.json file
$programFilePath = Join-Path -Path (Split-Path -Parent $MyInvocation.MyCommand.Path) -ChildPath "../program.json"

if (-not (Test-Path $programFilePath)) {
    Write-Host "Error: program.json file not found"
    exit 1
}

$programFile = Get-Content $programFilePath | ConvertFrom-Json

$name = $programFile.name
$files = $programFile.files | ForEach-Object { Resolve-Path -Path $_ }

if (-not $name) {
    Write-Host "Error: name not found in program.json"
    exit 1
}

if (-not $files) {
    Write-Host "Error: files not found in program.json"
    exit 1
}

# Transfer files
Write-Host "Transferring files to $env:HOST..."
$files | ForEach-Object {
    scp -r $_ "$env:USER@$env:HOST:/mojo/program/$name/"
}

# Restart program
Write-Host "`nRestarting program..."
ssh "$env:USER@$env:HOST" "program:restart $name"
