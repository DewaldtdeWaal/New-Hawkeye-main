import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from './pages/home/home.component';
import { EditAccountsComponent } from './pages/admin/edit-accounts/edit-accounts.component';
import { ManageAccountsComponent } from './pages/admin/manage-accounts/manage-accounts.component';
import { ColorCustomizationComponent } from './user/color-customization/color-customization.component';
import { AlarmsViewerComponent } from './pages/alarms-viewer/alarms-viewer.component';
import {TestComponent} from './pages/pump-stations/test/test.component'

//Drivers
import {DriverComponent} from './pages/drivers/driver/driver.component';
import {DriverEditComponent} from './pages/drivers/driver-edit/driver-edit.component';
import {DriverManageComponent} from './pages/drivers/driver-manage/driver-manage.component';

//Demo


import {NmbmManageAccountsComponent} from "./pages/sub-admin/nmbm-manage-accounts/nmbm-manage-accounts.component";
import {NmbmAddUserComponent} from "./pages/sub-admin/nmbm-add-user/nmbm-add-user.component";
import {NmbmEditAccountsComponent} from "./pages/sub-admin/nmbm-edit-accounts/nmbm-edit-accounts.component";


//RESERVOIRS
import {AirportresComponent} from './pages/reservoirs/airportres/airportres.component';
import {MotherwellresComponent} from './pages/reservoirs/motherwellres/motherwellres.component';
import { BluehorizonComponent } from './pages/reservoirs/bluehorizon/bluehorizon.component';
import { GreenbushesComponent } from './pages/reservoirs/greenbushes/greenbushes.component';
import { OverviewComponent } from './pages/reservoirs/res-overview/overview.component';
import { VanstadensComponent } from './pages/reservoirs/vanstadens/vanstadens.component';
import { AddUserComponent } from "./pages/admin/add-user/add-user.component";
import {EditPasswordComponent} from "./user/edit-password/edit-password.component";
import { HeatherbankComponent } from './pages/reservoirs/heatherbank/heatherbank.component';
import { LovemoreheightsComponent } from './pages/reservoirs/lovemoreheights/lovemoreheights.component';
import {MalibarComponent} from './pages/reservoirs/malibar/malibar.component';
import { TheescombeComponent } from './pages/reservoirs/theescombe/theescombe.component';
import {ChelseaComponent} from './pages/reservoirs/chelsea/chelsea.component'
import { GrassridgeComponent } from './pages/reservoirs/grassridge/grassridge.component';
import { VanriebeeckComponent } from './pages/reservoirs/vanriebeeck/vanriebeeck.component';
import {ChattyComponent} from './pages/reservoirs/chatty/chatty.component'
import { DemoRComponent } from './pages/reservoirs/demo-r/demo-r.component';
import { DemoResTrendComponent } from './pages/reservoirs/demo-res-trend/demo-res-trend.component';
import { RosedaleResComponent } from './pages/reservoirs/rosedale-res/rosedale-res.component';
import { SummitComponent } from './pages/reservoirs/summit/summit.component';
import {OliphantskopComponent} from './pages/reservoirs/oliphantskop/oliphantskop.component';
import {EmeraldhillComponent} from './pages/reservoirs/emeraldhill/emeraldhill.component';
import {SchoemanshoekComponent} from './pages/reservoirs/schoemanshoek/schoemanshoek.component';
import {DriftsandsComponent} from './pages/reservoirs/driftsands/driftsands.component';
import {KwanobuhleComponent} from './pages/reservoirs/kwanobuhle/kwanobuhle.component';
import {BergendalComponent} from './pages/reservoirs/bergendal/bergendal.component';
import {DamcampComponent} from './pages/reservoirs/damcamp/damcamp.component';
import {HoldingComponent} from './pages/reservoirs/holding/holding.component';
import {KroonvaleComponent} from './pages/reservoirs/kroonvale/kroonvale.component';
import {TinroofComponent} from './pages/reservoirs/tinroof/tinroof.component';
import {UmasizakheComponent} from './pages/reservoirs/umasizakhe/umasizakhe.component';
import {WolwasComponent} from './pages/reservoirs/wolwas/wolwas.component';
import {KareedouwkresComponent} from './pages/reservoirs/kareedouwkres/kareedouwkres.component';
import {StGeorgesResComponent} from './pages/reservoirs/st-georges-res/st-georges-res.component'
import {KruisfonteinRComponent} from './pages/reservoirs/kruisfontein-r/kruisfontein-r.component'


