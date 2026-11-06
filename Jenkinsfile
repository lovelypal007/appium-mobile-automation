
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
                    adb -s %ANDROID_SERIAL% get-state
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
                bat '''
                    curl.exe --fail http://127.0.0.1:4723/status > nul 2>&1

                    if errorlevel 1 (
                        start "" /B cmd /c "appium --address 127.0.0.1 --port 4723 > appium-server.log 2>&1"
                    )

                    timeout /t 10 /nobreak
                    curl.exe --fail http://127.0.0.1:4723/status
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

            archiveArtifacts artifacts: 'allure-results/**,allure-report/**,appium-server.log',
                             allowEmptyArchive: true
        }

        success {
            echo 'All Appium test suites passed!'
        }

        failure {
            echo 'One or more Appium test suites failed!'
        }
    }
}
