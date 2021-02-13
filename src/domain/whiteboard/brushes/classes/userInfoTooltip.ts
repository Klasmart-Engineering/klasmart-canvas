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
      height: this.optionUserInfo.imgSize,
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
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg?s=35',
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
