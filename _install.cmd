@echo off
cd /d "%~dp0"
echo STEP1 starting > install.log
call npm install -D webpack@5 ts-loader --no-audit --no-fund >> install.log 2>&1
echo STEP2 starting >> install.log
call npm install -D @cypress/webpack-preprocessor@6 --no-audit --no-fund >> install.log 2>&1
echo ALL_DONE >> install.log
