import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    // bu dizi hiç değişmeyecek
    mainJob: [],
    // buraya filtrelenenleri aktaracağız

    jobs: [],
    // apiden veriler geldi mi?
    initialized:false,
    // hata oluştu mu ?
    isError: false,
}


const jobSlice =createSlice({
    name: "jobs",
    initialState,
    reducers:{
        setJobs: (state, actions) =>{
            state.jobs= actions.payload;
            state.mainJob= actions.payload;
            state.initialized= true;
            state.isError=false;
        },
        setError: (state)=>{
            state.initialized = true;
            state.isError=true;
        },
        addJob: (state, actions)=>{
            state.jobs.push(actions.payload);
        },
        filterBySearch: (state, actions)=>{
            // arama terimini küçük harfe çevirme
            const query = actions.payload.toLowerCase();
            // arama terimi ile eşleşen değerleri filtrele
            const filter= state.mainJob.filter((job)=> job.company.toLowerCase().includes(query))
            // state'i güncelleme
            state.jobs = filter;
        },
        filterdByStatus: (state, actions)=>{
            // gelen duruma sahip bütün işleri filtreleme
            const filtred = state.mainJob.filter((job)=> job.status === actions.payload);
            state.jobs= filtred;
        },
        filterByType: (state, actions)=>{
            const filtred =state.mainJob.filter((job)=> job.type === actions.payload)
            state.jobs= filtred
        },
        sortJobs: (state, actions) =>{
            switch (actions.payload) {
                case "a-z":
                    state.jobs.sort((a, b)=>a.company.localeCompare(b.company))
                    break;
                case "z-a":
                    state.jobs.sort((a, b) => b.company.localeCompare(a.company))
                    break;
                case "En Yeni":
                    state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date))
                    break;
                case "En Eski":
                    state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date))
                    break;
            
                default:
                    return state;
            }
        },
        clearFilters: (state)=>{
            state.jobs = state.mainJob
        }
    }
})

export const {setJobs, setError, addJob, filterBySearch, filterdByStatus, filterByType, sortJobs, clearFilters} = jobSlice.actions;

export default jobSlice.reducer;