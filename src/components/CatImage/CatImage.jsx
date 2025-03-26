import axios from 'axios'
import styles from './CatImage.module.css'
import { useEffect, useState } from 'react'
export default function CatImage() {
    const [loading, setLoading] = useState(false)
    const [imageCatData, setImageCatData] = useState([])
    const [error, setError] = useState(null)

    async function imageData() {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.get('https://api.thecatapi.com/v1/images/search')
            const data = response.data
            setImageCatData(data)
        } catch {
            setError('Ошибка при загрузки данных')

        }
        finally {
            setLoading(false)
        }
    }

    function changeImage() {
        imageData()
    }
    useEffect(() => {
        imageData()

    }, [])

    return (
        <div className={styles.conteiner}>
            {loading && <p className={styles.loading}>Loading...</p>}
            {imageCatData.map((elem) => (
                <div className={styles.imageConteiner} key={elem.id}>
                    <h2>Random Cat Image</h2>
                    <img src={elem.url} alt="image cat" />
                    <button onClick={changeImage}>Load New Image</button>
                </div>

            ))}
            {error && <p className={styles.error} >{error}</p>}
        </div>
    )

}