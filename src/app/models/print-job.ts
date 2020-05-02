export class PrintJob {
    id: number;
    username: String;
    docname: String;
    color:String;

    constructor(id: number, username: String, docname: String, color:String){
        this.id = id;
        this.username = username;
        this.docname = docname;
        this.color = color;
    }
}