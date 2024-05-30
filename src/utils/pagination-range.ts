/**
 * Pagination
 *  1 returns (0,7), 2 returns (8,15), etc..
 */
export function paginationRange(
  per_page?: number | null,
  page_number?: number | null
): number[] {
  // defaults
  const ITEMS_PER_PAGE = per_page ? per_page : 8;
  const PAGE = page_number ? page_number : 1;

  const from = (PAGE - 1) * ITEMS_PER_PAGE;
  const to = from + (ITEMS_PER_PAGE - 1);

  return [from, to];
}
