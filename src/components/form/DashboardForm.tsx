// src/components/form/DashboardForm.tsx
import React, { useEffect, useState } from "react";
import SidebarForm from "@/components/form/SidebarForm";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button"
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { diseasesService } from "@/services/diseasesService";

interface DashboardFormProps {
  title: string;
  columns: { label: string; field: string }[];
  children: React.ReactElement<{
    onSubmit: (newData: any) => void;
    defaultValues?: any;
    mode?: "create" | "edit";
  }>;
  modalFieldLabels?: Record<string, string>;
  modalHiddenFields?: string[];
}

export default function DashboardForm({ title, columns, children, modalFieldLabels, modalHiddenFields }: DashboardFormProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await diseasesService.findAll();
      if (response?.data?.type === "success") {
        setData(response.data.data); // asume que viene un array en "data"
      }
    } catch (error) {
      console.error("Error cargando enfermedades:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateClick = () => {
    setEditingData(null);
    setIsSidebarOpen(true);
  };

  const handleAddData = (newData: any) => {
    if (editingData) {
      setData((prevData) =>
        prevData.map((item) => (item.id === editingData.id ? { ...item, ...newData } : item))
      );
    } else {
      setData((prevData) => [...prevData, newData]);
    }
    setEditingData(null);
    setIsSidebarOpen(false);
  };

  const handleRowClick = (rowData: any) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-4xl font-bold">{title}</h1>

      {data.length === 0 ? (
        <div className="flex flex-1 justify-center items-center">
          <Button onClick={handleCreateClick} className="cursor-pointer">
            Crear {title.toLowerCase()}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mt-4">
            <Button onClick={handleCreateClick} className="cursor-pointer">
              Crear más {title.toLowerCase()}
            </Button>
          </div>
          <Table data={data} columns={columns} onRowClick={handleRowClick} />
        </>
      )}

      {isSidebarOpen && (
        <SidebarForm
          onClose={() => {
            setIsSidebarOpen(false);
            setEditingData(null);
          }}
          side="right"
        >
          {React.cloneElement(children, {
            onSubmit: handleAddData,
            defaultValues: editingData,
            mode: editingData ? "edit" : "create",
          })}
        </SidebarForm>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedRow || {}}
        fieldLabels={modalFieldLabels}
        hiddenFields={modalHiddenFields}
      >
        <div className="flex justify-end gap-2 mb-4">
          <Button
            onClick={() => {
              setEditingData(selectedRow);
              setIsModalOpen(false);
              setIsSidebarOpen(true);
            }}
            className="bg-white text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <FiEdit /> 
          </Button>

          <Button
            onClick={() => {
              alert("Eliminar aún no implementado");
            }}
            className="bg-white text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <FiTrash2 /> 
          </Button>
        </div>
      </Modal>
    </div>
  );
}
