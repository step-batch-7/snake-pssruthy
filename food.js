'use strict'

const getRandomFoodType = ()=>{
  return (Math.random() * 10) < 7 ? 'normalFood' : 'specialFood'; 
}

class Food {
  #colId;
  #rowId;
  #type;
  constructor(colId, rowId) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#type = getRandomFoodType();
  }
  get position() {
    return [this.#colId, this.#rowId];
  }
  get type(){
    const category = this.#type;
    return category;
  }
  isSpecial() {
    return this.#type === 'specialFood';
  }
}
