import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls :['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
pageTitle:string ='Product List Dashboard';
imageWidth = 100;
imageMargin = 2;
showImage: boolean = false;
//filterBy:string = 'cart';


filteredProducts: IProduct[];


_listFilter = '';
get listFilter(): string {
  return this._listFilter;
}
set listFilter(value: string) {
  this._listFilter = value;
  this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
}

products: IProduct[] = [];

toggleImage():void{
    this.showImage = !this.showImage;
}

constructor(private productService: ProductService){

}


performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() :void{
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

}