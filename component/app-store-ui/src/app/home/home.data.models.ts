export class ThumbnailParam {
  constructor(
    public name: string,
    public route: string,
    public styleClass:string = 'default',
    public icon: string,
    public externalUrl: string = null
  ) {}
}
