import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BeautyZoneComponent } from './pages/beauty-zone/beauty-zone.component';
import { BubbleComponent } from './components/bubble/bubble.component';
import { PhonePlayerComponent } from './pages/beauty-zone/phone-player/phone-player.component';
import { TextParagraphComponent } from './pages/beauty-zone/text-paragraph/text-paragraph.component';
import { BreaklinePipe } from './pipes/breakline.pipe';
import { PainPointComponent } from './pages/beauty-zone/pain-point/pain-point.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';
import { WiseHomeComponent } from './pages/wise-home/wise-home.component';
import { ColorComponent } from './pages/wise-home/color/color.component';
import { TabletPlayerComponent } from './components/tablet-player/tablet-player.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { AddictComponent } from './pages/addict/addict.component';
import { MobileUnsupportedComponent } from './pages/mobile-unsupported/mobile-unsupported.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MobileImageSliderComponent } from './components/mobile-image-slider/mobile-image-slider.component';
import { TabletImageSliderComponent } from './components/tablet-image-slider/tablet-image-slider.component';
import { ColorsSliderComponent } from './pages/addict/colors-slider/colors-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TextParagraphComponent,
    BeautyZoneComponent,
    BubbleComponent,
    PhonePlayerComponent,
    BreaklinePipe,
    PainPointComponent,
    SafeUrlPipe,
    WiseHomeComponent,
    ColorComponent,
    TabletPlayerComponent,
    ToggleComponent,
    AddictComponent,
    MobileUnsupportedComponent,
    MobileImageSliderComponent,
    TabletImageSliderComponent,
    ColorsSliderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
