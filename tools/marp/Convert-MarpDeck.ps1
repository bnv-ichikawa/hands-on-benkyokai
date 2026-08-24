[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$InputPath,

    [ValidateSet("pdf", "pptx", "both")]
    [string]$Format = "pdf",

    [string]$OutputPath,

    [string]$ThemeSetPath = "docs/lectures/themes"
)

$ErrorActionPreference = "Stop"

function Resolve-RepoPath {
    param([Parameter(Mandatory = $true)][string]$Path)

    if ([System.IO.Path]::IsPathRooted($Path)) {
        return [System.IO.Path]::GetFullPath($Path)
    }

    return [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $Path))
}

function Invoke-Marp {
    param(
        [Parameter(Mandatory = $true)][string]$InputFile,
        [Parameter(Mandatory = $true)][string]$OutputFile,
        [Parameter(Mandatory = $true)][string]$ThemeDirectory
    )

    $outputDirectory = Split-Path -Parent $OutputFile
    if (-not (Test-Path -LiteralPath $outputDirectory)) {
        New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
    }

    $args = @(
        "@marp-team/marp-cli@latest",
        $InputFile,
        "-o",
        $OutputFile,
        "--theme-set",
        $ThemeDirectory,
        "--allow-local-files"
    )

    Write-Host "Running: npx.cmd --yes $($args -join ' ')"
    & npx.cmd --yes @args
    if ($LASTEXITCODE -ne 0) {
        throw "Marp CLI failed with exit code $LASTEXITCODE."
    }

    if (-not (Test-Path -LiteralPath $OutputFile)) {
        throw "Marp CLI finished but output file was not created: $OutputFile"
    }

    Write-Host "Created: $OutputFile"
}

function Convert-OneFile {
    param(
        [Parameter(Mandatory = $true)][string]$InputFile,
        [Parameter(Mandatory = $true)][string]$OutputBase,
        [Parameter(Mandatory = $true)][string]$Format,
        [Parameter(Mandatory = $true)][string]$ThemeDirectory,
        [bool]$ExactPathAllowed = $false
    )

    if ($Format -eq "pdf" -or $Format -eq "both") {
        $pdfPath = if ($ExactPathAllowed -and $Format -eq "pdf" -and [System.IO.Path]::GetExtension($OutputBase) -eq ".pdf") {
            $OutputBase
        } else {
            [System.IO.Path]::ChangeExtension($OutputBase, ".pdf")
        }
        Invoke-Marp -InputFile $InputFile -OutputFile $pdfPath -ThemeDirectory $ThemeDirectory
    }

    if ($Format -eq "pptx" -or $Format -eq "both") {
        $pptxPath = if ($ExactPathAllowed -and $Format -eq "pptx" -and [System.IO.Path]::GetExtension($OutputBase) -eq ".pptx") {
            $OutputBase
        } else {
            [System.IO.Path]::ChangeExtension($OutputBase, ".pptx")
        }
        Invoke-Marp -InputFile $InputFile -OutputFile $pptxPath -ThemeDirectory $ThemeDirectory
    }
}

$inputResolved = Resolve-RepoPath $InputPath
$themeDirectory = Resolve-RepoPath $ThemeSetPath

if (-not (Test-Path -LiteralPath $themeDirectory)) {
    throw "Theme set directory not found: $themeDirectory"
}

if (Test-Path -LiteralPath $inputResolved -PathType Container) {
    $inputFiles = @(Get-ChildItem -LiteralPath $inputResolved -Filter "*.md" -File | Sort-Object Name | ForEach-Object { $_.FullName })
    if ($inputFiles.Count -eq 0) {
        throw "No .md files found in directory: $inputResolved"
    }
} elseif (Test-Path -LiteralPath $inputResolved -PathType Leaf) {
    $inputFiles = @($inputResolved)
} else {
    throw "Input path not found: $inputResolved"
}

$outputsDirectoryDefault = Resolve-RepoPath "outputs"
$isSingleFile = $inputFiles.Count -eq 1

foreach ($inputFile in $inputFiles) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($inputFile)

    if ($isSingleFile -and -not [string]::IsNullOrWhiteSpace($OutputPath)) {
        $outputBase = Resolve-RepoPath $OutputPath
        $extension = [System.IO.Path]::GetExtension($outputBase)
        if ($Format -eq "both" -and -not [string]::IsNullOrWhiteSpace($extension)) {
            $outputBase = Join-Path (Split-Path -Parent $outputBase) ([System.IO.Path]::GetFileNameWithoutExtension($outputBase))
        }
        Convert-OneFile -InputFile $inputFile -OutputBase $outputBase -Format $Format -ThemeDirectory $themeDirectory -ExactPathAllowed $true
    } else {
        $outputDirectory = if ([string]::IsNullOrWhiteSpace($OutputPath)) { $outputsDirectoryDefault } else { Resolve-RepoPath $OutputPath }
        $outputBase = Join-Path $outputDirectory $baseName
        Convert-OneFile -InputFile $inputFile -OutputBase $outputBase -Format $Format -ThemeDirectory $themeDirectory -ExactPathAllowed $false
    }
}
