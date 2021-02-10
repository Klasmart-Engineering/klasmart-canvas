import { fabric } from 'fabric';
import { ICanvasObject } from '../../../../interfaces/objects/canvas-object';
import store from '../../redux/store'

export class UserInfoTooltip {
  private _left: number = 0;
  private _top: number = 0;
  private _rect: fabric.Rect;
  private _img: fabric.Image
  private _text: fabric.Text
  private _shapesGroup: fabric.Group = new fabric.Group()
  public displayUserInfo: string

  constructor(displayUserInfo: string) {

    this.displayUserInfo = displayUserInfo

    this._rect = new fabric.Rect({
      stroke: 'black',
      fill: 'white',
      width: displayUserInfo === "avatar" ? 150 : 115,
      height: displayUserInfo === "avatar" ? 40 : 25,
      shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
      originX: 'left',
      originY: 'top',
    });
    
    this._img = new fabric.Image('')
    this._img.set({
      originX: 'left',
      originY: 'top',
      left: 2.5,
      top: 2.5,
      width: 35,
      height: 35,
    });
    
    this._text = new fabric.Text('userName', {
      fontSize: 14,
      fontFamily: 'sans-serif',
      originX: 'left',
      originY: 'top',
      left: displayUserInfo === "avatar" ? 37.5 : 2.5,
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

  public setObject(hoveredObject: ICanvasObject){
    
    const objectId = hoveredObject.id
    const userId = objectId ? objectId.substr(0, objectId.indexOf(':')) : '';
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
    if(this.displayUserInfo === "avatar"){
      this._shapesGroup = new fabric.Group([this._rect, this._img, this._text], {
        left: this._left,
        top: this._top,
      });
    }else{
      this._shapesGroup = new fabric.Group([this._rect, this._text], {
        left: this._left,
        top: this._top,
      });
    }
  }

  getDrawing(){
    this.generateShapesGroup()
    return this._shapesGroup
  } 

}
