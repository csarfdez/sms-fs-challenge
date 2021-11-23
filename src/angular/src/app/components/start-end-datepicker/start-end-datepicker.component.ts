import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDateFormats, MAT_NATIVE_DATE_FORMATS, MAT_DATE_FORMATS } from '@angular/material/core';
import { StartEndPickerDates } from '../../models/interfaces/start-end-picker-dates.interface';

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions,
  }
};

@Component({
  selector: 'app-start-end-datepicker',
  templateUrl: './start-end-datepicker.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS }
  ],
  styleUrls: ['./start-end-datepicker.component.scss']
})
export class StartEndDatepickerComponent {

  @Output() public pickerChanged: EventEmitter<StartEndPickerDates> = new EventEmitter<StartEndPickerDates>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      startDate: [''],
      endDate: ['']
    }, { validator: this.dateLessThan('startDate', 'endDate') });

  }

  public onDateChange() {

    if (this.form.valid) {

      const newPickerDate: StartEndPickerDates = {
        start: this.form.get('startDate').value,
        end: this.form.get('endDate').value
      };

      this.pickerChanged.emit(newPickerDate);

    }

  }

  public clearDate(key: string) {
    this.form.get(key).setValue(null);
    this.onDateChange();
  }

  private dateLessThan(startDate: string, endDate: string) {
    return (group: FormGroup): { [key: string]: any } => {

      const startDateControl = group.controls[startDate];
      const endDateControl = group.controls[endDate];

      const startDateValue: Date = startDateControl.value;
      const endDateValue: Date = endDateControl.value;

      if (startDateValue && endDateValue &&
        startDateValue.getTime() > endDateValue.getTime()
      ) {

        startDateControl.setErrors({ date: true });
        endDateControl.setErrors({ date: true });

        return {
          dates: true
        };

      }

      startDateControl.setErrors(null);
      endDateControl.setErrors(null);

      return null;

    };
  }

}
