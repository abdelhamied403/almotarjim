import { Button } from "./ui/button";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="pagination flex gap-2 flex-wrap">
      <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </Button>
      {new Array(totalPages).fill(0).map((_: any, idx: number) => (
        <Button
          variant={page === idx + 1 ? "default" : "outline"}
          onClick={() => {
            onPageChange(idx + 1);
          }}
        >
          {idx + 1}
        </Button>
      ))}
      <Button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
