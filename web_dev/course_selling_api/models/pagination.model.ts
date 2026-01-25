export class ApiPagination {
    public total: number;

    constructor(
        public page: number = 1,
        public limit: number = 10
    ) {
        this.total = 0;
    }

    get skip() {
        return (this.page - 1) * this.limit;
    }

    get totalPages() {
        return Math.ceil(this.total / this.limit);
    }
}