import {FairviewComponent} from './pages/groundwater/fairview/fairview.component';
import {FortnottinghamComponent} from './pages/groundwater/fortnottingham/fortnottingham.component';
import {GlendinningvaleComponent} from './pages/groundwater/glendinningvale/glendinningvale.component';



//Feedlots
import {WesselsComponent} from './pages/Feedlots/wessels/wessels.component';
//Ground Water
import{HumansdorpComponent} from './pages/groundwater/humansdorp/humansdorp.component'
import { NewtonparkpoolComponent } from './pages/groundwater/newtonparkpool/newtonparkpool.component';
import{Humansdorp2Component} from './pages/groundwater/humansdorp2/humansdorp2.component'
import{Humansdorp3Component} from './pages/groundwater/humansdorp3/humansdorp3.component'
import{Humansdorp4Component} from './pages/groundwater/humansdorp4/humansdorp4.component'
import {Humansdorp6Component} from './pages/groundwater/humansdorp6/humansdorp6.component'
import {Kareedouwk1Component} from './pages/groundwater/kareedouwk1/kareedouwk1.component';
import {Kareedouwk2Component} from './pages/groundwater/kareedouwk2/kareedouwk2.component';
import {HumerailComponent} from './pages/groundwater/humerail/humerail.component';
import {KruisfonteinGW12Component} from './pages/groundwater/kruisfontein-gw12/kruisfontein-gw12.component';
import {KruisfonteinGW13Component} from './pages/groundwater/kruisfontein-gw13/kruisfontein-gw13.component';
import {KruisfonteinGW14Component} from './pages/groundwater/kruisfontein-gw14/kruisfontein-gw14.component';
//PUMPSTATIONS
import {TestPumpstationComponent} from './pages/pump-stations/test-pumpstation/test-pumpstation.component';
import {ControlLogViewerComponent} from'./pages/pump-stations/control-log-viewer/control-log-viewer.component';
import{ChelseaPSComponent} from './pages/pump-stations/chelsea-ps/chelsea-ps.component';
import { VanStadensPSComponent } from './pages/pump-stations/van-stadens-ps/van-stadens-ps.component';
import { BlueHorizonBayPSComponent } from './pages/pump-stations/blue-horizon-bay-ps/blue-horizon-bay-ps.component';
import { LovemoreHeightsPSComponent } from './pages/pump-stations/lovemore-heights-ps/lovemore-heights-ps.component';
import { TheescombePSComponent } from './pages/pump-stations/theescombe-ps/theescombe-ps.component';
import { HeatherbankPSComponent } from './pages/pump-stations/heatherbank-ps/heatherbank-ps.component';
import { BuffelsfonteinPSComponent } from './pages/pump-stations/buffelsfontein-ps/buffelsfontein-ps.component';
import { DemoPSComponent } from './pages/pump-stations/demo-ps/demo-ps.component';
import { CrownGardensPsComponent } from './pages/pump-stations/crown-gardens-ps/crown-gardens-ps.component';
import { VanRiebeeckHoogtePSComponent } from './pages/pump-stations/van-riebeeck-hoogte-ps/van-riebeeck-hoogte-ps.component';
import {ChattyPSComponent} from './pages/pump-stations/chatty-ps/chatty-ps.component';
import { ChattydownloadComponent} from './pages/pump-stations/chatty-ps/chattydownload/chattydownload.component';
import{VerwoerdPsComponent} from './pages/pump-stations/verwoerd-ps/verwoerd-ps.component'
import { StanfordRoadComponent } from './pages/pump-stations/stanford-road/stanford-road.component';
import { NmuEffluentPsComponent } from './pages/pump-stations/nmu-effluent-ps/nmu-effluent-ps.component';
import {MotherwellComponent} from './pages/pump-stations/motherwell/motherwell.component';
import {StormsriverComponent} from './pages/pump-stations/stormsriver/stormsriver.component';
import { PsOverviewComponent } from './pages/pump-stations/ps-overview/ps-overview.component';
import {StGeorgesPSComponent} from './pages/pump-stations/st-georges-ps/st-georges-ps.component'
//FPT
import {BethelsdorpComponent} from './pages/FlowMeters/bethelsdorp/bethelsdorp.component'
import {FMTowerComponent} from './pages/FlowMeters/fm-tower/fm-tower.component'
import {GamtoosBreakWaterComponent} from './pages/FlowMeters/gamtoos-break-water/gamtoos-break-water.component';
import { CoegaIDZTComponent } from './pages/FlowMeters/coega-idz-t/coega-idz-t.component'
import { GamtoosBridgeComponent } from './pages/FlowMeters/gamtoos-bridge/gamtoos-bridge.component';
import {UitenhageFCComponent} from './pages/FlowMeters/uitenhage-fc/uitenhage-fc.component'
import { CoegaKopComponent } from './pages/reservoirs/coegakop/coegakop.component';
import { CoegakopdownloadComponent} from './pages/reservoirs/coegakopdownload/coegakopdownload.component'
import {HumansdorpOfftakeComponent} from './pages/FlowMeters/humansdorp-offtake/humansdorp-offtake.component';
import {JeffreysBayOffTakeComponent} from './pages/FlowMeters/jeffreys-bay-off-take/jeffreys-bay-off-take.component';
import {KougaMainLineComponent} from './pages/FlowMeters/kouga-main-line/kouga-main-line.component';
import {ParadiseBeachStFrancisOfftakeComponent} from './pages/FlowMeters/paradise-beach-st-francis-offtake/paradise-beach-st-francis-offtake.component';
import {FptOverviewComponent} from './pages/FlowMeters/fpt-overview/fpt-overview.component';
import {BushyparkFptComponent} from './pages/FlowMeters/bushypark-fpt/bushypark-fpt.component';

