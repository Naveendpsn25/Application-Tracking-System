import { useEffect, useState } from "react";

import useAuthStore from "../../../store/auth/authStore";
import EducationInfo from "../../../components/Candidate/Profile/EducationInfo/EducationInfo";
import {
    getCandidateProfile,
    updateCandidateProfile,
} from "../../../services/candidate/candidateProfileService";

import ProfileHero from "../../../components/Candidate/Profile/ProfileHero/ProfileHero";
import PersonalInfo from "../../../components/Candidate/Profile/PersonalInfo/PersonalInfo";
import OnlinePresence from "../../../components/Candidate/Profile/OnlinePresence/OnlinePresence";
import SkillsInfo from "../../../components/Candidate/Profile/SkillsInfo/SkillsInfo";
import ProfessionalSummary from "../../../components/Candidate/Profile/ProfessionalSummary/ProfessionalSummary";
import ExperienceInfo from "../../../components/Candidate/Profile/ExperienceInfo/ExperienceInfo";
import ResumeSection from "../../../components/Candidate/Profile/ResumeSection/ResumeSection";
import "./CandidateProfile.css";

function CandidateProfile() {
    const { accessToken } = useAuthStore();

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    // --------------------------------------------------
    // GET PROFILE
    // --------------------------------------------------

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getCandidateProfile();

            // Backend is the source of truth
            setProfile(result.data);
        } catch (error) {
            console.error("Profile fetch error:", error);

            setError(
                error.message || "Unable to load candidate profile."
            );
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // INITIAL PROFILE LOAD
    // --------------------------------------------------

    useEffect(() => {
        if (accessToken) {
            fetchProfile();
        } else {
            setLoading(false);
            setError("Authentication token not found.");
        }
    }, [accessToken]);

    // --------------------------------------------------
    // UPDATE PROFILE
    // --------------------------------------------------

    const handleProfileUpdate = async (updatedData) => {
        try {
            setSaving(true);
            setError("");
            setSuccessMessage("");

            // Send changes to backend
            await updateCandidateProfile(updatedData);

            /*
             * IMPORTANT:
             * Do not manually assume that updatedData is the
             * final profile.
             *
             * Fetch the profile again from the backend so the
             * UI always represents the actual database state.
             */
            await fetchProfile();

            setIsEditing(false);

            setSuccessMessage(
                "Profile updated successfully."
            );
        } catch (error) {
            console.error(
                "Profile update error:",
                error
            );

            setError(
                error.message ||
                "Unable to update profile."
            );
        } finally {
            setSaving(false);
        }
    };

    // --------------------------------------------------
    // LOADING
    // --------------------------------------------------

    if (loading) {
        return (
            <main className="candidate-profile-page">
                <div className="profile-loading">
                    Loading profile...
                </div>
            </main>
        );
    }

    // --------------------------------------------------
    // ERROR WHILE LOADING PROFILE
    // --------------------------------------------------

    if (error && !profile) {
        return (
            <main className="candidate-profile-page">
                <div className="profile-error">
                    <h2>Unable to load profile</h2>

                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={fetchProfile}
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    // --------------------------------------------------
    // PROFILE PAGE
    // --------------------------------------------------

    return (
        <main className="candidate-profile-page">

            {error && profile && (
                <div className="profile-message profile-message--error">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="profile-message profile-message--success">
                    {successMessage}
                </div>
            )}

            <ProfileHero
                profile={profile}
                saving={saving}
                onUpdate={fetchProfile}
                onCancel={() => {
                    setError("");
                    setSuccessMessage("");
                    setIsEditing(false);
                }}
            />

            <PersonalInfo
                profile={profile}
                isEditing={isEditing}
                saving={saving}
                onUpdate={handleProfileUpdate}
            />

            <ProfessionalSummary
                profile={profile}
                isEditing={isEditing}
                saving={saving}
                onUpdate={handleProfileUpdate}
            />

            <ResumeSection
                profile={profile}
                onProfileRefresh={fetchProfile}
                className="resume"
            />

            <EducationInfo
                profile={profile}
                isEditing={isEditing}
                saving={saving}
                onUpdate={handleProfileUpdate}
                className="education"
            />

            <ExperienceInfo className="experience"/>
            <OnlinePresence />
            <SkillsInfo />

        </main>
    );
}

export default CandidateProfile;