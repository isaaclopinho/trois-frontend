export class AirlineTicket {
  constructor(
    public origin : string,
    public destination : string,
    public originDate: Date,
    public destinationDate: Date,
    public originPrice: number,
    public destinationPrice: number,
    public company: string
  ) {}


  public totalPrice(){
    let d = this.destinationDate ? this.destinationPrice : 0;
    return this.originPrice + d;
  }

  public getOriginDateFormatted(){
    return this.getDateFormatted(this.originDate);
  }

  public getDestinationDateFormatted(){
    return this.getDateFormatted(this.destinationDate);
  }

  getDateFormatted(date : Date){
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();
    return d + "/" + m + "/" + y; 
  }
}
