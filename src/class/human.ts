export class human{
    name:string;
    age:number;
    task:()=>void;
    
    constructor( name:string,age:number,task:()=>void){
        this.name = name;
        this.age = age;
        this.task = task;
    }

    doTask(){
        return this.task();
    }
}