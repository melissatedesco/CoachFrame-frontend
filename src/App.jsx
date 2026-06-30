import NavBar from './components/NavBar/NavBar';
import ExerciseCard from './components/ExerciseCard/ExerciseCard';

function App() {
  // dati esempio
  const dummyExercises = [
    { id: 1, title: 'Squat a Corpo Libero', muscle: 'Gambe', equip: 'Nessuno', diff: 'Principiante' },
    { id: 2, title: 'Piegamenti sulle braccia', muscle: 'Petto/Tricipiti', equip: 'Nessuno', diff: 'Intermedio' },
    { id: 3, title: 'Affondi con Manubri', muscle: 'Gambe', equip: 'Manubri', diff: 'Avanzato' },
  ];

  return (
    <div className='min-vh-100 bg-black text-white'>
      <NavBar />

      <main className="container mt-5 ">
        <header className='mb-4 text-center text-lg-start'>
        <h2 className="fw-bold">I tuoi esercizi</h2>
        <p className="text-muted">Seleziona un movimento per avviare il Coach Virtuale</p>
        </header>

        {/* griglia responsive */}
       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {dummyExercises.map((ex) => (
            <div className="col" key={ex.id}>
              <ExerciseCard
                title={ex.title}
                muscleGroup={ex.muscle}
                equipment={ex.equip}
                difficulty={ex.diff}
                onStart={() => alert(`Avvio analisi per: ${ex.title}`)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;