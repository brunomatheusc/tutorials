import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-product-delete',
	templateUrl: './product-delete.component.html',
	styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
	product: Product;
	id: string;

	constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.service.getById(this.id).subscribe(product => this.product = product);
	}

	deleteProduct(): void {
		this.service.delete(this.id).subscribe(() => {
			this.service.showMessage('Produto deletado');
			this.cancel();
		});
	}

	cancel(): void {
		this.router.navigate(['/products']);
	}
}
