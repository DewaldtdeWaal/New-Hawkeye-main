import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ColorPickerModule } from 'ngx-color-picker';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import {MatTreeModule} from '@angular/material/tree';

// import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AddUserComponent } from './pages/admin/add-user/add-user.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './pages/home/home.component';
import { OverviewComponent } from './pages/reservoirs/res-overview/overview.component';
import { GreenbushesComponent } from './pages/reservoirs/greenbushes/greenbushes.component';
import { VanstadensComponent } from './pages/reservoirs/vanstadens/vanstadens.component';
import { BluehorizonComponent } from './pages/reservoirs/bluehorizon/bluehorizon.component';
import { HeatherbankComponent } from './pages/reservoirs/heatherbank/heatherbank.component';
import { LovemoreheightsComponent } from './pages/reservoirs/lovemoreheights/lovemoreheights.component';
import { TheescombeComponent } from './pages/reservoirs/theescombe/theescombe.component';
import { ChelseaComponent } from './pages/reservoirs/chelsea/chelsea.component';
import { GrassridgeComponent } from './pages/reservoirs/grassridge/grassridge.component';
import { VanriebeeckComponent } from './pages/reservoirs/vanriebeeck/vanriebeeck.component';
import { ChattyComponent } from './pages/reservoirs/chatty/chatty.component';
import { VanStadensPSComponent } from './pages/pump-stations/van-stadens-ps/van-stadens-ps.component';
import { BlueHorizonBayPSComponent } from './pages/pump-stations/blue-horizon-bay-ps/blue-horizon-bay-ps.component';
import { LovemoreHeightsPSComponent } from './pages/pump-stations/lovemore-heights-ps/lovemore-heights-ps.component';
import { TheescombePSComponent } from './pages/pump-stations/theescombe-ps/theescombe-ps.component';
import { BuffelsfonteinPSComponent } from './pages/pump-stations/buffelsfontein-ps/buffelsfontein-ps.component';
import { HeatherbankPSComponent } from './pages/pump-stations/heatherbank-ps/heatherbank-ps.component';
import { DemoPSComponent } from './pages/pump-stations/demo-ps/demo-ps.component';
import { DemoRComponent } from './pages/reservoirs/demo-r/demo-r.component';
import { DemoResTrendComponent } from './pages/reservoirs/demo-res-trend/demo-res-trend.component';
//Login Component

import { AirportresComponent } from './pages/reservoirs/airportres/airportres.component';

import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditPasswordComponent } from './user/edit-password/edit-password.component';
import { FMTowerComponent } from './pages/FlowMeters/fm-tower/fm-tower.component';
import { CrownGardensPsComponent } from './pages/pump-stations/crown-gardens-ps/crown-gardens-ps.component';

import { ManageAccountsComponent } from './pages/admin/manage-accounts/manage-accounts.component';
import { EditAccountsComponent } from './pages/admin/edit-accounts/edit-accounts.component';
import { VanRiebeeckHoogtePSComponent } from './pages/pump-stations/van-riebeeck-hoogte-ps/van-riebeeck-hoogte-ps.component';

