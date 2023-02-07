@echo off
for /l %%i in (1, 1, 50) do (
if not exist "project-%%i.html" (
echo ^<!DOCTYPE html^>^<html lang="en"^>^<head^>^<meta charset="UTF-8" /^>^<meta http-equiv="X-UA-Compatible" content="IE=edge" /^>^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>^<link rel="stylesheet" href="../css/styles.css" /^>^<title^>Project %%i^</title^>^</head^>^<body^>^<script src="../js/scripts.js"^>^</script^>^</body^>^</html^> > project-%%i.html
) else (
echo "File project-%%i.html already exists, skipping creation."
)
)
pause