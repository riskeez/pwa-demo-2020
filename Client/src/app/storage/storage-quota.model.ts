export class StorageQuota {
    used: number;
    remaining: number;
    total: number;

    constructor(total: number, used: number) {
        this.total = total;
        this.used = used;
        this.remaining = total - used;
    }
}