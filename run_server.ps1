# TechMan Assist Local Static Web Server
# Uses built-in .NET HTTP listener (No Python or Node.js required)

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

Write-Host "--------------------------------------------------------" -ForegroundColor Cyan
Write-Host "      Starting TechMan Assist Local Server on Port $port" -ForegroundColor Cyan
Write-Host "--------------------------------------------------------" -ForegroundColor Cyan

try {
    $listener.Start()
    Write-Host "Server running at: http://localhost:$port/" -ForegroundColor Green
    Write-Host "Press [Ctrl + C] in this window to stop the server." -ForegroundColor Yellow
    
    # Automatically launch the default browser
    Start-Process "http://localhost:$port/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") { 
            $urlPath = "/index.html" 
        }
        
        # Build local absolute path
        $cleanPath = $urlPath.TrimStart('/')
        $filePath = Join-Path $PSScriptRoot $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            # Read file bytes
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Identify MIME Types
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".webp" { "image/webp" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            
            # Write bytes to output stream
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # File Not Found
            $response.StatusCode = 404
            $errMessage = "404 Not Found: $urlPath"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errMessage)
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "Error running server: $_" -ForegroundColor Red
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Red
}
