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
}
