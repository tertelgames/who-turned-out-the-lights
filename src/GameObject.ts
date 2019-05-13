let list:GameObject[] = [];

export default class GameObject{
    constructor(){
        list.push(this);
    }
    update(){

    }
    static get list(){
        return list;
    }
    static update(){
        for(let gameObject of this.list) gameObject.update();
    }
}
