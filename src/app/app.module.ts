import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './pages/home/product/product.component';

import { NgxParallaxModule } from '@yoozly/ngx-parallax';
import { AboutComponent } from './pages/home/about/about.component';
import { BeautyZoneComponent } from './pages/beauty-zone/beauty-zone.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    AboutComponent,
    BeautyZoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxParallaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
