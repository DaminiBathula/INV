import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports:[
    MatSortModule,
    MatPaginatorModule
  ],
})
export class StockListModule {}  

export interface Stock {
  symbol: string;
  ltp: number;
  pctChange: number;
  intradayscans: string[];
}

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'ltp', 'pctChange', 'intradayscans'];
  dataSource: MatTableDataSource<Stock>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<Stock>([]);
  }

  ngOnInit() {
    this.http.get<Stock[]>('https://intradayscreener.com/api/openhighlow/cash').subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
