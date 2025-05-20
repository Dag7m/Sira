import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
    name: 'Job',
    initialState: {
        allJobs: [],
        loading: false,
        saveJobLoading: false,
        error: null,
        jobDetails: {
            job_id: "",
            title: "",
            description: "",
            company_name: "",
            company_logo_public_id: "",
            company_logo_url: "",
            location: "",
            skills_required: "",
            experience: "",
            category: "",
            salary: "",
            employment_type: "",
            posted_by: "",
            created_at: "",
            updated_at: "",
        },
    },
    reducers: {
        newPostRequest: (state) => {
            state.loading = true;
        },
        newPostSuccess: (state) => {
            state.loading = false;
        },
        newPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },

        allJobsRequest: (state) => {
            state.loading = true;
        },
        allJobsSuccess: (state, action) => {
            state.loading = false;
            state.allJobs = action.payload;
        },
        allJobsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        jobDetailsRequest: (state) => {
            state.loading = true;
        },
        jobDetailsSuccess: (state, action) => {
            state.loading = false;
            state.jobDetails = action.payload;
        },
        jobDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, 

        jobSaveRequest: (state) => {
            state.saveJobLoading = true;
        },
        jobSaveSuccess: (state) => {
            state.saveJobLoading = false;
        },
        jobSaveFail: (state, action) => {
            state.saveJobLoading = false;
            state.error = action.payload;
        }, 


        getSavedJobsRequest: (state, action) => {
            state.loading = true
        },
        getSavedJobsSuccess: (state, action) => {
            state.loading = false 
            state.savedJobs = action.payload.savedJob
        },
        getSavedJobsFail: (state, action) => {
            state.loading = false
            state.error = action.payload;
        }

    }

})

export const { newPostRequest, newPostSuccess, newPostFail, allJobsRequest, allJobsSuccess, allJobsFail,
    jobDetailsRequest, jobDetailsSuccess, jobDetailsFail,
    jobSaveRequest, jobSaveSuccess, jobSaveFail,
    getSavedJobsRequest, getSavedJobsSuccess, getSavedJobsFail
} = JobSlice.actions;

export default JobSlice.reducer