import { ChattyPSComponent } from './pages/pump-stations/chatty-ps/chatty-ps.component';
import { RosedaleResComponent } from './pages/reservoirs/rosedale-res/rosedale-res.component';
//import { TrendPickerComponent } from './pages/trends/trendpicker/trend-picker.component';
import { SummitComponent } from './pages/reservoirs/summit/summit.component';
import { VerwoerdPsComponent } from './pages/pump-stations/verwoerd-ps/verwoerd-ps.component';
import { CoegaIDZTComponent } from './pages/FlowMeters/coega-idz-t/coega-idz-t.component';
import { ColorCustomizationComponent } from './user/color-customization/color-customization.component';
import { GamtoosBridgeComponent } from './pages/FlowMeters/gamtoos-bridge/gamtoos-bridge.component';
import { AlarmsViewerComponent } from './pages/alarms-viewer/alarms-viewer.component';
import { StanfordRoadComponent } from './pages/pump-stations/stanford-road/stanford-road.component';
import { ControlLogViewerComponent } from './pages/pump-stations/control-log-viewer/control-log-viewer.component';
import { UitenhageFCComponent } from './pages/FlowMeters/uitenhage-fc/uitenhage-fc.component';
import { NmuEffluentPsComponent } from './pages/pump-stations/nmu-effluent-ps/nmu-effluent-ps.component';
import { NooitgedachtComponent } from './pages/WTW/nooitgedacht/nooitgedacht.component';
import { MotherwellComponent } from './pages/pump-stations/motherwell/motherwell.component';
import { NewtonparkpoolComponent } from './pages/groundwater/newtonparkpool/newtonparkpool.component';
import { CoegaKopComponent } from './pages/reservoirs/coegakop/coegakop.component';
import { CoegakopdownloadComponent } from './pages/reservoirs/coegakopdownload/coegakopdownload.component';
// import { TagSelectorDialogComponent } from './pages/trends/trendpicker-v2/tag-selector-dialog/tag-selector-dialog.component';
import { BethelsdorpComponent } from './pages/FlowMeters/bethelsdorp/bethelsdorp.component';
import { WesselsComponent } from './pages/Feedlots/wessels/wessels.component';
import { TrendpickerV2Component } from './pages/trends/trendpicker-v2/trendpicker-v2.component';
import { TagSelectorComponent } from './pages/trends/trendpicker-v2/tag-selector/tag-selector.component';
import { HumansdorpComponent } from './pages/groundwater/humansdorp/humansdorp.component';
import { Humansdorp2Component } from './pages/groundwater/humansdorp2/humansdorp2.component';
import { Humansdorp3Component } from './pages/groundwater/humansdorp3/humansdorp3.component';
import { Humansdorp4Component } from './pages/groundwater/humansdorp4/humansdorp4.component';
import { AddPresetComponent } from './pages/trends/add-preset/add-preset.component';
import { ManagePresetComponent } from './pages/trends/manage-preset/manage-preset.component';
import { EditPresetComponent } from './pages/trends/edit-preset/edit-preset.component';
import { StormsriverWTWComponent } from './pages/WTW/stormsriver-wtw/stormsriver-wtw.component';
import { StormsriverComponent } from './pages/pump-stations/stormsriver/stormsriver.component';
import { WaplaastrendsComponent } from './pages/trends/waplaastrends/waplaastrends.component';
import { OliphantskopComponent } from './pages/reservoirs/oliphantskop/oliphantskop.component';
import { ElandsjagtComponent } from './pages/WTW/elandsjagt/elandsjagt.component';
import { ChattydownloadComponent } from './pages/pump-stations/chatty-ps/chattydownload/chattydownload.component';
import { ChelseaPSComponent } from './pages/pump-stations/chelsea-ps/chelsea-ps.component';
import { Kareedouwk1Component } from './pages/groundwater/kareedouwk1/kareedouwk1.component';
import { PsOverviewComponent } from './pages/pump-stations/ps-overview/ps-overview.component';
import { EmeraldhillComponent } from './pages/reservoirs/emeraldhill/emeraldhill.component';
import { TestPumpstationComponent } from './pages/pump-stations/test-pumpstation/test-pumpstation.component';
import { SchoemanshoekComponent } from './pages/reservoirs/schoemanshoek/schoemanshoek.component';
import { DriftsandsComponent } from './pages/reservoirs/driftsands/driftsands.component';
import { KwanobuhleComponent } from './pages/reservoirs/kwanobuhle/kwanobuhle.component';
import { UmasizakheComponent } from './pages/reservoirs/umasizakhe/umasizakhe.component';
import { BergendalComponent } from './pages/reservoirs/bergendal/bergendal.component';
import { WolwasComponent } from './pages/reservoirs/wolwas/wolwas.component';
import { TinroofComponent } from './pages/reservoirs/tinroof/tinroof.component';
import { HoldingComponent } from './pages/reservoirs/holding/holding.component';
import { DamcampComponent } from './pages/reservoirs/damcamp/damcamp.component';
import { KroonvaleComponent } from './pages/reservoirs/kroonvale/kroonvale.component';
import { MotherwellresComponent } from './pages/reservoirs/motherwellres/motherwellres.component';

