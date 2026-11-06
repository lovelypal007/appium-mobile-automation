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

            echo Checking Appium...
            npx appium --version
            npx appium driver list --installed

            allure --version

            echo Checking Android Emulator...
            adb -s %ANDROID_SERIAL% get-state

            echo Checking emulator boot status...
            adb -s %ANDROID_SERIAL% shell getprop sys.boot_completed
        '''
    }
}

    post {
        always {
            bat '''
                if exist allure-results (
                    npx allure generate allure-results --clean -o allure-report
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
}