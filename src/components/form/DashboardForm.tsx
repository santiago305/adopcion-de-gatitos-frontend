// src/components/form/DashboardForm.tsx
import React, { useEffect, useState } from "react";
import SidebarForm from "@/components/form/SidebarForm";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ConfirmModal from "../ConfirmModal";

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
  fetchDataFn: () => Promise<any[]>; // nuevo prop
  deleteFn: (id: string) => Promise<any>; // nuevo prop
}

export default function DashboardForm({
  title,
  columns,
  children,
  modalFieldLabels,
  modalHiddenFields,
  fetchDataFn,
  deleteFn,
}: DashboardFormProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const fetchData = async () => {
    try {
      const result = await fetchDataFn();
      setData(result);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateClick = () => {
    setEditingData(null);
    setIsSidebarOpen(true);
  };

  const handleAddData = async (newData: any) => {
    if (editingData) {
      setData((prevData) =>
        prevData.map((item) => (item.id === editingData.id ? { ...item, ...newData } : item))
      );
    } else {
      await fetchData();
    }
    setEditingData(null);
    setIsSidebarOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow?.id) return;
    try {
      await deleteFn(selectedRow.id);
      setData((prevData) => prevData.filter((item) => item.id !== selectedRow.id));
      setSelectedRow(null);
      setIsModalOpen(false);
      setIsConfirmOpen(false);
    } catch (error) {
      alert("Error al eliminar.");
      console.error(error);
    }
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
            className="bg-white text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:bg-gray-100"
          >
            <FiEdit />
          </Button>

          <Button
            onClick={() => setIsConfirmOpen(true)}
            className="bg-white text-red-600 hover:text-red-800 flex items-center gap-1 hover:bg-gray-100"
          >
            <FiTrash2 />
          </Button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`¿Estás seguro de que deseas eliminar esta ${title.toLowerCase()}?`}
      />
    </div>
  );
}
