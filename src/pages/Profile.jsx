import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersApi } from '../api/users';
import { equipmentApi } from '../api/equipment';
import Loading from '../components/Loading/Loading';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const CATEGORY_LABELS = {
  corpo_libero: 'Corpo libero',
  oggetti_casa: 'Oggetti di casa',
  pesi: 'Pesi',
  elastici: 'Elastici',
};

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', surname: user?.surname || '', email: user?.email || '' });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [allEquipment, setAllEquipment] = useState([]);
  const [myEquipmentIds, setMyEquipmentIds] = useState(new Set());
  const [equipmentError, setEquipmentError] = useState('');
  const [loadingEquipment, setLoadingEquipment] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    Promise.all([equipmentApi.getAll(), equipmentApi.getMine()])
      .then(([all, mine]) => {
        setAllEquipment(all);
        setMyEquipmentIds(new Set(mine.map((e) => e.id)));
      })
      .catch((err) => setEquipmentError(err.message))
      .finally(() => setLoadingEquipment(false));
  }, []);

  const handleProfileChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess(false);
    setSavingProfile(true);
    try {
      await usersApi.update(user.id, form);
      updateUser(form);
      setProfileSuccess(true);
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const toggleEquipment = async (equipmentId) => {
    setTogglingId(equipmentId);
    setEquipmentError('');
    const owned = myEquipmentIds.has(equipmentId);
    try {
      if (owned) {
        await equipmentApi.remove(equipmentId);
        setMyEquipmentIds((prev) => {
          const next = new Set(prev);
          next.delete(equipmentId);
          return next;
        });
      } else {
        await equipmentApi.add(equipmentId);
        setMyEquipmentIds((prev) => new Set(prev).add(equipmentId));
      }
    } catch (err) {
      setEquipmentError(err.message);
    } finally {
      setTogglingId(null);
    }
  };

  const groupedEquipment = allEquipment.reduce((acc, eq) => {
    (acc[eq.category] = acc[eq.category] || []).push(eq);
    return acc;
  }, {});

  return (
    <main className="container mt-5" style={{ maxWidth: 640 }}>
      <header className="mb-4">
        <h2 className="fw-bold">Il tuo profilo</h2>
        <p className="text-muted">Gestisci i tuoi dati e la tua attrezzatura</p>
      </header>

      <div className="card bg-ff-surface border-ff shadow-sm mb-4">
        <div className="card-body">
          <h6 className="fw-semibold small text-uppercase text-muted mb-3">Dati personali</h6>

          <ErrorAlert message={profileError} />
          {profileSuccess && (
            <div className="alert alert-success bg-success-subtle text-success-emphasis border-success-subtle">
              Profilo aggiornato con successo.
            </div>
          )}

          <form onSubmit={handleProfileSubmit}>
            <div className="row g-2 mb-3">
              <div className="col">
                <label className="form-label small text-muted">Nome</label>
                <input
                  type="text"
                  name="name"
                  className="form-control border-ff"
                  value={form.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label small text-muted">Cognome</label>
                <input
                  type="text"
                  name="surname"
                  className="form-control border-ff"
                  value={form.surname}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label small text-muted">Email</label>
              <input
                type="email"
                name="email"
                className="form-control border-ff"
                value={form.email}
                onChange={handleProfileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-info fw-semibold" disabled={savingProfile}>
              {savingProfile ? 'Salvataggio...' : 'Salva modifiche'}
            </button>
          </form>
        </div>
      </div>

      <div className="card bg-ff-surface border-ff shadow-sm">
        <div className="card-body">
          <h6 className="fw-semibold small text-uppercase text-muted mb-3">La tua attrezzatura</h6>

          <ErrorAlert message={equipmentError} />
          {loadingEquipment && <Loading />}

          {Object.entries(groupedEquipment).map(([category, items]) => (
            <div key={category} className="mb-3">
              <div className="small text-muted mb-2">{CATEGORY_LABELS[category] || category}</div>
              <div className="d-flex flex-wrap gap-2">
                {items.map((eq) => {
                  const owned = myEquipmentIds.has(eq.id);
                  return (
                    <button
                      key={eq.id}
                      type="button"
                      className={`btn btn-sm ${owned ? 'btn-info' : 'btn-outline-ff'}`}
                      onClick={() => toggleEquipment(eq.id)}
                      disabled={togglingId === eq.id}
                    >
                      {eq.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Profile;
