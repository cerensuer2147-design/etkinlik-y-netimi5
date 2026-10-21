import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { CampusEvent } from "../../types/event";

interface EventFormProps {
  initial?: CampusEvent;
  submitLabel: string;
  onSubmit: (data: CampusEvent) => void;
}

interface FormValues {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

function EventForm({ initial, submitLabel, onSubmit }: EventFormProps) {
  const [values, setValues] = useState<FormValues>({
    title: initial?.title ?? "",
    category: initial?.category ?? "",
    date: initial?.date ?? "",
    time: initial?.time ?? "",
    location: initial?.location ?? "",
    capacity: initial ? String(initial.capacity) : "",
    description: initial?.description ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (values.title.trim().length < 3) newErrors.title = "Etkinlik adı en az 3 karakter olmalı.";
    if (!values.category) newErrors.category = "Bir kategori seçin.";
    if (!values.date) newErrors.date = "Tarih seçin.";
    if (!values.time) newErrors.time = "Saat seçin.";
    if (!values.location.trim()) newErrors.location = "Yer bilgisini yazın.";
    const cap = Number(values.capacity);
    if (values.capacity && (cap < 1 || cap > 1000)) {
      newErrors.capacity = "Kontenjan 1 ile 1000 arasında olmalıdır.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      id: initial?.id ?? `event-${Date.now()}`,
      title: values.title.trim(),
      category: values.category,
      date: values.date,
      time: values.time,
      location: values.location.trim(),
      capacity: cap || 0,
      description: values.description.trim(),
    });
  }

  const hataVar = Object.keys(errors).length > 0;

  return (
    <>
      <p className="form-not">Yıldızlı (*) alanlar zorunludur.</p>

      {hataVar && (
        <div className="error-box">
          <p><strong>Formda hatalı alanlar var. Lütfen kırmızı ile işaretlenen yerleri kontrol edin.</strong></p>
        </div>
      )}

      <form className="event-form" noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ad">Etkinlik Adı *</label>
          <input id="ad" name="title" value={values.title} onChange={handleChange}
            aria-invalid={!!errors.title} placeholder="Etkinlik adını girin" />
          <span className="error-text">{errors.title}</span>
        </div>

        <div className="form-group">
          <label htmlFor="kategori">Kategori *</label>
          <select id="kategori" name="category" value={values.category} onChange={handleChange}
            aria-invalid={!!errors.category}>
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
          </select>
          <span className="error-text">{errors.category}</span>
        </div>

        <div className="form-group">
          <label htmlFor="tarih">Tarih *</label>
          <input type="date" id="tarih" name="date" value={values.date} onChange={handleChange}
            aria-invalid={!!errors.date} />
          <span className="error-text">{errors.date}</span>
        </div>

        <div className="form-group">
          <label htmlFor="saat">Saat *</label>
          <input type="time" id="saat" name="time" value={values.time} onChange={handleChange}
            aria-invalid={!!errors.time} />
          <span className="error-text">{errors.time}</span>
        </div>

        <div className="form-group">
          <label htmlFor="yer">Yer *</label>
          <input id="yer" name="location" value={values.location} onChange={handleChange}
            aria-invalid={!!errors.location} placeholder="Örn. A Blok Konferans Salonu" />
          <span className="error-text">{errors.location}</span>
        </div>

        <div className="form-group">
          <label htmlFor="kontenjan">Kontenjan</label>
          <input type="number" id="kontenjan" name="capacity" value={values.capacity}
            onChange={handleChange} aria-invalid={!!errors.capacity} placeholder="1-1000 arası" />
          <span className="error-text">{errors.capacity}</span>
        </div>

        <div className="form-group">
          <label htmlFor="aciklama">Açıklama</label>
          <textarea id="aciklama" name="description" rows={4} value={values.description}
            onChange={handleChange} placeholder="Etkinlik detayları..." />
        </div>

        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </form>
    </>
  );
}

export default EventForm;