//WTW
import {NooitgedachtComponent} from './pages/WTW/nooitgedacht/nooitgedacht.component';
import {StormsriverWTWComponent} from './pages/WTW/stormsriver-wtw/stormsriver-wtw.component'
import {ElandsjagtComponent} from './pages/WTW/elandsjagt/elandsjagt.component'
import {BushyparkWtwComponent} from './pages/pump-stations/bushypark-wtw/bushypark-wtw.component';
import {HumansdorpwtwComponent} from './pages/WTW/humansdorpwtw/humansdorpwtw.component'
//Trends component
//import { TrendPickerComponent } from './pages/trends/trendpicker/trend-picker.component';
import { TrendpickerV2Component } from './pages/trends/trendpicker-v2/trendpicker-v2.component';
import { TagSelectorComponent } from './pages/trends/trendpicker-v2/tag-selector/tag-selector.component';
import { AddPresetComponent } from './pages/trends/add-preset/add-preset.component';
import { ManagePresetComponent } from './pages/trends/manage-preset/manage-preset.component';
import { EditPresetComponent } from './pages/trends/edit-preset/edit-preset.component';
import { WaplaastrendsComponent } from './pages/trends/waplaastrends/waplaastrends.component';
import { CsvComponent} from './pages/trends/csv/csv.component';

import {IsuzuComponent} from './pages/automotive/isuzu/isuzu.component';

import {TestPickerComponent} from './pages/trends/test-picker/test-picker.component';

import {LeeSamualsDriveComponent} from './pages/zones/lee-samuals-drive/lee-samuals-drive.component';
 import {McNoughtontownshipsouthComponent} from './pages/zones/mc-noughtontownshipsouth/mc-noughtontownshipsouth.component';
 import { RowallanParkExtensionComponent } from './pages/zones/rowallan-park-extension/rowallan-park-extension.component';
 import { RosedaleComponent } from './pages/zones/rosedale/rosedale.component';


