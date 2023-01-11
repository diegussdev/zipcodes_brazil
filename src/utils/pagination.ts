export const PAGINATION_DEFAULT_LIMIT = 20;

interface PaginationSection {
    page: number;
    per_page: number;
    page_count: number;
    total_count: number;
}

export class PaginationResponse {
    pagination: PaginationSection;
    data: any[];

    constructor(
        total: number,
        currentPage: number,
        limit: number,
        data: any[]
    ) {
        this.pagination = this.buildPagination(total, data.length, currentPage, limit);
        this.data = data;
    }

    private buildPagination(
        total: number,
        pageCount: number,
        currentPage: number,
        limit: number
    ): PaginationSection {
        const pagination: PaginationSection = {
            page: currentPage,
            per_page: limit,
            page_count: pageCount,
            total_count: total
        };

        return pagination;
    }
}