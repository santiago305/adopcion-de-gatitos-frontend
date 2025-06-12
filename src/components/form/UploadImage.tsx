import React, { useState } from "react";

const UploadImage = ({ onUpload }: { onUpload: (imageUrl: string) => void }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Para previsualizar la imagen
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImageUrl(URL.createObjectURL(selectedImage)); // Previsualiza la imagen
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setError("Por favor selecciona una imagen.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("photo", image);

    try {
      const response = await fetch("http://localhost:3000/animals/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // Aquí construimos la URL completa de la imagen
        const fullImageUrl = `http://localhost:3000/uploads/animals/${data.file}`;
        onUpload(fullImageUrl); // Llamamos a onUpload para pasar la URL completa
      } else {
        setError("Error al cargar la imagen.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Hubo un error al intentar cargar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cargar Imagen del Animal</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {imageUrl && <img src={imageUrl} alt="Previsualización" width="100" />}
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Subir Imagen"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadImage;
