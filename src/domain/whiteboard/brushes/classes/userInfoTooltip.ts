import { fabric } from 'fabric';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';
import store from '../../redux/store'

interface IUserInfoOption {
  value: string, label: string, rectWidth: number, rectHeight: number, textLeft: number, imgSize: number, imgLeft: number, imgTop: number
}

export class UserInfoTooltip {
  private _left: number = 0;
  private _top: number = 0;
  private _rect: fabric.Rect;
  private _img: fabric.Image
  private _text: fabric.Text
  private _shapesGroup: fabric.Group = new fabric.Group()
  private _objectId: string | undefined = ''
  public displayUserInfo: string = 'full'
  private optionUserInfo: IUserInfoOption
  static instance: UserInfoTooltip
  static exists = false

  static infoOptions: IUserInfoOption[] = [
    {value: "none", label: "None", rectWidth: 0, rectHeight: 0, textLeft: 0, imgSize: 0, imgLeft: 0, imgTop: 0},
    {value:"avatar", label: "User avatar", rectWidth: 35, rectHeight: 35, textLeft: 0, imgSize: 35, imgLeft: 0, imgTop: 0},
    {value:"name", label: "User name", rectWidth: 115, rectHeight: 25, textLeft: 2.5, imgSize: 35, imgLeft: 0, imgTop: 2.5},
    {value:"full", label: "User name and avatar", rectWidth: 150, rectHeight: 40, textLeft: 37.5, imgSize: 35, imgLeft: 2.5, imgTop: 2.5}
  ]

  static createInstance(displayUserInfo: string){
    if(UserInfoTooltip.exists){
      return UserInfoTooltip.instance
    }else{
      UserInfoTooltip.instance = new UserInfoTooltip(displayUserInfo)
    }
  }

  private constructor(displayUserInfo: string) {

    UserInfoTooltip.exists = true
    
    this.optionUserInfo = UserInfoTooltip.infoOptions[0]
    this.setInfoOption(displayUserInfo)

    this._img = new fabric.Image('')
    this._text = new fabric.Text('')
    this._rect = new fabric.Rect()
    this.setBasicShapes()

  }

  private setInfoOption = (optionValue: string) => {
    this.displayUserInfo = optionValue
    const infoOption = UserInfoTooltip.infoOptions.find(option => option.value === this.displayUserInfo)
    if(infoOption)
      this.optionUserInfo = infoOption
  }
  

  private setBasicShapes(){
    this._rect = new fabric.Rect({
      stroke: 'black',
      fill: 'white',
      width: this.optionUserInfo.rectWidth,
      height: this.optionUserInfo.rectHeight,
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      originX: 'left',
      originY: 'top',
    });
    
    this._img = new fabric.Image('')
    this._img.set({
      originX: 'left',
      originY: 'top',
      left: this.optionUserInfo.imgLeft,
      top: this.optionUserInfo.imgTop,
      width: this.optionUserInfo.imgSize,
      height: this.optionUserInfo.imgSize
    });
    
    this._text = new fabric.Text('userName', {
      fontSize: 14,
      fontFamily: 'sans-serif',
      originX: 'left',
      originY: 'top',
      left: this.optionUserInfo.textLeft,
      top: 5
    });
  }

  public get left(){
    return this._left
  }

  public get position(){
    return this._left
  }

  public isInSamePosition(left: number, top: number){
    return this._left === left && this._top == top
  }

  public setPosition(left: number, top: number){
    const padding = 5
    this._left = left + padding;
    this._top = top + padding;
  }

  public setUserInfo(imageUrl: string, name: string){
    this.setImageUrl(imageUrl)
    this.setText(name)
  }

  private setText(text: string){
    this._text.set({text})
  }

  private setImageUrl(url: string){
    this._img.setSrc(url)
  }

  public isShown(){
    return this._objectId !== ''
  }

  public hasTheSameObject(hoveredObject: ICanvasObject){
    return this._objectId === hoveredObject.id
  }