import { CsvComponent } from './pages/trends/csv/csv.component';
import {IsuzuComponent} from './pages/automotive/isuzu/isuzu.component'
import { Humansdorp6Component } from './pages/groundwater/humansdorp6/humansdorp6.component';
import { TestComponent } from './pages/pump-stations/test/test.component';
import { JeffreysBayOffTakeComponent } from './pages/FlowMeters/jeffreys-bay-off-take/jeffreys-bay-off-take.component';
import { ParadiseBeachStFrancisOfftakeComponent } from './pages/FlowMeters/paradise-beach-st-francis-offtake/paradise-beach-st-francis-offtake.component';
import { KougaMainLineComponent } from './pages/FlowMeters/kouga-main-line/kouga-main-line.component';
import { HumansdorpOfftakeComponent } from './pages/FlowMeters/humansdorp-offtake/humansdorp-offtake.component';
import { FptOverviewComponent } from './pages/FlowMeters/fpt-overview/fpt-overview.component';
import { Kareedouwk2Component } from './pages/groundwater/kareedouwk2/kareedouwk2.component';
import { KareedouwkresComponent } from './pages/reservoirs/kareedouwkres/kareedouwkres.component';
import { HumerailComponent } from './pages/groundwater/humerail/humerail.component';
import { GamtoosBreakWaterComponent } from './pages/FlowMeters/gamtoos-break-water/gamtoos-break-water.component';
import { TestPickerComponent } from './pages/trends/test-picker/test-picker.component';
import { NmbmAddUserComponent } from './pages/sub-admin/nmbm-add-user/nmbm-add-user.component';
import { NmbmEditAccountsComponent } from './pages/sub-admin/nmbm-edit-accounts/nmbm-edit-accounts.component';
import { NmbmManageAccountsComponent } from './pages/sub-admin/nmbm-manage-accounts/nmbm-manage-accounts.component';
import { FairviewComponent } from './pages/groundwater/fairview/fairview.component';
import { GlendinningvaleComponent } from './pages/groundwater/glendinningvale/glendinningvale.component';
import { FortnottinghamComponent } from './pages/groundwater/fortnottingham/fortnottingham.component';
import { BushyparkFptComponent } from './pages/FlowMeters/bushypark-fpt/bushypark-fpt.component';
import { BushyparkWtwComponent } from './pages/pump-stations/bushypark-wtw/bushypark-wtw.component';
import { MalibarComponent } from './pages/reservoirs/malibar/malibar.component';
// import { StGeorgesComponent } from './pages/WTW/st-georges/st-georges.component';
import { StGeorgesResComponent } from './pages/reservoirs/st-georges-res/st-georges-res.component';
import { StGeorgesPSComponent } from './pages/pump-stations/st-georges-ps/st-georges-ps.component';
import { KruisfonteinGW12Component } from './pages/groundwater/kruisfontein-gw12/kruisfontein-gw12.component';
import { KruisfonteinGW13Component } from './pages/groundwater/kruisfontein-gw13/kruisfontein-gw13.component';
import { KruisfonteinGW14Component } from './pages/groundwater/kruisfontein-gw14/kruisfontein-gw14.component';
import { KruisfonteinRComponent } from './pages/reservoirs/kruisfontein-r/kruisfontein-r.component';
import { DriverComponent } from './pages/drivers/driver/driver.component';
import {HumansdorpwtwComponent} from './pages/WTW/humansdorpwtw/humansdorpwtw.component';
import { DriverEditComponent } from './pages/drivers/driver-edit/driver-edit.component';
import { DriverManageComponent } from './pages/drivers/driver-manage/driver-manage.component';
import { LevelComponent } from './components/level/level.component';

import { ResPanelComponent } from './components/res-panel/res-panel.component';
import { PumpPanelComponent } from './components/pump-panel/pump-panel.component';
import { CommsPanelComponent } from './components/comms-panel/comms-panel.component';
import { PanelComponent } from './components/panel/panel.component';
import { TwoColumnComponent } from './components/grid/two-column/two-column.component';
import { AlarmsComponent } from './components/alarms/alarms.component';

