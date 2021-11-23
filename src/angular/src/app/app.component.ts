import { Component } from '@angular/core';
import { StartEndPickerDates } from './models/interfaces/start-end-picker-dates.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public pickerDates: StartEndPickerDates;

  public onPickerChanged(pickerDates: StartEndPickerDates) {
    this.pickerDates = pickerDates;
  }

}
