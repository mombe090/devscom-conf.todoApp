export class TodoDto {
  constructor(
    public _id?: string,
    public title?: string,
    public desc?: string,
    public done?: boolean
  ) {}
}