  public removeObject(){
    this._objectId = ''
  }

  private setObject(hoveredObject: ICanvasObject){
    
    this._objectId = hoveredObject.id
    const userId = this._objectId ? this._objectId.substr(0, this._objectId.indexOf(':')) : '';
    const user = store.getState().usersState.find(user => user.id === userId) 
    this.setPosition(hoveredObject.left || 0, hoveredObject.top || 0);
    if(user){
      this.setUserInfo(
        user.avatarImg,
        user.name
      );
    }else{
      this.setUserInfo(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJGNjVFRkU2NUI2MTFFQkExNzZDNDMwOEMxRUQyODkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUJGNjVFRkQ2NUI2MTFFQkExNzZDNDMwOEMxRUQyODkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIwMjAgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjcyOEE2Q0I1MzNFQUUxNTcxRTk3NDVGOTVFNzgzNUU4IiBzdFJlZjpkb2N1bWVudElEPSI3MjhBNkNCNTMzRUFFMTU3MUU5NzQ1Rjk1RTc4MzVFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt3gUSkAAAMAUExURYyTl8pbOYSEg7Z9Z6bZ4f+6lrKMdf/DnUVLTCAtLv///8t1VtW3qdtcNKxNLcSJbNuUdtnZ2dGvmf+rhP/Srv/Jpp16ZpXi56msqdtkP4vo9aiWjea3pf+8m5nX28Wagp66u7y8taJnT9dgPf+2kZLm7tZcNwwMDNtkQf+2kb5iRJXi6tuHaPjg4KGLev2uh//Pra6elf/Nqv+ke9BePE5rbr9cPryom4FiUf7Mtf2jevingVJSUP+xh+ZzRP/WsrSEa/+vhsttTrlPL8aOc/XIuv/Hov++maZyXaSln5rj6u2ignyrrt+jg/ieePmWav/BnttjPum0meOefeWqlPvi1cNZORYWFv/NqJHT1vStjrnBu5ff5cliQfOTcf/LqpfS2aDh6JvN0v/Pq5bm8P/r1u6+rJjm6//HocJHJanNypTj7uenittjQP/HpK6Og//HpP+tfjU/QP//+86oj/9PWJPg5f+xipff453o79NgPLdTM//Dop3r8MhpSv389vKnhv/JpfCbes1VLcNVNJXf41p8gdlZNAIBAf/Dn6bN0e2AVf8jKt9iPHpzauBkPZjKzpPg4aDV2P2QZ+h3SoO6vv/Npv/Mq9dkPuSYeP/XwP/Pqf/KqJbe5pje5P/LqP/MqZne5f/LqP/MqJje4//LqerPwfj9/9F+Xr5TMcdZNQgGBv/p3RMQEf+5kf+8lNNoPani5qLq8c5XN//LrMmxo9PMyenr65Xg6QoKCsBNKRYREd5kRMqjjZPd48CzoI7g5/v7+52imPz9+/9mb47k6Yzn6Znh6ZLn6+qbgbpdPPCHWsaTeOKVdG6an+/2+fWSaPDw8P/En4tkWK5kTf/08/+nqprd5Zne43FnZP89SNrAtQYGBhoaGv/NqL10Xv/Oqn1pXqLQ0v/HqP+sraLSz5Xg5pne55nf5u6tifKEXvzr3OyhfYh7e9zBsv/NpuilgZHh4Y7l5xASERAQEJjg4xUKB/+Bg9ZkQNRiP/argdhiP//RuJXb4YyBd6qBb2GzT5QAAAPzSURBVHjaYpgHAguzJ1zplQSD38omjIyMvyUZD514MRcsOY8Bokb8P++GXEnJwEDJXA3JGT8Zw0z6GaU/HUdWo6rA2C+pHPhbWVJSQwNkWtUqk/7m/GPPWq/D1aRI82pUVamtbPkhqZwLUhM4g1G5d7NnSsVcmJoX++73VjEynnqjxbinCqxGMlDZRLJXKymxDKZGe0Js7yrG6pf2M/mUq6ogbpdU/i3Z7plyA6bGS8Gkqrp6pr3RvRXOPxl/Q5wUGBjYLp2yEKYm3bM9jI/bYMGi2dO5nRlbfmtAjeLNz4b7S1W6vZovSmTRokUPpq9wbmmpmgFTo7oQoaaZT+ux0SKQIpFgLb6VjD80IGoQdqkaNvPpAK0CgcUiNQJazs6blXN7QebEwNVI7OIuX2y0YMECiFEFDTpOZmGMJrzM4gg1npk67PEGBW5LDR4ULBU1EhF50BjAah3bDldzvSLFMHNFhvvpKXZTui9kiNyL6wayXrGzmrWzZUPDsOx5ivwuJ00lD2YHBw+PvUHyHh7/HZg9rkSdWiX/Aurm5zueNtQ5ib21DJFJs1z2UKwv1DJNJsT1pgu3k2O0NkTNQvFHVmfrHP4Vb3uoF5r2f/b/P6HmFuZcfQLcMwsVsyFqYl58FGoy87Yw52Hbe1vM117+/7sSByHDy1FarDmTnkHVzBWfFFzdpBns4sLPn/O+8ZIvP7/LGV936xXrorNbYX6P+RsU58f+wOBBssjsBYs0MwySgeCStTVrlzhczbwDQsbGshlGixctCmi8pym8aNGCxaLuxsYNcl/hYThvR9b+k+s6Fy+aY6RprSmsCYy5e27rg4WixZcg0nOFtpRiYQAoIpJFC4wMLokuWnDJcavUDpR8sfDZJG/3AiM3fVY3t07WX50L5nRad0GzBVTNvHmtO7Y6Xrr33o21XF9fc86iBY22QlBTEGoWvpDzXSe6YIGBrJ++6JZFRu4f5DDUzLuh/TR43ZbFixdliC5YasT+JuvoEgw182KkeCaXv3+waAHIsMk8UmBvw9S0Llw470VKrdfGw5b+Vp0GyQYFwhcsD7JMrK08fh3m99Z5z2oTp7YVMXBxzbLyty4X9vebxcXFxGnqI7fJC5ZP073OFYWrd9hwcXGtCXB0dKx5DWRxdHzbzdmWUAlR4xXJob77brj6TgmgVH3qn9R6IC2xWv1z+O5vnD6V8xYC1VSadoR//vJl55e7glxcB6+VPlnOxSV4d+fOL1++hN/hTPACqkmfGv5F/cuXz+o7O4oucune6jlynmt7UcfOnUB9X9R3tlUuZHhRa7r6CxjcUb9jE321tOf7YUGODvXVX0BqvqhzRooDBBgAX+cweLUYZ0kAAAAASUVORK5CYII=',
        'placeholder'
      );
    }
    
  }

  private generateShapesGroup(){
    if(this.displayUserInfo === "full"){
      this._shapesGroup = new fabric.Group([this._rect, this._img, this._text], {
        left: this._left,
        top: this._top,
      });
    }else if(this.displayUserInfo === "name"){
      this._shapesGroup = new fabric.Group([this._rect, this._text], {
        left: this._left,
        top: this._top,
      });
    }else{
      this._shapesGroup = new fabric.Group([this._img], {
        left: this._left,
        top: this._top,
      });
    }
    (this._shapesGroup as ICanvasObject).id = 'tooltip'
  }

  getDrawing(hoveredObject: ICanvasObject, displayUserInfo: string){
    if(this.displayUserInfo !== displayUserInfo){
      this.setInfoOption(displayUserInfo)
      this.setBasicShapes()
    }
    this.setObject(hoveredObject)
    this.generateShapesGroup()
    return this._shapesGroup
  } 

}
