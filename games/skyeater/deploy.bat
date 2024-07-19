
set DEPLOY_PATH=..\..\output\games\skyeater

copy skyeater.css %DEPLOY_PATH%
copy skyeater.html %DEPLOY_PATH%
copy image.png %DEPLOY_PATH%

npx esbuild skyeater.ts --bundle --outdir=%DEPLOY_PATH%

rem how to tell batch file interpeter to run and return this command ^