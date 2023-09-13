import { useEffect } from "react"
import Card from "../components/Card"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setJobs, setError } from "../redux/jobSlice"
import Filter from "../components/Filter"


const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  useEffect(()=>{
    axios
    .get("http://localhost:3040/jobs")
    .then((res)=> dispatch(setJobs(res.data)))
    .catch((err) => dispatch(setError(err)))
  },[])


  return (
    <div className="list-page">
      <Filter />

      <h3 className="job-count">Bulunan ( {state.mainJob.length} ) iş arasından ( {" "}{state.jobs.length} ) tanesini görüntülüyorsunuz</h3>

      <section className="list-section">
        {/* apiden cevap nekleniyorsa ekrana basılacak olan */}
        {
          !state.initialized && <p>Yükleniyor...</p>
        }

        {/* apiden cevap geldiyse */}
        {state.initialized && !state.isError ? ( 
        <>
        {state.jobs.map((job)=>(
        <Card key={job.id} job={job} />
        ))}
        </>
        ): <p>Üzgünüz bir hata oluştu...</p>}
      </section>
    </div>
  )
}

export default JobList