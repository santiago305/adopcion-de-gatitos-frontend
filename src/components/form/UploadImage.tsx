import axiosInstance from "@/common/utils/axios";
import { useState } from "react";


interface UploadImageProps {
  onUploadSuccess: (url: string) => void;
}

export default function UploadImage({ onUploadSuccess }: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      setLoading(true);
      const res = await axiosInstance.post("/animals/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.file;
      setPreview(imageUrl);
      onUploadSuccess(imageUrl);
    } catch (err) {
      console.error("Error al subir imagen:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <span>Subiendo imagen...</span>}
      {preview && <img src={preview} alt="Preview" className="h-32 w-auto mt-2 rounded" />}
    </div>
  );
}
