import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './pages/home/product/product.component';

import { AboutComponent } from './pages/home/about/about.component';
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
import { AngularFullpageModule } from '@fullpage/angular-fullpage';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    AboutComponent,
    TextParagraphComponent,
    BeautyZoneComponent,
    BubbleComponent,
    PhonePlayerComponent,
    BreaklinePipe,
    PainPointComponent,
    SafeUrlPipe,
    WiseHomeComponent,
    ColorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AngularFullpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
