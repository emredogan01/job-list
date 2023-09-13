import axios from "axios"
import { statusOpt, typeOpt } from "../helpers/contants"
import { v4 } from "uuid"
import { useDispatch } from "react-redux"
import { addJob } from "../redux/jobSlice"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const AddJob = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault()
    // formdata oluşturma
    const form =new FormData(e.target)
    // formdaki değerlerden bir obje oluşturma
    const newJob =Object.fromEntries(form.entries())
    // select'ler seçildi mi kontrol etme
    if(!newJob.type || !newJob.status){
      toast.info("Tüm alanları lütfen dolurunuz.")
      return;
    }

    // objeye id ekleme
    newJob.id = v4();
    // date ekleme
    newJob.date = new Date().toLocaleDateString()
    // ! veriyi api'ye ekleme
    axios
    .post("http://localhost:3040/jobs", newJob)
    .then(()=> {
      //! verileri store'a da gönderme
      dispatch(addJob(newJob))
      // anasayfaya yönlendir
      navigate("/")
      // bildirim ver
      toast.success("İş başarıyla eklendi!")
    })
    .catch(()=> {
      toast.error("Benklenmedik bir hata oluştu!")
    })
  }

  return (
    <div className="flex">
      <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Pozisyon</label>
          <input required name="position" type="text" />
        </div>

        <div>
          <label>Şirket</label>
          <input required name="company" type="text" />
        </div>

        <div>
          <label>Lokasyon</label>
          <input required name="location" type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select name="status">
            <option selected disabled>Seçiniz</option>
            {statusOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select name="type">
            <option selected disabled>Seçiniz</option>
            {typeOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <button>Ekle</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default AddJob;