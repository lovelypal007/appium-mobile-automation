
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        ANDROID_SERIAL = 'emulator-5554'
        APPIUM_HOST = '127.0.0.1'
        APPIUM_PORT = '4723'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Environment') {
            steps {
                bat '''
                    node --version
                    npm --version
                    java -version
                    adb version
                    appium --version
                    allure --version

                    echo Checking Android Emulator...
                    adb -s %ANDROID_SERIAL% get-state

                    echo Checking emulator boot status...
                    adb -s %ANDROID_SERIAL% shell getprop sys.boot_completed
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Start Appium Server') {
            steps {
                powershell '''
                    $ErrorActionPreference = "Stop"

                    $url = "http://$env:APPIUM_HOST`:$env:APPIUM_PORT/status"

                    # Check whether Appium is already running
                    try {
                        $response = Invoke-RestMethod -Uri $url -TimeoutSec 3
                        Write-Host "Appium server is already running."
                    }
                    catch {
                        Write-Host "Starting Appium server..."

                        $log = Join-Path $PWD "appium-server.log"
                        $errorLog = Join-Path $PWD "appium-server-error.log"

                        $appium = (Get-Command appium -ErrorAction Stop).Source

                        Start-Process `
                            -FilePath $appium `
                            -ArgumentList @("--address", $env:APPIUM_HOST, "--port", $env:APPIUM_PORT) `
                            -WorkingDirectory $PWD.Path `
                            -RedirectStandardOutput $log `
                            -RedirectStandardError $errorLog `
                            -WindowStyle Hidden

                        $ready = $false

                        for ($i = 0; $i -lt 30; $i++) {
                            Start-Sleep -Seconds 2

                            try {
                                $response = Invoke-RestMethod -Uri $url -TimeoutSec 3
                                $ready = $true
                                break
                            }
                            catch {
                                Write-Host "Waiting for Appium server... ($($i + 1)/30)"
                            }
                        }

                        if (-not $ready) {
                            Write-Host "Appium startup failed."

                            if (Test-Path $log) {
                                Get-Content $log
                            }

                            if (Test-Path $errorLog) {
                                Get-Content $errorLog
                            }

                            throw "Appium server did not become ready."
                        }
                    }

                    Write-Host "Appium server is ready!"
                '''
            }
        }

        stage('Settings Tests') {
            steps {
                bat 'npm run test:settings'
            }
        }

        stage('Login Tests') {
            steps {
                bat 'npm run test:login'
            }
        }

        stage('YouTube Tests') {
            steps {
                bat 'npm run test:youtube'
            }
        }
    }

    post {
        always {
            bat '''
                if exist allure-results (
                    allure generate allure-results --clean -o allure-report
                ) else (
                    echo No Allure results found.
                )
            '''

            archiveArtifacts artifacts: 'allure-results/**,allure-report/**,appium-server.log,appium-server-error.log',
                allowEmptyArchive: true
        }

        success {
            echo 'All Appium test suites passed successfully!'
        }

        failure {
            echo 'One or more Appium test suites failed. Check the Console Output.'
        }
    }
}
