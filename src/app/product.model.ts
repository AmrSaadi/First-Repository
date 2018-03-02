export class Product{
    public _id: any
    public name: String
    public price: Number
    public createdAt: Date
    public updatedAt: Date
    public sellerName: String
    public addedInCarts: [{
        _id: String
      }]

  constructor(name:String,price:Number)
  {
    this.name = name;
    this.price = price;
  }
}
