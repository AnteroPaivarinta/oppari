import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ConfirmModal = () => {
    return(
        <div className="modal">
            <FontAwesomeIcon color='green' className='icon' icon={faCircleCheck} />
            <div style={{display: 'flex', alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color:'green'}}> Lähetys onnistui! </h1>
                <h4> Voit sulkea ikkunan. </h4>
                <h4>Jos haluat päivittää tietojasi, ilmoita siitä sähköpostitse ylläpitäjälle.</h4>
            </div>
        </div>     
    )
}

export default ConfirmModal;