const appRoutes: Routes = [
  { path: 'coegakop', component: CoegaKopComponent},
  { path: 'coegakopdownload', component: CoegakopdownloadComponent}
];




@NgModule({

  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonToggleModule,
    MatInputModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    ColorPickerModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTreeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AddUserComponent,
    HomeComponent,
    OverviewComponent,
    GreenbushesComponent,
    VanstadensComponent,
    BluehorizonComponent,
    HeatherbankComponent,
    LovemoreheightsComponent,
    TheescombeComponent,
    ChelseaComponent,
    GrassridgeComponent,
    VanriebeeckComponent,
    ChattyComponent,
    VanStadensPSComponent,
    BlueHorizonBayPSComponent,
    LovemoreHeightsPSComponent,
    TheescombePSComponent,
    BuffelsfonteinPSComponent,
    HeatherbankPSComponent,
    DemoPSComponent,
    DemoRComponent,
    DemoResTrendComponent,
    EditPasswordComponent,
    FMTowerComponent,
    CrownGardensPsComponent,
    ManageAccountsComponent,
    HumansdorpwtwComponent,
    EditAccountsComponent,
    VanRiebeeckHoogtePSComponent,
    ChattyPSComponent,
    RosedaleResComponent,
    SummitComponent,
    VerwoerdPsComponent,
    CoegaIDZTComponent,
    ColorCustomizationComponent,
    GamtoosBridgeComponent,
    AlarmsViewerComponent,
    StanfordRoadComponent,
    ControlLogViewerComponent,
    UitenhageFCComponent,
    NmuEffluentPsComponent,
    NooitgedachtComponent,
    MotherwellComponent,
    NewtonparkpoolComponent,
    CoegaKopComponent,
    CoegakopdownloadComponent,
    // TagSelectorDialogComponent,
    BethelsdorpComponent,
    WesselsComponent,
    TrendpickerV2Component,
    TagSelectorComponent,
    HumansdorpComponent,
    Humansdorp2Component,
    Humansdorp3Component,
    Humansdorp4Component,
    AddPresetComponent,
    ManagePresetComponent,
    EditPresetComponent,
    StormsriverWTWComponent,
    StormsriverComponent,
    WaplaastrendsComponent,
    OliphantskopComponent,
    ElandsjagtComponent,
    ChattydownloadComponent,
    ChelseaPSComponent,
    Kareedouwk1Component,
    PsOverviewComponent,
    EmeraldhillComponent,
    TestPumpstationComponent,
    SchoemanshoekComponent,
    DriftsandsComponent,
    KwanobuhleComponent,
    UmasizakheComponent,
    BergendalComponent,
    WolwasComponent,
    TinroofComponent,
    HoldingComponent,
    DamcampComponent,
    KroonvaleComponent,
    MotherwellresComponent,
    CsvComponent,
    IsuzuComponent,
    Humansdorp6Component,
    TestComponent,
    JeffreysBayOffTakeComponent,
    ParadiseBeachStFrancisOfftakeComponent,
    KougaMainLineComponent,
    HumansdorpOfftakeComponent,
    FptOverviewComponent,
    Kareedouwk2Component,
    KareedouwkresComponent,
    HumerailComponent,
    GamtoosBreakWaterComponent,
    TestPickerComponent,
    NmbmAddUserComponent,
    NmbmManageAccountsComponent,
    NmbmEditAccountsComponent,
    FairviewComponent,
    GlendinningvaleComponent,
    FortnottinghamComponent,
    BushyparkFptComponent,
    BushyparkWtwComponent,
    MalibarComponent,
    StGeorgesResComponent,
    StGeorgesPSComponent,
    KruisfonteinGW12Component,
    KruisfonteinGW13Component,
    KruisfonteinGW14Component,
    KruisfonteinRComponent,
    DriverComponent,
    DriverEditComponent,
    DriverManageComponent,
    AirportresComponent,
    LevelComponent,
    ResPanelComponent,
    PumpPanelComponent,
    CommsPanelComponent,
    PanelComponent,
    TwoColumnComponent,
    AlarmsComponent,




  ],
// entryComponents:[
//   TagSelectorDialogComponent

// ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    []
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
