export const capabilities = {
    platformName: 'Android', //operating system
    'appium:automationName': 'UiAutomator2', //Automation engine
    'appium:deviceName': 'Android Emulator', //Device name
    'appium:udid': 'emulator-5554', //Unique device identifier
    'appium:platformVersion': '17', //Android version
    'appium:noReset': false, //Whether to preserve app state
    'appium:newCommandTimeout': 120 ,//Session inactivity timeout
    
    // Android Settings application
    // 'appium:appPackage': 'com.android.settings',
    // 'appium:appActivity': '.Settings',
};