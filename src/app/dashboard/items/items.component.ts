import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from "@angular/forms";
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Product } from '../../product.model';

@Component({
  selector: 'app-dashboard-items',
  templateUrl: './items.component.html',
  styleUrls: []
})
export class ItemsComponent implements OnInit {

  //item:Product;
  itemsArray:Product[];
  currentlyDoing = "Adding new products:";
  currentAction = "Add Product";
  currentPrice = 0;
  currentName = "Item Name";
  product = null;

  constructor(private productService:ProductService,private router:Router){}

  ngOnInit(){

    this.itemsArray = [];

    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      this.itemsArray = products.data;
    });

  }

  onClick(name, price){


    if(this.currentAction == "Add Product"){

    this.productService.addProduct(name,price)
    .subscribe((res: Response)=>{
        this.productService.product.name = res.json().data;
        this.productService.product.price = res.json().data;
        this.productService.productSubject.next(this.productService.product); 
        if(res.status===200){
            this.router.navigate([['']]);
        }
    },(err)=>{
        console.log(err);
  });


    }

  if(this.currentAction == "Update"){

    this.productService.updateProduct(this.product, name, price).subscribe((res: Response)=>{
     // this.productService.product.name = res.json().data;
     // this.productService.product.price = res.json().data;
      this.productService.productSubject.next(this.productService.product); 
      if(res.status===200){
          //this.router.navigate([['']]);
          console.log("done");
      }
  },(err)=>{
      console.log(err);
});

  this.currentlyDoing = "Adding new products:";
  this.currentAction = "Add Product";
  this.currentPrice = 0;
  this.currentName = "Item Name"

  }

  this.productService.getProducts().subscribe((products) => {
    console.log(products);
    this.itemsArray = products.data;
  });

    return false;
  }

deleteProduct(item){
  this.productService.deleteProduct(item)
  .subscribe((res: Response)=>{
     console.log('product removed successfully')
});

for(let i = 0;i<this.itemsArray.length;i++){
  if(item._id == this.itemsArray[i]._id){
    this.itemsArray.splice(i,1);
  }
}


  return false;

}

editProduct(item){
  this.currentlyDoing = "Edit Product:";
  this.currentAction = "Update";
  this.currentPrice = item.price;
  this.currentName = item.name;

  this.product = item;

}


}