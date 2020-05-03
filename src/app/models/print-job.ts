export interface PrintJob {
    /*id: number;
    username: String;
    docname: String;
    color:String;*/

    client_id: number;
    color: string;
    document_id: number;
    download_link: string;
    ref_no: string;
    side: string;
    status: string;


    /*constructor(id: number, username: String, docname: String, color:String){
        this.id = id;
        this.username = username;
        this.docname = docname;
        this.color = color;
    }*/
}