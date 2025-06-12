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
  children: React.ReactElement<any>;
  modalFieldLabels?: Record<string, string>;
  modalHiddenFields?: string[];
  fetchDataFn: (page: number, limit: number) => Promise<any>;
  deleteFn: (id: string) => Promise<any>;
  limit?: number;
}

export default function DashboardForm({
  title,
  columns,
  children,
  modalFieldLabels,
  modalHiddenFields,
  fetchDataFn,
  deleteFn,
  limit = 15,
}: DashboardFormProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  const fetchData = async (page: number = 1) => {
    try {
      const response = await fetchDataFn(page, limit);
      setData(response.data);
      setPagination(response.pagination);
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

  const handleAddData = async () => {
    await fetchData(pagination.currentPage);
    setEditingData(null);
    setIsSidebarOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow?.id) return;
    try {
      await deleteFn(selectedRow.id);
      await fetchData(pagination.currentPage);
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

      <div className="flex justify-end mt-4">
        <Button onClick={handleCreateClick}>Crear {title.toLowerCase()}</Button>
      </div>

      <Table
        data={data}
        columns={columns}
        onRowClick={handleRowClick}
        currentPage={pagination?.currentPage || 1}
        totalPages={pagination?.totalPages || 1}
        onPageChange={(page) => fetchData(page)}
      />

      {isSidebarOpen && (
        <SidebarForm onClose={() => setIsSidebarOpen(false)} side="right">
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
