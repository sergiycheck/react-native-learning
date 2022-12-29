## LINKS

1. [authentication google](https://docs.expo.dev/guides/authentication/#google)
2. [google cloud consent screen](https://console.cloud.google.com/apis/credentials/consent/edit?project=expo-react-native-auth-373108)
3. [expo auth session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
4. [auth0 docs](https://auth0.com/docs/quickstart/native/react-native-expo/interactive)

```bash
FAILURE: Build completed with 2 failures.

1: Task failed with an exception.
-----------
* What went wrong:
Execution failed for task ':expo-modules-core:compileDebugJavaWithJavac'.
> Could not resolve all files for configuration ':expo-modules-core:androidJdkImage'.
   > Failed to transform core-for-system-modules.jar to match attributes {artifactType=_internal_android_jdk_image, org.gradle.libraryelements=jar, org.gradle.usage=java-runtime}.
      > Execution failed for JdkImageTransform: /home/serhii/Android/Sdk/platforms/android-31/core-for-system-modules.jar.
         > jlink executable /usr/lib/jvm/java-17-openjdk-amd64/bin/jlink does not exist.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
==============================================================================
```
