import { Pagination } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

const PaginationHN = ({ onPaginationChange, activePage, totalPages }) => {
    return (
        <Pagination
            activePage={activePage}
            onPageChange={onPaginationChange}
            totalPages={totalPages}
        />
    );
};

export default PaginationHN;