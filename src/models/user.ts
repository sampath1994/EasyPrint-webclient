export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    roles: string[];

    constructor(username: string, password: string, email: string, roles: string[]){
        this.username = username;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }
}