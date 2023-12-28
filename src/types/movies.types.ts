export interface MoviesDTO {
	title: string;
	publish_year: number;
	poster_image: any;
	_id?: string;
}

export interface PaginationDTO {
	totalPage: number;
	currentPage: number;
	count: number;
	perPage?: number;
}
