export class ThumbnailParam {
  constructor(
    public name: string,
    public route: string,
    public styleClass:string = 'default',
    // public skewY: number = 10,
    // public transformOrigin: number = 120
    public icon: string
  ) {}
}