const routes: Routes = [

  {path: '', redirectTo : 'hawkeye/home',pathMatch: 'full'},
  {path: 'hawkeye', redirectTo : 'hawkeye/home',pathMatch: 'full'},

  // {path: '/hawkeye/home',component:HomeComponent,canActivate:[AuthGuard]},
  {path: 'hawkeye/login', component:LoginComponent},
// ADMIN
{path: 'hawkeye/add-user',component: AddUserComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/admin/manage-accounts',component: ManageAccountsComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/admin/manage-accounts/edit-account',component: EditAccountsComponent,canActivate:[AuthGuard]},
//
{path: 'hawkeye/edit-password',component: EditPasswordComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/home',component: HomeComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/color-customization',component: ColorCustomizationComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/alarms-viewer',component: AlarmsViewerComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/test', component:TestComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/drivers/driverEdit', component:DriverEditComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/drivers/manageDriver', component:DriverManageComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/drivers/driver', component:DriverComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/sub-admin/nmbm-manage-accounts',component: NmbmManageAccountsComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/sub-admin/nmbm-add-user',component: NmbmAddUserComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/sub-admin/nmbm-manage-accounts/nmbm-edit-accounts',component: NmbmEditAccountsComponent,canActivate:[AuthGuard]},


//Automotive
{path: 'hawkeye/automotive/isuzu', component: IsuzuComponent, canActivate:[AuthGuard]},
//RESERVOIRS
{path: 'hawkeye/reservoirs/airportres', component:AirportresComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/overview',component: OverviewComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/greenbushes',component: GreenbushesComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/vanstadens',component: VanstadensComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/motherwellres',component:MotherwellresComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/bluehorizonbay',component: BluehorizonComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/heatherbank',component: HeatherbankComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/lovemoreheights',component: LovemoreheightsComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/malibar', component: MalibarComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/theescombe',component: TheescombeComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/chelsea',component: ChelseaComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/grassridge',component: GrassridgeComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/vanriebeekhoogte',component: VanriebeeckComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/chatty',component: ChattyComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/demo-res',component: DemoRComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/trend',component: DemoResTrendComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/rosedale',component: RosedaleResComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/summit',component: SummitComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/coegakop', component: CoegaKopComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/coegakopdownload', component: CoegakopdownloadComponent, canActivate:[AuthGuard]},

{path: 'hawkeye/reservoirs/oliphantskop', component:OliphantskopComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/emeraldhill', component:EmeraldhillComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/schoemanshoek', component: SchoemanshoekComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/driftsands', component:DriftsandsComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/kwanobuhle', component:KwanobuhleComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/bergendal', component:BergendalComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/damcamp', component:DamcampComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/holding', component:HoldingComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/kroonvale', component:KroonvaleComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/tinroof', component:TinroofComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/umasizakhe', component:UmasizakheComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/wolwas', component:WolwasComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/kareedouwkres', component:KareedouwkresComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/st-georges-res',component:StGeorgesResComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/reservoirs/kruisfontein-r', component:KruisfonteinRComponent, canActivate:[AuthGuard]},




{path: 'hawkeye/groundwater/fairview', component:FairviewComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/fortnottingham', component:FortnottinghamComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/glendinningvale', component:GlendinningvaleComponent, canActivate:[AuthGuard]},


//PUMP STATION
{path: 'hawkeye/pumpstations/test-pumpstation', component:TestPumpstationComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/ps-overview',component: PsOverviewComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/control-log-viewer',component: ControlLogViewerComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/chelsea-ps',component: ChelseaPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/vanstadens',component: VanStadensPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/bluehorizonbay',component: BlueHorizonBayPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/lovemoreheights',component: LovemoreHeightsPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/theescombe',component: TheescombePSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/heatherbank',component: HeatherbankPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/buffelsfontein',component: BuffelsfonteinPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/crowngardens',component: CrownGardensPsComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/demo-ps',component: DemoPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/vanriebeekhoogte',component: VanRiebeeckHoogtePSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/chatty',component: ChattyPSComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/chatty/chattydownload', component: ChattydownloadComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/verwoerd',component: VerwoerdPsComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/stanford-road',component: StanfordRoadComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/nmu-effluent',component: NmuEffluentPsComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/motherwell', component: MotherwellComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/stormsriver', component:StormsriverComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/st-georges-ps', component:StGeorgesPSComponent, canActivate:[AuthGuard]},

//Flow Meters
{path: 'hawkeye/fptsites/gamtoos-break-water',component:GamtoosBreakWaterComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/fmtower',component: FMTowerComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/coegaidzt',component: CoegaIDZTComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/gamtoos-bridge',component: GamtoosBridgeComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/uitenhage-flow-chamber',component: UitenhageFCComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/bethelsdorp',component:BethelsdorpComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/humansdorp-offtake', component:HumansdorpOfftakeComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/jeffreys-bay-off-take', component:JeffreysBayOffTakeComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/kouga-main-line', component:KougaMainLineComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/paradise-beach-st-francis-offtake',component:ParadiseBeachStFrancisOfftakeComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/fpt-overview', component:FptOverviewComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/fptsites/bushypark-fpt', component:BushyparkFptComponent, canActivate:[AuthGuard]},


//Zomes
{path: 'hawkeye/zones/lee-samuals-drive', component:LeeSamualsDriveComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/zones/mc-noughtontownshipsouth', component:McNoughtontownshipsouthComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/zones/rowallan-park-extension', component:RowallanParkExtensionComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/zones/rosedale', component:RosedaleComponent, canActivate:[AuthGuard]},

//GroundWater
{path: 'hawkeye/groundwater/newtonparkpool',component: NewtonparkpoolComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/humansdorp', component:HumansdorpComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/humansdorp2',component:Humansdorp2Component, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/humansdorp3',component:Humansdorp3Component, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/humansdorp4',component:Humansdorp4Component, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/humansdorp6', component:Humansdorp6Component, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/kareedouwk1',component:Kareedouwk1Component, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/kareedouwk2',component:Kareedouwk2Component, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/humerail', component:HumerailComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/kruisfontein-gw12', component:KruisfonteinGW12Component  , canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/kruisfontein-gw13', component: KruisfonteinGW13Component , canActivate:[AuthGuard]},
{path: 'hawkeye/groundwater/kruisfontein-gw14', component: KruisfonteinGW14Component , canActivate:[AuthGuard]},
//Feedlots
{path: 'hawkeye/feedlots/wessels', component: WesselsComponent, canActivate:[AuthGuard]},
//WTW
{path: 'hawkeye/wtw/nooitgedacht',component: NooitgedachtComponent,canActivate:[AuthGuard]},

{path: 'hawkeye/wtw/stormsriver-wtw',component: StormsriverWTWComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/wtw/elandsjagt',component: ElandsjagtComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/pumpstations/bushypark-wtw',component: BushyparkWtwComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/wtw/humansdorpwtw', component:HumansdorpwtwComponent, canActivate:[AuthGuard]},
//Trends:

{path: 'hawkeye/trends/trendpickerV2',component: TrendpickerV2Component,canActivate:[AuthGuard]},
{path: 'hawkeye/trends/tag-selector',component: TagSelectorComponent},
{path: 'hawkeye/trends/add-preset',component: AddPresetComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/trends/manage-preset',component: ManagePresetComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/trends/edit-preset',component: EditPresetComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/trends/waplaastrends',component: WaplaastrendsComponent,canActivate:[AuthGuard]},
{path: 'hawkeye/trends/csv', component: CsvComponent, canActivate:[AuthGuard]},
{path: 'hawkeye/trends/test-picker', component:TestPickerComponent, canActivate:[AuthGuard]},


];




@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration :"enabled"})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
