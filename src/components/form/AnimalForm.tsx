import React, { useState, useEffect } from "react";

const AnimalForm = () => {
  const [form, setForm] = useState({
    name: "",
    breedId: "",
    diseaseId: "",
    healthStatus: true,
    adopted: false,
    photos: "",
    characteristicsId: "",
    information: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<any[]>([]);
  const [diseases, setDiseases] = useState<any[]>([]);
  const [characteristics, setCharacteristics] = useState<any[]>([]);

  useEffect(() => {
    const params = "?page=1&limit=100";

    fetch(`http://localhost:3000/breeds/findAll${params}`)
      .then((res) => res.json())
      .then((data) => setBreeds(data.data));

    fetch(`http://localhost:3000/diseases/findAll${params}`)
      .then((res) => res.json())
      .then((data) => setDiseases(data.data));

    fetch(`http://localhost:3000/characteristics/findAll${params}`)
      .then((res) => res.json())
      .then((data) => setCharacteristics(data.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async (): Promise<string | null> => {
    if (!image) return null;
    const formData = new FormData();
    formData.append("photo", image);
    const response = await fetch("http://localhost:3000/animals/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data?.file || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploaded = await handleUpload();
    if (!uploaded) return;

    const payload = { ...form, photos: uploaded };
    const res = await fetch("http://localhost:3000/animals/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("Resultado:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label>Nombre:</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div>
        <label>Raza:</label>
        <select name="breedId" value={form.breedId} onChange={handleChange} required>
          <option value="">Seleccione una raza</option>
          {breeds.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Enfermedad:</label>
        <select name="diseaseId" value={form.diseaseId} onChange={handleChange} required>
          <option value="">Seleccione una enfermedad</option>
          {diseases.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Características:</label>
        <select name="characteristicsId" value={form.characteristicsId} onChange={handleChange} required>
          <option value="">Seleccione características</option>
          {characteristics.map((item) => (
            <option key={item.id} value={item.id}>{item.color} - {item.size}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Información:</label>
        <input name="information" value={form.information} onChange={handleChange} required />
      </div>

      <div>
        <label>Estado de salud:</label>
        <input type="checkbox" name="healthStatus" checked={form.healthStatus} onChange={handleChange} />
      </div>

      <div>
        <label>Adoptado:</label>
        <input type="checkbox" name="adopted" checked={form.adopted} onChange={handleChange} />
      </div>

      <div>
        <label>Foto:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="Preview" width="100" />}
      </div>

      <button type="submit">Registrar Animal</button>
    </form>
  );
};

export default AnimalForm;
