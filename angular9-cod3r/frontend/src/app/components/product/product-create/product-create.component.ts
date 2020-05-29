import { Product } from './../product.model';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-create',
	templateUrl: './product-create.component.html',
	styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
	product: Product = {
		name: '',
		price: null
	};

	constructor(private service: ProductService, private router: Router) { }

	ngOnInit(): void {
	}

	createProduct(): void {
		this.service.create(this.product).subscribe(() => {
			this.service.showMessage('Produto criado');
			this.router.navigate(['/products']);
		});

		// this.service.create(this.product).subscribe(() => {
		// 	console.log('Teste');
		// });

		// this.service.create(this.product).subscribe(() => {
		// 	this.service.showMessage('Produto criado');
		// 	this.router.navigate(['/products']);
		// });
	}

	cancel(): void {
		this.router.navigate(['/products']);
	}
}
