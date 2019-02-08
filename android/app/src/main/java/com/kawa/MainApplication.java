package com.kawa;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativepayments.ReactNativePaymentsPackage;
import com.vasilich6107.rnliqpay.RNLiqpayPackage;
// import com.reactlibrary.RNGpayPackage;
import com.reactnativepayments.ReactNativePaymentsPackage;
import com.vasilich6107.rnliqpay.RNLiqpayPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;

import com.airship.customwebview.CustomWebViewPackage;
import com.airship.customwebview.CustomWebViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativePaymentsPackage(),
            new RNLiqpayPackage(),
            // new RNGpayPackage(),
            new RNSharePackage(),
            new CustomWebViewPackage(),
            new OrientationPackage(),
            new ReactNativeYouTube(),
            new ReactNativeIcons(),
            new SvgPackage(),
            new VectorIconsPackage(),
            new RNTextInputMaskPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  
     @Override
     public String getFileProviderAuthority() {
            return "com.kawa.provider";
     }
}
