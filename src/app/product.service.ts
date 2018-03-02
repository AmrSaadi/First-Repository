import { Subject } from "rxjs/Subject";
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Product } from "./product.model";
import { Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { UserService } from "./user.service";

@Injectable()
export class ProductService{

    
    
    constructor(private http:Http,private userService:UserService){        
       
    }
    
    public product:Product;
    public productSubject = new Subject();


    addProduct(name:String, price:Number){
        const headers = new Headers({'x-auth':this.userService.user.token});
        this.product = new Product(name, price);

        return this.http.post('http://localhost:3000/api/product/createProduct',this.product,{headers:headers});
    }

    getProducts(){
        const headers = new Headers({'x-auth':this.userService.user.token});
        return this.http.get('http://localhost:3000/api/product/getProducts', {headers:headers}).map(res => res.json());
    }

    deleteProduct(product:Product){
        const headers = new Headers({'x-auth':this.userService.user.token});
        this.product = product;

        return this.http.delete('http://localhost:3000/api/product/deleteProduct'+'/'+product._id,{headers:headers});
    }

    updateProduct(product:Product,name:String, price:number){
        const headers = new Headers({'x-auth':this.userService.user.token});
        this.product = product;
        this.product.name = name;
        this.product.price = price;

        return this.http.patch('http://localhost:3000/api/product/updateProduct'+'/'+product._id,this.product,{headers:headers});
    }


}