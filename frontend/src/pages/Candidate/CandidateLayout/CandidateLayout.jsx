import { Outlet } from "react-router-dom";

import "./CandidateLayout.css";

import CandidateHeader
    from "../../../components/Candidate/CandidateHeader/CandidateHeader";

function CandidateLayout() {
    return (
        <div className="candidate-layout">
            <CandidateHeader />

            <main className="candidate-layout__content">
                <Outlet />
            </main>
        </div>
    );
}

export default CandidateLayout;