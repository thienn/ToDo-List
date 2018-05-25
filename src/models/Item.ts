export class Item {
    constructor(
        public title: string, 
        public body: string, 
        public author: string,
        public status: boolean,
        public id?: string) {
    }
}