import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-read',
	templateUrl: './product-read.component.html',
	styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
	products: Product[];
	displayedColumns = ['id', 'name', 'price', 'action'];

	constructor(private service: ProductService) { }

	ngOnInit(): void {
		this.service.get().subscribe(products => {
			this.products = products;
		});
	}
}
