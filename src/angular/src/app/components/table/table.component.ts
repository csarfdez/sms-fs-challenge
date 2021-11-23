import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../../models/interfaces/item.interface';
import { StartEndPickerDates } from '../../models/interfaces/start-end-picker-dates.interface';
import { DataService } from '../../services/data.service';
import { createLocalDate } from '../../shared/app.utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() pickerDates: StartEndPickerDates;

  public displayedColumns: (keyof Item)[] = ['city', 'startDate', 'endDate', 'price', 'status', 'color'];
  public dataList: Item[];
  public dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly dataService: DataService
  ) { }

  public ngOnInit(): void {
    this.dataService.fetchAll().subscribe(items => {
      this.dataList = items;
      this.dataSource = new MatTableDataSource(items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.pickerDates.isFirstChange()) {
      this.applyDatepickerFilter(this.pickerDates);
    }
  }

  public applyDatepickerFilter(pickerDates: StartEndPickerDates) {
    this.dataSource.data =
      this.dataList.filter((data: Item) => {
        return !pickerDates ||
          (
            (
              !pickerDates.start || (
                pickerDates.start.getTime() <= createLocalDate(data.startDate).getTime() &&
                pickerDates.start.getTime() <= createLocalDate(data.endDate).getTime()
              )
            ) &&
            (
              !pickerDates.end || (
                pickerDates.end.getTime() >= createLocalDate(data.startDate).getTime() &&
                pickerDates.end.getTime() >= createLocalDate(data.endDate).getTime()
              )
            )
          );
      });
  }

}
