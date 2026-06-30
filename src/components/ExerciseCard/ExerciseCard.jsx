const ExerciseCard = ({ title, muscleGroup, equipment, difficulty, onStart}) => {

    // funzione per decidere il colore del badge di difficoltà
    const getDifficultyBadgeColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'principiante': return 'bg-success'
            case 'intermedio' : return 'bg-warning text-dark'
            case 'avanzato': return 'bg-danger'
            default: return 'bg-secondary' 
        }
    }

    return (
        <>
        <div className="card h-100 bg-dark text-white border-secondary shadow-sm">
            <div className="card-body d-flex flex-column">

                {/* titolo esercizio */}
                <h5 className="card-title fw-bold text-info mb-3">{title}</h5>

                {/* dettagli */}
               <div className="mb-4 flex-grow-1">
                <div className="d-flex justify-content-between small text-muted mb-2">
                <span>Gruppo:</span>
                <span className="text-white fw-semibold">
                {muscleGroup}
                </span>
                </div>
            <div className="d-flex justify-content-between small text-muted mb-2">
                <span>Attrezzo:</span>
                <span className="text-white fw-semibold">{equipment}</span>
                </div> 
                </div> 

                {/* difficoltà e bottone di azione */}
                <div className="d-flex align-items-center justify-content-between mt-auto pt-2 border-top border-secondary">
                    <span className={`badge ${getDifficultyBadgeColor(difficulty)}`}>
                        {difficulty}
                    </span>
                    <button className="btn btn-outline-info btn-sm px-3"
                    onClick={onStart}>
                        Avvia
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ExerciseCard