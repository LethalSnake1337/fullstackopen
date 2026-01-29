import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllEntries, submitNewEntry } from './api/diaryApi';
import { DiaryEntry } from './types';
import EntryForm from './components/EntryForm';
import DiaryEntriesList from './components/DiaryEntriesList';
import { initialFormState, resetForm, validateForm, buildEntryFromForm, FormState } from './utils/formHandler';

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await fetchAllEntries();
        setEntries(data);
      } catch (err) {
        console.error('Failed to load entries', err);
      }
    };
    loadEntries();
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, date: e.target.value }));
  };

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, visibility: e.target.value }));
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, weather: e.target.value }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, comment: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      const newEntry = buildEntryFromForm(form);
      const savedEntry = await submitNewEntry(newEntry);
      setEntries(prev => [...prev, savedEntry]);
      setForm(resetForm());
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || 'Failed to save entry');
      } else {
        setError('An unexpected error occurred');
      }
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="App">
      <h1>Flight Diary</h1>
      <EntryForm
        form={form}
        error={error}
        onDateChange={handleDateChange}
        onVisibilityChange={handleVisibilityChange}
        onWeatherChange={handleWeatherChange}
        onCommentChange={handleCommentChange}
        onSubmit={handleSubmit}
      />
      <DiaryEntriesList entries={entries} />
    </div>
  );
};

export default App;
      ))}
    </div>
  );
};

export default App;
