
set DEPLOY_PATH=..\..\output\games\skyeater
npx esbuild skyeater.ts --bundle --outdir=%DEPLOY_PATH%
copy skyeater.css %DEPLOY_PATH%
copy skyeater.html %DEPLOY_PATH%
