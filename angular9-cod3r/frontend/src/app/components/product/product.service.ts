import { map, catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	baseURL = 'http://localhost:3333/products';

	constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

	showMessage(msg: string, isError: boolean = false): void {
		this.snackBar.open(msg, 'X', {
			duration: 3000,
			horizontalPosition: 'right',
			verticalPosition: 'top',
			panelClass: isError ? ['msg-error'] : ['msg-success']
		});
	}

	create(product: Product): Observable<Product> {
		return this.http.post<Product>(this.baseURL, product).pipe(
			map(obj => obj),
			catchError(e => this.errorHandler(e))
		);
	}

	errorHandler(e: any): Observable<any> {
		this.showMessage('Ocorreu um erro!', true);
		return EMPTY;
	}

	get(): Observable<Product[]> {
		return this.http.get<Product[]>(this.baseURL);
	}

	getById(id: string): Observable<Product> {
		return this.http.get<Product>(`${this.baseURL}/${id}`);
	}

	update(product: Product): Observable<Product> {
		return this.http.put<Product>(`${this.baseURL}/${product.id}`, product);
	}

	delete(id: string): Observable<Product> {
		return this.http.delete<Product>(`${this.baseURL}/${id}`);
	}
}
