import {CustomerStatus} from "./CustomerStatus";

export class CurrentUser {

    constructor(readonly customerStatus: CustomerStatus) {
    }
}